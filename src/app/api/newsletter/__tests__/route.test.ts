// @vitest-environment node

import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/newsletter/route";

const brevoMocks = vi.hoisted(() => ({
  contactsSetApiKey: vi.fn(),
  createContact: vi.fn(),
  transactionalSetApiKey: vi.fn(),
  sendTransacEmail: vi.fn(),
}));

vi.mock("@getbrevo/brevo", () => {
  class ContactsApi {
    setApiKey = brevoMocks.contactsSetApiKey;
    createContact = brevoMocks.createContact;
  }

  class TransactionalEmailsApi {
    setApiKey = brevoMocks.transactionalSetApiKey;
    sendTransacEmail = brevoMocks.sendTransacEmail;
  }

  class CreateContact {
    email?: string;
    listIds?: number[];
    updateEnabled?: boolean;
  }

  class SendSmtpEmail {
    subject?: string;
    htmlContent?: string;
    sender?: { name: string; email: string };
    to?: Array<{ email: string }>;
  }

  return {
    ContactsApi,
    ContactsApiApiKeys: { apiKey: "apiKey" },
    TransactionalEmailsApi,
    TransactionalEmailsApiApiKeys: { apiKey: "apiKey" },
    CreateContact,
    SendSmtpEmail,
  };
});

function newsletterRequest(email: string): NextRequest {
  return new NextRequest("http://localhost/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}

describe("POST /api/newsletter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    process.env.BREVO_API_KEY = "test-api-key";
    process.env.BREVO_LIST_ID = "2";
    delete process.env.BREVO_SENDER_EMAIL;
    delete process.env.BREVO_SENDER_NAME;
    brevoMocks.createContact.mockResolvedValue({});
    brevoMocks.sendTransacEmail.mockResolvedValue({ messageId: "test-message-id" });
  });

  it("rejects invalid email before calling Brevo", async () => {
    const response = await POST(newsletterRequest("not-an-email"));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Please enter a valid email address.",
    });
    expect(brevoMocks.createContact).not.toHaveBeenCalled();
    expect(brevoMocks.sendTransacEmail).not.toHaveBeenCalled();
  });

  it("adds the contact and sends the welcome email before returning success", async () => {
    const response = await POST(newsletterRequest("reader@example.com"));

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true });
    expect(brevoMocks.createContact).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "reader@example.com",
        listIds: [2],
        updateEnabled: true,
      })
    );
    expect(brevoMocks.sendTransacEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: "Welcome to GoldenRetriever.hair!",
        to: [{ email: "reader@example.com" }],
      })
    );
    expect(
      brevoMocks.createContact.mock.invocationCallOrder[0]
    ).toBeLessThan(brevoMocks.sendTransacEmail.mock.invocationCallOrder[0]);
  });

  it("returns an error and never reports success when welcome delivery is rejected", async () => {
    brevoMocks.sendTransacEmail.mockRejectedValue({
      response: {
        status: 500,
        body: { message: "Temporary provider failure." },
      },
    });

    const response = await POST(newsletterRequest("reader@example.com"));

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      error: "Brevo error: Temporary provider failure.",
    });
    expect(brevoMocks.createContact).toHaveBeenCalledOnce();
    expect(brevoMocks.sendTransacEmail).toHaveBeenCalledOnce();
  });
});

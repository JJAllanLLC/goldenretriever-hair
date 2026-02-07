import { NextRequest, NextResponse } from "next/server";
import * as Brevo from "@getbrevo/brevo";
import { getWelcomeEmailHtml, WELCOME_EMAIL_SUBJECT } from "@/lib/welcome-email";

function isValidEmail(value: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value?.trim() ?? "");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listIdRaw = process.env.BREVO_LIST_ID;
    const listId = listIdRaw ? parseInt(listIdRaw, 10) : 2;

    console.log(
      "Newsletter API: BREVO_API_KEY present:",
      !!apiKey,
      "BREVO_LIST_ID:",
      process.env.BREVO_LIST_ID ?? "(using default 2)"
    );

    if (!apiKey) {
      console.error("Newsletter API: BREVO_API_KEY is not set.");
      return NextResponse.json(
        { error: "Server config error — contact site owner." },
        { status: 500 }
      );
    }

    if (!listId || Number.isNaN(listId)) {
      console.error("Newsletter API: BREVO_LIST_ID missing or invalid.");
      return NextResponse.json(
        { error: "Server config error — contact site owner." },
        { status: 500 }
      );
    }

    const contactsApi = new Brevo.ContactsApi();
    contactsApi.setApiKey(Brevo.ContactsApiApiKeys.apiKey, apiKey);

    const createContact = new Brevo.CreateContact();
    createContact.email = email;
    createContact.listIds = [listId];
    createContact.updateEnabled = true;

    await contactsApi.createContact(createContact);

    const transactionalApi = new Brevo.TransactionalEmailsApi();
    transactionalApi.setApiKey(
      Brevo.TransactionalEmailsApiApiKeys.apiKey,
      apiKey
    );

    const senderEmail =
      process.env.BREVO_SENDER_EMAIL || "GoldenOfTheMonth@jjallanllc.com";
    const senderName =
      process.env.BREVO_SENDER_NAME || "GoldenRetriever.hair";

    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    sendSmtpEmail.subject = WELCOME_EMAIL_SUBJECT;
    sendSmtpEmail.htmlContent = getWelcomeEmailHtml();
    sendSmtpEmail.sender = { name: senderName, email: senderEmail };
    sendSmtpEmail.to = [{ email }];

    await transactionalApi.sendTransacEmail(sendSmtpEmail);

    return NextResponse.json({
      success: true,
      message:
        "Subscribed! Check inbox for welcome + giveaway entry.",
    });
  } catch (err: unknown) {
    const brevoError = err as {
      response?: { body?: { code?: string; message?: string }; status?: number };
    };
    const code = brevoError?.response?.body?.code;
    const message = brevoError?.response?.body?.message ?? "";
    const status = brevoError?.response?.status;

    console.error("Newsletter API error (full):", err);

    if (
      code === "duplicate_parameter" ||
      message?.toLowerCase().includes("already exist") ||
      status === 400
    ) {
      return NextResponse.json(
        {
          error:
            "Already subscribed — thanks for being a Golden fan!",
        },
        { status: 409 }
      );
    }

    if (status === 401 || message?.toLowerCase().includes("unauthorized")) {
      return NextResponse.json(
        { error: "Brevo error: invalid key." },
        { status: 500 }
      );
    }

    const safeDetail =
      typeof message === "string" && message.length < 200
        ? message
        : "Check server logs.";
    return NextResponse.json(
      { error: `Brevo error: ${safeDetail}` },
      { status: 500 }
    );
  }
}

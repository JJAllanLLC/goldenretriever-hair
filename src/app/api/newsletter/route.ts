import { NextRequest, NextResponse } from "next/server";
import * as Brevo from "@getbrevo/brevo";
import { getWelcomeEmailHtml, WELCOME_EMAIL_SUBJECT } from "@/lib/welcome-email";

const BREVO_LIST_ID = 2; // "GoldenRetriever.hair" list – create in Brevo if needed and set ID here

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
    if (!apiKey) {
      console.error("BREVO_API_KEY is not set.");
      return NextResponse.json(
        { error: "Newsletter signup is temporarily unavailable." },
        { status: 500 }
      );
    }

    const contactsApi = new Brevo.ContactsApi();
    contactsApi.setApiKey(Brevo.ContactsApiApiKeys.apiKey, apiKey);

    const createContact = new Brevo.CreateContact();
    createContact.email = email;
    createContact.listIds = [BREVO_LIST_ID];
    createContact.updateEnabled = true;

    await contactsApi.createContact(createContact);

    // Send welcome transactional email
    const transactionalApi = new Brevo.TransactionalEmailsApi();
    transactionalApi.setApiKey(
      Brevo.TransactionalEmailsApiApiKeys.apiKey,
      apiKey
    );

    const senderEmail =
      process.env.BREVO_SENDER_EMAIL || "hello@goldenretriever.hair";
    const senderName =
      process.env.BREVO_SENDER_NAME || "GoldenRetriever.hair";

    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    sendSmtpEmail.subject = WELCOME_EMAIL_SUBJECT;
    sendSmtpEmail.htmlContent = getWelcomeEmailHtml();
    sendSmtpEmail.sender = { name: senderName, email: senderEmail };
    sendSmtpEmail.to = [{ email }];

    await transactionalApi.sendTransacEmail(sendSmtpEmail);
  } catch (err: unknown) {
    const brevoError = err as { response?: { body?: { code?: string; message?: string } } };
    const code = brevoError?.response?.body?.code;
    const message = brevoError?.response?.body?.message ?? "";

    if (code === "duplicate_parameter" || message?.toLowerCase().includes("already exist")) {
      return NextResponse.json(
        { error: "This email is already on our list. Check your inbox for our welcome message." },
        { status: 409 }
      );
    }

    console.error("Newsletter API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

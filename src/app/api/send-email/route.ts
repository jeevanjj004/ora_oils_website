import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Reads EMAIL_USER and EMAIL_PASS from .env.local
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 1. Notify ORA team
    await transporter.sendMail({
      from: `"ORA Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `ORA Inquiry: ${subject || "New Message"} — from ${name}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 32px;background:#FAF8F5;border:1px solid #C5A880;">
          <h2 style="font-weight:300;letter-spacing:0.3em;color:#0D2214;font-size:24px;margin-bottom:8px;">O R A</h2>
          <p style="font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#C5A880;margin-bottom:32px;">New Inquiry Received</p>
          <hr style="border:none;border-top:1px solid #C5A88033;margin-bottom:32px;" />
          <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.15em;color:#8C6D54;margin-bottom:4px;">From</p>
          <p style="font-size:16px;color:#0D2214;font-weight:300;margin-bottom:20px;">${name} &lt;${email}&gt;</p>
          <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.15em;color:#8C6D54;margin-bottom:4px;">Subject</p>
          <p style="font-size:16px;color:#0D2214;font-weight:300;margin-bottom:20px;">${subject || "—"}</p>
          <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.15em;color:#8C6D54;margin-bottom:8px;">Message</p>
          <p style="font-size:15px;color:#0D2214;font-weight:300;line-height:1.8;white-space:pre-wrap;">${message}</p>
          <hr style="border:none;border-top:1px solid #C5A88033;margin-top:32px;margin-bottom:16px;" />
          <p style="font-size:10px;color:#8C6D54;letter-spacing:0.15em;text-transform:uppercase;">ORA — Pure Coconut. Pure Care.</p>
        </div>
      `,
    });

    // 2. Confirmation to user
    await transporter.sendMail({
      from: `"ORA Concierge" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you, ${name} — ORA has received your message`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 32px;background:#0D2214;color:#FAF8F5;">
          <h2 style="font-weight:300;letter-spacing:0.3em;color:#FAF8F5;font-size:24px;margin-bottom:8px;">O R A</h2>
          <p style="font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#C5A880;margin-bottom:32px;">Pure Coconut. Pure Care.</p>
          <hr style="border:none;border-top:1px solid rgba(197,168,128,0.2);margin-bottom:32px;" />
          <p style="font-size:18px;font-weight:300;color:#FAF8F5;margin-bottom:16px;line-height:1.7;">Dear ${name},</p>
          <p style="font-size:15px;font-weight:300;color:rgba(250,248,245,0.75);line-height:1.9;margin-bottom:24px;">
            Your message has been elegantly received by the ORA Concierge. Our team will review your inquiry and respond within 24 hours.
          </p>
          <p style="font-size:15px;font-weight:300;color:rgba(250,248,245,0.75);line-height:1.9;margin-bottom:32px;">
            In the meantime, feel free to reach us on WhatsApp at <span style="color:#C5A880;">+91 79942 93712</span>.
          </p>
          <hr style="border:none;border-top:1px solid rgba(197,168,128,0.2);margin-bottom:20px;" />
          <p style="font-size:10px;color:rgba(197,168,128,0.6);letter-spacing:0.15em;text-transform:uppercase;">© 2026 ORA · Operating Hours: 09:00 AM — 06:00 PM IST</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
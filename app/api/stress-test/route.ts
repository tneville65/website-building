import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "chaz@keyarx.com",
        pass: "H/457482431610ak",
      },
    });

    const bookUrl = "https://leaguemed-v1.vercel.app/stress-test-ltd.pdf";

    // Email to requester with PDF link
    await transporter.sendMail({
      from: '"Paul Cella | The KeyArx Group" <chaz@keyarx.com>',
      to: email,
      subject: "Your Copy: How to Stress Test Group LTD Plans",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
          <p style="font-size: 16px;">Hi ${name},</p>
          <p style="font-size: 15px; line-height: 1.7;">Thank you for your interest in <strong><em>How to Stress Test Group LTD Plans for Healthcare Professionals</em></strong>.</p>
          <p style="font-size: 15px; line-height: 1.7;">Click the button below to download your copy:</p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${bookUrl}" 
               style="background: #C9A84C; color: #0A1628; font-family: sans-serif; font-weight: bold; font-size: 14px; text-decoration: none; padding: 14px 36px; letter-spacing: 0.1em; text-transform: uppercase; display: inline-block;">
              Download the Guide →
            </a>
          </div>
          <p style="font-size: 14px; color: #555; line-height: 1.7;">If you have questions about your group LTD plan or would like a complimentary review, reply to this email or reach us at:</p>
          <p style="font-size: 14px; color: #555;">
            <strong>Paul Cella, CLU, ChFC</strong><br>
            Managing Principal, The KeyArx Group<br>
            paul@keyarx.com | (732) 983-9830
          </p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 32px 0;">
          <p style="font-size: 11px; color: #999;">101 Crawford's Corner Road, Suite #3128 | Holmdel, NJ 07733<br>
          Securities offered through League Capital Markets, LLC, Member FINRA/SIPC.</p>
        </div>
      `,
    });

    // Notify KeyArx
    await transporter.sendMail({
      from: '"Chaz | KeyArx" <chaz@keyarx.com>',
      to: "paul@keyarx.com",
      cc: "todd@keyarx.com",
      subject: `New Lead — Stress Test Guide Download: ${name}`,
      html: `
        <p><strong>New lead downloaded the Stress Test LTD Guide:</strong></p>
        <p>Name: <strong>${name}</strong><br>Email: <strong>${email}</strong></p>
        <p>Source: leaguemed-v1.vercel.app/stress-test</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

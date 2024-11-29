import { NextRequest, NextResponse } from 'next/server';
import nodemailer from "nodemailer";


export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const USERNAME = process.env.USERNAME;
    const PASSWORD = process.env.PASSWORD;
    const TOEMAIL = process.env.TOEMAIL;

    const transporter = nodemailer.createTransport({
      port: 465,
      host: 'smtp.gmail.com',
      auth: {
        user: USERNAME,
        pass: PASSWORD,
      },
      secure: true,
    });

    const mailData = {
      from: USERNAME,
      to: TOEMAIL,
      subject: `Message From ${email}`,
      text: `Hi Kim! ${email} would like to subscribe to your newsletter.`,
      html: `<div><p>Hi Kim!</p><p>${email} would like to subscribe to your newsletter.</p></div>`,
    };

    const info = await transporter.sendMail(mailData);

    console.log(info);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
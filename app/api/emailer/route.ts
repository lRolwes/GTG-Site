import { NextRequest, NextResponse } from 'next/server';
import nodemailer from "nodemailer";


export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }


    const transporter = nodemailer.createTransport({
      port: 465,
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD,
      },
      secure: true,
    });

    const mailData = {
      from: process.env.USERNAME,
      to: process.env.TOEMAIL,
      subject: `Message From ${name}`,
      text: `${subject} \n${message} \nSent from: ${email}`,
      html: `<div>${subject}</div><div>${message}</div><p>Sent from: ${email}</p>`,
    };

    const info = await transporter.sendMail(mailData);

    console.log(info);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
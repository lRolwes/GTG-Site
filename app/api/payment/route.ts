import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Format email content
    const emailContent = `
      New Payment Authorization Received

      Primary Traveler Information:
      Name: ${data.firstName} ${data.middleInitial || ''} ${data.lastName}
      Confirmation Number: ${data.confirmationNumber}
      Travel Advisor: ${data.advisor}

      Payment Information:
      Amount: $${data.amount.dollars}.${data.amount.cents}
      Payment Type: ${data.paymentOption}

      Cardholder Information:
      Name: ${data.cardholderName}
      Phone: ${data.phone}
      Email: ${data.email}
      
      Billing Address:
      ${data.address.street}
      ${data.address.street2 ? data.address.street2 + '\n' : ''}
      ${data.address.city}, ${data.address.state} ${data.address.zip}
      ${data.address.country}

      Card Information:
      Type: ${data.cardType}
      Number: **** **** **** ${data.cardNumber.slice(-4)}
      Expiration: ${data.expirationMonth}/${data.expirationYear}
    `

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.PAYMENT_NOTIFICATION_EMAIL,
      subject: 'New Payment Authorization - GTG Vacations',
      text: emailContent,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Payment processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    )
  }
} 
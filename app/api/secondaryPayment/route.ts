import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
function encrypt(text: string): string {
  const algorithm = 'aes-256-cbc'
  const key = Buffer.from(process.env.ENCRYPTION_KEY || '', 'hex')
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return iv.toString('hex') + ':' + encrypted
}

interface BillingAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}



interface PaymentData {
  advisor: string;
  submitterFirstName: string;
  submitterLastName: string;
  paymentOption: string;
  cardholderName: string;
  cardholderPhone: string;
  billingAddress: BillingAddress;
  cardType: string;
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
  termsAccepted: boolean;
  hazmatAgreed: boolean;
  documents?: any[];
}

export async function POST(request: Request) {
  try {
    const data: PaymentData = await request.json()
    console.log('Received payment data:', data)

    // Remove the documents array from the email content if it exists
    const { documents, ...emailData } = data

    // Validate required fields
    if (!emailData.cardholderName || !emailData.cardNumber) {
      return NextResponse.json(
        { error: 'Missing required payment information' },
        { status: 400 }
      )
    }

    // Encrypt sensitive data
    const encryptedCard = encrypt(`${data.cardType}:${data.cardNumber}`)
    const encryptedExp = encrypt(`${data.expirationMonth}/${data.expirationYear}`)
    const encryptedCVV = encrypt(data.cvv)

    const emailContent = `
      New Booking and Payment Authorization

      Person Completing Form:
      Name: ${emailData.submitterFirstName} ${emailData.submitterLastName}

      Primary Traveler Information:
      Name: ${emailData.submitterFirstName} ${emailData.submitterLastName}

      Cardholder Information:
      Name: ${emailData.cardholderName}
      Phone: ${emailData.cardholderPhone}
      
      Billing Address:
      ${emailData.billingAddress.street}
      ${emailData.billingAddress.city}, ${emailData.billingAddress.state} ${emailData.billingAddress.zip}

      Card Information (Encrypted):
      Card Type: ${data.cardType}
      Card Data: ${encryptedCard}
      Expiration: ${encryptedExp}
      CVV: ${encryptedCVV}

    `
    console.log('emailContent', emailContent)
    console.log('Attempting to send email...')
    const transporter = nodemailer.createTransport({
      port: 465,
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD,
      },
      secure: true,
    })

    try {
      await transporter.sendMail({
        from: process.env.USERNAME,
        to: process.env.TOEMAIL,
        subject: 'New Booking and Payment Authorization - GTG Vacations',
        text: emailContent,
      })
      console.log('Email sent successfully')
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      return NextResponse.json(
        { error: 'Failed to send confirmation email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Payment processing error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process payment' },
      { status: 500 }
    )
  }
} 
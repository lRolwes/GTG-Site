import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import crypto from 'crypto'

function encrypt(text: string): string {
  const algorithm = 'aes-256-cbc'
  
  if (!process.env.ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY is not defined in environment variables');
  }
  
  // Log key details for debugging
  console.log('Key length (hex):', process.env.ENCRYPTION_KEY.length);
  
  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  
  // Log buffer length
  console.log('Key buffer length (bytes):', key.length);
  
  if (key.length !== 32) {
    throw new Error(`Invalid key length. Expected 32 bytes, got ${key.length} bytes`);
  }
  
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return iv.toString('hex') + ':' + encrypted
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Encrypt sensitive data
    const encryptedCard = encrypt(`${data.cardType}:${data.cardNumber}`)
    const encryptedExp = encrypt(`${data.expirationMonth}/${data.expirationYear}`)
    const encryptedCVV = encrypt(data.cvv)

    const MAILGUNPASSWORD = process.env.MAILGUNPASSWORD;
    const MAILGUNUSERNAME = process.env.MAILGUNUSERNAME;
    const TOEMAIL = process.env.TOEMAIL;

    const transporter = nodemailer.createTransport({
      port: 465,
      host: 'smtp.mailgun.org',
      auth: {
        user: MAILGUNUSERNAME,
        pass: MAILGUNPASSWORD,
      },
      secure: true,
    });
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
      Encrypted Data: ${encryptedCard}
      Expiration (encrypted): ${encryptedExp}
      CVV (encrypted): ${encryptedCVV}
    `

    // Send email
    await transporter.sendMail({
      from: MAILGUNUSERNAME,
      to: TOEMAIL,
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
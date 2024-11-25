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

interface TravelSelections {
  [key: string]: {
    [key: string]: boolean;
  };
}

interface BillingAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface PrimaryTraveler {
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: string;
  email: string;
  phone: string;
  phoneType: string;
}

interface AdditionalTraveler {
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: string;
  email: string;
}

interface PaymentData {
  submitterFirstName: string;
  submitterLastName: string;
  advisor: string;
  primaryTraveler: PrimaryTraveler;
  additionalTravelers: AdditionalTraveler[];
  travelSelections: TravelSelections;
  excursions?: string;
  specialAccommodations?: string;
  travelProtection: string;
  amount: {
    dollars: string;
    cents: string;
  };
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
  scheduleChangesAgreed: boolean;
  baggageFeesAgreed: boolean;
  covidResponsibilityAgreed: boolean;
  electronicSignature: string;
  dateSigned: string;
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
      Travel Advisor: ${emailData.advisor}

      Primary Traveler Information:
      Name: ${emailData.primaryTraveler.firstName} ${emailData.primaryTraveler.middleName} ${emailData.primaryTraveler.lastName}
      DOB: ${emailData.primaryTraveler.dob}
      Email: ${emailData.primaryTraveler.email}
      Phone: ${emailData.primaryTraveler.phone}
      Phone Type: ${emailData.primaryTraveler.phoneType}

      Additional Travelers:
      ${emailData.additionalTravelers.map((t: AdditionalTraveler) => 
        `${t.firstName} ${t.middleName} ${t.lastName} - DOB: ${t.dob} - Email: ${t.email}`
      ).join('\n')}

      Travel Selections:
      ${Object.entries(emailData.travelSelections).map(([traveler, selections]: [string, any]) => 
        `${traveler}: ${Object.entries(selections)
          .filter(([_, value]) => value)
          .map(([key, _]) => key)
          .join(', ')}`
      ).join('\n')}

      Special Requests:
      Excursions: ${emailData.excursions || 'None'}
      Special Accommodations: ${emailData.specialAccommodations || 'None'}

      Travel Protection: ${emailData.travelProtection}

      Payment Information:
      Amount: $${emailData.amount.dollars}.${emailData.amount.cents}
      Payment Type: ${emailData.paymentOption}

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

      Agreements:
      Terms and Conditions: ${emailData.termsAccepted ? 'Accepted' : 'Not Accepted'}
      Hazardous Materials: ${emailData.hazmatAgreed ? 'Acknowledged' : 'Not Acknowledged'}
      Airline Schedule Changes: ${emailData.scheduleChangesAgreed ? 'Acknowledged' : 'Not Acknowledged'}
      Baggage Fees: ${emailData.baggageFeesAgreed ? 'Acknowledged' : 'Not Acknowledged'}
      Covid-19 Responsibility: ${emailData.covidResponsibilityAgreed ? 'Acknowledged' : 'Not Acknowledged'}
      
      Electronic Signature: ${emailData.electronicSignature}
      Date Signed: ${emailData.dateSigned}

      Documents Uploaded: ${documents ? documents.length : 0} files
    `
    console.log('emailContent', emailContent)
    console.log('Attempting to send email...')
    const transporter = nodemailer.createTransport({
      port: 465,
      host: 'smtp.mailgun.org',
      auth: {
        user: process.env.MAILGUNUSERNAME,
        pass: process.env.MAILGUNPASSWORD,
      },
      secure: true,
    })

    try {
      await transporter.sendMail({
        from: process.env.MAILGUNUSERNAME,
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
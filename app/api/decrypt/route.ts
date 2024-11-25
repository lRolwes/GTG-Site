import { NextResponse } from 'next/server'
import crypto from 'crypto'

const REQUIRED_PASSWORD = 'kimsTravelPass!!'

function decrypt(encryptedData: string): string {
  const algorithm = 'aes-256-cbc'
  
  if (!process.env.ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY is not defined in environment variables')
  }

  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex')
  
  // Split IV and encrypted text
  const [ivHex, encryptedText] = encryptedData.split(':')
  
  if (!ivHex || !encryptedText) {
    throw new Error('Invalid encrypted data format')
  }

  const iv = Buffer.from(ivHex, 'hex')
  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  
  return decrypted
}

export async function POST(request: Request) {
  try {
    const { encryptedText, password } = await request.json()
    
    if (!encryptedText) {
      return NextResponse.json(
        { success: false, error: 'No encrypted text provided' },
        { status: 400 }
      )
    }

    if (!password || password !== REQUIRED_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      )
    }

    const decryptedText = decrypt(encryptedText)
    
    return NextResponse.json({
      success: true,
      decryptedText
    })
  } catch (error) {
    console.error('Decryption error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to decrypt' 
      },
      { status: 500 }
    )
  }
} 
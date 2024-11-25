'use client'
import { useState } from 'react'

export default function DecryptPage() {
  const [encryptedText, setEncryptedText] = useState('')
  const [password, setPassword] = useState('')
  const [decryptedText, setDecryptedText] = useState('')
  const [error, setError] = useState('')

  const handleDecrypt = async () => {
    console.log('encryptedText', encryptedText)
    console.log('password', password)
    try {
      const response = await fetch('/api/decrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ encryptedText, password }),
      })

      const data = await response.json()
      if (data.success) {
        setDecryptedText(data.decryptedText)
        setError('')
      } else {
        setDecryptedText('')
        setError(data.error)
      }
    } catch (error) {
      setError('Error: Failed to decrypt')
      setDecryptedText('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white text-[#23395D]">
      <h1 className="text-2xl text-[#23395D] font-bold mb-4">Decrypt Payment Data</h1>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Password:</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter decryption password"
          />
        </div>
        <div>
          <label className="block mb-2">Encrypted Text:</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={4}
            value={encryptedText}
            onChange={(e) => setEncryptedText(e.target.value)}
            placeholder="Paste encrypted text here (including IV)"
          />
        </div>
        <button
          onClick={handleDecrypt}
          className="bg-[#23395D] text-white px-4 py-2 rounded hover:bg-[#23395D]/80"
        >
          Decrypt
        </button>
        {error && (
          <div className="mt-4 text-red-500">
            {error}
          </div>
        )}
        {decryptedText && (
          <div className="mt-4">
            <label className="block mb-2">Decrypted Result:</label>
            <div className="p-4 bg-gray-100 rounded break-all">
              {decryptedText}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
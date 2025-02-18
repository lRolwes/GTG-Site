import { useFormContext } from 'react-hook-form'
import type { PaymentFormData, FileData } from '../../types/payment'
import { useState } from 'react'

export default function DocumentUpload() {
  const { setValue } = useFormContext<PaymentFormData>()
  const [fileNames, setFileNames] = useState<string[]>([])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    const fileList = Array.from(files)
    setFileNames(fileList.map(f => f.name))

    // Convert files to base64
    const base64Files = await Promise.all(
      fileList.map(async (file) => {
        return new Promise<FileData>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve({
              name: file.name,
              type: file.type,
              data: reader.result as string
            })
          }
          reader.readAsDataURL(file)
        })
      })
    )

    // Set the value without type casting
    setValue('documents', base64Files)
    console.log('Files being set:', base64Files) // Debug log
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#23395D]">Document Upload</h2>
      
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Please Upload a Copy of your Passport or Passport Application (for international travel), 
          REAL ID, or Driver&apos;s License (for domestic travel).
        </p>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Documents</label>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-[#23395D] file:text-white
                     hover:file:bg-[#23395D]/80"
          />
          {fileNames.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Selected files:</p>
              <ul className="list-disc ml-5">
                {fileNames.map((name, i) => (
                  <li key={i} className="text-sm text-gray-600">{name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-500 italic">
          *Please note, if you do not upload your documents, Go Travel Getaways, LLC can not be held 
          liable for any typos or incorrect information given on this form. This may result in 
          penalties if changes are needed.
        </p>
      </div>
    </div>
  )
} 
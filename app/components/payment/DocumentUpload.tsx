import { useFormContext } from 'react-hook-form'
import type { PaymentFormData } from '../../types/payment'

export default function DocumentUpload() {
  const { register, formState: { errors } } = useFormContext<PaymentFormData>()

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
            {...register('documents', {
              onChange: (e) => {
                // Optional: Add any file validation here
                const files = e.target.files
                if (files && files.length > 0) {
                  console.log('Files selected:', files)
                }
              }
            })}
            className="mt-1 block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-[#23395D] file:text-white
                     hover:file:bg-[#23395D]/80"
          />
          {errors.documents && (
            <p className="mt-1 text-sm text-red-600">{errors.documents.message}</p>
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
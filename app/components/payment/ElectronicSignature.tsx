import { useFormContext } from 'react-hook-form'
import type { PaymentFormData } from '../../types/payment'

export default function ElectronicSignature() {
  const { register, formState: { errors } } = useFormContext<PaymentFormData>()

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#23395D]">Electronic Signature</h2>
      
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          I consent to provide an electronic signature rather than a handwritten signature in 
          connection with my Credit Card authorization. I submit my signature by typing my name 
          below and checking the &quot;I agree&quot; box. I understand that my electronic signatures 
          will be binding as though I had physically signed this document by hand. I agree that a 
          printout of this authorization may be accepted with the same authority as the original.
        </p>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('signatureAgreed')}
              className="h-4 w-4 text-[#23395D] focus:ring-[#75D8D1] border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">I agree</span>
          </label>
          {errors.signatureAgreed && (
            <p className="mt-1 text-sm text-red-600">{errors.signatureAgreed.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Electronic Signature *</label>
          <input
            {...register('electronicSignature')}
            placeholder="Type your full name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
          />
          {errors.electronicSignature && (
            <p className="mt-1 text-sm text-red-600">{errors.electronicSignature.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date Signed *</label>
          <input
            type="date"
            {...register('dateSigned')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
          />
          {errors.dateSigned && (
            <p className="mt-1 text-sm text-red-600">{errors.dateSigned.message}</p>
          )}
        </div>
      </div>
    </div>
  )
} 
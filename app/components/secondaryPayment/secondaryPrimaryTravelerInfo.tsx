import { useFormContext } from 'react-hook-form'
import type { SecondaryPaymentFormData } from '../../types/secondaryPayment'

export default function SecondaryPrimaryTravelerInfo() {
  const { register, formState: { errors } } = useFormContext<SecondaryPaymentFormData>()

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#23395D]">Name of person completing this form</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name *</label>
          <input
            {...register('submitterFirstName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
          />
          {errors.submitterFirstName && (
            <p className="mt-1 text-sm text-red-600">{errors.submitterFirstName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name *</label>
          <input
            {...register('submitterLastName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
          />
          {errors.submitterLastName && (
            <p className="mt-1 text-sm text-red-600">{errors.submitterLastName.message}</p>
          )}
        </div>
      </div>
    </div>
  )
} 
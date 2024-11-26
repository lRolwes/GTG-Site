import { useFormContext } from 'react-hook-form'
import type { PaymentFormData } from '../../types/payment'

export default function SpecialRequests() {
  const { register, formState: { errors } } = useFormContext<PaymentFormData>()

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#23395D]">Special Requests</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Please list name of excursion(s) you want to book:
          </label>
          <textarea
            {...register('excursions')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Would you like to request any special accommodations or dietary needs?
          </label>
          <textarea
            {...register('specialAccommodations')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            placeholder="If yes, please describe..."
          />
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('differentAddress')}
              className="h-4 w-4 text-[#23395D] focus:ring-[#75D8D1] border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              Does Anyone from the Above list have a different Address?
            </span>
          </label>
        </div>
      </div>
    </div>
  )
} 
import { useFormContext } from 'react-hook-form'
import type { PaymentFormData } from '../../types/payment'

export default function TravelProtection() {
  const { register, formState: { errors } } = useFormContext<PaymentFormData>()

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#23395D]">Travel Protection</h2>
      
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          GTG Vacations, LLC recommends travel vacation protection and offers optional coverage to all 
          traveling clients. Travel Insurance, if declined at time of vacation booking, may be added at 
          a later date through a third-party insurance company before travel takes place, but in that 
          event, the terms and conditions of coverage may be more restricted. (Cancel for ANY REASON 
          protection must be added with trip deposit.)
        </p>

        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="add"
              {...register('travelProtection')}
              className="h-4 w-4 text-[#23395D] focus:ring-[#75D8D1] border-gray-300"
            />
            <span className="text-sm text-gray-700">
              I would like to add Travel Insurance and protect my vacation.
            </span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="decline"
              {...register('travelProtection')}
              className="h-4 w-4 text-[#23395D] focus:ring-[#75D8D1] border-gray-300"
            />
            <span className="text-sm text-gray-700">
              I decline Travel Insurance and understand my vacation will not be protected.
            </span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="more_info"
              {...register('travelProtection')}
              className="h-4 w-4 text-[#23395D] focus:ring-[#75D8D1] border-gray-300"
            />
            <span className="text-sm text-gray-700">
              I would like more information on Travel Insurance
            </span>
          </label>
        </div>

        {errors.travelProtection && (
          <p className="text-sm text-red-600">{errors.travelProtection.message}</p>
        )}
      </div>
    </div>
  )
} 
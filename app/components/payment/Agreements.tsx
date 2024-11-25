import { useFormContext } from 'react-hook-form'
import type { PaymentFormData } from '../../types/payment'

export default function Agreements() {
  const { register, formState: { errors } } = useFormContext<PaymentFormData>()

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#23395D]">Terms and Agreements</h2>
      
      <div className="space-y-4">
        <div>
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              {...register('termsAccepted')}
              className="mt-1 h-4 w-4 text-[#23395D] focus:ring-[#75D8D1] border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              I have received, reviewed and agree to the Travel Vendor/Supplier/Operator &quot;Terms and Conditions&quot; 
              for the purchase of this travel service/vacation package.
            </span>
          </label>
          {errors.termsAccepted && (
            <p className="mt-1 text-sm text-red-600">{errors.termsAccepted.message}</p>
          )}
        </div>

        <div>
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              {...register('hazmatAgreed')}
              className="mt-1 h-4 w-4 text-[#23395D] focus:ring-[#75D8D1] border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              I understand that federal law forbids the carriage of certain hazardous materials aboard aircraft.
            </span>
          </label>
          {errors.hazmatAgreed && (
            <p className="mt-1 text-sm text-red-600">{errors.hazmatAgreed.message}</p>
          )}
        </div>

        <div>
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              {...register('scheduleChangesAgreed')}
              className="mt-1 h-4 w-4 text-[#23395D] focus:ring-[#75D8D1] border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              I understand that the booking airline can have schedule changes to the time, layover destination, 
              and number of stops before arriving at my destination.
            </span>
          </label>
          {errors.scheduleChangesAgreed && (
            <p className="mt-1 text-sm text-red-600">{errors.scheduleChangesAgreed.message}</p>
          )}
        </div>

        <div>
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              {...register('baggageFeesAgreed')}
              className="mt-1 h-4 w-4 text-[#23395D] focus:ring-[#75D8D1] border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              I understand that baggage fees may NOT be included in my travel package.
            </span>
          </label>
          {errors.baggageFeesAgreed && (
            <p className="mt-1 text-sm text-red-600">{errors.baggageFeesAgreed.message}</p>
          )}
        </div>

        <div>
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              {...register('covidResponsibilityAgreed')}
              className="mt-1 h-4 w-4 text-[#23395D] focus:ring-[#75D8D1] border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              I understand that Go Travel Getaways, LLC has no responsibility for Covid-19-related 
              requirements that travel suppliers and governments may impose.
            </span>
          </label>
          {errors.covidResponsibilityAgreed && (
            <p className="mt-1 text-sm text-red-600">{errors.covidResponsibilityAgreed.message}</p>
          )}
        </div>
      </div>
    </div>
  )
} 
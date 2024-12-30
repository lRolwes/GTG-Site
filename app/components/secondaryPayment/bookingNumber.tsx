import { useFormContext } from 'react-hook-form'
import type { SecondaryPaymentFormData } from '../../types/secondaryPayment'

export default function BookingNumber() {
    const { register, formState: { errors } } = useFormContext<SecondaryPaymentFormData>()

    return (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-[#23395D]">Booking Number</h2>
          <label className="block text-sm font-medium text-gray-700">Booking ID *</label>
          <input
                {...register('BookingNumber')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              />
              {errors.BookingNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.BookingNumber.message}</p>
              )}
        </div>
      )
    } 
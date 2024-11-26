import { useFormContext } from 'react-hook-form'
import type { PaymentFormData } from '../../types/payment'

export default function AdditionalTravelers() {
  const { register, watch, setValue, formState: { errors } } = useFormContext<PaymentFormData>()
  const additionalTravelers = watch('additionalTravelers')

  const addTraveler = () => {
    if (additionalTravelers.length < 7) {
      setValue('additionalTravelers', [
        ...additionalTravelers,
        {
          firstName: '',
          middleName: '',
          lastName: '',
          dob: '',
          email: ''
        }
      ])
    }
  }

  const removeTraveler = (index: number) => {
    setValue(
      'additionalTravelers',
      additionalTravelers.filter((_, i) => i !== index)
    )
  }

  return (
    <div className="space-y-6 text-[#23395D]">
      <h2 className="text-xl font-semibold">Additional Travelers</h2>
      
      {additionalTravelers.map((traveler, index) => (
        <div key={index} className="p-4 border rounded-md space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Traveler #{index + 2}</h3>
            <button
              type="button"
              onClick={() => removeTraveler(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name *</label>
              <input
                {...register(`additionalTravelers.${index}.firstName`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              />
              {errors.additionalTravelers?.[index]?.firstName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.additionalTravelers[index]?.firstName?.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Middle Name</label>
              <input
                {...register(`additionalTravelers.${index}.middleName`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name *</label>
              <input
                {...register(`additionalTravelers.${index}.lastName`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              />
              {errors.additionalTravelers?.[index]?.lastName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.additionalTravelers[index]?.lastName?.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
              <input
                type="date"
                {...register(`additionalTravelers.${index}.dob`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              />
              {errors.additionalTravelers?.[index]?.dob && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.additionalTravelers[index]?.dob?.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register(`additionalTravelers.${index}.email`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              />
              {errors.additionalTravelers?.[index]?.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.additionalTravelers[index]?.email?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      {additionalTravelers.length < 7 && (
        <button
          type="button"
          onClick={addTraveler}
          className="mt-4 px-4 py-2 border border-[#23395D] text-[#23395D] rounded-md hover:bg-[#23395D] hover:text-white transition-colors"
        >
          Add Traveler
        </button>
      )}
    </div>
  )
} 
import { useFormContext } from 'react-hook-form'
import type { PaymentFormData } from '../../types/payment'

export default function PrimaryTravelerInfo() {
  const { register, formState: { errors } } = useFormContext<PaymentFormData>()

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#23395D]">Primary Traveler Information</h2>
      <p className="text-sm text-gray-600">
        Please Complete The Following Information as it appears on Governmental ID (Passport).
        Passport Books ARE Required for this trip and must be valid for AT LEAST 6 months after your return date.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name *</label>
          <input
            {...register('primaryTraveler.firstName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
          />
          {errors.primaryTraveler?.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.primaryTraveler.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Middle Name</label>
          <input
            {...register('primaryTraveler.middleName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name *</label>
          <input
            {...register('primaryTraveler.lastName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
          />
          {errors.primaryTraveler?.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.primaryTraveler.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
          <input
            type="date"
            {...register('primaryTraveler.dob')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
          />
          {errors.primaryTraveler?.dob && (
            <p className="mt-1 text-sm text-red-600">{errors.primaryTraveler.dob.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email *</label>
          <input
            type="email"
            {...register('primaryTraveler.email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
          />
          {errors.primaryTraveler?.email && (
            <p className="mt-1 text-sm text-red-600">{errors.primaryTraveler.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone *</label>
          <input
            {...register('primaryTraveler.phone')}
            placeholder="###-###-####"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
          />
          {errors.primaryTraveler?.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.primaryTraveler.phone.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Type *</label>
          <select
            {...register('primaryTraveler.phoneType')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
          >
            <option value="">Select type</option>
            <option value="Cell">Cell</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
          </select>
          {errors.primaryTraveler?.phoneType && (
            <p className="mt-1 text-sm text-red-600">{errors.primaryTraveler.phoneType.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[#23395D]">Primary Traveler Address</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Street Address *</label>
          <input
            {...register('primaryTraveler.address.street')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
          />
          {errors.primaryTraveler?.address?.street && (
            <p className="mt-1 text-sm text-red-600">{errors.primaryTraveler.address.street.message}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">City *</label>
            <input
              {...register('primaryTraveler.address.city')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            />
            {errors.primaryTraveler?.address?.city && (
              <p className="mt-1 text-sm text-red-600">{errors.primaryTraveler.address.city.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State *</label>
            <input
              {...register('primaryTraveler.address.state')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            />
            {errors.primaryTraveler?.address?.state && (
              <p className="mt-1 text-sm text-red-600">{errors.primaryTraveler.address.state.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ZIP Code *</label>
            <input
              {...register('primaryTraveler.address.zip')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            />
            {errors.primaryTraveler?.address?.zip && (
              <p className="mt-1 text-sm text-red-600">{errors.primaryTraveler.address.zip.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
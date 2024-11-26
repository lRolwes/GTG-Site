import { useFormContext } from 'react-hook-form'
import type { PaymentFormData } from '../../types/payment'

export default function TravelSelections() {
  const { register, watch } = useFormContext<PaymentFormData>()
  const additionalTravelers = watch('additionalTravelers')

  const travelers = [
    { id: 'primary', name: 'Primary Traveler' },
    ...additionalTravelers.map((t, i) => ({
      id: `traveler${i + 2}`,
      name: `Traveler #${i + 2}`
    }))
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#23395D]">Travel Selections</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Traveler
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Include Travel Protection
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Include 1 Checked Bag
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Include Excursions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Other
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {travelers.map((traveler) => (
              <tr key={traveler.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {traveler.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    {...register(`travelSelections.${traveler.id}.includeProtection`)}
                    className="h-4 w-4 text-[#23395D] focus:ring-[#75D8D1] border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    {...register(`travelSelections.${traveler.id}.includeCheckedBag`)}
                    className="h-4 w-4 text-[#23395D] focus:ring-[#75D8D1] border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    {...register(`travelSelections.${traveler.id}.includeExcursions`)}
                    className="h-4 w-4 text-[#23395D] focus:ring-[#75D8D1] border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    {...register(`travelSelections.${traveler.id}.other`)}
                    className="h-4 w-4 text-[#23395D] focus:ring-[#75D8D1] border-gray-300 rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 
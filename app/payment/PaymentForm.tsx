'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const paymentSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleInitial: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  confirmationNumber: z.string().min(1, 'Confirmation number is required'),
  advisor: z.enum(['Megan', 'Misty', 'Nichole', 'Julie P', 'Kim', 'Other']),
  cardholderName: z.string().min(1, 'Cardholder name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    street2: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zip: z.string().min(5, 'Valid ZIP code is required'),
    country: z.string().min(1, 'Country is required'),
  }),
  cardType: z.enum(['Visa', 'MasterCard', 'Discover', 'AmericanExpress', 'Other']),
  cardNumber: z.string().min(1, 'Card number is required'),
  expirationMonth: z.string().min(1, 'Month is required'),
  expirationYear: z.string().min(1, 'Year is required'),
  cvv: z.string().min(3, 'CVV is required'),
  amount: z.object({
    dollars: z.string().min(1, 'Amount is required'),
    cents: z.string().min(2, 'Cents are required'),
  }),
  paymentOption: z.enum([
    'Partial Payment',
    'Final Payment',
    'Pay in Full',
    'Planning Fee',
    'Domestic Travel Fee',
    'Group Travel Fee',
    'Air Ticket Fee',
    'Other'
  ]),
})

type PaymentFormData = z.infer<typeof paymentSchema>

export default function PaymentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema)
  })

  const onSubmit = async (data: PaymentFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Payment submission failed')

      alert('Payment information submitted successfully!')
    } catch  {
      alert('Failed to submit payment information. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Primary Traveler Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-[#23395D] mb-4">Primary Traveler Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name *</label>
            <input
              {...register('firstName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            />
            {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">MI</label>
            <input
              {...register('middleInitial')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name *</label>
            <input
              {...register('lastName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            />
            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
          </div>
        </div>
      </div>

      {/* Additional form sections... */}
      {/* Add similar sections for booking confirmation, advisor selection, credit card info, etc. */}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#23395D] text-white px-6 py-2 rounded-md hover:bg-[#E8791D] transition duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Payment'}
        </button>
      </div>
    </form>
  )
} 
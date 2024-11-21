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

      {/* Booking Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-[#23395D] mb-4">Booking Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Booking Confirmation Number *</label>
            <input
              {...register('confirmationNumber')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            />
            {errors.confirmationNumber && <p className="mt-1 text-sm text-red-600">{errors.confirmationNumber.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">My Travel Advisor is: *</label>
            <select
              {...register('advisor')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            >
              <option value="">Select an advisor</option>
              <option value="Megan">Megan</option>
              <option value="Misty">Misty</option>
              <option value="Nichole">Nichole</option>
              <option value="Julie P">Julie P</option>
              <option value="Kim">Kim</option>
              <option value="Other">Other</option>
            </select>
            {errors.advisor && <p className="mt-1 text-sm text-red-600">{errors.advisor.message}</p>}
          </div>
        </div>
      </div>

      {/* Credit Card Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-[#23395D] mb-4">Credit Card Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name (as it appears on card) *</label>
            <input
              {...register('cardholderName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            />
            {errors.cardholderName && <p className="mt-1 text-sm text-red-600">{errors.cardholderName.message}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
              <input
                {...register('phone')}
                placeholder="###-###-####"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                {...register('email')}
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-[#23395D] mb-4">Billing Address</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Street Address *</label>
            <input
              {...register('address.street')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            />
            {errors.address?.street && <p className="mt-1 text-sm text-red-600">{errors.address.street.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
            <input
              {...register('address.street2')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City *</label>
              <input
                {...register('address.city')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              />
              {errors.address?.city && <p className="mt-1 text-sm text-red-600">{errors.address.city.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State *</label>
              <input
                {...register('address.state')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              />
              {errors.address?.state && <p className="mt-1 text-sm text-red-600">{errors.address.state.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">ZIP Code *</label>
              <input
                {...register('address.zip')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              />
              {errors.address?.zip && <p className="mt-1 text-sm text-red-600">{errors.address.zip.message}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country *</label>
            <input
              {...register('address.country')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            />
            {errors.address?.country && <p className="mt-1 text-sm text-red-600">{errors.address.country.message}</p>}
          </div>
        </div>
      </div>

      {/* Card Details */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-[#23395D] mb-4">Card Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Card Type *</label>
            <select
              {...register('cardType')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            >
              <option value="">Select card type</option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">Master Card</option>
              <option value="Discover">Discover</option>
              <option value="AmericanExpress">American Express</option>
              <option value="Other">Other</option>
            </select>
            {errors.cardType && <p className="mt-1 text-sm text-red-600">{errors.cardType.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Card Number *</label>
            <input
              {...register('cardNumber')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            />
            {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Exp. Month *</label>
              <input
                {...register('expirationMonth')}
                placeholder="MM"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              />
              {errors.expirationMonth && <p className="mt-1 text-sm text-red-600">{errors.expirationMonth.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Exp. Year *</label>
              <input
                {...register('expirationYear')}
                placeholder="YY"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              />
              {errors.expirationYear && <p className="mt-1 text-sm text-red-600">{errors.expirationYear.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CVV *</label>
              <input
                {...register('cvv')}
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              />
              {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Amount */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-[#23395D] mb-4">Payment Amount</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Dollars *</label>
              <input
                {...register('amount.dollars')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              />
              {errors.amount?.dollars && <p className="mt-1 text-sm text-red-600">{errors.amount.dollars.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cents *</label>
              <input
                {...register('amount.cents')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              />
              {errors.amount?.cents && <p className="mt-1 text-sm text-red-600">{errors.amount.cents.message}</p>}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Option *</label>
            <select
              {...register('paymentOption')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            >
              <option value="">Select payment option</option>
              <option value="Partial Payment">Partial Payment (after initial deposit)</option>
              <option value="Final Payment">Final Payment</option>
              <option value="Pay in Full">Pay in Full at Booking</option>
              <option value="Planning Fee">Planning Fee ($50/non-refundable)</option>
              <option value="Domestic Travel Fee">Domestic Travel Fee ($125/non-refundable)</option>
              <option value="Group Travel Fee">Group Travel Planning Fee ($500/non-refundable)</option>
              <option value="Air Ticket Fee">Air Ticket Only Fee ($25 per person/non-refundable)</option>
              <option value="Other">Other</option>
            </select>
            {errors.paymentOption && <p className="mt-1 text-sm text-red-600">{errors.paymentOption.message}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#23395D] text-white px-6 py-2 rounded-md hover:bg-[#E8791D] transition duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'Processing...' : 'Submit Payment'}
        </button>
      </div>
    </form>
  )
} 
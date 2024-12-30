import { useFormContext } from 'react-hook-form'
import type { SecondaryPaymentFormData } from '../../types/secondaryPayment'

export default function SecondaryPaymentDetails() {
  const { register, watch, formState: { errors } } = useFormContext<SecondaryPaymentFormData>()
  const paymentMethod = watch('paymentMethod')

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#23395D]">Credit Card Information</h2>
      
      <div className="space-y-6">
        {/* Cardholder Name */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name *</label>
            <input
              {...register('cardholderName.first')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            />
            {errors.cardholderName?.first && (
              <p className="mt-1 text-sm text-red-600">{errors.cardholderName.first.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Middle Name</label>
            <input
              {...register('cardholderName.middle')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name *</label>
            <input
              {...register('cardholderName.last')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            />
            {errors.cardholderName?.last && (
              <p className="mt-1 text-sm text-red-600">{errors.cardholderName.last.message}</p>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
          <input
            {...register('cardholderPhone')}
            placeholder="###-###-####"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
          />
          {errors.cardholderPhone && (
            <p className="mt-1 text-sm text-red-600">{errors.cardholderPhone.message}</p>
          )}
        </div>

        {/* Billing Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[#23395D]">Billing Address</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Street Address *</label>
            <input
              {...register('billingAddress.street')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            />
            {errors.billingAddress?.street && (
              <p className="mt-1 text-sm text-red-600">{errors.billingAddress.street.message}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City *</label>
              <input
                {...register('billingAddress.city')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              />
              {errors.billingAddress?.city && (
                <p className="mt-1 text-sm text-red-600">{errors.billingAddress.city.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State *</label>
              <input
                {...register('billingAddress.state')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              />
              {errors.billingAddress?.state && (
                <p className="mt-1 text-sm text-red-600">{errors.billingAddress.state.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">ZIP Code *</label>
              <input
                {...register('billingAddress.zip')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              />
              {errors.billingAddress?.zip && (
                <p className="mt-1 text-sm text-red-600">{errors.billingAddress.zip.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select a payment option: *</label>
            <select
              {...register('paymentOption')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            >
              <option value="">Select option</option>
              <option value="Initial Deposit">Initial Deposit (Non-Refundable)</option>
              <option value="Pay In Full">Pay In Full</option>
            </select>
            {errors.paymentOption && (
              <p className="mt-1 text-sm text-red-600">{errors.paymentOption.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">I am making my deposit with: *</label>
            <select
              {...register('paymentMethod')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            >
              <option value="">Select method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Travel Voucher">Travel Voucher</option>
            </select>
            {errors.paymentMethod && (
              <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.message}</p>
            )}
          </div>
        </div>

        {/* Credit Card Details */}
        {paymentMethod === 'Credit Card' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Card Type *</label>
              <select
                {...register('cardType')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              >
                <option value="">Select card type</option>
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="Discover">Discover</option>
                <option value="American Express">American Express</option>
              </select>
              {errors.cardType && (
                <p className="mt-1 text-sm text-red-600">{errors.cardType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Card Number *</label>
              <input
                type="text"
                {...register('cardNumber')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
              />
              {errors.cardNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiration Month *</label>
                <input
                  {...register('expirationMonth')}
                  placeholder="MM"
                  maxLength={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
                />
                {errors.expirationMonth && (
                  <p className="mt-1 text-sm text-red-600">{errors.expirationMonth.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiration Year *</label>
                <input
                  {...register('expirationYear')}
                  placeholder="YY"
                  maxLength={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
                />
                {errors.expirationYear && (
                  <p className="mt-1 text-sm text-red-600">{errors.expirationYear.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CVV *</label>
                <input
                  type="password"
                  {...register('cvv')}
                  maxLength={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
                />
                {errors.cvv && (
                  <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Payment Amount */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount (Dollars) *</label>
            <input
              {...register('amount.dollars')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            />
            {errors.amount?.dollars && (
              <p className="mt-1 text-sm text-red-600">{errors.amount.dollars.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cents *</label>
            <input
              {...register('amount.cents')}
              maxLength={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#75D8D1] focus:ring-[#75D8D1]"
            />
            {errors.amount?.cents && (
              <p className="mt-1 text-sm text-red-600">{errors.amount.cents.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
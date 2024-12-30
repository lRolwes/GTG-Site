import { z } from 'zod'


// Main payment form schema
export const paymentSchema = z.object({
  // Person completing form
  submitterFirstName: z.string().min(1, 'First name is required'),
  submitterLastName: z.string().min(1, 'Last name is required'),

  //booking number
  BookingNumber: z.string().min(5, 'Booking Number is Required'),


  // Payment information
  cardholderName: z.object({
    first: z.string().min(1, 'First name is required'),
    middle: z.string().optional(),
    last: z.string().min(1, 'Last name is required'),
  }),
  cardholderPhone: z.string().min(10, 'Valid phone number is required'),
  billingAddress: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zip: z.string().min(5, 'Valid ZIP code is required'),
  }),
  paymentOption: z.enum(['Initial Deposit', 'Pay In Full']),
  paymentMethod: z.enum(['Credit Card', 'Travel Voucher']),
  
  // Credit card details
  cardType: z.enum(['Visa', 'MasterCard', 'Discover', 'American Express']),
  cardNumber: z.string().min(15, 'Valid card number required'),
  expirationMonth: z.string().min(2, 'Month required'),
  expirationYear: z.string().min(2, 'Year required'),
  cvv: z.string().min(3, 'CVV required'),
  amount: z.object({
    dollars: z.string().min(1, 'Amount required'),
    cents: z.string().min(2, 'Cents required'),
  }),


})

export type SecondaryPaymentFormData = z.infer<typeof paymentSchema> 
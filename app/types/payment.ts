import { z } from 'zod'

// Traveler schema for validation
export const travelerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  email: z.string().email('Valid email is required').optional(),
})

// Travel selections schema
export const travelSelectionsSchema = z.object({
  includeProtection: z.boolean().optional(),
  includeCheckedBag: z.boolean().optional(),
  includeExcursions: z.boolean().optional(),
  other: z.boolean().optional(),
})

export interface FileData {
  name: string;
  type: string;
  data: string;
}

export interface PaymentFormData {
  // Person completing form
  submitterFirstName: string;
  submitterLastName: string;
  advisor: 'Kim' | 'Other';

  // Primary traveler
  primaryTraveler: z.infer<typeof travelerSchema> & {
    email: string;
    phone: string;
    phoneType: 'Cell' | 'Home' | 'Work';
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  };

  // Additional travelers (up to 7)
  additionalTravelers: z.infer<typeof travelerSchema>[];

  // Travel selections for each traveler
  travelSelections: Record<string, z.infer<typeof travelSelectionsSchema>>;

  // Special requests
  excursions?: string;
  specialAccommodations?: string;
  differentAddress: boolean;

  // Documents
  documents?: FileData[];

  // Travel protection
  travelProtection: 'add' | 'decline' | 'more_info';

  // Agreements
  termsAccepted: boolean;
  hazmatAgreed: boolean;
  scheduleChangesAgreed: boolean;
  baggageFeesAgreed: boolean;
  covidResponsibilityAgreed: boolean;

  // Payment information
  cardholderName: {
    first: string;
    middle?: string;
    last: string;
  };
  cardholderPhone: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  paymentOption: 'Initial Deposit' | 'Pay In Full';
  paymentMethod: 'Credit Card' | 'Travel Voucher';
  
  // Credit card details
  cardType: 'Visa' | 'MasterCard' | 'Discover' | 'American Express';
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
  amount: {
    dollars: string;
    cents: string;
  };

  // Electronic signature
  signatureAgreed: boolean;
  electronicSignature: string;
  dateSigned: string;
}

export const paymentSchema = z.object({
  // Person completing form
  submitterFirstName: z.string().min(1, 'First name is required'),
  submitterLastName: z.string().min(1, 'Last name is required'),
  advisor: z.enum(['Kim', 'Other']),

  // Primary traveler
  primaryTraveler: travelerSchema.extend({
    email: z.string().email('Valid email is required'),
    phone: z.string().min(10, 'Valid phone number is required'),
    phoneType: z.enum(['Cell', 'Home', 'Work']),
    address: z.object({
      street: z.string().min(1, 'Street address is required'),
      city: z.string().min(1, 'City is required'),
      state: z.string().min(1, 'State is required'),
      zip: z.string().min(5, 'Valid ZIP code is required'),
    }),
  }),

  // Additional travelers (up to 7)
  additionalTravelers: z.array(travelerSchema).max(7),

  // Travel selections for each traveler
  travelSelections: z.record(z.string(), travelSelectionsSchema),

  // Special requests
  excursions: z.string().optional(),
  specialAccommodations: z.string().optional(),
  differentAddress: z.boolean(),

  // Documents
  documents: z.array(z.object({
    name: z.string(),
    type: z.string(),
    data: z.string()
  })).optional(),

  // Travel protection
  travelProtection: z.enum([
    'add',
    'decline',
    'more_info'
  ]),

  // Agreements
  termsAccepted: z.boolean(),
  hazmatAgreed: z.boolean(),
  scheduleChangesAgreed: z.boolean(),
  baggageFeesAgreed: z.boolean(),
  covidResponsibilityAgreed: z.boolean(),

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

  // Electronic signature
  signatureAgreed: z.boolean(),
  electronicSignature: z.string().min(1, 'Signature required'),
  dateSigned: z.string().min(1, 'Date required'),
})

export type PaymentFormData = z.infer<typeof paymentSchema> 
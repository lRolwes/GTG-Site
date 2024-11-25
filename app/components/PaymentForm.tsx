'use client'
import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { paymentSchema, type PaymentFormData } from '../types/payment'
import FormHeader from './payment/FormHeader'
import SubmitterInfo from './payment/SubmitterInfo'
import PrimaryTravelerInfo from './payment/PrimaryTravelerInfo'
import AdditionalTravelers from './payment/AdditionalTravelers'
import TravelSelections from './payment/TravelSelections'
import SpecialRequests from './payment/SpecialRequests'
import DocumentUpload from './payment/DocumentUpload'
import TravelProtection from './payment/TravelProtection'
import Agreements from './payment/Agreements'
import PaymentDetails from './payment/PaymentDetails'
import ElectronicSignature from './payment/ElectronicSignature'

export default function PaymentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  
  const methods = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      additionalTravelers: [],
      travelSelections: {},
      differentAddress: false,
      documents: [],
    },
    mode: 'onBlur'
  })

  const onSubmit = async (data: PaymentFormData) => {
    console.log('Form submitted with data:', data)
    setIsSubmitting(true)
    setSubmitError('')
    
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || 'Submission failed')
      }

      // Reset form and show success message
      methods.reset()
      alert('Payment information submitted successfully!')
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit payment information. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const onError = (errors: any) => {
    console.error('Form validation errors:', errors)
    setSubmitError('Please check the form for errors and try again.')
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)} className="max-w-4xl text-[#23395D] mx-auto space-y-8">
        <FormHeader />
        
        <div className="bg-white p-6 rounded-lg shadow space-y-8">
          <SubmitterInfo />
          <PrimaryTravelerInfo />
          <AdditionalTravelers />
          <TravelSelections />
          <SpecialRequests />
          <DocumentUpload />
          <TravelProtection />
          <Agreements />
          <PaymentDetails />
          <ElectronicSignature />
          
          {submitError && (
            <div className="text-red-500 text-center p-4 bg-red-50 rounded">
              {submitError}
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#23395D] text-white px-8 py-3 rounded-md hover:bg-[#23395D]/80 
                       transition duration-300 disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Submit Payment'}
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            Form State: {methods.formState.isSubmitting ? 'Submitting' : 'Idle'}
            <br />
            Form Errors: {Object.keys(methods.formState.errors).length > 0 ? 'Yes' : 'No'}
          </div>
        </div>
      </form>
    </FormProvider>
  )
} 
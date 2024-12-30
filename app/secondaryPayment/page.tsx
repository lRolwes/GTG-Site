import { Metadata } from 'next'
import SecondaryPaymentForm from '../components/secondaryPaymentForm'
import Header from '../components/Header'
import { Footer } from '../components/Footer'

export const metadata: Metadata = {
  title: 'Payment Authorization - GTG Vacations',
  description: 'Secure payment form for GTG Vacations bookings',
}

export default function SecondaryPaymentPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow py-12 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-[#23395D] mb-6 text-center">
              GTG Vacations - Payment Authorization
            </h1>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>IMPORTANT - Please Read Carefully:</strong>
                  </p>
                  <ul className="list-disc ml-5 mt-2 text-sm text-yellow-700">
                    <li>Complete and Accurate information is REQUIRED to Process This Transaction</li>
                    <li>ALL Information MUST Be Correct</li>
                    <li>If We are UNABLE To Process A Payment Because of Incorrect Information it Could Result in the Lost of Your Vacation Pricing and/or the Cancellation of an Existing Reservation if Final Payment is Due.</li>
                  </ul>
                </div>
              </div>
            </div>

            <SecondaryPaymentForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 
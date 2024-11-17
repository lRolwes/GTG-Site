import Header from "../components/Header";
import { Footer } from "../components/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <div className="bg-white text-primary w-full flex flex-col justify-center items-center">
        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white text-primar flex flex-col justify-center items-center my-[200px]">
          <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
          <p>
            Welcome to GTG Vacations. By using our services, you agree to these
            Terms and Conditions. Please read them carefully. Booking and
            Payment: All bookings must be made through our website or authorized
            agents. Full payment is required at the time of booking unless
            otherwise specified. Prices are subject to change until confirmed.
            Cancellation and Refund Policy: Cancellations made within [insert
            time frame] may be eligible for a full or partial refund.
            Non-refundable bookings will be clearly marked at the time of
            purchase. Travel Documents: It is your responsibility to ensure that
            you have valid travel documents, including passports and visas.
            Limitation of Liability: GTG Vacations is not liable for any loss or
            damage resulting from the use of our services, including but not
            limited to delays, cancellations, or accidents. Governing Law: These
            Terms shall be governed by the laws of [insert jurisdiction].
            Changes to Terms: We reserve the right to modify these Terms at any
            time. Any changes will be posted on our website.
          </p>
        </main>
      </div>
      <Footer />
    </>
  );
}

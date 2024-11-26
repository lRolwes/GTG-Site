import Header from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

export default function ClaimPage() {
  return (
    <>
      <Header />
      <div className="bg-white text-primary w-full flex flex-col justify-center items-center mt-12">
        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white text-primar flex flex-col justify-center items-center my-[200px]">
          <h1 className="text-3xl font-bold mb-4">Claims Policy</h1>
          <p>
            At GTG Vacations, we strive to provide exceptional travel
            experiences. If you have experienced any issues during your trip, we
            are here to help. Submitting a Claim: To submit a claim, please
            follow these steps: Contact Us: Reach out to our customer service
            team at [contact email] or [phone number] within [insert time frame]
            of your travel date. Provide Details: Include your booking
            reference, a detailed description of the issue, and any supporting
            documentation (receipts, photos, etc.). Await Confirmation: We will
            acknowledge your claim within [insert time frame] and begin our
            review process. Claims Assessment: We will investigate your claim
            thoroughly. Our team may need additional information, and we will
            contact you if necessary. Resolution: You will receive a response
            regarding the outcome of your claim within [insert time frame]. If
            approved, compensation will be processed according to our policies.
            Feedback: We value your feedback and use it to improve our services.
            Thank you for choosing GTG Vacations!
          </p>
        </main>
      </div>
      <Footer />
    </>
  );
}

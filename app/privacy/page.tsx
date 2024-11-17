import Header from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div className="bg-white text-primary w-full flex flex-col justify-center items-center">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white text-primar flex flex-col justify-center items-center my-[200px]">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p>
          At GTG Vacations, we are committed to protecting your privacy. This
          Privacy Policy explains how we collect, use, and share your
          information when you visit our website or use our services.
          Information We Collect: Personal Information: We collect information
          that can identify you, such as your name, email address, phone number,
          and payment details when you make a booking. Non-Personal Information:
          We also collect data that does not identify you, such as browsing
          behavior, device information, and location data. How We Use Your
          Information: To process bookings and payments. To communicate with you
          about your travel arrangements. To improve our services and website
          functionality. To send you promotional offers and newsletters, with
          your consent. Sharing Your Information: We may share your information
          with: Service providers who assist us in delivering our services.
          Partners involved in your travel arrangements (hotels, airlines,
          etc.). Legal authorities if required by law. Your Rights: You have the
          right to access, correct, or delete your personal information. To
          exercise these rights, please contact us at [contact email]. Changes
          to This Policy: We may update this Privacy Policy periodically. We
          will notify you of any changes by posting the new policy on our
          website..
        </p>
      </main>
      </div>
      <Footer />
    </>
  );
}


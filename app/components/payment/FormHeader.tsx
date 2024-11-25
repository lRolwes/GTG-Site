export default function FormHeader() {
  return (
    <div className="text-[#23395D] space-y-4">
      <h1 className="text-3xl font-bold">GTG Vacations - Booking and Deposit Form</h1>
      <div className="bg-yellow-100 p-4 rounded-md">
        <p className="font-bold">***Please use Laptop or Desktop Computer to fill out all forms as handheld devices may not work successfully.***</p>
      </div>
      <div className="bg-[#23395D] text-white p-4 rounded-md space-y-2">
        <h2 className="font-bold">IMPORTANT - Please Read Carefully:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Complete and Accurate information is REQUIRED to Process This Transaction</li>
          <li>ALL Information MUST Be Correct</li>
          <li>If We are UNABLE To Process A Payment Because of Incorrect Information it Could Result in the loss of Your Vacation Pricing and/or the Cancellation of an Existing Reservation if Final Payment is Due.</li>
        </ul>
        <p className="font-bold mt-4">PLEASE DOUBLE CHECK YOUR INFORMATION - FOR BOTH OF US!</p>
        <p className="font-bold">WE WANT TO ENJOY YOUR GETAWAY!!!</p>
      </div>
    </div>
  )
} 
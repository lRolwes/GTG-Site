import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/emailer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      alert("Failed to send message.");
    }
  };

  const inputBoxClassName =
    "shadow rounded border w-full p-2 font-montserrat font-light";
  const labelClassName = "font-poppins text-lg";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className={labelClassName}>Name:</div>
      <div>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={inputBoxClassName}
        />
      </div>
      <div className={labelClassName}>Email Address:</div>
      <div>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={inputBoxClassName}
        />
      </div>
      <div className={labelClassName}>Your Message:</div>
      <div>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className={inputBoxClassName}
        />
      </div>
      <button
        type="submit"
        className="bg-lit-blue text-white font-montserrat font-light py-2 px-12 rounded-md hover:bg-white hover:text-lit-blue hover:border hover:border-lit-blue mt-5"
      >
        Send
      </button>
    </form>
  );
};

export default ContactForm;

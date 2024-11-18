"use client"
import { useState } from "react";

interface SubscribeProps {
  title?: string;
  headline?: string;
}

export const Subscribe = ({ 
  title = "Stay Updated with Travel Tips",
  headline = "Subscribe to our newsletter for the latest travel tips, destination guides, and exclusive offers."
}: SubscribeProps) => {
    const [email, setEmail] = useState("");
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', email)
        
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
    
        if (response.ok) {
          alert("Message sent successfully!");
          setEmail("");
        } else {
          alert("Failed to send message.");
        }
    }

    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-primary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">{title}</h2>
                    <p className="text-xl text-white mb-8">
                        {headline}
                    </p>
                    <form className="flex flex-col sm:flex-row justify-center gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-accent text-white rounded-full font-semibold hover:bg-secondary transition duration-300"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
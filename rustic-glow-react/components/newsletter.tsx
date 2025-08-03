"use client"

import type React from "react"

import { useState, useContext } from "react"
import { AppContext } from "@/contexts/app-context"

export default function Newsletter() {
  const { showNotification } = useContext(AppContext)
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && email.includes("@")) {
      showNotification("Welcome to our candle family! Check your email for exclusive offers.")
      setEmail("")
    } else {
      showNotification("Please enter a valid email address", "error")
    }
  }

  return (
    <section className="wood-gradient text-white py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="text-5xl mb-6">📬</div>
        <h2 className="text-4xl font-script font-bold mb-4">Join Our Candle Family</h2>
        <p className="text-xl text-amber-100 mb-8 font-serif">
          Get exclusive offers, candle care tips, and be the first to know about new seasonal scents
        </p>

        <form onSubmit={handleSubmit} className="flex max-w-md mx-auto mb-6">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 py-4 rounded-l-full text-amber-900 focus:outline-none focus:ring-4 focus:ring-yellow-400 font-serif"
          />
          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-700 px-8 py-4 rounded-r-full font-bold transition-colors vintage-shadow"
          >
            Subscribe
          </button>
        </form>
        <p className="text-sm text-amber-200">We respect your privacy. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}

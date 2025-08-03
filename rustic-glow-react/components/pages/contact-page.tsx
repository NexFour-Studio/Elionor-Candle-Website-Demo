"use client"

import type React from "react"

import { useContext } from "react"
import { AppContext } from "@/contexts/app-context"

export default function ContactPage() {
  const { showNotification } = useContext(AppContext)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    showNotification("Message sent successfully! We'll get back to you soon.")
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <div>
      {/* Page Header */}
      <section className="wood-gradient text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-script font-bold mb-4">Get in Touch</h1>
          <div className="w-32 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-amber-100 font-serif">We'd love to hear from you</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-script font-bold text-amber-900 mb-6">Send us a Message</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    className="px-4 py-3 border-2 border-amber-300 rounded-lg font-serif focus:border-amber-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    className="px-4 py-3 border-2 border-amber-300 rounded-lg font-serif focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg font-serif focus:border-amber-500 focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg font-serif focus:border-amber-500 focus:outline-none"
                />
                <select className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg font-serif focus:border-amber-500 focus:outline-none">
                  <option>General Inquiry</option>
                  <option>Custom Order</option>
                  <option>Wholesale</option>
                  <option>Gift Sets</option>
                  <option>Product Support</option>
                </select>
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg font-serif focus:border-amber-500 focus:outline-none resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full wood-gradient text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-shadow"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-script font-bold text-amber-900 mb-6">Visit Our Store</h2>
              <div className="bg-amber-50 p-8 rounded-3xl border-4 border-amber-200 vintage-shadow mb-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">📍</div>
                    <div>
                      <h4 className="font-bold text-amber-900 mb-1">Address</h4>
                      <p className="text-amber-700 font-serif">
                        123 Maple Street
                        <br />
                        Craftsville, State 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">🕐</div>
                    <div>
                      <h4 className="font-bold text-amber-900 mb-1">Store Hours</h4>
                      <p className="text-amber-700 font-serif">
                        Monday - Friday: 10am - 7pm
                        <br />
                        Saturday: 9am - 8pm
                        <br />
                        Sunday: 11am - 5pm
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">📞</div>
                    <div>
                      <h4 className="font-bold text-amber-900 mb-1">Contact</h4>
                      <p className="text-amber-700 font-serif">
                        Phone: (555) 123-GLOW
                        <br />
                        Email: hello@rusticglow.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">🚗</div>
                    <div>
                      <h4 className="font-bold text-amber-900 mb-1">Parking</h4>
                      <p className="text-amber-700 font-serif">
                        Free parking available
                        <br />
                        Wheelchair accessible
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-amber-900 mb-4">Follow Our Journey</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-3xl hover:scale-110 transition-transform">
                    📘
                  </a>
                  <a href="#" className="text-3xl hover:scale-110 transition-transform">
                    📷
                  </a>
                  <a href="#" className="text-3xl hover:scale-110 transition-transform">
                    📌
                  </a>
                  <a href="#" className="text-3xl hover:scale-110 transition-transform">
                    🐦
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-amber-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-script text-amber-900 mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border-2 border-amber-200">
              <h3 className="text-xl font-bold text-amber-900 mb-3">How long do your candles burn?</h3>
              <p className="text-amber-700 font-serif">
                Our candles have excellent burn times: Small (8oz) burns for 25+ hours, Medium (12oz) for 40+ hours, and
                Large (16oz) for 60+ hours when properly cared for.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-amber-200">
              <h3 className="text-xl font-bold text-amber-900 mb-3">Are your candles really all-natural?</h3>
              <p className="text-amber-700 font-serif">
                Yes! We use 100% natural soy wax, cotton wicks, and premium fragrance oils. No paraffin, lead, or
                harmful chemicals - just pure, clean-burning candles.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-amber-200">
              <h3 className="text-xl font-bold text-amber-900 mb-3">Do you offer custom scents?</h3>
              <p className="text-amber-700 font-serif">
                We love creating custom scents for special occasions, weddings, or corporate gifts. Contact us to
                discuss your vision and we'll create something unique for you.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-amber-200">
              <h3 className="text-xl font-bold text-amber-900 mb-3">What's your return policy?</h3>
              <p className="text-amber-700 font-serif">
                We offer a 30-day satisfaction guarantee. If you're not completely happy with your candle, we'll make it
                right with a full refund or exchange.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

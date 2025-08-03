"use client"

import type React from "react"

import { useState, useContext } from "react"
import { AppContext } from "@/contexts/app-context"

export default function CheckoutModal() {
  const { showCheckoutModal, toggleCheckoutModal, cart, currentUser, showNotification } = useContext(AppContext)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: currentUser?.email || "",
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: currentUser?.phone || "",
    shippingMethod: "standard",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    saveInfo: false,
    newsletter: false,
  })

  if (!showCheckoutModal) return null

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 75 ? 0 : 8.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate order processing
    showNotification("Order placed successfully! You'll receive a confirmation email shortly.")
    toggleCheckoutModal()
    setStep(1)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-script font-bold text-amber-900 mb-6">Shipping Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-amber-900 font-bold mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-amber-300 rounded-xl font-serif focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-amber-900 font-bold mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-amber-300 rounded-xl font-serif focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-amber-900 font-bold mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-amber-300 rounded-xl font-serif focus:border-amber-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-amber-900 font-bold mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-amber-300 rounded-xl font-serif focus:border-amber-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-amber-900 font-bold mb-2">Street Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-amber-300 rounded-xl font-serif focus:border-amber-500 focus:outline-none"
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-amber-900 font-bold mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-amber-300 rounded-xl font-serif focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-amber-900 font-bold mb-2">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-amber-300 rounded-xl font-serif focus:border-amber-500 focus:outline-none"
                  required
                >
                  <option value="">Select State</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                </select>
              </div>
              <div>
                <label className="block text-amber-900 font-bold mb-2">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-amber-300 rounded-xl font-serif focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-script font-bold text-amber-900 mb-6">Shipping Method</h3>

            <div className="space-y-4">
              <div
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.shippingMethod === "standard"
                    ? "border-amber-500 bg-amber-50"
                    : "border-amber-300 bg-white hover:border-amber-400"
                }`}
              >
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={formData.shippingMethod === "standard"}
                      onChange={handleInputChange}
                      className="w-5 h-5"
                    />
                    <div>
                      <div className="font-bold text-amber-900">📦 Standard Shipping</div>
                      <div className="text-sm text-amber-600 font-serif">5-7 business days</div>
                    </div>
                  </div>
                  <div className="font-bold text-amber-800">{subtotal >= 75 ? "FREE" : "$8.99"}</div>
                </label>
              </div>

              <div
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.shippingMethod === "express"
                    ? "border-amber-500 bg-amber-50"
                    : "border-amber-300 bg-white hover:border-amber-400"
                }`}
              >
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={formData.shippingMethod === "express"}
                      onChange={handleInputChange}
                      className="w-5 h-5"
                    />
                    <div>
                      <div className="font-bold text-amber-900">⚡ Express Shipping</div>
                      <div className="text-sm text-amber-600 font-serif">2-3 business days</div>
                    </div>
                  </div>
                  <div className="font-bold text-amber-800">$15.99</div>
                </label>
              </div>

              <div
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.shippingMethod === "overnight"
                    ? "border-amber-500 bg-amber-50"
                    : "border-amber-300 bg-white hover:border-amber-400"
                }`}
              >
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="overnight"
                      checked={formData.shippingMethod === "overnight"}
                      onChange={handleInputChange}
                      className="w-5 h-5"
                    />
                    <div>
                      <div className="font-bold text-amber-900">🚀 Overnight Shipping</div>
                      <div className="text-sm text-amber-600 font-serif">Next business day</div>
                    </div>
                  </div>
                  <div className="font-bold text-amber-800">$29.99</div>
                </label>
              </div>
            </div>

            {subtotal < 75 && (
              <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                <div className="flex items-center space-x-2 text-blue-800">
                  <span className="text-xl">💡</span>
                  <span className="font-serif">
                    Add ${(75 - subtotal).toFixed(2)} more to get FREE standard shipping!
                  </span>
                </div>
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-script font-bold text-amber-900 mb-6">Payment Information</h3>

            <div className="space-y-4 mb-6">
              <div
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.paymentMethod === "card"
                    ? "border-amber-500 bg-amber-50"
                    : "border-amber-300 bg-white hover:border-amber-400"
                }`}
              >
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleInputChange}
                    className="w-5 h-5"
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">💳</span>
                    <span className="font-bold text-amber-900">Credit/Debit Card</span>
                  </div>
                </label>
              </div>

              <div
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.paymentMethod === "paypal"
                    ? "border-amber-500 bg-amber-50"
                    : "border-amber-300 bg-white hover:border-amber-400"
                }`}
              >
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === "paypal"}
                    onChange={handleInputChange}
                    className="w-5 h-5"
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🅿️</span>
                    <span className="font-bold text-amber-900">PayPal</span>
                  </div>
                </label>
              </div>
            </div>

            {formData.paymentMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-amber-900 font-bold mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border-2 border-amber-300 rounded-xl font-serif focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-amber-900 font-bold mb-2">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border-2 border-amber-300 rounded-xl font-serif focus:border-amber-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-amber-900 font-bold mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full px-4 py-3 border-2 border-amber-300 rounded-xl font-serif focus:border-amber-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-amber-900 font-bold mb-2">Name on Card</label>
                  <input
                    type="text"
                    name="nameOnCard"
                    value={formData.nameOnCard}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-amber-300 rounded-xl font-serif focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-3 pt-4 border-t-2 border-amber-200">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleInputChange}
                  className="w-5 h-5"
                />
                <span className="font-serif text-amber-700">Save my information for faster checkout</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                  className="w-5 h-5"
                />
                <span className="font-serif text-amber-700">Subscribe to our newsletter for exclusive offers</span>
              </label>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="modal active fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-t-3xl z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-script font-bold mb-2">Secure Checkout</h2>
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 ${step >= 1 ? "text-white" : "text-amber-300"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-white text-amber-600" : "bg-amber-300"}`}
                  >
                    {step > 1 ? "✓" : "1"}
                  </div>
                  <span className="font-serif">Shipping</span>
                </div>
                <div className="w-8 h-0.5 bg-amber-300"></div>
                <div className={`flex items-center space-x-2 ${step >= 2 ? "text-white" : "text-amber-300"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-white text-amber-600" : "bg-amber-300"}`}
                  >
                    {step > 2 ? "✓" : "2"}
                  </div>
                  <span className="font-serif">Delivery</span>
                </div>
                <div className="w-8 h-0.5 bg-amber-300"></div>
                <div className={`flex items-center space-x-2 ${step >= 3 ? "text-white" : "text-amber-300"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-white text-amber-600" : "bg-amber-300"}`}
                  >
                    3
                  </div>
                  <span className="font-serif">Payment</span>
                </div>
              </div>
            </div>
            <button
              onClick={toggleCheckoutModal}
              className="text-white hover:text-amber-200 text-3xl p-2 rounded-full hover:bg-white/20 transition-all"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {renderStep()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t-2 border-amber-200">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={step === 1}
                    className="bg-gray-200 text-gray-600 px-6 py-3 rounded-xl font-bold disabled:opacity-50 hover:bg-gray-300 transition-all font-serif"
                  >
                    ← Back
                  </button>

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="wood-gradient text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all font-serif"
                    >
                      Continue →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all font-serif"
                    >
                      🔒 Place Order
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200 sticky top-8">
                <h3 className="text-2xl font-script font-bold text-amber-900 mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-amber-200"
                    >
                      <div className="text-2xl">🕯️</div>
                      <div className="flex-1">
                        <div className="font-bold text-amber-900 text-sm">{item.name}</div>
                        <div className="text-xs text-amber-600">
                          Size: {item.size} • Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="font-bold text-amber-800">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t-2 border-amber-200 pt-4">
                  <div className="flex justify-between text-amber-700 font-serif">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-amber-700 font-serif">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-amber-700 font-serif">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold text-amber-900 border-t-2 border-amber-300 pt-3 font-script">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="mt-6 pt-4 border-t border-amber-200">
                  <div className="flex items-center justify-center space-x-4 text-sm text-amber-600">
                    <div className="flex items-center space-x-1">
                      <span>🔒</span>
                      <span className="font-serif">SSL Secure</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>🛡️</span>
                      <span className="font-serif">Protected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

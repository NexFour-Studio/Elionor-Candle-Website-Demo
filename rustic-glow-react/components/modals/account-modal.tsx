"use client"

import type React from "react"

import { useState, useContext } from "react"
import { AppContext } from "@/contexts/app-context"

export default function AccountModal() {
  const { showAccountModal, toggleAccountModal, login, showNotification } = useContext(AppContext)
  const [isLogin, setIsLogin] = useState(true)

  if (!showAccountModal) return null

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (login(email, password)) {
      // Login successful - modal will be closed by login function
    } else {
      showNotification("Invalid email or password", "error")
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    showNotification("Registration feature coming soon! (Demo mode)")
  }

  return (
    <div className="modal active fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-script font-bold text-amber-900">My Account</h2>
          <button onClick={toggleAccountModal} className="text-amber-700 hover:text-amber-900 text-2xl">
            &times;
          </button>
        </div>

        {isLogin ? (
          <div>
            <form className="space-y-4" onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 border-2 border-amber-300 rounded-lg font-serif"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 border-2 border-amber-300 rounded-lg font-serif"
                required
              />
              <button
                type="submit"
                className="w-full wood-gradient text-white py-3 rounded-lg font-bold hover:shadow-lg transition-shadow"
              >
                Sign In
              </button>
            </form>
            <div className="mt-4 p-3 bg-amber-50 rounded-lg text-sm">
              <p className="font-bold text-amber-900 mb-2">Demo Accounts:</p>
              <p className="text-amber-700">Admin: admin@rusticglow.com / admin123</p>
              <p className="text-amber-700">Customer: john@example.com / user123</p>
            </div>
            <p className="text-center mt-4 text-amber-700 font-serif">
              Don't have an account?{" "}
              <button onClick={() => setIsLogin(false)} className="text-amber-900 font-bold hover:underline">
                Create Account
              </button>
            </p>
          </div>
        ) : (
          <div>
            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="px-4 py-2 border-2 border-amber-300 rounded-lg font-serif"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="px-4 py-2 border-2 border-amber-300 rounded-lg font-serif"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 border-2 border-amber-300 rounded-lg font-serif"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border-2 border-amber-300 rounded-lg font-serif"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border-2 border-amber-300 rounded-lg font-serif"
              />
              <button
                type="submit"
                className="w-full wood-gradient text-white py-3 rounded-lg font-bold hover:shadow-lg transition-shadow"
              >
                Create Account
              </button>
            </form>
            <p className="text-center mt-4 text-amber-700 font-serif">
              Already have an account?{" "}
              <button onClick={() => setIsLogin(true)} className="text-amber-900 font-bold hover:underline">
                Sign In
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

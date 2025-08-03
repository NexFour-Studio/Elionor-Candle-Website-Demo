"use client"

import { useContext } from "react"
import { AppContext } from "@/contexts/app-context"

export default function Footer() {
  const { setCurrentPage } = useContext(AppContext)

  return (
    <footer className="bg-amber-100 py-16 border-t-4 border-amber-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6 cursor-pointer" onClick={() => setCurrentPage("home")}>
              <div className="text-3xl candle-flicker">🕯️</div>
              <div>
                <h3 className="text-2xl font-script font-bold text-amber-900">Rustic Glow</h3>
                <p className="text-sm text-amber-700 italic">Premium Handcrafted Candles</p>
              </div>
            </div>
            <p className="text-amber-700 font-serif leading-relaxed mb-4">
              Bringing warmth and comfort to homes everywhere through our handcrafted, natural soy candles made with
              love and tradition.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-2xl hover:scale-110 transition-transform">
                📘
              </a>
              <a href="#" className="text-2xl hover:scale-110 transition-transform">
                📷
              </a>
              <a href="#" className="text-2xl hover:scale-110 transition-transform">
                📌
              </a>
              <a href="#" className="text-2xl hover:scale-110 transition-transform">
                🐦
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-amber-900 mb-4 text-lg">Shop</h4>
            <ul className="space-y-3 text-amber-700">
              <li>
                <button
                  onClick={() => setCurrentPage("shop")}
                  className="hover:text-amber-900 transition-colors font-serif"
                >
                  All Candles
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-amber-900 transition-colors font-serif">
                  Seasonal Collection
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-900 transition-colors font-serif">
                  Gift Sets
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-900 transition-colors font-serif">
                  Candle Care
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-900 transition-colors font-serif">
                  Custom Orders
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-amber-900 mb-4 text-lg">Customer Care</h4>
            <ul className="space-y-3 text-amber-700 font-serif">
              <li>
                <a href="#" className="hover:text-amber-900 transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-900 transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-900 transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-900 transition-colors">
                  Care Instructions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-900 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-amber-900 mb-4 text-lg">Visit Us</h4>
            <ul className="space-y-3 text-amber-700 font-serif">
              <li>📍 123 Maple Street</li>
              <li>Craftsville, State 12345</li>
              <li>📞 (555) 123-GLOW</li>
              <li>✉️ hello@rusticglow.com</li>
              <li>🕐 Mon-Sat 10am-7pm</li>
              <li>🕐 Sun 11am-5pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-amber-300 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-amber-700 font-serif mb-4 md:mb-0">
              &copy; 2024 Rustic Glow Candles. Handcrafted with ❤️ in Craftsville.
            </p>
            <div className="flex space-x-6 text-amber-700 font-serif">
              <a href="#" className="hover:text-amber-900 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-amber-900 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-amber-900 transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

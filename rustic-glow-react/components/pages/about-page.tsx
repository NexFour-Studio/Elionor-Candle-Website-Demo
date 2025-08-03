"use client"

import { useContext } from "react"
import { AppContext } from "@/contexts/app-context"

export default function AboutPage() {
  const { setCurrentPage } = useContext(AppContext)

  return (
    <div>
      {/* Page Header */}
      <section className="wood-gradient text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-script font-bold mb-4">Our Story</h1>
          <div className="w-32 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-amber-100 font-serif">Handcrafted with passion since 2018</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-script text-amber-900 mb-6">Our Craft, Our Passion</h2>
              <div className="w-20 h-1 bg-amber-600 mb-8"></div>
              <p className="text-lg text-amber-700 mb-6 font-serif leading-relaxed">
                Founded in 2018 in a small barn workshop, Rustic Glow began as a dream to bring the warmth and comfort
                of handcrafted candles to homes everywhere. What started as a hobby quickly became a passion for
                creating the perfect ambiance.
              </p>
              <p className="text-lg text-amber-700 mb-8 font-serif leading-relaxed">
                Every candle is hand-poured using 100% natural soy wax, cotton wicks, and carefully selected fragrance
                oils. We believe in quality over quantity, crafting each candle with the same care we'd put into one for
                our own home.
              </p>
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-800">2,500+</div>
                  <div className="text-amber-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-800">100%</div>
                  <div className="text-amber-600">Natural Soy Wax</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-800">60+</div>
                  <div className="text-amber-600">Burn Hours</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-amber-200 rounded-3xl p-8 border-4 border-amber-300 vintage-shadow">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎁</div>
                  <h3 className="text-2xl font-script font-bold text-amber-900 mb-4">Custom & Gift Orders</h3>
                  <p className="text-amber-700 mb-6 font-serif">
                    Looking for something special? We create custom scents and beautiful gift sets perfect for any
                    occasion.
                  </p>
                  <div className="space-y-2 text-amber-600 mb-6">
                    <div>🌸 Custom Scent Blending</div>
                    <div>💝 Wedding & Event Favors</div>
                    <div>🎉 Corporate Gifts</div>
                    <div>📦 Curated Gift Sets</div>
                  </div>
                  <button
                    onClick={() => setCurrentPage("contact")}
                    className="wood-gradient text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-shadow"
                  >
                    Request Custom Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-amber-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-script text-amber-900 mb-4">How We Craft Each Candle</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-script font-bold text-amber-900 mb-4">1. Select Premium Wax</h3>
              <p className="text-amber-700 font-serif">
                We use only the finest natural soy wax, sourced from sustainable farms.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-4">🌸</div>
              <h3 className="text-xl font-script font-bold text-amber-900 mb-4">2. Blend Fragrances</h3>
              <p className="text-amber-700 font-serif">
                Each scent is carefully crafted using premium fragrance oils and natural extracts.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-4">🕯️</div>
              <h3 className="text-xl font-script font-bold text-amber-900 mb-4">3. Hand Pour</h3>
              <p className="text-amber-700 font-serif">
                Every candle is lovingly hand-poured in small batches for quality control.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-xl font-script font-bold text-amber-900 mb-4">4. Quality Check</h3>
              <p className="text-amber-700 font-serif">
                Each candle is inspected and tested before it reaches your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-script text-amber-900 mb-4">Meet Our Team</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-amber-700 font-serif">The passionate artisans behind every candle</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-8xl mb-4">👩‍🎨</div>
              <h3 className="text-2xl font-script font-bold text-amber-900 mb-2">Sarah Mitchell</h3>
              <p className="text-amber-600 font-bold mb-4">Founder & Master Chandler</p>
              <p className="text-amber-700 font-serif">
                Sarah started Rustic Glow in her barn workshop with a dream to create the perfect candle. Her passion
                for natural ingredients and traditional techniques drives our quality standards.
              </p>
            </div>

            <div className="text-center">
              <div className="text-8xl mb-4">👨‍🔬</div>
              <h3 className="text-2xl font-script font-bold text-amber-900 mb-2">Michael Chen</h3>
              <p className="text-amber-600 font-bold mb-4">Fragrance Specialist</p>
              <p className="text-amber-700 font-serif">
                With a background in aromatherapy, Michael creates our signature scent blends. He ensures each fragrance
                tells a story and creates the perfect ambiance.
              </p>
            </div>

            <div className="text-center">
              <div className="text-8xl mb-4">👩‍💼</div>
              <h3 className="text-2xl font-script font-bold text-amber-900 mb-2">Emma Rodriguez</h3>
              <p className="text-amber-600 font-bold mb-4">Customer Experience Manager</p>
              <p className="text-amber-700 font-serif">
                Emma ensures every customer feels like family. From order to delivery, she makes sure your Rustic Glow
                experience is nothing short of magical.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

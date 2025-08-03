"use client"

import { useContext } from "react"
import { AppContext } from "@/contexts/app-context"

export default function HomePage() {
  const { setCurrentPage, products } = useContext(AppContext)

  const featuredProducts = products.filter((p) => p.featured)

  return (
    <div>
      {/* Hero Section */}
      <section className="wood-gradient text-white py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <div className="mb-8">
            <div className="text-8xl candle-flicker mb-4">🕯️</div>
            <h2 className="text-7xl font-script font-bold mb-4 text-yellow-100">Premium Handcrafted Candles</h2>
            <div className="w-32 h-1 bg-yellow-400 mx-auto mb-6"></div>
          </div>
          <p className="text-2xl text-amber-100 mb-10 max-w-3xl mx-auto font-serif leading-relaxed">
            Discover our exclusive collection of artisan candles, each hand-poured with natural soy wax and premium
            fragrances. Free shipping on orders over $75!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage("shop")}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-10 py-4 rounded-full text-xl font-bold shadow-2xl transition-all hover:scale-105"
            >
              🛍️ Shop Now - Free Shipping Over $75
            </button>
            <button
              onClick={() => setCurrentPage("about")}
              className="border-3 border-yellow-400 text-yellow-100 hover:bg-yellow-400 hover:text-amber-900 px-10 py-4 rounded-full text-xl font-bold transition-all"
            >
              📖 Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-script text-amber-900 mb-4">Featured Collection</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-amber-700 max-w-2xl mx-auto font-serif">
              Our most beloved candles, handcrafted with premium natural soy wax
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="card-hover bg-amber-50 rounded-3xl p-6 text-center border-4 border-amber-200 hover:border-amber-400 transition-colors vintage-shadow"
              >
                <div className="text-6xl candle-flicker mb-4">🕯️</div>
                <h3 className="text-2xl font-script font-bold text-amber-900 mb-2">{product.name}</h3>
                <p className="text-amber-600 mb-4 text-sm">{product.description.substring(0, 60)}...</p>
                <div className="text-2xl font-bold text-amber-800 mb-4">${product.price.medium}.00</div>
                <button
                  onClick={() => setCurrentPage("shop")}
                  className="w-full wood-gradient text-white py-2 rounded-lg font-bold hover:shadow-lg transition-shadow"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setCurrentPage("shop")}
              className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-4 rounded-full text-xl font-bold shadow-xl transition-all hover:scale-105"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-amber-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-script text-amber-900 mb-4">Why Choose Rustic Glow?</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-2xl font-script font-bold text-amber-900 mb-4">100% Natural</h3>
              <p className="text-amber-700 font-serif">
                Made with premium soy wax, cotton wicks, and natural fragrance oils. No harmful chemicals or additives.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-script font-bold text-amber-900 mb-4">Handcrafted</h3>
              <p className="text-amber-700 font-serif">
                Each candle is lovingly hand-poured in small batches in our workshop, ensuring quality and attention to
                detail.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-4">🚚</div>
              <h3 className="text-2xl font-script font-bold text-amber-900 mb-4">Free Shipping</h3>
              <p className="text-amber-700 font-serif">
                Enjoy free shipping on all orders over $75. Fast, secure delivery right to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

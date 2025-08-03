"use client"

import { useContext } from "react"
import { AppContext } from "@/contexts/app-context"
import ProductCard from "@/components/product-card"

export default function WishlistPage() {
  const { wishlist, products, removeFromWishlist, addToCart, currentUser, setCurrentPage, addToWishlist } =
    useContext(AppContext)

  const wishlistProducts = products.filter((product) => wishlist.includes(product.id))

  const handleMoveAllToCart = () => {
    wishlistProducts.forEach((product) => {
      addToCart(product.id, "medium", 1)
      removeFromWishlist(product.id)
    })
  }

  if (!currentUser) {
    return (
      <div className="py-24 text-center">
        <div className="text-8xl mb-8">❤️</div>
        <h2 className="text-4xl font-script font-bold text-amber-900 mb-4">Sign in to view your wishlist</h2>
        <p className="text-xl text-amber-700 font-serif mb-8">Save your favorite candles for later!</p>
        <button
          onClick={() => setCurrentPage("home")}
          className="wood-gradient text-white px-8 py-4 rounded-xl font-bold text-lg font-serif"
        >
          Go Home
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Page Header */}
      <section className="wood-gradient text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-script font-bold mb-4">My Wishlist</h1>
          <div className="w-32 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-amber-100 font-serif">Your saved candles, ready when you are</p>
        </div>
      </section>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {wishlistProducts.length > 0 ? (
            <>
              {/* Wishlist Actions */}
              <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200 mb-12 text-center">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-script font-bold text-amber-900 mb-2">
                      {wishlistProducts.length} candle{wishlistProducts.length !== 1 ? "s" : ""} in your wishlist
                    </h2>
                    <p className="text-amber-600 font-serif">
                      Total value: ${wishlistProducts.reduce((sum, p) => sum + p.price.medium, 0).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleMoveAllToCart}
                      className="wood-gradient text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all font-serif flex items-center space-x-2"
                    >
                      <span>🛒</span>
                      <span>Add All to Cart</span>
                    </button>

                    <button
                      onClick={() => wishlist.forEach((id) => removeFromWishlist(id))}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold transition-all font-serif flex items-center space-x-2"
                    >
                      <span>🗑️</span>
                      <span>Clear All</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Wishlist Products */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {wishlistProducts.map((product) => (
                  <div key={product.id} className="relative">
                    <ProductCard product={product} />

                    {/* Remove from Wishlist Button */}
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all shadow-lg z-20"
                      title="Remove from wishlist"
                    >
                      <span className="text-sm">✕</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Recommendations */}
              <div className="mt-16 bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-8 border-4 border-amber-200">
                <h3 className="text-3xl font-script font-bold text-amber-900 mb-6 text-center">You might also like</h3>

                <div className="grid md:grid-cols-3 gap-6">
                  {products
                    .filter((p) => !wishlist.includes(p.id))
                    .slice(0, 3)
                    .map((product) => (
                      <div
                        key={product.id}
                        className="bg-white p-6 rounded-2xl border-2 border-amber-200 shadow-lg text-center"
                      >
                        <div className="text-4xl mb-4">🕯️</div>
                        <h4 className="text-xl font-script font-bold text-amber-900 mb-2">{product.name}</h4>
                        <p className="text-amber-600 text-sm mb-4 font-serif">
                          {product.description.substring(0, 60)}...
                        </p>
                        <div className="text-lg font-bold text-amber-800 mb-4">${product.price.medium}.00</div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => addToWishlist(product.id)}
                            className="flex-1 bg-amber-200 hover:bg-amber-300 text-amber-900 py-2 rounded-lg font-bold transition-colors font-serif"
                          >
                            ❤️ Save
                          </button>
                          <button
                            onClick={() => addToCart(product.id, "medium", 1)}
                            className="flex-1 wood-gradient text-white py-2 rounded-lg font-bold transition-all font-serif"
                          >
                            🛒 Add
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-8xl mb-8">💔</div>
              <h3 className="text-4xl font-script font-bold text-amber-900 mb-4">Your wishlist is empty</h3>
              <p className="text-xl text-amber-700 font-serif mb-8 max-w-md mx-auto">
                Start adding candles you love to save them for later!
              </p>
              <button
                onClick={() => setCurrentPage("shop")}
                className="wood-gradient text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all font-serif"
              >
                🛍️ Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

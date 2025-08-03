"use client"

import { useState, useContext } from "react"
import { AppContext } from "@/contexts/app-context"

export default function QuickViewModal() {
  const { showQuickViewModal, closeQuickView, currentQuickViewProduct, addToCart, addToWishlist, wishlist } =
    useContext(AppContext)
  const [selectedSize, setSelectedSize] = useState("medium")
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("details")

  if (!showQuickViewModal || !currentQuickViewProduct) return null

  const product = currentQuickViewProduct
  const currentPrice = product.price[selectedSize as keyof typeof product.price]
  const currentStock = product.stock[selectedSize as keyof typeof product.stock]
  const currentBurnTime = product.burnTime[selectedSize as keyof typeof product.burnTime]
  const isInWishlist = wishlist.includes(product.id)

  const handleAddToCart = () => {
    addToCart(product.id, selectedSize, quantity)
    closeQuickView()
  }

  const changeQuantity = (change: number) => {
    setQuantity(Math.max(1, Math.min(currentStock, quantity + change)))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-xl ${i < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"}`}>
        ⭐
      </span>
    ))
  }

  const getSizeLabel = (size: string) => {
    const labels = {
      small: "Small (8oz)",
      medium: "Medium (12oz)",
      large: "Large (16oz)",
    }
    return labels[size as keyof typeof labels]
  }

  return (
    <div className="modal active fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
        {/* Enhanced Header */}
        <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-t-3xl z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-script font-bold mb-2">{product.name}</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">{renderStars(product.averageRating)}</div>
                <span className="text-amber-100 font-serif">
                  {product.averageRating} ({product.reviews.length} reviews)
                </span>
              </div>
            </div>
            <button
              onClick={closeQuickView}
              className="text-white hover:text-amber-200 text-3xl p-2 rounded-full hover:bg-white/20 transition-all"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Enhanced Product Image Section */}
            <div className="space-y-6">
              <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-12 text-center border-4 border-amber-200">
                <div className="text-9xl candle-flicker mb-6">🕯️</div>

                {/* Enhanced Badges */}
                {product.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    ✨ Bestseller
                  </div>
                )}

                <button
                  onClick={() => addToWishlist(product.id)}
                  className={`absolute top-4 right-4 p-4 rounded-full transition-all duration-300 shadow-lg ${
                    isInWishlist ? "bg-red-500 text-white" : "bg-white text-gray-600 hover:bg-red-500 hover:text-white"
                  }`}
                >
                  <span className="text-2xl">❤️</span>
                </button>
              </div>

              {/* Product Highlights */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-amber-50 p-4 rounded-2xl text-center border-2 border-amber-200">
                  <div className="text-2xl mb-2">🕯️</div>
                  <div className="text-sm font-bold text-amber-900">{currentBurnTime}+ Hours</div>
                  <div className="text-xs text-amber-600 font-serif">Burn Time</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-2xl text-center border-2 border-amber-200">
                  <div className="text-2xl mb-2">🌱</div>
                  <div className="text-sm font-bold text-amber-900">100% Natural</div>
                  <div className="text-xs text-amber-600 font-serif">Soy Wax</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-2xl text-center border-2 border-amber-200">
                  <div className="text-2xl mb-2">🏠</div>
                  <div className="text-sm font-bold text-amber-900">Handcrafted</div>
                  <div className="text-xs text-amber-600 font-serif">Small Batch</div>
                </div>
              </div>
            </div>

            {/* Enhanced Product Details */}
            <div className="space-y-8">
              <div>
                <div className="text-5xl font-bold text-amber-800 mb-4">${currentPrice}.00</div>
                <p className="text-amber-700 text-lg leading-relaxed font-serif mb-6">{product.description}</p>
              </div>

              {/* Enhanced Size Selection */}
              <div>
                <label className="block text-amber-900 font-bold mb-4 text-lg">Choose Your Size:</label>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(product.price).map(([size, price]) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-4 rounded-2xl border-3 transition-all font-serif text-center ${
                        selectedSize === size
                          ? "border-amber-500 bg-amber-100 text-amber-900 shadow-lg"
                          : "border-amber-300 bg-white text-amber-700 hover:border-amber-400"
                      }`}
                    >
                      <div className="font-bold">{getSizeLabel(size)}</div>
                      <div className="text-sm">${price}.00</div>
                      <div className="text-xs text-amber-600">
                        {product.burnTime[size as keyof typeof product.burnTime]}hr burn
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Quantity Selection */}
              <div>
                <label className="block text-amber-900 font-bold mb-4 text-lg">Quantity:</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => changeQuantity(-1)}
                    disabled={quantity <= 1}
                    className="bg-amber-200 hover:bg-amber-300 disabled:opacity-50 px-4 py-2 rounded-xl font-bold text-xl"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold bg-amber-50 px-6 py-2 rounded-xl border-2 border-amber-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => changeQuantity(1)}
                    disabled={quantity >= currentStock}
                    className="bg-amber-200 hover:bg-amber-300 disabled:opacity-50 px-4 py-2 rounded-xl font-bold text-xl"
                  >
                    +
                  </button>
                  <span className="text-amber-600 font-serif ml-4">{currentStock} available</span>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full wood-gradient text-white py-4 rounded-2xl font-bold text-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-serif flex items-center justify-center space-x-3"
                >
                  <span className="text-2xl">🛒</span>
                  <span>Add to Cart - ${(currentPrice * quantity).toFixed(2)}</span>
                </button>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => addToWishlist(product.id)}
                    className={`py-3 rounded-2xl font-bold transition-all duration-300 font-serif flex items-center justify-center space-x-2 ${
                      isInWishlist
                        ? "bg-red-100 text-red-800 border-2 border-red-300"
                        : "bg-amber-100 text-amber-800 border-2 border-amber-300 hover:bg-amber-200"
                    }`}
                  >
                    <span className="text-lg">❤️</span>
                    <span>{isInWishlist ? "In Wishlist" : "Add to Wishlist"}</span>
                  </button>

                  <button className="bg-blue-100 text-blue-800 py-3 rounded-2xl font-bold border-2 border-blue-300 hover:bg-blue-200 transition-all font-serif flex items-center justify-center space-x-2">
                    <span className="text-lg">📤</span>
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Tabs Section */}
          <div className="mt-12">
            <div className="flex space-x-1 mb-8 bg-amber-100 p-2 rounded-2xl">
              {[
                { id: "details", label: "Details", icon: "📋" },
                { id: "ingredients", label: "Ingredients", icon: "🌿" },
                { id: "reviews", label: "Reviews", icon: "⭐" },
                { id: "care", label: "Care Guide", icon: "💡" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all font-serif flex items-center justify-center space-x-2 ${
                    activeTab === tab.id ? "bg-white text-amber-900 shadow-lg" : "text-amber-700 hover:bg-amber-200"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="bg-amber-50 rounded-2xl p-8 border-2 border-amber-200">
              {activeTab === "details" && (
                <div className="space-y-6">
                  <h4 className="text-2xl font-script font-bold text-amber-900 mb-4">Product Details</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-bold text-amber-900 mb-2">Scent Profile</h5>
                      <p className="text-amber-700 font-serif">{product.description}</p>
                    </div>
                    <div>
                      <h5 className="font-bold text-amber-900 mb-2">Specifications</h5>
                      <ul className="text-amber-700 font-serif space-y-1">
                        <li>• Category: {product.category}</li>
                        <li>• Burn Time: {currentBurnTime}+ hours</li>
                        <li>• Wax Type: 100% Natural Soy</li>
                        <li>• Wick: Cotton</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "ingredients" && (
                <div>
                  <h4 className="text-2xl font-script font-bold text-amber-900 mb-4">Natural Ingredients</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {product.ingredients.map((ingredient, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-xl border border-amber-200 flex items-center space-x-3"
                      >
                        <span className="text-2xl">🌿</span>
                        <span className="font-serif text-amber-800">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <h4 className="text-2xl font-script font-bold text-amber-900 mb-4">Customer Reviews</h4>
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="bg-white p-6 rounded-xl border border-amber-200">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-bold text-amber-900">{review.customerName}</span>
                              {review.verified && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">
                                  ✓ Verified Purchase
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex">{renderStars(review.rating)}</div>
                              <span className="text-sm text-amber-600 font-serif">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-amber-700 font-serif leading-relaxed mb-3">{review.comment}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <button className="text-amber-600 hover:text-amber-800 font-serif">
                            👍 Helpful ({review.helpful})
                          </button>
                          <button className="text-amber-600 hover:text-amber-800 font-serif">💬 Reply</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "care" && (
                <div>
                  <h4 className="text-2xl font-script font-bold text-amber-900 mb-4">Candle Care Guide</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-bold text-amber-900 mb-3 flex items-center space-x-2">
                        <span>🔥</span>
                        <span>First Burn</span>
                      </h5>
                      <ul className="text-amber-700 font-serif space-y-2">
                        <li>• Burn for 2-3 hours on first use</li>
                        <li>• Allow wax to melt to edges</li>
                        <li>• This prevents tunneling</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-amber-900 mb-3 flex items-center space-x-2">
                        <span>✂️</span>
                        <span>Wick Maintenance</span>
                      </h5>
                      <ul className="text-amber-700 font-serif space-y-2">
                        <li>• Trim wick to 1/4" before each use</li>
                        <li>• Remove wick debris</li>
                        <li>• Keep wick centered</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-amber-900 mb-3 flex items-center space-x-2">
                        <span>🛡️</span>
                        <span>Safety Tips</span>
                      </h5>
                      <ul className="text-amber-700 font-serif space-y-2">
                        <li>• Never burn for more than 4 hours</li>
                        <li>• Keep away from drafts</li>
                        <li>• Place on heat-resistant surface</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-amber-900 mb-3 flex items-center space-x-2">
                        <span>♻️</span>
                        <span>After Use</span>
                      </h5>
                      <ul className="text-amber-700 font-serif space-y-2">
                        <li>• Clean jar with warm soapy water</li>
                        <li>• Reuse as storage or planter</li>
                        <li>• Recycle glass responsibly</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

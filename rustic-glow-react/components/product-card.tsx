"use client"

import { useContext } from "react"
import { AppContext, type Product } from "@/contexts/app-context"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, openQuickView, addToWishlist, wishlist } = useContext(AppContext)

  const mediumPrice = product.price.medium
  const mediumStock = product.stock.medium
  const isLowStock = mediumStock <= 5
  const isInWishlist = wishlist.includes(product.id)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"}`}>
        ⭐
      </span>
    ))
  }

  return (
    <div className="group card-hover bg-white rounded-3xl p-8 text-center border-4 border-amber-200 hover:border-amber-400 transition-all duration-300 vintage-shadow relative overflow-hidden">
      {/* Enhanced Visual Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10">
        <div className="relative mb-8">
          <div className="text-8xl candle-flicker mb-4 group-hover:scale-110 transition-transform duration-300">🕯️</div>

          {/* Enhanced Badges - Repositioned to avoid overlap */}
          {product.featured && (
            <div className="absolute -top-2 -left-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs px-3 py-2 rounded-full font-bold shadow-lg animate-pulse z-10">
              ✨ Bestseller!
            </div>
          )}
          {isLowStock && (
            <div className="absolute top-8 -left-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-3 py-2 rounded-full font-bold shadow-lg low-stock z-10">
              ⚠️ Low Stock!
            </div>
          )}

          {/* Wishlist Button - Keep at top-right */}
          <button
            onClick={() => addToWishlist(product.id)}
            className={`absolute -top-2 -right-2 p-3 rounded-full transition-all duration-300 z-20 ${
              isInWishlist
                ? "bg-red-500 text-white shadow-lg"
                : "bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white shadow-md"
            }`}
          >
            <span className="text-lg">❤️</span>
          </button>
        </div>

        <h3 className="text-3xl font-script font-bold text-amber-900 mb-3 group-hover:text-amber-800 transition-colors">
          {product.name}
        </h3>

        {/* Enhanced Rating Display */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center space-x-1">{renderStars(product.averageRating)}</div>
          <span className="ml-3 text-sm text-amber-600 font-serif">
            {product.averageRating} ({product.reviews.length} reviews)
          </span>
        </div>

        <p className="text-amber-700 mb-6 text-base leading-relaxed font-serif px-2">
          {product.description.substring(0, 100)}...
        </p>

        {/* Enhanced Product Info */}
        <div className="mb-6 space-y-3">
          <div className="text-3xl font-bold text-amber-800">${mediumPrice}.00</div>
          <div className="text-sm text-amber-600 font-serif">
            Medium (12oz) • {product.burnTime.medium}hr burn • {mediumStock} left
          </div>

          {/* Ingredients Preview */}
          <div className="flex flex-wrap justify-center gap-1 mt-3">
            {product.ingredients.slice(0, 2).map((ingredient, idx) => (
              <span key={idx} className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-serif">
                {ingredient}
              </span>
            ))}
            {product.ingredients.length > 2 && (
              <span className="bg-amber-200 text-amber-800 text-xs px-2 py-1 rounded-full font-serif">
                +{product.ingredients.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => openQuickView(product.id)}
            className="w-full bg-gradient-to-r from-amber-200 to-amber-300 hover:from-amber-300 hover:to-amber-400 text-amber-900 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-serif"
          >
            👁️ Quick View
          </button>
          <button
            onClick={() => addToCart(product.id, "medium", 1)}
            className="w-full wood-gradient text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-serif flex items-center justify-center space-x-2"
          >
            <span>🛒</span>
            <span>Add to Cart</span>
          </button>
        </div>

        {/* Quick Add to Wishlist Text */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-xs text-amber-600 font-serif">
            {isInWishlist ? "💖 In your wishlist" : "Click ❤️ to save for later"}
          </p>
        </div>
      </div>
    </div>
  )
}

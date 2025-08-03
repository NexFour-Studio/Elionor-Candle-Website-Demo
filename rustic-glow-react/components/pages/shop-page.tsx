"use client"

import { useState, useContext, useEffect } from "react"
import { AppContext } from "@/contexts/app-context"
import ProductCard from "@/components/product-card"

export default function ShopPage() {
  const { products, searchTerm, setSearchTerm, openQuickView } = useContext(AppContext)
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [sortBy, setSortBy] = useState("featured")
  const [scentFilter, setScentFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    applyFilters()
  }, [sortBy, scentFilter, priceFilter, ratingFilter, searchTerm, products])

  const applyFilters = () => {
    let filtered = [...products]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Scent filter
    if (scentFilter !== "all") {
      filtered = filtered.filter((product) => product.category === scentFilter)
    }

    // Price filter
    if (priceFilter !== "all") {
      filtered = filtered.filter((product) => {
        const price = product.price.medium
        switch (priceFilter) {
          case "under-25":
            return price < 25
          case "25-30":
            return price >= 25 && price <= 30
          case "over-30":
            return price > 30
          default:
            return true
        }
      })
    }

    // Rating filter
    if (ratingFilter !== "all") {
      const minRating = Number.parseFloat(ratingFilter)
      filtered = filtered.filter((product) => product.averageRating >= minRating)
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price.medium - b.price.medium)
        break
      case "price-high":
        filtered.sort((a, b) => b.price.medium - a.price.medium)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "rating":
        filtered.sort((a, b) => b.averageRating - a.averageRating)
        break
      case "popularity":
        filtered.sort((a, b) => b.popularity - a.popularity)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      default: // featured
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    setFilteredProducts(filtered)
  }

  const clearFilters = () => {
    setScentFilter("all")
    setPriceFilter("all")
    setRatingFilter("all")
    setSearchTerm("")
    setSortBy("featured")
  }

  return (
    <div>
      {/* Enhanced Page Header */}
      <section className="wood-gradient text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-7xl font-script font-bold mb-6 text-yellow-100">Our Candle Collection</h1>
          <div className="w-40 h-1 bg-yellow-400 mx-auto mb-8"></div>
          <p className="text-2xl text-amber-100 font-serif mb-8">
            Premium handcrafted candles for every mood and moment
          </p>

          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search candles, scents, or ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-8 py-4 pl-16 rounded-2xl border-4 border-amber-300 focus:border-yellow-400 font-serif text-amber-900 text-lg shadow-xl"
              />
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl">🔍</div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-800 text-xl"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Product Filters */}
      <section className="py-8 bg-gradient-to-r from-amber-50 to-orange-50 border-b-4 border-amber-200">
        <div className="max-w-7xl mx-auto px-4">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full bg-amber-600 text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-2"
            >
              <span>🔧</span>
              <span>Filters & Sort</span>
              <span className={`transform transition-transform ${showFilters ? "rotate-180" : ""}`}>⌄</span>
            </button>
          </div>

          <div className={`${showFilters ? "block" : "hidden"} md:block`}>
            <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
              <div className="flex flex-wrap gap-4">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-xl border-3 border-amber-300 focus:border-amber-500 font-serif bg-white shadow-md"
                >
                  <option value="featured">✨ Featured First</option>
                  <option value="price-low">💰 Price: Low to High</option>
                  <option value="price-high">💰 Price: High to Low</option>
                  <option value="name">🔤 Name: A to Z</option>
                  <option value="rating">⭐ Highest Rated</option>
                  <option value="popularity">🔥 Most Popular</option>
                  <option value="newest">🆕 Newest First</option>
                </select>

                {/* Scent Filter */}
                <select
                  value={scentFilter}
                  onChange={(e) => setScentFilter(e.target.value)}
                  className="px-4 py-3 rounded-xl border-3 border-amber-300 focus:border-amber-500 font-serif bg-white shadow-md"
                >
                  <option value="all">🌸 All Scents</option>
                  <option value="fruity">🍎 Fruity & Sweet</option>
                  <option value="woody">🌲 Woody & Earthy</option>
                  <option value="floral">🌺 Floral & Fresh</option>
                  <option value="spicy">🌶️ Spicy & Warm</option>
                </select>

                {/* Price Filter */}
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="px-4 py-3 rounded-xl border-3 border-amber-300 focus:border-amber-500 font-serif bg-white shadow-md"
                >
                  <option value="all">💵 All Prices</option>
                  <option value="under-25">💵 Under $25</option>
                  <option value="25-30">💵 $25 - $30</option>
                  <option value="over-30">💵 Over $30</option>
                </select>

                {/* Rating Filter */}
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="px-4 py-3 rounded-xl border-3 border-amber-300 focus:border-amber-500 font-serif bg-white shadow-md"
                >
                  <option value="all">⭐ All Ratings</option>
                  <option value="4.5">⭐ 4.5+ Stars</option>
                  <option value="4.0">⭐ 4.0+ Stars</option>
                  <option value="3.5">⭐ 3.5+ Stars</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              <button
                onClick={clearFilters}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg font-serif"
              >
                🗑️ Clear All
              </button>
            </div>

            {/* Active Filters Display */}
            <div className="flex flex-wrap gap-2 mb-4">
              {searchTerm && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-serif flex items-center space-x-1">
                  <span>🔍 "{searchTerm}"</span>
                  <button onClick={() => setSearchTerm("")} className="text-blue-600 hover:text-blue-800">
                    ✕
                  </button>
                </span>
              )}
              {scentFilter !== "all" && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-serif flex items-center space-x-1">
                  <span>🌸 {scentFilter}</span>
                  <button onClick={() => setScentFilter("all")} className="text-green-600 hover:text-green-800">
                    ✕
                  </button>
                </span>
              )}
              {priceFilter !== "all" && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-serif flex items-center space-x-1">
                  <span>💵 {priceFilter}</span>
                  <button onClick={() => setPriceFilter("all")} className="text-purple-600 hover:text-purple-800">
                    ✕
                  </button>
                </span>
              )}
              {ratingFilter !== "all" && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-serif flex items-center space-x-1">
                  <span>⭐ {ratingFilter}+</span>
                  <button onClick={() => setRatingFilter("all")} className="text-yellow-600 hover:text-yellow-800">
                    ✕
                  </button>
                </span>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center">
            <p className="text-amber-700 font-serif text-lg">
              Showing {filteredProducts.length} of {products.length} candles
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Products Grid */}
      <section className="py-20 bg-gradient-to-br from-amber-25 to-orange-25">
        <div className="max-w-7xl mx-auto px-4">
          {filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-8xl mb-8">🔍</div>
              <h3 className="text-4xl font-script font-bold text-amber-900 mb-4">No candles found</h3>
              <p className="text-xl text-amber-700 font-serif mb-8 max-w-md mx-auto">
                We couldn't find any candles matching your criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={clearFilters}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl font-serif"
              >
                🗑️ Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Recommendations Section */}
      {filteredProducts.length > 0 && (
        <section className="py-16 bg-amber-100">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-4xl font-script font-bold text-amber-900 mb-4">You might also like</h3>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
            <div className="grid md:grid-cols-3 gap-6">
              {products
                .filter((p) => !filteredProducts.includes(p))
                .slice(0, 3)
                .map((product) => (
                  <div key={product.id} className="bg-white p-6 rounded-2xl border-2 border-amber-200 shadow-lg">
                    <div className="text-4xl mb-4">🕯️</div>
                    <h4 className="text-xl font-script font-bold text-amber-900 mb-2">{product.name}</h4>
                    <p className="text-amber-600 text-sm mb-4 font-serif">{product.description.substring(0, 60)}...</p>
                    <button
                      onClick={() => openQuickView(product.id)}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-bold transition-colors font-serif"
                    >
                      View Details
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

"use client"

import { useState, useContext, useEffect } from "react"
import { AppContext } from "@/contexts/app-context"

export default function Navigation() {
  const {
    currentPage,
    setCurrentPage,
    cart,
    wishlist,
    currentUser,
    toggleCartModal,
    toggleAccountModal,
    logout,
    isAdmin,
    searchTerm,
    setSearchTerm,
  } = useContext(AppContext)

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  const handleAccountClick = () => {
    if (currentUser) {
      setShowProfileDropdown(!showProfileDropdown)
    } else {
      toggleAccountModal()
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (showProfileDropdown && !target.closest(".relative")) {
        setShowProfileDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showProfileDropdown])

  const navItems = [
    { name: "Home", page: "home", icon: "🏠" },
    { name: "Shop", page: "shop", icon: "🛍️" },
    { name: "About", page: "about", icon: "📖" },
    { name: "Contact", page: "contact", icon: "📞" },
  ]

  return (
    <nav className="bg-gradient-to-r from-amber-100 to-orange-100 border-b-4 border-amber-800 sticky top-0 z-50 vintage-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage("home")}>
            <div className="text-4xl candle-flicker">🕯️</div>
            <div>
              <h1 className="text-4xl font-script font-bold text-amber-900">Rustic Glow</h1>
              <p className="text-sm text-amber-700 font-serif italic">Premium Handcrafted Candles</p>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search candles..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  if (currentPage !== "shop") setCurrentPage("shop")
                }}
                className="w-full px-4 py-2 pl-10 rounded-xl border-2 border-amber-300 focus:border-amber-500 font-serif bg-white shadow-md"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600">🔍</div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-800"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`nav-link text-amber-800 hover:text-amber-900 font-semibold text-lg transition-colors flex items-center space-x-1 ${
                  currentPage === item.page ? "active" : ""
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Toggle for Mobile */}
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="lg:hidden text-amber-800 hover:text-amber-900 transition-colors p-2"
            >
              <span className="text-xl">🔍</span>
            </button>

            {/* Account */}
            <div className="relative">
              <button
                onClick={handleAccountClick}
                className="text-amber-800 hover:text-amber-900 transition-colors flex items-center space-x-2 p-2 rounded-xl hover:bg-amber-200"
              >
                <span className="text-xl">👤</span>
                {currentUser && (
                  <div className="hidden lg:block">
                    <span className="text-sm font-serif">{currentUser.firstName}</span>
                    <span className="text-xs ml-1">⌄</span>
                  </div>
                )}
              </button>

              {/* Enhanced Profile Dropdown */}
              {currentUser && showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border-4 border-amber-200 vintage-shadow z-50">
                  <div className="p-6 border-b-2 border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white text-xl">
                        {currentUser.firstName[0]}
                      </div>
                      <div>
                        <div className="font-script font-bold text-amber-900 text-lg">
                          {currentUser.firstName} {currentUser.lastName}
                        </div>
                        <div className="text-sm text-amber-600 font-serif">{currentUser.email}</div>
                        <div className="text-xs text-amber-500 font-serif">
                          {currentUser.loyaltyPoints} loyalty points
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <button
                      onClick={() => {
                        setCurrentPage("profile")
                        setShowProfileDropdown(false)
                      }}
                      className="w-full text-left px-6 py-3 hover:bg-amber-50 transition-colors flex items-center space-x-3 font-serif text-amber-800"
                    >
                      <span className="text-lg">📊</span>
                      <span>My Account</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentPage("wishlist")
                        setShowProfileDropdown(false)
                      }}
                      className="w-full text-left px-6 py-3 hover:bg-amber-50 transition-colors flex items-center space-x-3 font-serif text-amber-800"
                    >
                      <span className="text-lg">❤️</span>
                      <div className="flex items-center justify-between flex-1">
                        <span>My Wishlist</span>
                        {wishlist.length > 0 && (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-bold">
                            {wishlist.length}
                          </span>
                        )}
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentPage("order-tracking")
                        setShowProfileDropdown(false)
                      }}
                      className="w-full text-left px-6 py-3 hover:bg-amber-50 transition-colors flex items-center space-x-3 font-serif text-amber-800"
                    >
                      <span className="text-lg">📦</span>
                      <span>Track Orders</span>
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => {
                          setCurrentPage("admin-panel")
                          setShowProfileDropdown(false)
                        }}
                        className="w-full text-left px-6 py-3 hover:bg-red-50 transition-colors flex items-center space-x-3 font-serif text-red-700 border-t border-amber-100"
                      >
                        <span className="text-lg">🔧</span>
                        <span>Admin Panel</span>
                      </button>
                    )}

                    <div className="border-t-2 border-amber-100 mt-2 pt-2">
                      <button
                        onClick={() => {
                          logout()
                          setShowProfileDropdown(false)
                        }}
                        className="w-full text-left px-6 py-3 hover:bg-red-50 transition-colors flex items-center space-x-3 font-serif text-red-600"
                      >
                        <span className="text-lg">🚪</span>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={() => setCurrentPage("wishlist")}
              className="text-amber-800 hover:text-amber-900 transition-colors relative p-2 rounded-xl hover:bg-amber-200"
            >
              <span className="text-xl">❤️</span>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Enhanced Cart Button */}
            <button
              onClick={toggleCartModal}
              className="wood-gradient text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all vintage-shadow relative group font-serif"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">🛒</span>
                <div>
                  <div>Cart ({cartCount})</div>
                  <div className="text-xs opacity-90">${cartTotal.toFixed(2)}</div>
                </div>
              </div>

              {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                  {cartCount}
                </div>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-amber-800 hover:text-amber-900 p-2"
          >
            <span className="text-2xl">{showMobileMenu ? "✕" : "☰"}</span>
          </button>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="lg:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search candles..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  if (currentPage !== "shop") setCurrentPage("shop")
                }}
                className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-amber-300 focus:border-amber-500 font-serif bg-white shadow-md"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 text-lg">🔍</div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-800"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden pb-4 border-t-2 border-amber-200 pt-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    setCurrentPage(item.page)
                    setShowMobileMenu(false)
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-colors flex items-center space-x-3 ${
                    currentPage === item.page ? "bg-amber-200 text-amber-900" : "text-amber-800 hover:bg-amber-100"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}

              {currentUser && (
                <>
                  <button
                    onClick={() => {
                      setCurrentPage("profile")
                      setShowMobileMenu(false)
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl font-semibold text-amber-800 hover:bg-amber-100 transition-colors flex items-center space-x-3"
                  >
                    <span className="text-lg">👤</span>
                    <span>My Account</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentPage("wishlist")
                      setShowMobileMenu(false)
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl font-semibold text-amber-800 hover:bg-amber-100 transition-colors flex items-center space-x-3"
                  >
                    <span className="text-lg">❤️</span>
                    <div className="flex items-center justify-between flex-1">
                      <span>Wishlist</span>
                      {wishlist.length > 0 && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-bold">
                          {wishlist.length}
                        </span>
                      )}
                    </div>
                  </button>
                </>
              )}

              <button
                onClick={toggleCartModal}
                className="w-full wood-gradient text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center space-x-2 font-serif"
              >
                <span className="text-lg">🛒</span>
                <span>
                  Cart ({cartCount}) - ${cartTotal.toFixed(2)}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

"use client"

import { useContext } from "react"
import { AppContext } from "@/contexts/app-context"

export default function CartModal() {
  const { showCartModal, toggleCartModal, cart, removeFromCart, updateCartQuantity, showNotification } =
    useContext(AppContext)

  if (!showCartModal) return null

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const subtotal = calculateSubtotal()
  const shipping = subtotal >= 75 ? 0 : 8.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      showNotification("Your cart is empty!", "error")
      return
    }
    showNotification("Checkout feature coming soon! (Demo mode)")
  }

  return (
    <div className="modal active fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-script font-bold text-amber-900">Shopping Cart</h2>
          <button onClick={toggleCartModal} className="text-amber-700 hover:text-amber-900 text-2xl">
            &times;
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {cart.length === 0 ? (
            <p className="text-amber-700 text-center font-serif">Your cart is empty</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-amber-50 rounded-lg">
                <div className="text-3xl">🕯️</div>
                <div className="flex-1">
                  <h4 className="font-bold text-amber-900">{item.name}</h4>
                  <p className="text-sm text-amber-700">Size: {item.size}</p>
                  <p className="text-amber-800 font-bold">${item.price}.00 each</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateCartQuantity(index, item.quantity - 1)}
                    className="bg-amber-200 hover:bg-amber-300 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(index, item.quantity + 1)}
                    className="bg-amber-200 hover:bg-amber-300 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
                <button onClick={() => removeFromCart(index)} className="text-red-600 hover:text-red-800">
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t-2 border-amber-200 pt-6">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-amber-700">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-amber-700">
                <span>Shipping:</span>
                <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-amber-700">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-amber-900 border-t pt-2">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={proceedToCheckout}
              className="w-full wood-gradient text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-shadow"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

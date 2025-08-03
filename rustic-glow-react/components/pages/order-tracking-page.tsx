"use client"

import type React from "react"

import { useContext, useState } from "react"
import { AppContext } from "@/contexts/app-context"

export default function OrderTrackingPage() {
  const { currentUser, setCurrentPage } = useContext(AppContext)
  const [trackingNumber, setTrackingNumber] = useState("")
  const [searchedOrder, setSearchedOrder] = useState<any>(null)

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate order lookup
    const mockOrder = {
      id: 1001,
      trackingNumber: trackingNumber,
      status: "shipped",
      estimatedDelivery: "2024-02-23",
      currentLocation: "Distribution Center - Chicago, IL",
      timeline: [
        { status: "Order Placed", date: "2024-02-20 10:30 AM", location: "Online", completed: true },
        { status: "Payment Confirmed", date: "2024-02-20 10:31 AM", location: "Payment Center", completed: true },
        { status: "In Workshop", date: "2024-02-20 2:15 PM", location: "Rustic Glow Workshop", completed: true },
        { status: "Quality Check", date: "2024-02-21 9:00 AM", location: "Rustic Glow Workshop", completed: true },
        { status: "Packaged", date: "2024-02-21 11:30 AM", location: "Rustic Glow Workshop", completed: true },
        { status: "Shipped", date: "2024-02-21 4:45 PM", location: "Local Post Office", completed: true },
        {
          status: "In Transit",
          date: "2024-02-22 8:20 AM",
          location: "Distribution Center - Chicago, IL",
          completed: true,
        },
        { status: "Out for Delivery", date: "2024-02-23 7:00 AM", location: "Local Delivery Center", completed: false },
        { status: "Delivered", date: "Expected by 6:00 PM", location: "Your Address", completed: false },
      ],
      items: [
        { name: "Country Kitchen", size: "Medium", quantity: 2 },
        { name: "Vanilla Dreams", size: "Large", quantity: 1 },
      ],
    }
    setSearchedOrder(mockOrder)
  }

  return (
    <div>
      {/* Page Header */}
      <section className="wood-gradient text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-script font-bold mb-4">Track Your Order</h1>
          <div className="w-32 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-amber-100 font-serif">Follow your candles on their journey to you</p>
        </div>
      </section>

      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Tracking Form */}
          <div className="bg-white rounded-3xl p-8 border-4 border-amber-200 vintage-shadow mb-12">
            <h2 className="text-3xl font-script font-bold text-amber-900 mb-6 text-center">
              Enter Tracking Information
            </h2>

            <form onSubmit={handleTrackOrder} className="max-w-2xl mx-auto">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number or order ID"
                  className="flex-1 px-6 py-4 border-3 border-amber-300 rounded-xl font-serif text-lg focus:border-amber-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="wood-gradient text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all font-serif"
                >
                  🔍 Track
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-amber-600 font-serif">
                Don't have a tracking number?
                <button
                  onClick={() => setCurrentPage("profile")}
                  className="text-amber-800 font-bold hover:underline ml-1"
                >
                  Check your account
                </button>
              </p>
            </div>
          </div>

          {/* Order Results */}
          {searchedOrder && (
            <div className="space-y-8">
              {/* Order Status Card */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 border-4 border-amber-200 vintage-shadow">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-script font-bold text-amber-900">Order #{searchedOrder.id}</h3>
                    <p className="text-amber-600 font-serif">Tracking: {searchedOrder.trackingNumber}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-lg">
                      📦 {searchedOrder.status.toUpperCase()}
                    </div>
                    <p className="text-amber-600 font-serif mt-2">
                      Estimated delivery: {searchedOrder.estimatedDelivery}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border-2 border-amber-200">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">📍</div>
                    <div>
                      <div className="font-bold text-amber-900 text-lg">Current Location</div>
                      <div className="text-amber-700 font-serif">{searchedOrder.currentLocation}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-3xl p-8 border-4 border-amber-200 vintage-shadow">
                <h4 className="text-2xl font-script font-bold text-amber-900 mb-8 text-center">Order Journey</h4>

                <div className="relative">
                  {searchedOrder.timeline.map((event: any, index: number) => (
                    <div key={index} className="flex items-start space-x-6 mb-8 last:mb-0">
                      <div className="relative">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${
                            event.completed
                              ? "bg-green-500 border-green-500 text-white"
                              : index === searchedOrder.timeline.findIndex((e: any) => !e.completed)
                                ? "bg-blue-500 border-blue-500 text-white animate-pulse"
                                : "bg-gray-200 border-gray-300 text-gray-500"
                          }`}
                        >
                          {event.completed ? "✓" : index + 1}
                        </div>
                        {index < searchedOrder.timeline.length - 1 && (
                          <div
                            className={`absolute top-12 left-1/2 transform -translate-x-1/2 w-1 h-16 ${
                              event.completed ? "bg-green-500" : "bg-gray-300"
                            }`}
                          ></div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className={`font-bold text-lg ${event.completed ? "text-green-800" : "text-gray-600"}`}>
                          {event.status}
                        </div>
                        <div className="text-amber-600 font-serif">{event.date}</div>
                        <div className="text-amber-700 text-sm font-serif">{event.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-3xl p-8 border-4 border-amber-200 vintage-shadow">
                <h4 className="text-2xl font-script font-bold text-amber-900 mb-6">Items in This Order</h4>

                <div className="space-y-4">
                  {searchedOrder.items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-amber-50 rounded-xl border border-amber-200"
                    >
                      <div className="text-3xl">🕯️</div>
                      <div className="flex-1">
                        <div className="font-bold text-amber-900">{item.name}</div>
                        <div className="text-amber-600 font-serif">
                          Size: {item.size} • Quantity: {item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Instructions */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border-4 border-blue-200">
                <h4 className="text-2xl font-script font-bold text-blue-900 mb-4">Delivery Information</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">📦</span>
                    <div>
                      <div className="font-bold text-blue-900">Package Details</div>
                      <div className="text-blue-700 font-serif">
                        Your candles are carefully wrapped in eco-friendly packaging
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🏠</span>
                    <div>
                      <div className="font-bold text-blue-900">Delivery Instructions</div>
                      <div className="text-blue-700 font-serif">
                        Package will be left in a safe location if you're not home
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">📞</span>
                    <div>
                      <div className="font-bold text-blue-900">Need Help?</div>
                      <div className="text-blue-700 font-serif">
                        Contact us at (555) 123-GLOW or hello@rusticglow.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Orders Section */}
          {currentUser && currentUser.orders.length > 0 && (
            <div className="mt-16">
              <h3 className="text-3xl font-script font-bold text-amber-900 mb-8 text-center">Your Recent Orders</h3>

              <div className="grid md:grid-cols-2 gap-6">
                {currentUser.orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl p-6 border-2 border-amber-200 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-bold text-amber-900 text-lg">Order #{order.id}</div>
                        <div className="text-amber-600 font-serif">{order.date}</div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </div>
                    </div>

                    <div className="text-amber-700 font-serif mb-4">
                      {order.items} items • ${order.total.toFixed(2)}
                    </div>

                    {order.trackingNumber && (
                      <button
                        onClick={() => {
                          setTrackingNumber(order.trackingNumber!)
                          handleTrackOrder({ preventDefault: () => {} } as React.FormEvent)
                        }}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-bold transition-colors font-serif"
                      >
                        🔍 Track This Order
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useContext } from "react"
import { AppContext } from "@/contexts/app-context"

const sampleOrders = [
  {
    id: 1001,
    customer: "John Doe",
    email: "john@example.com",
    date: "2024-01-15",
    total: 84.99,
    status: "pending",
    items: 3,
    priority: "high",
    timeAgo: "2 hours ago",
    products: ["Country Kitchen", "Vanilla Dreams", "Ocean Breeze"],
  },
  {
    id: 1002,
    customer: "Jane Smith",
    email: "jane@example.com",
    date: "2024-01-20",
    total: 156.75,
    status: "pending",
    items: 5,
    priority: "urgent",
    timeAgo: "6 hours ago",
    products: ["Cabin Retreat", "Spiced Chai"],
  },
  {
    id: 1003,
    customer: "Mike Johnson",
    email: "mike@example.com",
    date: "2024-01-22",
    total: 42.0,
    status: "processing",
    items: 1,
    priority: "normal",
    timeAgo: "1 day ago",
    products: ["Garden Fresh"],
  },
  {
    id: 1004,
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    date: "2024-01-25",
    total: 98.25,
    status: "shipped",
    items: 4,
    priority: "normal",
    timeAgo: "3 days ago",
    products: ["Country Kitchen", "Cabin Retreat"],
  },
  {
    id: 1005,
    customer: "David Brown",
    email: "david@example.com",
    date: "2024-01-26",
    total: 67.5,
    status: "delivered",
    items: 2,
    priority: "normal",
    timeAgo: "1 week ago",
    products: ["Vanilla Dreams"],
  },
]

export default function AdminOrdersPage() {
  const { setCurrentPage, showNotification } = useContext(AppContext)
  const [activeFilter, setActiveFilter] = useState("needs-action")

  const filterOrders = (filter: string) => {
    switch (filter) {
      case "needs-action":
        return sampleOrders.filter((order) => ["pending", "processing"].includes(order.status))
      case "urgent":
        return sampleOrders.filter(
          (order) => order.priority === "urgent" || (order.status === "pending" && order.timeAgo.includes("hours")),
        )
      case "pending":
        return sampleOrders.filter((order) => order.status === "pending")
      case "processing":
        return sampleOrders.filter((order) => order.status === "processing")
      case "shipped":
        return sampleOrders.filter((order) => order.status === "shipped")
      case "completed":
        return sampleOrders.filter((order) => order.status === "delivered")
      default:
        return sampleOrders
    }
  }

  const filteredOrders = filterOrders(activeFilter)
  const pendingCount = sampleOrders.filter((o) => o.status === "pending").length
  const urgentCount = sampleOrders.filter((o) => o.priority === "urgent").length

  const handleBulkAction = (action: string) => {
    const actionableOrders = filteredOrders.filter((order) =>
      action.includes("Processing")
        ? order.status === "pending"
        : action.includes("Shipped")
          ? order.status === "processing"
          : true,
    )

    if (actionableOrders.length === 0) {
      showNotification("No orders available for this action", "error")
      return
    }
    showNotification(`${action} applied to ${actionableOrders.length} orders`)
  }

  const handleQuickStatusChange = (orderId: number, newStatus: string) => {
    showNotification(`Order #${orderId} marked as ${newStatus}`)
  }

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500 shadow-lg shadow-red-100"
      case "high":
        return "bg-gradient-to-br from-orange-50 to-yellow-50 border-l-4 border-orange-500 shadow-lg shadow-orange-100"
      case "normal":
        return "bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-amber-500 shadow-lg shadow-amber-100"
      default:
        return "bg-gradient-to-br from-amber-50 to-yellow-50 border-l-4 border-amber-400 shadow-lg shadow-amber-100"
    }
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: {
        bg: "bg-gradient-to-r from-red-600 to-red-700",
        text: "text-white",
        icon: "⏳",
        pulse: "animate-pulse",
      },
      processing: {
        bg: "bg-gradient-to-r from-yellow-600 to-orange-600",
        text: "text-white",
        icon: "⚡",
        pulse: "",
      },
      shipped: {
        bg: "bg-gradient-to-r from-blue-600 to-blue-700",
        text: "text-white",
        icon: "🚚",
        pulse: "",
      },
      delivered: {
        bg: "bg-gradient-to-r from-green-600 to-green-700",
        text: "text-white",
        icon: "✅",
        pulse: "",
      },
    }
    return badges[status as keyof typeof badges] || badges.pending
  }

  return (
    <div className="min-h-screen paper-texture">
      {/* Rustic Header with Wood Gradient */}
      <section className="wood-gradient text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <div className="relative">
                <div className="bg-amber-900/30 p-6 rounded-3xl border-4 border-amber-400/50 vintage-shadow backdrop-blur-sm">
                  <div className="text-5xl candle-flicker">📦</div>
                </div>
              </div>
              <div>
                <h1 className="text-6xl font-script font-bold text-yellow-100 mb-3">Order Workshop</h1>
                <div className="w-32 h-1 bg-yellow-400 mb-4"></div>
                <div className="flex items-center space-x-6 text-amber-100 font-serif">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="text-lg">{pendingCount} orders awaiting craft</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                    <span className="text-lg">{urgentCount} urgent requests</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-amber-900/40 backdrop-blur-sm px-6 py-4 rounded-2xl border-2 border-amber-400/50 vintage-shadow">
                <div className="text-3xl font-bold text-yellow-100">{pendingCount}</div>
                <div className="text-sm text-amber-200 font-serif">Need Attention</div>
              </div>
              <button
                onClick={() => setCurrentPage("admin-panel")}
                className="bg-yellow-600 hover:bg-yellow-700 px-8 py-4 rounded-2xl font-bold text-white transition-all vintage-shadow hover:scale-105 font-serif"
              >
                ← Back to Workshop
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Rustic Action Bar */}
        <div className="bg-amber-50 rounded-3xl p-8 mb-12 border-4 border-amber-200 vintage-shadow">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleBulkAction("Mark as Processing")}
                className="group wood-gradient hover:shadow-xl text-white px-8 py-4 rounded-2xl font-bold font-serif transition-all transform hover:scale-105 vintage-shadow flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-amber-900/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <span className="text-lg">⚡</span>
                </div>
                <span>Start Crafting All Pending</span>
              </button>

              <button
                onClick={() => handleBulkAction("Mark as Shipped")}
                className="group bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-8 py-4 rounded-2xl font-bold font-serif transition-all transform hover:scale-105 vintage-shadow flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <span className="text-lg">🚚</span>
                </div>
                <span>Ship All Ready Orders</span>
              </button>

              <button
                onClick={() => handleBulkAction("Send Tracking")}
                className="group bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-white px-8 py-4 rounded-2xl font-bold font-serif transition-all transform hover:scale-105 vintage-shadow flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-lg">📧</span>
                </div>
                <span>Send All Tracking Updates</span>
              </button>
            </div>
          </div>
        </div>

        {/* Rustic Filter Tabs */}
        <div className="bg-amber-100 rounded-3xl p-4 mb-12 border-4 border-amber-300 vintage-shadow">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              {
                id: "pending",
                label: "Order Queue",
                count: pendingCount,
                gradient: "from-yellow-700 to-orange-700",
                icon: "⏳",
              },
              {
                id: "urgent",
                label: "Rush Orders",
                count: urgentCount,
                gradient: "from-orange-700 to-red-700",
                icon: "⚠️",
              },
              {
                id: "needs-action",
                label: "Needs Crafting",
                count: pendingCount + 1,
                gradient: "from-red-700 to-red-800",
                icon: "🔥",
              },
              { id: "processing", label: "In Workshop", count: 1, gradient: "from-blue-700 to-blue-800", icon: "⚡" },
              { id: "shipped", label: "En Route", count: 1, gradient: "from-indigo-700 to-purple-700", icon: "🚚" },
              { id: "completed", label: "Delivered", count: 1, gradient: "from-green-700 to-green-800", icon: "✅" },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`relative px-4 py-4 rounded-2xl font-bold font-serif transition-all duration-300 transform hover:scale-105 vintage-shadow min-h-[80px] flex flex-col items-center justify-center text-center ${
                  activeFilter === filter.id
                    ? `bg-gradient-to-r ${filter.gradient} text-white shadow-2xl scale-105`
                    : "bg-amber-50 text-amber-900 hover:bg-white border-2 border-amber-200"
                }`}
              >
                {/* Count Badge - Positioned absolutely for consistent layout */}
                {filter.count > 0 && (
                  <div
                    className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold min-w-[24px] h-6 flex items-center justify-center ${
                      activeFilter === filter.id
                        ? "bg-white/30 text-white"
                        : "bg-gradient-to-r from-amber-200 to-orange-200 text-amber-900"
                    }`}
                  >
                    {filter.count}
                  </div>
                )}

                {/* Icon */}
                <div className="text-2xl mb-2">{filter.icon}</div>

                {/* Label */}
                <div className="text-sm leading-tight">{filter.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Rustic Order Cards */}
        <div className="space-y-6">
          {filteredOrders.map((order, index) => {
            const statusBadge = getStatusBadge(order.status)
            return (
              <div
                key={order.id}
                className={`${getPriorityStyle(order.priority)} rounded-3xl p-8 border-4 border-amber-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 order-card-animate`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-16 h-16 wood-gradient rounded-2xl flex items-center justify-center text-2xl vintage-shadow">
                          <span className="text-yellow-100">👤</span>
                        </div>
                        {order.priority === "urgent" && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center animate-pulse vintage-shadow">
                            <span className="text-white text-xs font-bold">!</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="text-2xl font-script font-bold text-amber-900">#{order.id}</h3>
                          <div
                            className={`${statusBadge.bg} ${statusBadge.text} px-4 py-2 rounded-xl font-bold text-sm flex items-center space-x-2 ${statusBadge.pulse} vintage-shadow font-serif`}
                          >
                            <span>{statusBadge.icon}</span>
                            <span className="capitalize">{order.status}</span>
                          </div>
                          {order.priority === "urgent" && (
                            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse vintage-shadow font-serif">
                              RUSH ORDER
                            </div>
                          )}
                        </div>
                        <div className="text-amber-900 font-bold font-serif mb-1">{order.customer}</div>
                        <div className="text-amber-700 text-sm font-serif">
                          {order.email} • {order.timeAgo}
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xs text-amber-600 font-serif">Candles:</span>
                          <div className="flex flex-wrap gap-1">
                            {order.products.slice(0, 2).map((product, idx) => (
                              <span
                                key={idx}
                                className="bg-amber-200 px-2 py-1 rounded-lg text-xs text-amber-900 font-serif"
                              >
                                {product}
                              </span>
                            ))}
                            {order.products.length > 2 && (
                              <span className="bg-amber-300 px-2 py-1 rounded-lg text-xs text-amber-900 font-serif">
                                +{order.products.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-bold text-amber-900 mb-1 font-script">${order.total.toFixed(2)}</div>
                    <div className="text-sm text-amber-700 bg-amber-200 px-3 py-1 rounded-full font-serif">
                      {order.items} items
                    </div>
                  </div>
                </div>

                {/* Rustic Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-6 border-t-2 border-amber-200">
                  {order.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleQuickStatusChange(order.id, "processing")}
                        className="group wood-gradient hover:shadow-xl text-white px-6 py-3 rounded-xl font-bold font-serif transition-all transform hover:scale-105 vintage-shadow flex items-center space-x-2"
                      >
                        <div className="w-6 h-6 bg-amber-900/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                          <span className="text-sm">⚡</span>
                        </div>
                        <span>Start Crafting</span>
                      </button>
                      <button
                        onClick={() => showNotification(`Viewing order #${order.id} details`)}
                        className="group bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-6 py-3 rounded-xl font-bold font-serif transition-all transform hover:scale-105 vintage-shadow flex items-center space-x-2"
                      >
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-sm">👁️</span>
                        </div>
                        <span>View Details</span>
                      </button>
                    </>
                  )}
                  {order.status === "processing" && (
                    <>
                      <button
                        onClick={() => handleQuickStatusChange(order.id, "shipped")}
                        className="group bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-6 py-3 rounded-xl font-bold font-serif transition-all transform hover:scale-105 vintage-shadow flex items-center space-x-2"
                      >
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                          <span className="text-sm">🚚</span>
                        </div>
                        <span>Ready to Ship</span>
                      </button>
                      <button
                        onClick={() => showNotification(`Printing shipping label for order #${order.id}`)}
                        className="group bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-6 py-3 rounded-xl font-bold font-serif transition-all transform hover:scale-105 vintage-shadow flex items-center space-x-2"
                      >
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-sm">🖨️</span>
                        </div>
                        <span>Print Shipping Label</span>
                      </button>
                    </>
                  )}
                  {order.status === "shipped" && (
                    <button
                      onClick={() => showNotification(`Tracking info sent for order #${order.id}`)}
                      className="group bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-white px-6 py-3 rounded-xl font-bold font-serif transition-all transform hover:scale-105 vintage-shadow flex items-center space-x-2"
                    >
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-sm">📧</span>
                      </div>
                      <span>Send Tracking</span>
                    </button>
                  )}
                  <button
                    onClick={() => showNotification(`Contacting ${order.customer}`)}
                    className="group bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-800 hover:to-purple-900 text-white px-6 py-3 rounded-xl font-bold font-serif transition-all transform hover:scale-105 vintage-shadow flex items-center space-x-2"
                  >
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-sm">💬</span>
                    </div>
                    <span>Contact Customer</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-24">
            <div className="relative mb-8">
              <div className="w-32 h-32 wood-gradient rounded-full mx-auto flex items-center justify-center vintage-shadow">
                <span className="text-6xl candle-flicker">🎉</span>
              </div>
            </div>
            <h3 className="text-4xl font-script font-bold text-amber-900 mb-4">Workshop is all caught up!</h3>
            <p className="text-xl text-amber-700 max-w-md mx-auto font-serif">
              No orders in this category need your craftsmanship right now. Well done, artisan! 🕯️
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .order-card-animate {
          animation-name: slideInUp;
          animation-duration: 0.6s;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
          opacity: 0;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

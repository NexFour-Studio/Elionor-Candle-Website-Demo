"use client"

import { useState, useContext } from "react"
import { AppContext } from "@/contexts/app-context"

export default function AdminPanelPage() {
  const { currentUser, isAdmin, setCurrentPage, showNotification } = useContext(AppContext)
  const [activeAdminSection, setActiveAdminSection] = useState("dashboard")

  // Redirect non-admin users
  if (!currentUser || !isAdmin) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-3xl font-script text-amber-900 mb-4">Access Denied</h2>
        <p className="text-amber-700 font-serif mb-6">You don't have permission to access this page.</p>
        <button
          onClick={() => setCurrentPage("home")}
          className="wood-gradient text-white px-6 py-3 rounded-lg font-bold"
        >
          Go Home
        </button>
      </div>
    )
  }

  const handleAdminAction = (action: string) => {
    if (action === "orders") {
      setCurrentPage("admin-orders")
    } else {
      setActiveAdminSection(action)
    }
  }

  const renderAdminContent = () => {
    switch (activeAdminSection) {
      case "products":
        return <ProductManagement />
      case "customers":
        return <CustomerManagement />
      case "analytics":
        return <AnalyticsPanel />
      case "settings":
        return <SiteSettings />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Enhanced Header */}
      <section className="bg-gradient-to-r from-amber-800 via-amber-700 to-orange-700 text-white py-12 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <div className="text-4xl">🔧</div>
              </div>
              <div>
                <h1 className="text-5xl font-script font-bold mb-2">Admin Dashboard</h1>
                <p className="text-xl text-amber-100 font-serif flex items-center">
                  <span className="mr-2">👋</span>
                  Welcome back, {currentUser.firstName}!
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <div className="text-sm text-amber-100">Last login</div>
                <div className="font-bold">Today, 9:30 AM</div>
              </div>
              <button
                onClick={() => setCurrentPage("home")}
                className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-bold transition-all backdrop-blur-sm border border-white/20"
              >
                ← Back to Shop
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="group bg-white p-6 rounded-2xl border border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-100 p-3 rounded-xl group-hover:bg-red-200 transition-colors">
                <div className="text-2xl">📦</div>
              </div>
              <div className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full font-bold">URGENT</div>
            </div>
            <div className="text-3xl font-bold text-red-800 mb-1">24</div>
            <div className="text-red-600 font-serif">Pending Orders</div>
            <div className="mt-3 text-xs text-red-500">↑ 12% from yesterday</div>
          </div>

          <div className="group bg-white p-6 rounded-2xl border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl group-hover:bg-green-200 transition-colors">
                <div className="text-2xl">👥</div>
              </div>
              <div className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full font-bold">GROWING</div>
            </div>
            <div className="text-3xl font-bold text-green-800 mb-1">1,247</div>
            <div className="text-green-600 font-serif">Total Customers</div>
            <div className="mt-3 text-xs text-green-500">↑ 8% this month</div>
          </div>

          <div className="group bg-white p-6 rounded-2xl border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-200 transition-colors">
                <div className="text-2xl">🕯️</div>
              </div>
              <div className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-bold">ACTIVE</div>
            </div>
            <div className="text-3xl font-bold text-blue-800 mb-1">156</div>
            <div className="text-blue-600 font-serif">Products</div>
            <div className="mt-3 text-xs text-blue-500">12 low stock items</div>
          </div>

          <div className="group bg-white p-6 rounded-2xl border border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-xl group-hover:bg-yellow-200 transition-colors">
                <div className="text-2xl">💰</div>
              </div>
              <div className="text-xs bg-yellow-50 text-yellow-600 px-2 py-1 rounded-full font-bold">TARGET</div>
            </div>
            <div className="text-3xl font-bold text-yellow-800 mb-1">$12,450</div>
            <div className="text-yellow-600 font-serif">Monthly Revenue</div>
            <div className="mt-3 text-xs text-yellow-500">Goal: $15,000</div>
          </div>
        </div>

        {/* Sidebar + Content Layout */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 sticky top-8">
              <h3 className="text-xl font-script font-bold text-amber-900 mb-6 flex items-center">
                <span className="mr-3">🧭</span>
                Navigation
              </h3>
              <nav className="space-y-2">
                {[
                  { id: "dashboard", label: "Dashboard", icon: "📊", description: "Overview & insights" },
                  { id: "orders", label: "Orders", icon: "📦", description: "Manage all orders" },
                  { id: "products", label: "Products", icon: "🕯️", description: "Inventory management" },
                  { id: "customers", label: "Customers", icon: "👥", description: "Customer database" },
                  { id: "analytics", label: "Analytics", icon: "📈", description: "Reports & metrics" },
                  { id: "settings", label: "Settings", icon: "⚙️", description: "Site configuration" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      item.id === "orders" ? handleAdminAction("orders") : setActiveAdminSection(item.id)
                    }
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                      activeAdminSection === item.id
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                        : "hover:bg-amber-50 text-amber-800"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{item.icon}</span>
                      <div className="flex-1">
                        <div className="font-bold font-serif">{item.label}</div>
                        <div
                          className={`text-xs ${activeAdminSection === item.id ? "text-amber-100" : "text-amber-600"}`}
                        >
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-amber-100 overflow-hidden">
              {renderAdminContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced Admin Dashboard Component - Now focused on quick actions and overview
function AdminDashboard() {
  const { setCurrentPage, showNotification } = useContext(AppContext)

  const handleQuickAction = (action: string) => {
    if (action === "orders") {
      setCurrentPage("admin-orders")
    } else {
      showNotification(`${action} feature coming soon!`)
    }
  }

  // Quick actions are now focused on specific tasks, not navigation
  const quickActionItems = [
    {
      id: "add-product",
      title: "Add New Product",
      description: "Create a new candle listing",
      icon: "➕",
      gradient: "from-green-500 to-green-600",
      action: () => handleQuickAction("add-product"),
    },
    {
      id: "process-orders",
      title: "Process Orders",
      description: "Handle pending orders quickly",
      icon: "⚡",
      gradient: "from-blue-500 to-blue-600",
      action: () => handleQuickAction("orders"),
    },
    {
      id: "low-stock",
      title: "Restock Alert",
      description: "Update low inventory items",
      icon: "⚠️",
      gradient: "from-orange-500 to-orange-600",
      action: () => handleQuickAction("restock"),
    },
    {
      id: "customer-support",
      title: "Support Tickets",
      description: "Respond to customer inquiries",
      icon: "💬",
      gradient: "from-purple-500 to-purple-600",
      action: () => handleQuickAction("support"),
    },
    {
      id: "create-promotion",
      title: "New Promotion",
      description: "Launch discount campaign",
      icon: "🎯",
      gradient: "from-red-500 to-red-600",
      action: () => handleQuickAction("promotion"),
    },
    {
      id: "export-data",
      title: "Export Reports",
      description: "Download sales & analytics",
      icon: "📊",
      gradient: "from-indigo-500 to-indigo-600",
      action: () => handleQuickAction("export"),
    },
  ]

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-script font-bold text-amber-900 mb-2">Dashboard Overview</h2>
        <p className="text-amber-600 font-serif">Quick actions and recent activity at a glance</p>
      </div>

      {/* Quick Actions Grid */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-script font-bold text-amber-900 flex items-center">
            <span className="mr-3">⚡</span>
            Quick Actions
          </h3>
          <div className="text-sm text-amber-600 font-serif">Click to perform common tasks</div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActionItems.map((item) => (
            <div
              key={item.id}
              onClick={item.action}
              className="group bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`bg-gradient-to-r ${item.gradient} p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <div className="text-2xl">{item.icon}</div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-bold">CLICK</div>
                </div>
              </div>
              <h4 className="text-lg font-script font-bold text-gray-800 mb-2 group-hover:text-amber-900 transition-colors">
                {item.title}
              </h4>
              <p className="text-gray-600 font-serif text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-script font-bold text-amber-900 flex items-center">
                <span className="mr-3">📋</span>
                Recent Orders
              </h3>
              <button
                onClick={() => setCurrentPage("admin-orders")}
                className="text-amber-600 hover:text-amber-800 font-serif text-sm flex items-center hover:underline"
              >
                View All <span className="ml-1">→</span>
              </button>
            </div>
            <div className="space-y-4">
              {[
                { id: 1001, customer: "John Doe", total: 84.99, status: "delivered", time: "2 hours ago" },
                { id: 1002, customer: "Jane Smith", total: 156.75, status: "processing", time: "4 hours ago" },
                { id: 1003, customer: "Mike Johnson", total: 42.0, status: "shipped", time: "6 hours ago" },
              ].map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-4 rounded-xl border border-amber-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="bg-amber-100 p-2 rounded-lg">
                        <div className="text-lg">📦</div>
                      </div>
                      <div>
                        <div className="font-bold text-amber-900">#{order.id}</div>
                        <div className="text-sm text-amber-600">
                          {order.customer} • {order.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-amber-800">${order.total.toFixed(2)}</div>
                      <div
                        className={`text-xs px-3 py-1 rounded-full capitalize font-bold ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Stats */}
        <div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
            <h3 className="text-2xl font-script font-bold text-blue-900 mb-6 flex items-center">
              <span className="mr-3">📊</span>
              Today's Stats
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <div className="text-lg">💰</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">Revenue</div>
                      <div className="text-xs text-gray-500">vs. yesterday</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">$1,234</div>
                    <div className="text-xs text-green-500">↑ 15%</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <div className="text-lg">📦</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">New Orders</div>
                      <div className="text-xs text-gray-500">last 24 hours</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">18</div>
                    <div className="text-xs text-blue-500">↑ 3</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <div className="text-lg">👥</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">New Customers</div>
                      <div className="text-xs text-gray-500">this week</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-purple-600">7</div>
                    <div className="text-xs text-purple-500">↑ 2</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-12 bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-2xl border border-gray-200">
        <h4 className="text-xl font-script font-bold text-gray-800 mb-6 flex items-center">
          <span className="mr-3">🔔</span>
          Recent Activity
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { action: "Updated product inventory", time: "2 minutes ago", icon: "📦", type: "inventory" },
            { action: "Processed 3 new orders", time: "15 minutes ago", icon: "✅", type: "orders" },
            { action: "Responded to customer inquiry", time: "1 hour ago", icon: "💬", type: "support" },
            { action: "Generated monthly sales report", time: "3 hours ago", icon: "📊", type: "reports" },
          ].map((activity, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    activity.type === "inventory"
                      ? "bg-orange-100"
                      : activity.type === "orders"
                        ? "bg-green-100"
                        : activity.type === "support"
                          ? "bg-blue-100"
                          : "bg-purple-100"
                  }`}
                >
                  <div className="text-lg">{activity.icon}</div>
                </div>
                <div className="flex-1">
                  <div className="font-serif text-gray-800">{activity.action}</div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Keep other components the same...
function ProductManagement() {
  const { products } = useContext(AppContext)

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-script font-bold text-amber-900">Product Management</h3>
        <button className="wood-gradient text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-shadow">
          + Add New Product
        </button>
      </div>

      <div className="grid gap-4">
        {products.slice(0, 4).map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200"
          >
            <div className="flex items-center space-x-4">
              <div className="text-3xl">🕯️</div>
              <div>
                <div className="font-bold text-amber-900">{product.name}</div>
                <div className="text-sm text-amber-600">Stock: {product.stock.medium} medium</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="font-bold text-amber-800">${product.price.medium}</div>
                <div
                  className={`text-xs px-2 py-1 rounded-full ${
                    product.stock.medium <= 5 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                  }`}
                >
                  {product.stock.medium <= 5 ? "Low Stock" : "In Stock"}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded bg-blue-50 hover:bg-blue-100 transition-colors">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800 px-3 py-1 rounded bg-red-50 hover:bg-red-100 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CustomerManagement() {
  const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", orders: 5, spent: 245.5, joined: "2023-06-20" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", orders: 12, spent: 567.25, joined: "2023-03-15" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", orders: 3, spent: 123.75, joined: "2023-11-08" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", orders: 8, spent: 389.0, joined: "2023-08-12" },
  ]

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-script font-bold text-amber-900">Customer Management</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search customers..."
            className="px-4 py-2 border-2 border-amber-300 rounded-lg font-serif focus:border-amber-500 focus:outline-none"
          />
          <button className="wood-gradient text-white px-6 py-2 rounded-lg font-bold hover:shadow-lg transition-shadow">
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-amber-50">
              <th className="px-6 py-4 text-left font-bold text-amber-900">Customer</th>
              <th className="px-6 py-4 text-left font-bold text-amber-900">Orders</th>
              <th className="px-6 py-4 text-left font-bold text-amber-900">Total Spent</th>
              <th className="px-6 py-4 text-left font-bold text-amber-900">Joined</th>
              <th className="px-6 py-4 text-left font-bold text-amber-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-amber-100 hover:bg-amber-25">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-bold text-amber-900">{customer.name}</div>
                    <div className="text-sm text-amber-600">{customer.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-amber-700">{customer.orders}</td>
                <td className="px-6 py-4 font-bold text-amber-800">${customer.spent.toFixed(2)}</td>
                <td className="px-6 py-4 text-amber-700">{customer.joined}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                    <button className="text-green-600 hover:text-green-800 text-sm">Email</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AnalyticsPanel() {
  return (
    <div className="p-8">
      <h3 className="text-2xl font-script font-bold text-amber-900 mb-6">Analytics Dashboard</h3>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
          <h4 className="text-xl font-script font-bold text-amber-900 mb-4">Sales Overview</h4>
          <div className="h-48 flex items-center justify-center text-amber-600 font-serif">
            📈 Sales chart would go here
          </div>
        </div>

        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
          <h4 className="text-xl font-script font-bold text-amber-900 mb-4">Top Selling Products</h4>
          <div className="space-y-3">
            {[
              { name: "Country Kitchen", sales: 45, revenue: 1260 },
              { name: "Cabin Retreat", sales: 38, revenue: 1140 },
              { name: "Vanilla Dreams", sales: 32, revenue: 896 },
            ].map((product, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                <div>
                  <div className="font-bold text-amber-900">{product.name}</div>
                  <div className="text-sm text-amber-600">{product.sales} sold</div>
                </div>
                <div className="font-bold text-amber-800">${product.revenue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 text-center">
          <div className="text-2xl mb-2">📊</div>
          <div className="text-2xl font-bold text-amber-800">23.5%</div>
          <div className="text-amber-600">Conversion Rate</div>
        </div>
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 text-center">
          <div className="text-2xl mb-2">💰</div>
          <div className="text-2xl font-bold text-amber-800">$45.20</div>
          <div className="text-amber-600">Avg Order Value</div>
        </div>
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 text-center">
          <div className="text-2xl mb-2">🔄</div>
          <div className="text-2xl font-bold text-amber-800">18%</div>
          <div className="text-amber-600">Return Customers</div>
        </div>
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 text-center">
          <div className="text-2xl mb-2">⭐</div>
          <div className="text-2xl font-bold text-amber-800">4.8</div>
          <div className="text-amber-600">Avg Rating</div>
        </div>
      </div>
    </div>
  )
}

function SiteSettings() {
  const { showNotification } = useContext(AppContext)

  const handleSave = () => {
    showNotification("Settings saved successfully!")
  }

  return (
    <div className="p-8">
      <h3 className="text-2xl font-script font-bold text-amber-900 mb-6">Site Settings</h3>

      <div className="space-y-8">
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
          <h4 className="text-xl font-script font-bold text-amber-900 mb-4">General Settings</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-amber-900 font-bold mb-2">Site Name</label>
              <input
                type="text"
                defaultValue="Rustic Glow"
                className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg font-serif focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-amber-900 font-bold mb-2">Contact Email</label>
              <input
                type="email"
                defaultValue="hello@rusticglow.com"
                className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg font-serif focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
          <h4 className="text-xl font-script font-bold text-amber-900 mb-4">Shipping Settings</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-amber-900 font-bold mb-2">Free Shipping Threshold</label>
              <input
                type="number"
                defaultValue="75"
                className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg font-serif focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-amber-900 font-bold mb-2">Standard Shipping Rate</label>
              <input
                type="number"
                step="0.01"
                defaultValue="8.99"
                className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg font-serif focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
          <h4 className="text-xl font-script font-bold text-amber-900 mb-4">Tax Settings</h4>
          <div>
            <label className="block text-amber-900 font-bold mb-2">Tax Rate (%)</label>
            <input
              type="number"
              step="0.01"
              defaultValue="8.00"
              className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg font-serif focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="wood-gradient text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-shadow"
        >
          Save Settings
        </button>
      </div>
    </div>
  )
}

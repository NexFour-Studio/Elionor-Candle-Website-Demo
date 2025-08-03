"use client"

import type React from "react"

import { useState, useContext } from "react"
import { AppContext } from "@/contexts/app-context"

export default function ProfilePage() {
  const { currentUser, isAdmin, logout, setCurrentPage } = useContext(AppContext)
  const [activeSection, setActiveSection] = useState("overview")

  if (!currentUser) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-3xl font-script text-amber-900 mb-4">Please log in to view your profile</h2>
        <button
          onClick={() => setCurrentPage("home")}
          className="wood-gradient text-white px-6 py-3 rounded-lg font-bold"
        >
          Go Home
        </button>
      </div>
    )
  }

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <ProfileOverview />
      case "settings":
        return <ProfileSettings />
      case "orders":
        return <OrderHistory />
      case "addresses":
        return <AddressesSection />
      default:
        return <ProfileOverview />
    }
  }

  return (
    <div>
      {/* Page Header */}
      <section className="wood-gradient text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-script font-bold mb-4">My Account</h1>
          <div className="w-32 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-amber-100 font-serif">Manage your profile and orders</p>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Profile Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-amber-50 rounded-2xl p-6 border-4 border-amber-200 vintage-shadow sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">👤</div>
                  <h3 className="text-xl font-script font-bold text-amber-900">
                    {currentUser.firstName} {currentUser.lastName}
                  </h3>
                  <p className="text-amber-600 text-sm">{currentUser.email}</p>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveSection("overview")}
                    className={`profile-nav-btn w-full text-left px-4 py-3 rounded-lg font-serif hover:bg-amber-200 transition-colors ${
                      activeSection === "overview" ? "active bg-amber-200 text-amber-900 font-bold" : ""
                    }`}
                  >
                    📊 Account Overview
                  </button>
                  <button
                    onClick={() => setActiveSection("settings")}
                    className={`profile-nav-btn w-full text-left px-4 py-3 rounded-lg font-serif hover:bg-amber-200 transition-colors ${
                      activeSection === "settings" ? "active bg-amber-200 text-amber-900 font-bold" : ""
                    }`}
                  >
                    ⚙️ Profile Settings
                  </button>
                  <button
                    onClick={() => setActiveSection("orders")}
                    className={`profile-nav-btn w-full text-left px-4 py-3 rounded-lg font-serif hover:bg-amber-200 transition-colors ${
                      activeSection === "orders" ? "active bg-amber-200 text-amber-900 font-bold" : ""
                    }`}
                  >
                    📦 Order History
                  </button>
                  <button
                    onClick={() => setActiveSection("addresses")}
                    className={`profile-nav-btn w-full text-left px-4 py-3 rounded-lg font-serif hover:bg-amber-200 transition-colors ${
                      activeSection === "addresses" ? "active bg-amber-200 text-amber-900 font-bold" : ""
                    }`}
                  >
                    📍 Addresses
                  </button>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 rounded-lg font-serif hover:bg-red-100 text-red-600 transition-colors"
                  >
                    🚪 Sign Out
                  </button>
                </nav>
              </div>
            </div>

            {/* Profile Content Area */}
            <div className="md:col-span-3">{renderSection()}</div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ProfileOverview() {
  const { currentUser } = useContext(AppContext)
  const orders = currentUser?.orders || []
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0)

  return (
    <div>
      <h2 className="text-3xl font-script font-bold text-amber-900 mb-6">Account Overview</h2>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200 text-center">
          <div className="text-3xl mb-2">📦</div>
          <div className="text-2xl font-bold text-amber-800">{orders.length}</div>
          <div className="text-amber-600">Total Orders</div>
        </div>
        <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200 text-center">
          <div className="text-3xl mb-2">💰</div>
          <div className="text-2xl font-bold text-amber-800">${totalSpent.toFixed(2)}</div>
          <div className="text-amber-600">Total Spent</div>
        </div>
        <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200 text-center">
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-2xl font-bold text-amber-800">Gold</div>
          <div className="text-amber-600">Member Status</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border-2 border-amber-200 mb-6">
        <h3 className="text-xl font-bold text-amber-900 mb-4">Recent Orders</h3>
        {orders.length === 0 ? (
          <p className="text-amber-600 font-serif">No recent orders</p>
        ) : (
          <div className="space-y-3">
            {orders
              .slice(-3)
              .reverse()
              .map((order) => (
                <div key={order.id} className="flex justify-between items-center p-4 bg-amber-50 rounded-lg">
                  <div>
                    <div className="font-bold text-amber-900">Order #{order.id}</div>
                    <div className="text-sm text-amber-600">
                      {order.date} • {order.items} items
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-amber-800">${order.total.toFixed(2)}</div>
                    <div className="text-sm text-amber-600 capitalize">{order.status}</div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ProfileSettings() {
  const { currentUser, showNotification } = useContext(AppContext)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    showNotification("Profile settings updated successfully!")
  }

  return (
    <div>
      <h2 className="text-3xl font-script font-bold text-amber-900 mb-6">Profile Settings</h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-2xl border-2 border-amber-200">
          <h3 className="text-xl font-bold text-amber-900 mb-4">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              defaultValue={currentUser?.firstName}
              placeholder="First Name"
              className="px-4 py-3 border-2 border-amber-300 rounded-lg font-serif focus:border-amber-500 focus:outline-none"
            />
            <input
              type="text"
              defaultValue={currentUser?.lastName}
              placeholder="Last Name"
              className="px-4 py-3 border-2 border-amber-300 rounded-lg font-serif focus:border-amber-500 focus:outline-none"
            />
          </div>
          <input
            type="email"
            defaultValue={currentUser?.email}
            placeholder="Email Address"
            className="w-full mt-4 px-4 py-3 border-2 border-amber-300 rounded-lg font-serif focus:border-amber-500 focus:outline-none"
          />
          <input
            type="tel"
            defaultValue={currentUser?.phone}
            placeholder="Phone Number"
            className="w-full mt-4 px-4 py-3 border-2 border-amber-300 rounded-lg font-serif focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-amber-200">
          <h3 className="text-xl font-bold text-amber-900 mb-4">Change Password</h3>
          <input
            type="password"
            placeholder="Current Password"
            className="w-full mb-4 px-4 py-3 border-2 border-amber-300 rounded-lg font-serif focus:border-amber-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full mb-4 px-4 py-3 border-2 border-amber-300 rounded-lg font-serif focus:border-amber-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg font-serif focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-amber-200">
          <h3 className="text-xl font-bold text-amber-900 mb-4">Preferences</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-5 h-5 text-amber-600" />
              <span className="font-serif text-amber-700">Email notifications for new products</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-5 h-5 text-amber-600" />
              <span className="font-serif text-amber-700">SMS notifications for order updates</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-5 h-5 text-amber-600" />
              <span className="font-serif text-amber-700">Marketing emails and promotions</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="wood-gradient text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-shadow"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}

function OrderHistory() {
  const { currentUser } = useContext(AppContext)
  const orders = currentUser?.orders || []

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-script font-bold text-amber-900 mb-6">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-amber-600 font-serif">No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-2xl border-2 border-amber-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-amber-900">Order #{order.id}</h3>
                  <p className="text-amber-600">{order.date}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-amber-800">${order.total.toFixed(2)}</div>
                  <div className={`text-sm px-3 py-1 rounded-full ${getStatusColor(order.status)} capitalize`}>
                    {order.status}
                  </div>
                </div>
              </div>
              <div className="text-amber-700 font-serif">
                {order.items} items • Delivered to {currentUser?.address}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function AddressesSection() {
  const { currentUser } = useContext(AppContext)

  return (
    <div>
      <h2 className="text-3xl font-script font-bold text-amber-900 mb-6">Saved Addresses</h2>

      <div className="bg-white p-6 rounded-2xl border-2 border-amber-200 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-amber-900">Default Shipping Address</h3>
          <button className="text-amber-600 hover:text-amber-800 font-serif">Edit</button>
        </div>
        <div className="text-amber-700 font-serif">
          {currentUser?.address ? <p>{currentUser.address}</p> : <p>No default address set</p>}
        </div>
      </div>

      <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
        Add New Address
      </button>
    </div>
  )
}

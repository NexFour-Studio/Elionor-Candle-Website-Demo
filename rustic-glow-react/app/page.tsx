"use client"

import { useContext } from "react"
import Navigation from "@/components/navigation"
import HomePage from "@/components/pages/home-page"
import ShopPage from "@/components/pages/shop-page"
import AboutPage from "@/components/pages/about-page"
import ContactPage from "@/components/pages/contact-page"
import ProfilePage from "@/components/pages/profile-page"
import OrderTrackingPage from "@/components/pages/order-tracking-page"
import WishlistPage from "@/components/pages/wishlist-page"
import AdminOrdersPage from "@/components/pages/admin-orders-page"
import AdminPanelPage from "@/components/pages/admin-panel-page"
import CartModal from "@/components/modals/cart-modal"
import AccountModal from "@/components/modals/account-modal"
import QuickViewModal from "@/components/modals/quick-view-modal"
import CheckoutModal from "@/components/modals/checkout-modal"
import Footer from "@/components/footer"
import Newsletter from "@/components/newsletter"
import { AppProvider, AppContext } from "@/contexts/app-context"

export default function App() {
  return (
    <AppProvider>
      <div className="font-rustic paper-texture min-h-screen">
        <Navigation />
        <MainContent />
        <Newsletter />
        <Footer />
        <CartModal />
        <AccountModal />
        <QuickViewModal />
        <CheckoutModal />
      </div>
    </AppProvider>
  )
}

function MainContent() {
  const { currentPage } = useContext(AppContext)

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />
      case "shop":
        return <ShopPage />
      case "about":
        return <AboutPage />
      case "contact":
        return <ContactPage />
      case "profile":
        return <ProfilePage />
      case "order-tracking":
        return <OrderTrackingPage />
      case "wishlist":
        return <WishlistPage />
      case "admin-orders":
        return <AdminOrdersPage />
      case "admin-panel":
        return <AdminPanelPage />
      default:
        return <HomePage />
    }
  }

  return <main>{renderPage()}</main>
}

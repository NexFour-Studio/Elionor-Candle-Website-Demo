"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"

// Types
export interface Product {
  id: number
  name: string
  price: { small: number; medium: number; large: number }
  description: string
  category: string
  stock: { small: number; medium: number; large: number }
  featured: boolean
  popularity: number
  reviews: Review[]
  averageRating: number
  burnTime: { small: number; medium: number; large: number }
  ingredients: string[]
}

export interface Review {
  id: number
  customerName: string
  rating: number
  comment: string
  date: string
  verified: boolean
  helpful: number
}

export interface CartItem {
  productId: number
  name: string
  size: string
  price: number
  quantity: number
}

export interface User {
  id: number
  email: string
  password: string
  firstName: string
  lastName: string
  role: string
  phone?: string
  address?: string
  joinDate: string
  orders: Order[]
  loyaltyPoints: number
  preferences: {
    emailNotifications: boolean
    smsNotifications: boolean
    marketingEmails: boolean
  }
}

export interface Order {
  id: number
  date: string
  total: number
  status: string
  items: number
  customer?: string
  email?: string
  trackingNumber?: string
  estimatedDelivery?: string
  shippingAddress?: string
  orderItems?: CartItem[]
}

interface AppContextType {
  currentPage: string
  setCurrentPage: (page: string) => void
  products: Product[]
  cart: CartItem[]
  wishlist: number[]
  currentUser: User | null
  isAdmin: boolean
  showCartModal: boolean
  showAccountModal: boolean
  showQuickViewModal: boolean
  showCheckoutModal: boolean
  currentQuickViewProduct: Product | null
  searchTerm: string
  setSearchTerm: (term: string) => void
  addToCart: (productId: number, size: string, quantity: number) => void
  removeFromCart: (index: number) => void
  updateCartQuantity: (index: number, quantity: number) => void
  toggleCartModal: () => void
  toggleAccountModal: () => void
  toggleCheckoutModal: () => void
  openQuickView: (productId: number) => void
  closeQuickView: () => void
  login: (email: string, password: string) => boolean
  logout: () => void
  showNotification: (message: string, type?: string) => void
  addToWishlist: (productId: number) => void
  removeFromWishlist: (productId: number) => void
  addReview: (productId: number, review: Omit<Review, "id">) => void
}

export const AppContext = createContext<AppContextType>({} as AppContextType)

// Enhanced sample data with reviews
const products: Product[] = [
  {
    id: 1,
    name: "Country Kitchen",
    price: { small: 22, medium: 28, large: 34 },
    description:
      "Warm apple pie, cinnamon bark, and vanilla bean with hints of nutmeg and clove. Like grandma's kitchen on a Sunday morning.",
    category: "fruity",
    stock: { small: 15, medium: 8, large: 12 },
    featured: true,
    popularity: 95,
    averageRating: 4.8,
    burnTime: { small: 25, medium: 40, large: 60 },
    ingredients: ["Natural Soy Wax", "Cotton Wick", "Apple Pie Fragrance", "Cinnamon Essential Oil", "Vanilla Extract"],
    reviews: [
      {
        id: 1,
        customerName: "Sarah M.",
        rating: 5,
        comment:
          "Absolutely love this candle! It makes my whole house smell like a bakery. Burns evenly and lasts forever.",
        date: "2024-01-15",
        verified: true,
        helpful: 12,
      },
      {
        id: 2,
        customerName: "Mike R.",
        rating: 4,
        comment: "Great scent, very authentic apple pie smell. Only wish it was a bit stronger.",
        date: "2024-01-10",
        verified: true,
        helpful: 8,
      },
      {
        id: 3,
        customerName: "Jennifer L.",
        rating: 5,
        comment: "This is my third time ordering! Perfect for fall and winter. The quality is outstanding.",
        date: "2024-01-05",
        verified: true,
        helpful: 15,
      },
    ],
  },
  {
    id: 2,
    name: "Cabin Retreat",
    price: { small: 24, medium: 30, large: 36 },
    description:
      "Fresh cedar, pine needles, and crackling fireplace with undertones of leather and tobacco. Escape to the mountains.",
    category: "woody",
    stock: { small: 20, medium: 15, large: 10 },
    featured: true,
    popularity: 88,
    averageRating: 4.6,
    burnTime: { small: 25, medium: 40, large: 60 },
    ingredients: ["Natural Soy Wax", "Cotton Wick", "Cedar Essential Oil", "Pine Fragrance", "Tobacco Leaf Extract"],
    reviews: [
      {
        id: 4,
        customerName: "David K.",
        rating: 5,
        comment: "Feels like I'm in a cozy cabin! Perfect for winter evenings.",
        date: "2024-01-12",
        verified: true,
        helpful: 9,
      },
      {
        id: 5,
        customerName: "Lisa P.",
        rating: 4,
        comment: "Love the woodsy scent. Burns clean and the throw is excellent.",
        date: "2024-01-08",
        verified: true,
        helpful: 6,
      },
    ],
  },
  {
    id: 3,
    name: "Garden Fresh",
    price: { small: 20, medium: 26, large: 32 },
    description:
      "Fresh basil, lavender, and rosemary with hints of lemon verbena and morning dew. Brings the garden indoors.",
    category: "floral",
    stock: { small: 25, medium: 18, large: 14 },
    featured: true,
    popularity: 82,
    averageRating: 4.7,
    burnTime: { small: 25, medium: 40, large: 60 },
    ingredients: ["Natural Soy Wax", "Cotton Wick", "Lavender Essential Oil", "Basil Extract", "Lemon Verbena"],
    reviews: [
      {
        id: 6,
        customerName: "Emma T.",
        rating: 5,
        comment: "So refreshing! Like having a herb garden in my living room.",
        date: "2024-01-14",
        verified: true,
        helpful: 7,
      },
    ],
  },
  {
    id: 4,
    name: "Spiced Chai",
    price: { small: 23, medium: 29, large: 35 },
    description:
      "Warm cardamom, cinnamon, and black tea with notes of ginger and clove. Cozy autumn evenings in a candle.",
    category: "spicy",
    stock: { small: 12, medium: 6, large: 8 },
    featured: false,
    popularity: 76,
    averageRating: 4.5,
    burnTime: { small: 25, medium: 40, large: 60 },
    ingredients: ["Natural Soy Wax", "Cotton Wick", "Cardamom Essential Oil", "Cinnamon Bark", "Black Tea Extract"],
    reviews: [
      {
        id: 7,
        customerName: "Rachel W.",
        rating: 4,
        comment: "Perfect for tea lovers! Very cozy and warm scent.",
        date: "2024-01-11",
        verified: true,
        helpful: 5,
      },
    ],
  },
  {
    id: 5,
    name: "Ocean Breeze",
    price: { small: 21, medium: 27, large: 33 },
    description:
      "Fresh sea salt, driftwood, and ocean mist with hints of jasmine and white tea. Coastal tranquility at home.",
    category: "floral",
    stock: { small: 18, medium: 12, large: 9 },
    featured: false,
    popularity: 71,
    averageRating: 4.4,
    burnTime: { small: 25, medium: 40, large: 60 },
    ingredients: ["Natural Soy Wax", "Cotton Wick", "Sea Salt", "Jasmine Essential Oil", "White Tea Extract"],
    reviews: [
      {
        id: 8,
        customerName: "Tom H.",
        rating: 4,
        comment: "Reminds me of beach vacations. Very relaxing scent.",
        date: "2024-01-09",
        verified: true,
        helpful: 4,
      },
    ],
  },
  {
    id: 6,
    name: "Vanilla Dreams",
    price: { small: 22, medium: 28, large: 34 },
    description: "Rich Madagascar vanilla with caramel and sandalwood. Sweet dreams and warm embraces.",
    category: "fruity",
    stock: { small: 22, medium: 16, large: 11 },
    featured: false,
    popularity: 89,
    averageRating: 4.9,
    burnTime: { small: 25, medium: 40, large: 60 },
    ingredients: ["Natural Soy Wax", "Cotton Wick", "Madagascar Vanilla", "Caramel Extract", "Sandalwood Oil"],
    reviews: [
      {
        id: 9,
        customerName: "Anna S.",
        rating: 5,
        comment: "Best vanilla candle I've ever had! Not too sweet, perfectly balanced.",
        date: "2024-01-13",
        verified: true,
        helpful: 11,
      },
      {
        id: 10,
        customerName: "Chris B.",
        rating: 5,
        comment: "Amazing quality and the scent lasts for hours. Will definitely reorder!",
        date: "2024-01-07",
        verified: true,
        helpful: 8,
      },
    ],
  },
]

const sampleUsers: User[] = [
  {
    id: 1,
    email: "admin@rusticglow.com",
    password: "admin123",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    phone: "(555) 123-4567",
    address: "123 Admin St, City, State 12345",
    joinDate: "2023-01-15",
    loyaltyPoints: 0,
    orders: [],
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      marketingEmails: true,
    },
  },
  {
    id: 2,
    email: "john@example.com",
    password: "user123",
    firstName: "John",
    lastName: "Doe",
    role: "customer",
    phone: "(555) 987-6543",
    address: "456 Customer Ave, City, State 67890",
    joinDate: "2023-06-20",
    loyaltyPoints: 250,
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: true,
    },
    orders: [
      {
        id: 1001,
        date: "2024-01-15",
        total: 84.99,
        status: "delivered",
        items: 3,
        trackingNumber: "1Z999AA1234567890",
        estimatedDelivery: "2024-01-18",
        shippingAddress: "456 Customer Ave, City, State 67890",
      },
      {
        id: 1002,
        date: "2024-02-20",
        total: 56.5,
        status: "shipped",
        items: 2,
        trackingNumber: "1Z999AA1234567891",
        estimatedDelivery: "2024-02-23",
        shippingAddress: "456 Customer Ave, City, State 67890",
      },
    ],
  },
]

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState("home")
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [showCartModal, setShowCartModal] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)
  const [showQuickViewModal, setShowQuickViewModal] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [currentQuickViewProduct, setCurrentQuickViewProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const isAdmin = currentUser?.role === "admin"

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("rusticGlowCart")
    const savedWishlist = localStorage.getItem("rusticGlowWishlist")
    const savedUser = localStorage.getItem("rusticGlowUser")

    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
    if (savedUser) setCurrentUser(JSON.parse(savedUser))
  }, [])

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("rusticGlowCart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem("rusticGlowWishlist", JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("rusticGlowUser", JSON.stringify(currentUser))
    } else {
      localStorage.removeItem("rusticGlowUser")
    }
  }, [currentUser])

  const addToCart = (productId: number, size = "medium", quantity = 1) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === productId && item.size === size)

      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === productId && item.size === size ? { ...item, quantity: item.quantity + quantity } : item,
        )
      } else {
        return [
          ...prevCart,
          {
            productId,
            name: product.name,
            size,
            price: product.price[size as keyof typeof product.price],
            quantity,
          },
        ]
      }
    })

    showNotification(`${product.name} added to cart!`)
  }

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index))
  }

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index)
      return
    }

    setCart((prevCart) => prevCart.map((item, i) => (i === index ? { ...item, quantity } : item)))
  }

  const toggleCartModal = () => {
    setShowCartModal((prev) => !prev)
  }

  const toggleAccountModal = () => {
    setShowAccountModal((prev) => !prev)
  }

  const toggleCheckoutModal = () => {
    setShowCheckoutModal((prev) => !prev)
  }

  const openQuickView = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      setCurrentQuickViewProduct(product)
      setShowQuickViewModal(true)
    }
  }

  const closeQuickView = () => {
    setShowQuickViewModal(false)
    setCurrentQuickViewProduct(null)
  }

  const login = (email: string, password: string): boolean => {
    const user = sampleUsers.find((u) => u.email === email && u.password === password)
    if (user) {
      setCurrentUser(user)
      setShowAccountModal(false)
      showNotification(`Welcome back, ${user.firstName}!`)
      return true
    }
    return false
  }

  const logout = () => {
    setCurrentUser(null)
    setCurrentPage("home")
    showNotification("You have been logged out")
  }

  const addToWishlist = (productId: number) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId)
      } else {
        showNotification("Added to wishlist!")
        return [...prev, productId]
      }
    })
  }

  const removeFromWishlist = (productId: number) => {
    setWishlist((prev) => prev.filter((id) => id !== productId))
    showNotification("Removed from wishlist")
  }

  const addReview = (productId: number, review: Omit<Review, "id">) => {
    // In a real app, this would make an API call
    showNotification("Thank you for your review!")
  }

  const showNotification = (message: string, type = "success") => {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg font-bold text-white ${
      type === "error" ? "bg-red-500" : "bg-green-500"
    }`
    notification.textContent = message

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 3000)
  }

  const value: AppContextType = {
    currentPage,
    setCurrentPage,
    products,
    cart,
    wishlist,
    currentUser,
    isAdmin,
    showCartModal,
    showAccountModal,
    showQuickViewModal,
    showCheckoutModal,
    currentQuickViewProduct,
    searchTerm,
    setSearchTerm,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    toggleCartModal,
    toggleAccountModal,
    toggleCheckoutModal,
    openQuickView,
    closeQuickView,
    login,
    logout,
    showNotification,
    addToWishlist,
    removeFromWishlist,
    addReview,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

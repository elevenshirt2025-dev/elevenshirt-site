
"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  type: 'regular' | 'retro'
  size: 'S' | 'M' | 'L'
  excludedClubs?: string[]
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'size'>, size: 'S' | 'M' | 'L', excludedClubs?: string[]) => void
  removeItem: (id: string) => void
  clearCart: () => void
  getTotalPrice: () => number
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (item: Omit<CartItem, 'size'>, size: 'S' | 'M' | 'L', excludedClubs?: string[]) => {
    setItems(prevItems => {
      // Create unique ID based on item ID and size
      const uniqueId = `${item.id}-${size}`
      
      // Check if item with same ID and size already exists
      const existingItem = prevItems.find(i => i.id === uniqueId)
      if (existingItem) {
        // Don't add duplicate items for mystery boxes with same size
        return prevItems
      }
      
      const newItem: CartItem = {
        ...item,
        id: uniqueId,
        size,
        ...(excludedClubs && { excludedClubs })
      }
      
      return [...prevItems, newItem]
    })
  }

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0)
  }

  const getItemCount = () => {
    return items.length
  }

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      clearCart,
      getTotalPrice,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

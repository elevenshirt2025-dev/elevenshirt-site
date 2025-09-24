"use client"

import { ConvexAuthProvider } from "@convex-dev/auth/react"
import { ConvexReactClient } from "convex/react"
import { ReactNode } from "react"

// Only create the client if the URL is available
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convex) {
    // If Convex is not configured yet, just render children without the provider
    return <>{children}</>
  }

  return <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>
}

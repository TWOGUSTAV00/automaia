// Reference implementation for an SSR Next deployment.
// The live GitHub Pages/Cloudflare Pages build is exported as static HTML, so
// this file intentionally stays outside src/middleware.ts.
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES  = ['/login', '/register', '/forgot-password', '/explore']
const AUTH_ONLY_ROUTES = ['/feed', '/notifications', '/messages', '/settings']

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Security headers on every response
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://*.supabase.co wss://*.supabase.co;"
  )

  const { pathname } = request.nextUrl
  
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return response
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { 
      cookies: { 
        getAll: () => request.cookies.getAll(), 
        setAll: (cookies) => cookies.forEach(({ name, value, options }) => response.cookies.set(name, value, options)) 
      } 
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Redirect logged-in users away from auth pages
  if (session && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL('/feed', request.url))
  }

  // Protect platform routes
  if (!session && AUTH_ONLY_ROUTES.some(r => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/public).*)']
}

// In-memory rate limiter for API routes
// For production: use Upstash Redis

const store = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(identifier: string, max: number, windowMs: number): void {
  const now = Date.now()
  const entry = store.get(identifier)

  if (!entry || now > entry.resetAt) {
    store.set(identifier, { count: 1, resetAt: now + windowMs })
    return
  }

  if (entry.count >= max) {
    throw new Error(`Rate limit excedido. Tente novamente em ${Math.ceil((entry.resetAt - now) / 1000)}s`)
  }

  entry.count++
}

// Presets
export const rateLimits = {
  login:    (ip: string) => rateLimit(`login:${ip}`,    5,  15 * 60_000), // 5/15min
  register: (ip: string) => rateLimit(`register:${ip}`, 3,  60 * 60_000), // 3/hour
  post:     (userId: string) => rateLimit(`post:${userId}`, 20, 60_000),  // 20/min
  follow:   (userId: string) => rateLimit(`follow:${userId}`, 50, 60_000),
  upload:   (userId: string) => rateLimit(`upload:${userId}`, 10, 60_000),
}

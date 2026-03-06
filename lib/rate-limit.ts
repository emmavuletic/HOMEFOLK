// Simple in-memory rate limiter (resets on server restart)
// For production, replace with Redis via Upstash

const store = new Map<string, { count: number; reset: number }>()

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const record = store.get(key)

  if (!record || now > record.reset) {
    store.set(key, { count: 1, reset: now + windowMs })
    return true // allowed
  }

  if (record.count >= limit) return false // blocked

  record.count++
  return true // allowed
}

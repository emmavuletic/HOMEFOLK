import { redirect } from 'next/navigation'

// Redirect root to the app
// The full HTML app is served from /homefolk.html in public/
// API routes live at /api/* on the same Vercel domain
export default function Home() {
  redirect('/homefolk.html')
}

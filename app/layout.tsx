import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Homefolk — UK Rental Listings',
  description: 'Find your perfect home. Flatshares, rentals and sublets across the UK, delivered every Thursday.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

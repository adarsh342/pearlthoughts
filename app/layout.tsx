import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Day Picker App',
  description: 'Created by Adarsh',
  generator: 'adarsh.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

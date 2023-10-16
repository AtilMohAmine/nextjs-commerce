import './globals.css'
import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: 'NextJS E-Commerce',
  description: 'Created by Atil Mohamed El Amine',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className='p-10'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

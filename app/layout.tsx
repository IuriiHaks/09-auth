// основний макет додатку
import './globals.css'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider'
import { Roboto } from 'next/font/google'
import { Metadata } from 'next'
import AuthProvider from '@/components/AuthProvider/AuthProvider'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Your app to create, edit and browse notes',
  openGraph: {
    title: 'NoteHub',
    description: 'Your app to create, edit and browse notes',
    url: 'https://08-zustand-iota-two.vercel.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal?: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  )
}

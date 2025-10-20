'use client'

import { useEffect, useState } from 'react'
import { checkSession, getMe } from '@/lib/api/clientApi'
import { useAuthStore } from '@/lib/store/authStore'
import { usePathname, useRouter } from 'next/navigation'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const { setUser, clearIsAuthenticated } = useAuthStore()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    async function verify() {
      try {
        const session = await checkSession()
        if (session) {
          const user = await getMe()
          setUser(user)
        } else {
          clearIsAuthenticated()
          if (pathname.startsWith('/profile')) router.push('/sign-in')
        }
      } catch {
        clearIsAuthenticated()
      } finally {
        setTimeout(() => setLoading(false), 400) // невелика пауза для плавного лоадера
      }
    }
    verify()
  }, [pathname, router, setUser, clearIsAuthenticated])

  if (loading)
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>

  return <>{children}</>
}

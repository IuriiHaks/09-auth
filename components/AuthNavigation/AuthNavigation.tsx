'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/api/clientApi'
import { useAuthStore } from '@/lib/store/authStore'
import css from './AuthNavigation.module.css'

export default function AuthNavigation() {
  const router = useRouter()
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore()

  const handleLogout = async () => {
    await logout()
    clearIsAuthenticated()
    router.push('/sign-in')
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link href="/profile" className={css.navigationLink}>
              Profile
            </Link>
          </li>

          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button onClick={handleLogout} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link href="/sign-in" className={css.navigationLink}>
              Login
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link href="/sign-up" className={css.navigationLink}>
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  )
}

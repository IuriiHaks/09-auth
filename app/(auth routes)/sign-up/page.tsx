'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { register } from '@/lib/api/clientApi'
import css from './SignUpPage.module.css'
import { useAuthStore } from '@/lib/store/authStore'

export default function SignUpPage() {
  const [error, setError] = useState('')
  const router = useRouter()
  const { setUser } = useAuthStore()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const user = await register(email, password)
      setUser(user) // встановлюємо користувача в стан після реєстрації
      router.push('/profile')
    } catch (err) {
      let message = 'Registration failed'
      if (err instanceof Error) {
        message = err.message
      } else if (typeof err === 'object' && err !== null) {
        const maybeAxiosError = err as {
          response?: { data?: { message?: string } }
        }
        message = maybeAxiosError.response?.data?.message ?? message
      }
      setError(message)
    }
  }

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  )
}

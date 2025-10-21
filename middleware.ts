// import { NextResponse, NextRequest } from 'next/server'
// import { cookies } from 'next/headers'
// import { checkSession } from './lib/api/serverApi'
// import { parse } from 'cookie'

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('session')?.value
//   const isAuthPage =
//     request.nextUrl.pathname.startsWith('/sign-in') ||
//     request.nextUrl.pathname.startsWith('/sign-up')

//   if (!token && request.nextUrl.pathname.startsWith('/profile')) {
//     return NextResponse.redirect(new URL('/sign-in', request.url))
//   }

//   if (token && isAuthPage) {
//     return NextResponse.redirect(new URL('/profile', request.url))
//   }

//   return NextResponse.next()
// }
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkSession } from '@/lib/api/serverApi'

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  const authPages = ['/sign-in', '/sign-up']
  const privatePages = ['/profile', '/notes']

  const currentPath = request.nextUrl.pathname

  // Якщо є accessToken — користувач авторизований
  let isAuthenticated = Boolean(accessToken)

  // Якщо accessToken відсутній, але є refreshToken — спробуємо поновити сесію
  if (!isAuthenticated && refreshToken) {
    try {
      const { data: session } = await checkSession()
      isAuthenticated = Boolean(session?.success)
    } catch {
      isAuthenticated = false
    }
  }

  // 1️⃣ Неавторизований користувач → приватна сторінка → редирект на /sign-in
  if (
    !isAuthenticated &&
    privatePages.some((path) => currentPath.startsWith(path))
  ) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  // 2️⃣ Авторизований користувач → сторінка автентифікації → редирект на /profile
  if (
    isAuthenticated &&
    authPages.some((path) => currentPath.startsWith(path))
  ) {
    return NextResponse.redirect(new URL('/profile', request.url))
  }

  // 3️⃣ Інакше — пропускаємо запит далі
  return NextResponse.next()
}

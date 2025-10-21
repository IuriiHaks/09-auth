import { api } from './api'
import type { User } from '@/types/user'
import type { Note } from '@/types/note'
import { cookies } from 'next/headers'

export interface NotesResponse {
  notes: Note[]
  totalPages: number
}

export async function fetchNotes(
  search = '',
  page = 1,
  perPage = 10,
  tag?: string
): Promise<NotesResponse> {
  const params: Record<string, string | number> = {
    // search,
    page,
    perPage,
  }
  if (search.trim()) params.search = search

  if (tag && tag !== 'All') params.tag = tag

  const { data } = await api.get<NotesResponse>('/notes', { params })

  return data
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies()

  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      cookie: cookieStore.toString(), // передаємо кукі для автентифікації
    },
  })
  return data
}

// отримання даних користувача
export async function getMe(): Promise<User> {
  const cookieStore = await cookies()
  const res = await api.get<User>('/users/me', {
    headers: {
      cookie: cookieStore.toString(), // передаємо кукі для автентифікації
    },
  })
  return res.data
}

// перевірка сесії користувача
export async function checkSession() {
  const cookieStore = await cookies()
  const res = await api.get('/auth/session', {
    headers: {
      cookie: cookieStore.toString(), // передаємо кукі для автентифікації
    },
  })
  return res
}

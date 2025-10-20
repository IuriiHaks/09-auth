import { api } from './api'
import type { User } from '@/types/user'
import type { Note } from '@/types/note'

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

  console.log('Fetched notes:', params, data)
  return data
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`)
  return data
}

// отримання даних користувача
export async function getMe(): Promise<User> {
  const res = await api.get<User>('/users/me')
  return res.data
}

// перевірка сесії користувача
export async function checkSession() {
  const { data } = await api.get('/auth/session')
  return data
}

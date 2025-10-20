// детальна інформація про нотатку (клієнтський компонент)
'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api/clientApi'
import css from './NoteDetails.module.css'

interface Props {
  id: string
}

export default function NoteDetailsClient({ id }: Props) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  })

  if (isLoading) return <p>Loading, please wait...</p>
  if (error || !note) return <p>Something went wrong.</p>

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
      </div>
    </div>
  )
}

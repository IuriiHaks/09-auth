// список нотаток з фільтрацією за тегами (серверний компонент)
import { dehydrate, QueryClient } from '@tanstack/react-query'
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider'
import NotesClient from './Notes.client'
import { fetchNotes } from '@/lib/api/serverApi'
import { Metadata } from 'next'

interface NotePageProps {
  params: Promise<{ slug?: string[] }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  const filter = slug?.join(', ') || 'All'
  const title = `Notes: ${filter}`
  const description = `Viewing notes filtered by: ${filter}`
  const url = `https://08-zustand-iota-two.vercel.app/notes/filter/${filter}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function NotesFilterPage({ params }: NotePageProps) {
  const { slug } = await params
  const tag = slug?.[0] ?? 'All'
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, 1],
    queryFn: () => fetchNotes('', 1, 10, tag === 'All' ? undefined : tag),
  })

  return (
    <TanStackProvider dehydratedState={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </TanStackProvider>
  )
}

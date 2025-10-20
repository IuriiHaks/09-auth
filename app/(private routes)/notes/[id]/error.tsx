// помилка завантаження окремої нотатки
'use client'

export default function NoteError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="error">
      <h2>Something went wrong while loading the note 😢</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}

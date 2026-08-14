import BookCard from '../books/BookCard'
import useSavedBooks from '../../hooks/useSavedBooks'

function SavedBooksScreen() {
  const { savedBooks, removeBook } = useSavedBooks()

  if (savedBooks.length === 0) {
    return (
      <main className="page-shell">
        <section className="saved-books-screen" aria-labelledby="saved-books-title">
          <header className="saved-books-header">
            <h1 id="saved-books-title">Saved Books</h1>
          </header>

          <p>No saved books yet. Start exploring and save a few favorites.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <section className="saved-books-screen" aria-labelledby="saved-books-title">
        <header className="saved-books-header">
          <h1 id="saved-books-title">Saved Books</h1>
        </header>

        <div className="saved-books-list" role="list" aria-label="Saved books">
          {savedBooks.map((book) => (
            <BookCard
              key={book.id ?? `${book.title}-${book.authors?.join('-') ?? 'unknown'}`}
              book={book}
              onSave={() => removeBook(book.id)}
              isSaved={true}
              matchScore={book.matchScore}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default SavedBooksScreen

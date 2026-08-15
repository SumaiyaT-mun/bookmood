import BookCard from '../books/BookCard'
import useSavedBooks from '../../hooks/useSavedBooks'

function ResultsScreen({ books = [], loading = false, error = '', onBack }) {
  const { savedBooks, isSaved, saveBook, removeBook } = useSavedBooks()

  const handleSaveToggle = (book) => {
    if (!book?.id) {
      return
    }

    if (isSaved(book.id)) {
      removeBook(book.id)
      return
    }

    saveBook(book)
  }
  return (
    <main className="page-shell">
      <section className="results-screen" aria-labelledby="results-title">
        <header className="results-header">
          <button type="button" className="secondary-button" onClick={onBack}>
            Back
          </button>

          <div className="results-header__content">
            <p className="tagline">Your recommendations</p>
            <h1 id="results-title">Books for you</h1>
          </div>
        </header>

        {loading && <p aria-live="polite">Loading recommendations...</p>}

        {!loading && error && (
          <p role="alert" aria-live="assertive">
            {error}
          </p>
        )}

        {!loading && !error && books.length === 0 && (
          <p>No recommendations available for these preferences.</p>
        )}

        {!loading && !error && books.length > 0 && (
          <div className="results-list">
            {books.map((book) => (
              <BookCard
                key={book.id ?? `${book.title}-${book.authors?.join('-') ?? 'unknown'}`}
                book={book}
                onSave={handleSaveToggle}
                isSaved={isSaved(book.id)}
                matchScore={book.matchScore}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default ResultsScreen

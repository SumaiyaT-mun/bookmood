import { useNavigate } from 'react-router-dom'
import BookCard from '../books/BookCard'
import useSavedBooks from '../../hooks/useSavedBooks'

function SavedBooksScreen() {
  const navigate = useNavigate()
  const { savedBooks, removeBook } = useSavedBooks()

  if (savedBooks.length === 0) {
    return (
      <main className="page-shell">
        <section className="saved-books-screen" aria-labelledby="saved-books-empty-title">
          <header className="saved-books-header saved-books-header--empty">
            <div className="saved-books-header__content">
              <h1 id="saved-books-empty-title">Saved Books</h1>
              <p className="saved-books-header__subtitle">Your saved reading list</p>
            </div>
          </header>

          <div className="saved-books-empty" aria-live="polite">
            <h2>No saved books yet</h2>
            <p>Save books you love and they'll appear here.</p>
            <button type="button" className="primary-button" onClick={() => navigate('/preferences')}>
              Find My Book
            </button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <section className="saved-books-screen" aria-labelledby="saved-books-title">
        <header className="saved-books-header">
          <div className="saved-books-header__content">
            <h1 id="saved-books-title">Saved Books</h1>
            <p className="saved-books-header__subtitle">Your saved reading list</p>
          </div>
        </header>

        <div className="saved-books-grid" role="list" aria-label="Saved books">
          {savedBooks.map((book) => (
            <div className="saved-books-grid__item" key={book.id ?? `${book.title}-${book.authors?.join('-') ?? 'unknown'}`} role="listitem">
              <BookCard
                book={book}
                onSave={() => removeBook(book.id)}
                isSaved={true}
                matchScore={book.matchScore}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default SavedBooksScreen

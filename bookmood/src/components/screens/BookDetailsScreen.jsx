import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import useSavedBooks from '../../hooks/useSavedBooks'

function BookDetailsScreen({ books = [] }) {
  const navigate = useNavigate()
  const { bookId } = useParams()
  const location = useLocation()
  const { isSaved, saveBook, removeBook } = useSavedBooks()

  const bookFromState = location.state?.book
  const bookFromList = books.find((bookItem) => bookItem.id === bookId)
  const book = bookFromState ?? bookFromList ?? null

  if (!book) {
    return (
      <main className="page-shell">
        <section className="book-details-screen" aria-labelledby="book-details-empty-title">
          <button type="button" className="secondary-button" onClick={() => navigate('/results')}>
            ← Back to recommendations
          </button>

          <h1 id="book-details-empty-title">Book not found</h1>
          <p>We could not find the selected book.</p>
        </section>
      </main>
    )
  }

  const isBookSaved = isSaved(book.id)
  const authorText = Array.isArray(book.authors) && book.authors.length > 0 ? book.authors.join(', ') : 'Unknown author'
  const categoryText = Array.isArray(book.categories) && book.categories.length > 0 ? book.categories.join(', ') : 'General'
  const descriptionText = typeof book.description === 'string' && book.description.trim() ? book.description : 'No description available.'
  const infoLink = book.infoLink || book.previewLink || ''

  const handleSaveToggle = () => {
    if (!book?.id) {
      return
    }

    if (isBookSaved) {
      removeBook(book.id)
      return
    }

    saveBook(book)
  }

  return (
    <main className="page-shell">
      <section className="book-details-screen" aria-labelledby="book-details-title">
        <button type="button" className="secondary-button" onClick={() => navigate('/results')}>
          ← Back to recommendations
        </button>

        <article className="book-details-card">
          <div className="book-details-card__cover-wrap">
            {book.thumbnail ? (
              <img className="book-details-card__cover" src={book.thumbnail} alt={`${book.title || 'Book'} cover`} />
            ) : (
              <div className="book-details-card__cover book-details-card__cover--fallback" aria-label="No cover available">
                No cover
              </div>
            )}
          </div>

          <div className="book-details-card__content">
            {typeof book.matchScore === 'number' && (
              <div className="book-card__match-score" aria-label={`${book.matchScore}% match`}>
                {book.matchScore}% Match
              </div>
            )}

            <h1 id="book-details-title">{book.title || 'Untitled'}</h1>
            <p className="book-details-card__author">{authorText}</p>

            <div className="book-details-card__meta" aria-label="Book details">
              {book.averageRating ? (
                <p>
                  <strong>Rating:</strong> {book.averageRating}
                  {book.ratingsCount ? ` (${book.ratingsCount} ratings)` : ''}
                </p>
              ) : null}

              {book.publishedDate ? (
                <p>
                  <strong>Published:</strong> {book.publishedDate}
                </p>
              ) : null}

              {book.pageCount ? (
                <p>
                  <strong>Pages:</strong> {book.pageCount}
                </p>
              ) : null}

              {categoryText && (
                <p>
                  <strong>Categories:</strong> {categoryText}
                </p>
              )}
            </div>

            <button type="button" className="book-card__save" aria-pressed={isBookSaved} onClick={handleSaveToggle}>
              {isBookSaved ? 'Saved' : 'Save Book'}
            </button>
          </div>
        </article>

        <section className="book-details-card__section" aria-labelledby="about-book-title">
          <h2 id="about-book-title">About this book</h2>
          <p>{descriptionText}</p>
        </section>

        {infoLink && (
          <section className="book-details-card__section" aria-labelledby="find-book-title">
            <h2 id="find-book-title">Find this book</h2>
            <a href={infoLink} target="_blank" rel="noopener noreferrer">
              View on Google Books →
            </a>
          </section>
        )}
      </section>
    </main>
  )
}

export default BookDetailsScreen

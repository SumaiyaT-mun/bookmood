import { Link } from 'react-router-dom'

function BookCard({ book, onSave, isSaved = false, matchScore }) {
  if (!book) {
    return null
  }

  const authorText =
    Array.isArray(book.authors) && book.authors.length > 0
      ? book.authors.join(', ')
      : 'Unknown author'

  const categoryText =
    Array.isArray(book.categories) && book.categories.length > 0
      ? book.categories[0]
      : 'General'

  const trimmedDescription =
    typeof book.description === 'string' && book.description.trim()
      ? book.description.trim().replace(/\s+/g, ' ').slice(0, 140)
      : 'No description available.'

  const descriptionText =
    trimmedDescription.length >= 140
      ? `${trimmedDescription}...`
      : trimmedDescription

  const coverAlt = book.title
    ? `${book.title} cover`
    : 'Book cover'

  const handleSaveClick = () => {
    if (typeof onSave === 'function') {
      onSave(book)
    }
  }

  return (
    <article className="book-card" aria-label={`Book card for ${book.title || 'book'}`}>
      <div className="book-card__cover-wrap">
        {book.thumbnail ? (
          <img
            className="book-card__cover"
            src={book.thumbnail}
            alt={coverAlt}
          />
        ) : (
          <div className="book-card__cover book-card__cover--fallback" aria-label="No cover available">
            No cover
          </div>
        )}
      </div>

      <div className="book-card__content">
        {typeof matchScore === 'number' && (
          <div className="book-card__match-score" aria-label={`${matchScore}% match`}>
            {matchScore}% Match
          </div>
        )}

        <h3 className="book-card__title">{book.title || 'Untitled'}</h3>
        <p className="book-card__meta">{authorText}</p>

        <div className="book-card__details" aria-label="Book details">
          {book.publishedDate && (
            <p>
              <span className="book-card__label">Published:</span> {book.publishedDate}
            </p>
          )}

          {book.pageCount ? (
            <p>
              <span className="book-card__label">Pages:</span> {book.pageCount}
            </p>
          ) : null}

          {categoryText && (
            <p>
              <span className="book-card__label">Category:</span> {categoryText}
            </p>
          )}

          {book.averageRating ? (
            <p>
              <span className="book-card__label">Rating:</span> {book.averageRating}
              {book.ratingsCount ? ` (${book.ratingsCount} ratings)` : ''}
            </p>
          ) : null}
        </div>

        <p className="book-card__description">{descriptionText}</p>

        <Link to={`/books/${book.id}`} state={{ book }} className="book-card__detail-link">
          View Details
        </Link>

        <button
          type="button"
          className="book-card__save"
          aria-pressed={isSaved}
          onClick={handleSaveClick}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>
    </article>
  )
}

export default BookCard

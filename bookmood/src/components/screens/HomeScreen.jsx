import { useState } from 'react'
import { searchBooks } from '../../api/googlebooks'
import BookCard from '../books/BookCard'

function HomeScreen({ onFindBook }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (loading) {
      return
    }

    const trimmedQuery = searchTerm.trim()

    if (!trimmedQuery) {
      setBooks([])
      setError('')
      return
    }

    setLoading(true)
    setError('')

    try {
      const results = await searchBooks(trimmedQuery)
      setBooks(results)
    } catch (err) {
      setBooks([])
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong while searching for books.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page-shell">
      <section className="home-screen" aria-labelledby="home-title">
        <div className="home-content">
          <p className="tagline">Find your next book by mood.</p>

          <h1 id="home-title">Discover books that match how you feel.</h1>

          <p className="description">
            Match your mood to your next great read with thoughtful recommendations,
            genre filters, and personalized suggestions that feel right for your
            next reading session.
          </p>

          <div className="cta-group">
            <button
              type="button"
              className="primary-button"
              onClick={onFindBook}
            >
              Find My Book
            </button>
          </div>

          <form className="search-form" aria-label="Search books" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="book-search">
              Search books
            </label>
            <input
              id="book-search"
              name="bookSearch"
              type="search"
              placeholder="Search by title, author, or keyword"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button type="submit" className="secondary-button" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {loading && <p aria-live="polite">Loading books...</p>}

          {error && (
            <p role="alert" aria-live="assertive">
              {error}
            </p>
          )}

          {!loading && !error && books.length === 0 && searchTerm.trim() && (
            <p>No books found for that search.</p>
          )}

          {!loading && books.length > 0 && (
            <div>
              <h2>Book results</h2>
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onSave={() => {}}
                  isSaved={false}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default HomeScreen

function HomeScreen() {
  return (
    <main className="page-shell">
      <section className="home-screen" aria-labelledby="home-title">
        <header className="home-header">
          <div className="brand" aria-label="BookMood home">
            <span className="brand-mark" aria-hidden="true">
              B
            </span>
            <span className="brand-name">BookMood</span>
          </div>
        </header>

        <div className="home-content">
          <p className="tagline">Find your next book by mood.</p>

          <h1 id="home-title">Discover books that match how you feel.</h1>

          <p className="description">
            Match your mood to your next great read with thoughtful recommendations,
            genre filters, and personalized suggestions that feel right for your
            next reading session.
          </p>

          <div className="cta-group">
            <button type="button" className="primary-button">
              Find My Book
            </button>
          </div>

          <form className="search-form" aria-label="Search books">
            <label className="sr-only" htmlFor="book-search">
              Search books
            </label>
            <input
              id="book-search"
              name="bookSearch"
              type="search"
              placeholder="Search by title, author, or keyword"
            />
            <button type="submit" className="secondary-button">
              Search
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default HomeScreen

const STORAGE_KEY = 'bookmood_saved_books'

function readStorage() {
  try {
    const rawValue = localStorage.getItem(STORAGE_KEY)

    if (!rawValue) {
      return []
    }

    const parsed = JSON.parse(rawValue)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    return []
  }
}

export function getSavedBooks() {
  return readStorage()
}

export function saveBook(book) {
  if (!book || !book.id) {
    return getSavedBooks()
  }

  const savedBooks = readStorage()
  const alreadySaved = savedBooks.some((savedBook) => savedBook.id === book.id)

  if (alreadySaved) {
    return savedBooks
  }

  const nextBooks = [...savedBooks, book]

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextBooks))
  } catch (error) {
    return savedBooks
  }

  return nextBooks
}

export function removeSavedBook(bookId) {
  const savedBooks = readStorage()
  const nextBooks = savedBooks.filter((book) => book.id !== bookId)

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextBooks))
  } catch (error) {
    return savedBooks
  }

  return nextBooks
}

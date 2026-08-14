import { useCallback, useEffect, useState } from 'react'
import { getSavedBooks, saveBook as saveBookToStorage, removeSavedBook as removeBookFromStorage } from '../utils/storage'

export function useSavedBooks() {
  const [savedBooks, setSavedBooks] = useState([])

  useEffect(() => {
    setSavedBooks(getSavedBooks())
  }, [])

  const isSaved = useCallback(
    (bookId) => savedBooks.some((book) => book.id === bookId),
    [savedBooks],
  )

  const saveBook = useCallback((book) => {
    const nextBooks = saveBookToStorage(book)
    setSavedBooks(nextBooks)
    return nextBooks
  }, [])

  const removeBook = useCallback((bookId) => {
    const nextBooks = removeBookFromStorage(bookId)
    setSavedBooks(nextBooks)
    return nextBooks
  }, [])

  return {
    savedBooks,
    isSaved,
    saveBook,
    removeBook,
  }
}

export default useSavedBooks

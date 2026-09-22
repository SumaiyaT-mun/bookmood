import { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'

import HomeScreen from './components/screens/HomeScreen'
import PreferenceForm from './components/preferences/PreferenceForm'
import ResultsScreen from './components/screens/ResultsScreen'
import SavedBooksScreen from './components/screens/SavedBooksScreen'
import BookDetailsScreen from './components/screens/BookDetailsScreen'
import Header from './components/layout/Header'

import { moodOptions } from './data/moodOptions'
import { genreOptions } from './data/genreOptions'
import { readingPreferenceOptions } from './data/readingPreferenceOptions'

import { searchBooks } from './api/googlebooks'
import { getAIRecommendation } from './api/aiRecommendation'
import { rankBooks } from './lib/recommendation'

function App() {
  const navigate = useNavigate()

  const [preferences, setPreferences] = useState({
    mood: '',
    genre: '',
    readingPreference: '',
  })

  const [books, setBooks] = useState([])
  const [aiReason, setAiReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFindBook = () => {
    navigate('/preferences')
  }

  const handlePreferenceSubmit = async (selectedPreferences) => {
    const nextPreferences = selectedPreferences ?? preferences

    setPreferences(nextPreferences)
    setLoading(true)
    setError('')
    setBooks([])
    setAiReason('')

    try {
      // 1. Ask Gemini to create a better book-search query.
      const aiRecommendation = await getAIRecommendation(nextPreferences)

      setAiReason(aiRecommendation.reason)

      // 2. Use Gemini's search query with Google Books.
      const results = await searchBooks(aiRecommendation.searchQuery)

      // 3. Rank the returned books against the user's preferences.
      const rankedBooks = rankBooks(results, nextPreferences)

      setBooks(rankedBooks)
      navigate('/results')
    } catch (err) {
      console.error('Recommendation error:', err)

      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong while generating your recommendations.',
      )

      navigate('/results')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={<HomeScreen onFindBook={handleFindBook} />}
        />

        <Route
          path="/preferences"
          element={
            <PreferenceForm
              moodOptions={moodOptions}
              genreOptions={genreOptions}
              readingPreferenceOptions={readingPreferenceOptions}
              onSubmit={handlePreferenceSubmit}
              onBack={() => navigate('/')}
            />
          }
        />

        <Route
          path="/results"
          element={
            <ResultsScreen
              books={books}
              loading={loading}
              error={error}
              aiReason={aiReason}
              preferences={preferences}
              onBack={() => navigate('/preferences')}
            />
          }
        />

        <Route
          path="/saved-books"
          element={<SavedBooksScreen />}
        />

        <Route
          path="/books/:bookId"
          element={<BookDetailsScreen books={books} />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </>
  )
}

export default App
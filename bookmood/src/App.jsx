import { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import HomeScreen from './components/screens/HomeScreen'
import PreferenceForm from './components/preferences/PreferenceForm'
import ResultsScreen from './components/screens/ResultsScreen'
import SavedBooksScreen from './components/screens/SavedBooksScreen'
import BookDetailsScreen from './components/screens/BookDetailsScreen'
import { moodOptions } from './data/moodOptions'
import { genreOptions } from './data/genreOptions'
import { readingPreferenceOptions } from './data/readingPreferenceOptions'
import { searchBooks } from './api/googlebooks'
import { rankBooks } from './lib/recommendation'
import Header from './components/layout/Header'

function App() {
  const navigate = useNavigate()
  const [preferences, setPreferences] = useState({
    mood: '',
    genre: '',
    readingPreference: '',
  })
  const [books, setBooks] = useState([])
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

    try {
      const query = `${nextPreferences.genre} ${nextPreferences.mood}`.trim()

      if (!query) {
        setBooks([])
        navigate('/results')
        return
      }

      const results = await searchBooks(query)
      const rankedBooks = rankBooks(results, nextPreferences)

      setBooks(rankedBooks)
      navigate('/results')
    } catch (err) {
      setBooks([])
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong while fetching your recommendations.',
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
        <Route path="/" element={<HomeScreen onFindBook={handleFindBook} />} />
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
              onBack={() => navigate('/preferences')}
            />
          }
        />
        <Route path="/saved-books" element={<SavedBooksScreen />} />
        <Route path="/books/:bookId" element={<BookDetailsScreen books={books} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import HomeScreen from './components/screens/HomeScreen'
import PreferenceForm from './components/preferences/PreferenceForm'
import ResultsScreen from './components/screens/ResultsScreen'
import { moodOptions } from './data/moodOptions'
import { genreOptions } from './data/genreOptions'
import { readingPreferenceOptions } from './data/readingPreferenceOptions'
import { searchBooks } from './api/googlebooks'
import { rankBooks } from './lib/recommendation'

function App() {
  const [screen, setScreen] = useState('home')
  const [preferences, setPreferences] = useState({
    mood: '',
    genre: '',
    readingPreference: '',
  })
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFindBook = () => {
    setScreen('preferences')
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
        setScreen('results')
        return
      }

      const results = await searchBooks(query)
      const rankedBooks = rankBooks(results, nextPreferences)

      setBooks(rankedBooks)
      setScreen('results')
    } catch (err) {
      setBooks([])
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong while fetching your recommendations.',
      )
      setScreen('results')
    } finally {
      setLoading(false)
    }
  }

  if (screen === 'preferences') {
    return (
      <PreferenceForm
        moodOptions={moodOptions}
        genreOptions={genreOptions}
        readingPreferenceOptions={readingPreferenceOptions}
        onSubmit={handlePreferenceSubmit}
      />
    )
  }

  if (screen === 'results') {
    return (
      <ResultsScreen
        books={books}
        loading={loading}
        error={error}
        onBack={() => setScreen('home')}
      />
    )
  }

  return <HomeScreen onFindBook={handleFindBook} />
}

export default App

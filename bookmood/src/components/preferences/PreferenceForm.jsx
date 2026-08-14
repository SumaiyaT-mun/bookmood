import { useState } from 'react'
import MoodSelector from './MoodSelector'
import GenreSelector from './GenreSelector'

function PreferenceForm({
  moodOptions = [],
  genreOptions = [],
  readingPreferenceOptions = [],
  onSubmit,
}) {
  const [mood, setMood] = useState('')
  const [genre, setGenre] = useState('')
  const [readingPreference, setReadingPreference] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!mood || !genre || !readingPreference) {
      return
    }

    onSubmit?.({ mood, genre, readingPreference })
  }

  return (
    <main className="page-shell">
      <section className="preferences-screen" aria-labelledby="preferences-title">
        <header className="preferences-header">
          <h1 id="preferences-title">Choose your reading vibe</h1>
        </header>

        <form onSubmit={handleSubmit}>
          <MoodSelector options={moodOptions} value={mood} onChange={setMood} />
          <GenreSelector options={genreOptions} value={genre} onChange={setGenre} />

          <fieldset className="reading-preference-selector">
            <legend className="reading-preference-selector__legend">
              Reading length preference
            </legend>

            <div className="reading-preference-selector__options" role="radiogroup" aria-label="Reading length preferences">
              {readingPreferenceOptions.map((option) => {
                const isSelected = readingPreference === option.id

                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`reading-preference-selector__option ${isSelected ? 'is-selected' : ''}`}
                    aria-pressed={isSelected}
                    onClick={() => setReadingPreference(option.id)}
                  >
                    <span>{option.label}</span>
                    <small>{option.description}</small>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <button type="submit" className="primary-button" disabled={!mood || !genre || !readingPreference}>
            Continue
          </button>
        </form>
      </section>
    </main>
  )
}

export default PreferenceForm

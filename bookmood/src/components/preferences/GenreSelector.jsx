function GenreSelector({ options = [], value, onChange }) {
  return (
    <fieldset className="genre-selector">
      <legend className="genre-selector__legend">Choose a genre</legend>

      <div className="genre-selector__options" role="radiogroup" aria-label="Book genre options">
        {options.map((option) => {
          const isSelected = value === option.id

          return (
            <button
              key={option.id}
              type="button"
              className={`genre-selector__option ${isSelected ? 'is-selected' : ''}`}
              aria-pressed={isSelected}
              onClick={() => onChange?.(option.id)}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export default GenreSelector

function MoodSelector({ options = [], value, onChange }) {
  return (
    <fieldset className="mood-selector">
      <legend className="mood-selector__legend">Choose your mood</legend>

      <div className="mood-selector__options" role="radiogroup" aria-label="Reading mood options">
        {options.map((option) => {
          const isSelected = value === option.id

          return (
            <button
              key={option.id}
              type="button"
              className={`mood-selector__option ${isSelected ? 'is-selected' : ''}`}
              aria-pressed={isSelected}
              onClick={() => onChange?.(option.id)}
            >
              <span className="mood-selector__label">{option.label}</span>
              <span className="mood-selector__description">{option.description}</span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export default MoodSelector

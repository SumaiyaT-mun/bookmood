const moodKeywords = {
  adventurous: [
    'adventure',
    'fantasy',
    'epic',
    'survival',
    'journey',
    'exploration',
    'travel',
    'quest',
    'science fiction',
    'action',
    'thriller',
  ],
  emotional: [
    'love',
    'family',
    'grief',
    'heart',
    'relationship',
    'loss',
    'sadness',
    'friendship',
    'romance',
  ],
  relaxed: ['calm', 'cozy', 'peaceful', 'comfort', 'lighthearted', 'gentle', 'happy', 'uplifting'],
  curious: [
    'mystery',
    'discovery',
    'science',
    'investigation',
    'detective',
    'research',
    'exploration',
  ],
  motivated: ['success', 'inspiration', 'investment', 'growth', 'career', 'achievement'],
  nostalgic: ['memory', 'childhood', 'classic', 'past', 'history', 'sentimental', 'reminiscence', 'vintage'],
}

function normalizeText(value) {
  return String(value ?? '')
    .toLowerCase()
    .trim()
}

function containsAny(text, keywords) {
  const normalizedText = normalizeText(text)

  return keywords.some((keyword) => normalizedText.includes(keyword))
}

function genreMatchScore(book, preferences) {
  if (!preferences?.genre) {
    return 0
  }

  const bookCategories = Array.isArray(book?.categories) ? book.categories : []
  const categoryText = bookCategories.join(' ').toLowerCase()
  const preferenceGenre = normalizeText(preferences.genre)

  if (!categoryText && !book?.title) {
    return 0
  }

  const titleText = normalizeText(book?.title)
  const descriptionText = normalizeText(book?.description)

  if (
    categoryText.includes(preferenceGenre) ||
    titleText.includes(preferenceGenre) ||
    descriptionText.includes(preferenceGenre)
  ) {
    return 40
  }

  return 0
}

function moodMatchScore(book, preferences) {
  if (!preferences?.mood) {
    return 0
  }

  const mood = normalizeText(preferences.mood)
  const keywords = moodKeywords[mood] ?? []

  if (keywords.length === 0) {
    return 0
  }

  const textToSearch = [
    book?.title,
    book?.description,
    Array.isArray(book?.categories) ? book.categories.join(' ') : '',
  ].join(' ')

  if (containsAny(textToSearch, keywords)) {
    return 30
  }

  return 0
}

function readingLengthMatchScore(book, preferences) {
  if (!preferences?.readingPreference) {
    return 0
  }

  const pageCount = Number(book?.pageCount ?? 0)
  const readingPreference = normalizeText(preferences.readingPreference)

  if (Number.isNaN(pageCount) || pageCount <= 0) {
    return 0
  }

  const matches = {
    short: pageCount < 200,
    medium: pageCount >= 200 && pageCount <= 400,
    long: pageCount > 400,
  }

  if (matches[readingPreference]) {
    return 20
  }

  return 0
}

function ratingSignalScore(book) {
  const averageRating = Number(book?.averageRating ?? 0)
  const ratingsCount = Number(book?.ratingsCount ?? 0)

  if (Number.isNaN(averageRating) || averageRating <= 0) {
    return 0
  }

  const normalizedRating = Math.min(averageRating, 5)
  const ratingPoints = (normalizedRating / 5) * 10

  if (ratingsCount > 0) {
    return Math.round(ratingPoints)
  }

  return Math.min(Math.round(ratingPoints), 5)
}

export function scoreBook(book, preferences) {
  if (!book || !preferences) {
    return 0
  }

  const genreScore = genreMatchScore(book, preferences)
  const moodScore = moodMatchScore(book, preferences)
  const lengthScore = readingLengthMatchScore(book, preferences)
  const ratingScore = ratingSignalScore(book)

  return Math.max(0, Math.min(100, genreScore + moodScore + lengthScore + ratingScore))
}

export function rankBooks(books, preferences) {
  const list = Array.isArray(books) ? books : []

  return list
    .map((book) => ({
      ...book,
      matchScore: scoreBook(book, preferences),
    }))
    .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
}

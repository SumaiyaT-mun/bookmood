import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

const allowedMoods = new Set([
  'relaxed',
  'adventurous',
  'emotional',
  'curious',
  'motivated',
  'nostalgic',
])

const allowedGenres = new Set([
  'fiction',
  'fantasy',
  'mystery',
  'romance',
  'science fiction',
  'history',
])

const allowedReadingPreferences = new Set([
  'short',
  'medium',
  'long',
])

export default async function handler(req, res) {
  console.log('RECOMMEND FUNCTION HIT')
  console.log('METHOD:', req.method)
  console.log('GEMINI KEY EXISTS:', Boolean(process.env.GEMINI_API_KEY))

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    })
  }

  try {
    const { mood, genre, readingPreference } = req.body ?? {}

    if (
      !allowedMoods.has(mood) ||
      !allowedGenres.has(genre) ||
      !allowedReadingPreferences.has(readingPreference)
    ) {
      return res.status(400).json({
        error: 'Invalid reading preferences.',
      })
    }

    const prompt = `
You are helping Booklynn create a book search query.

User preferences:
- Mood: ${mood}
- Genre: ${genre}
- Reading length: ${readingPreference}

Create a concise Google Books search query that represents these
preferences.

Return JSON only in this exact structure:
{
  "searchQuery": "string",
  "reason": "string"
}

Rules:
- searchQuery must be useful for finding books.
- Keep searchQuery under 100 characters.
- Do not recommend a specific book.
- Do not invent authors.
- reason must be one short sentence.
`

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    })

    const text = response.text?.trim()

    if (!text) {
      throw new Error('Gemini returned an empty response.')
    }

    let result

    try {
      result = JSON.parse(text)
    } catch {
      throw new Error('Gemini returned invalid JSON.')
    }

    const searchQuery =
      typeof result.searchQuery === 'string'
        ? result.searchQuery.trim()
        : ''

    const reason =
      typeof result.reason === 'string'
        ? result.reason.trim()
        : ''

    if (!searchQuery || searchQuery.length > 100) {
      throw new Error('Gemini returned an invalid search query.')
    }

    return res.status(200).json({
      searchQuery,
      reason,
    })
    } catch (error) {
    console.error('Gemini recommendation error:', error)

    return res.status(500).json({
      error: error instanceof Error ? error.message : String(error),
    })}
}
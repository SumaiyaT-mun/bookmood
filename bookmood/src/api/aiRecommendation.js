export async function getAIRecommendation(preferences) {
  const response = await fetch('/api/recommend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(preferences),
  })

  if (!response.ok) {
    throw new Error('AI recommendation unavailable.')
  }

  const data = await response.json()

  if (
    typeof data.searchQuery !== 'string' ||
    !data.searchQuery.trim()
  ) {
    throw new Error('Invalid AI recommendation.')
  }

  return {
    searchQuery: data.searchQuery.trim(),
    reason: typeof data.reason === 'string' ? data.reason : '',
  }
}
export async function searchBooks(query) {
  const trimmedQuery = typeof query === 'string' ? query.trim() : ''

  if (!trimmedQuery) {
    return []
  }

  const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

  if (!apiKey) {
    throw new Error('Missing Google Books API key: VITE_GOOGLE_BOOKS_API_KEY')
  }

  const params = new URLSearchParams({
    q: trimmedQuery,
    maxResults: '12',
  })

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?${params.toString()}&key=${apiKey}`,
  )

  if (!response.ok) {
    throw new Error(
      `Google Books request failed with status ${response.status}: ${response.statusText}`,
    )
  }

  const data = await response.json()
  const items = Array.isArray(data.items) ? data.items : []

  return items.map((item) => {
    const volumeInfo = item?.volumeInfo ?? {}
    const imageLinks = volumeInfo.imageLinks ?? {}
    const saleInfo = item?.saleInfo ?? {}

    return {
      id: item?.id ?? '',
      title: volumeInfo.title ?? 'Untitled',
      authors: Array.isArray(volumeInfo.authors) ? volumeInfo.authors : [],
      description: volumeInfo.description ?? '',
      thumbnail: imageLinks.thumbnail ?? imageLinks.smallThumbnail ?? '',
      publishedDate: volumeInfo.publishedDate ?? '',
      pageCount: volumeInfo.pageCount ?? 0,
      categories: Array.isArray(volumeInfo.categories) ? volumeInfo.categories : [],
      averageRating: volumeInfo.averageRating ?? 0,
      ratingsCount: volumeInfo.ratingsCount ?? 0,
      previewLink: volumeInfo.previewLink ?? '',
      infoLink: volumeInfo.infoLink ?? '',
    }
  })
}

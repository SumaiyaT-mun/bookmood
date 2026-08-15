# Booklyn 📚

Booklyn is a personalized book discovery application that helps
readers find their next book based on how they feel, what genre
they enjoy, and how much time they want to spend reading.

The application uses the Google Books API to retrieve real book
data and provides personalized recommendations based on the
user's preferences.

## Live Demo

Link: https://booklynn.vercel.app/

## Features

- 📚 Personalized book recommendations
- 🌙 Mood-based recommendations
- 🏷️ Genre selection
- 📖 Reading-length preference
- 🔎 Google Books API search
- ⭐ Book ratings and metadata
- 📄 Dedicated book details page
- ❤️ Save books for later
- 💾 Saved books persist using localStorage
- ↩️ Navigation between recommendation and detail screens
- 📱 Responsive design for desktop and mobile
- ♿ Keyboard-accessible interactive controls

---

## How It Works

### 1. Choose your preferences

Users select:

- Mood
- Genre
- Reading length

### 2. Get recommendations

Booklyn uses the selected preferences to generate a list of
recommended books using data retrieved from the Google Books API.

### 3. Explore a book

Users can open a dedicated details page to see:

- Book cover
- Title
- Author
- Description
- Rating
- Publication information
- Page count
- Categories

### 4. Save books

Users can save books they are interested in.

Saved books are stored locally in the browser using `localStorage`,
so they remain available after refreshing the page.

---

## Tech Stack

- React
- Vite
- JavaScript
- React Router
- Google Books API
- CSS
- Browser localStorage

---

## Project Structure

```text
src/
├── api/
│   └── googleBooks.js
│
├── components/
│   ├── common/
│   ├── layout/
│   ├── preferences/
│   ├── books/
│   └── screens/
│
├── data/
│   ├── moodOptions.js
│   ├── genreOptions.js
│   └── readingPreferenceOptions.js
│
├── hooks/
│   └── useSavedBooks.js
│
├── lib/
│   └── recommendation.js
│
├── utils/
│   └── storage.js
│
├── App.jsx
├── App.css
└── main.jsx

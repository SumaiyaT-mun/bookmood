# BookMood

## Product

BookMood is a web application that helps users discover books
based on their mood, genre, and reading preferences.

## Goal

Help a user find relevant books without having to manually browse
through hundreds of search results.

## Core User Flow

1. User opens BookMood.
2. User selects a reading mood.
3. User selects a genre.
4. User selects a reading preference.
5. BookMood searches the Google Books API.
6. Results are ranked according to the user's preferences.
7. User can view and save books.
8. Saved books remain available after refreshing the page.

## Screens

### Home
- BookMood branding
- Short description
- Start recommendation button
- Search option

### Preferences
- Mood selection
- Genre selection
- Reading preference
- Continue button

### Results
- Book cover
- Title
- Author
- Description
- Rating when available
- Recommendation match score
- Save button

### Saved Books
- Saved books
- Remove saved book
- Empty state

## Core Features

- Google Books API integration
- Book search
- Mood-based recommendations
- Genre filtering
- Recommendation scoring
- Save books using localStorage
- Loading states
- Error states
- Empty results state
- Responsive design
- Keyboard accessibility

## Technical Constraints

- React
- Vite
- JavaScript
- Google Books API
- No backend for the initial version
- No component library initially
- localStorage for saved books
- Responsive at 375px and 1280px
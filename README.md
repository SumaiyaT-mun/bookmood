# Booklyn

A personalized book recommendation app that helps users discover
books based on their mood, preferred genre, and reading length.

## Live Demo

[Booklyn Live Demo](YOUR_VERCEL_URL)

## Features

- Mood-based book recommendations
- Genre selection
- Reading-length preferences
- Google Books API integration
- Personalized recommendation matching
- Book details page
- Save books for later
- Responsive design
- Accessible keyboard-friendly controls

## Tech Stack

- React
- Vite
- JavaScript
- React Router
- Google Books API
- CSS
- LocalStorage

## Getting Started

### Install dependencies

npm install

### Environment Variables

Create a `.env` file:

VITE_GOOGLE_BOOKS_API_KEY=your_api_key_here

### Run locally

npm run dev

## AI-Assisted Development

AI tools were used throughout development as a development
assistant for scaffolding, implementation, debugging, and
refactoring.

See [PROMPTS.md](PROMPTS.md) for the development prompts used.

## Manual Improvements

AI-generated code was reviewed manually throughout development.

Examples include:

- Correcting accessibility semantics for preference selectors.
- Improving the recommendation card layout.
- Moving the back navigation to a clearer position.
- Refining responsive behavior at mobile widths.
- Reviewing and correcting saved-book behavior.
- Making product and navigation decisions based on usability
  rather than blindly accepting generated implementations.

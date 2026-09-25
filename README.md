# Booklynn 📚

Booklynn is an AI-powered book recommendation web application that helps users discover books based on their mood, preferred genre, and reading length.

## 🌐 Live Demo

**[Booklynn – Live Application](https://booklynn.vercel.app/)**

## About the Project

Booklynn helps readers find books that match their current reading preferences. Users select their mood, preferred genre, and desired reading length. Gemini AI uses these preferences to generate a relevant book-search query and recommendation reason. The generated query is then used with the Google Books API to retrieve suitable books.

The project was developed to explore how AI can be meaningfully integrated into a real frontend application rather than being used only as a standalone chatbot.

## Features

- AI-powered book recommendations using Gemini
- Mood-based book discovery
- Genre-based recommendations
- Reading-length preferences
- Google Books API integration
- Save books for later
- View detailed book information
- Responsive mobile and desktop interface
- Accessibility-focused interface
- Error handling for AI and API failures

## Technologies Used

- React
- Vite
- JavaScript
- CSS
- Google Gemini API
- Google Books API
- React Router
- Vitest
- React Testing Library
- Vercel

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm

You will also need:

- A Gemini API key
- A Google Books API key

### Installation

Clone the repository:

```bash
git clone https://github.com/SumaiyaT-mun/bookmood.git
```

Navigate to the application directory:

```bash
cd bookmood/bookmood
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

## Environment Variables

Create a `.env` file inside the `bookmood/` application directory.

```env
GEMINI_API_KEY=your_gemini_api_key
VITE_GOOGLE_BOOKS_API_KEY=your_google_books_api_key
```

Do not commit API keys or other secrets to the repository.

## Project Architecture

The actual React/Vite application is located inside the `bookmood/` directory.

```text
bookmood/
└── bookmood/
    ├── api/
    │   └── recommend.js
    │
    ├── src/
    │   ├── api/
    │   │   ├── aiRecommendation.js
    │   │   └── googleBooks.js
    │   │
    │   ├── components/
    │   │   ├── common/
    │   │   ├── layout/
    │   │   ├── preferences/
    │   │   ├── books/
    │   │   └── screens/
    │   │
    │   ├── data/
    │   │   ├── moodOptions.js
    │   │   ├── genreOptions.js
    │   │   └── readingPreferenceOptions.js
    │   │
    │   ├── hooks/
    │   │   └── useSavedBooks.js
    │   │
    │   ├── lib/
    │   │   └── recommendation.js
    │   │
    │   ├── utils/
    │   │   └── storage.js
    │   │
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    │
    ├── package.json
    └── ...
```

### Main Responsibilities

| Folder/File | Purpose |
|---|---|
| `api/` | Serverless API endpoints used by the application |
| `src/api/` | Frontend API communication |
| `components/` | Reusable React UI components |
| `components/preferences/` | Mood, genre, and reading preference selection |
| `components/books/` | Book-related UI components |
| `components/screens/` | Main application screens |
| `data/` | Mood, genre, and reading preference options |
| `hooks/` | Custom React hooks |
| `lib/` | Recommendation-related application logic |
| `utils/` | Utility functions such as local storage handling |
| `App.jsx` | Main application flow and routing |
| `main.jsx` | React entry point |
| `App.css` | Application styling |

## AI Integration

Gemini AI is integrated into the core book recommendation workflow.

The user selects:

1. Mood
2. Genre
3. Reading length

These preferences are sent to the recommendation endpoint. Gemini processes the preferences and returns structured recommendation data containing a `searchQuery` and `reason`.

The generated search query is then used with the Google Books API to retrieve relevant books.

### AI Workflow

```text
User Preferences
       ↓
Gemini AI
       ↓
Search Query + Recommendation Reason
       ↓
Google Books API
       ↓
Book Results
       ↓
Save / View Details
```

AI is therefore part of the main application workflow rather than being added as a separate chatbot feature.

The application also validates the AI response before using it and handles invalid or unavailable responses.

## Testing

Booklynn uses **Vitest** and **React Testing Library** for automated component testing.

The test suite covers five core components:

- `BookCard`
- `Header`
- `GenreSelector`
- `MoodSelector`
- `PreferenceForm`

## Accessibility & Performance

Booklynn was evaluated using Lighthouse and WAVE.

### Lighthouse

| Category | Score |
|---|---:|
| Performance | **100** |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **82** |

### WAVE

| Category | Result |
|---|---:|
| Errors | **0** |
| Contrast Errors | **0** |
| Alerts | **2** |
| Features | **1** |
| Structural Elements | **0** |
| ARIA | **0** |
| AIM Score | **10/10** |

Accessibility considerations include semantic HTML, accessible navigation, labelled form sections, keyboard-accessible controls, `aria-pressed` states for selectable preferences, and meaningful alternative text for book covers.

The two WAVE alerts are items for manual review rather than confirmed accessibility errors.

## Error Handling & Resilience

Booklynn includes error handling for:

- AI recommendation failures
- Invalid AI responses
- Empty or invalid search queries
- Missing API keys
- Google Books API failures
- Rate limiting
- Temporary service unavailability
- Empty search results

AI responses are validated before being used, helping prevent malformed responses from breaking the main user flow.

## Deployment

Booklynn is deployed using **Vercel**.

### Live Application

https://booklynn.vercel.app/

### Production Environment Variables

The production deployment uses:

```text
GEMINI_API_KEY
VITE_GOOGLE_BOOKS_API_KEY
```

Deployment and serverless-function logs can be monitored through Vercel.

### Rollback Plan

If a production deployment introduces a critical issue, the previous known-good Vercel deployment can be redeployed.

A problematic Git commit can also be reverted and the corrected version redeployed from the `main` branch.

## Known Limitations

- AI recommendations depend on Gemini availability and generated output.
- Book information depends on the Google Books API.
- Similar preferences may produce different AI-generated search queries.
- Saved books are currently stored locally rather than in a cloud-based user account.
- SEO can be improved further, with the current Lighthouse SEO score at 82.

## Future Improvements

Potential future improvements include:

- User accounts and cloud-based saved books
- More personalized recommendations
- Improved recommendation ranking
- Additional book data sources
- Improved SEO
- Expanded end-to-end testing
- More comprehensive monitoring and analytics

## Project Status

**Status:** Completed and deployed

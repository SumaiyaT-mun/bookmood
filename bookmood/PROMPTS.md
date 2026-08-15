# Booklyn — AI Development Prompts

This document records the prompts used while developing Booklyn
with AI as a development assistant.

The prompts were used for implementation, debugging, accessibility
review, responsive design, and refactoring.

---

## 1. Project Planning

### Prompt

I want to build a simple but polished React application for book
recommendations.

The application should allow users to select preferences such as
mood, genre, and reading length, then provide personalized book
recommendations.

Use React and keep the project simple enough for a student portfolio
project while still feeling like a real product.

---

## 2. Project Structure

### Prompt

Create a clean React project structure for a book recommendation
application.

Organize the project into reusable components, API utilities,
hooks, data, utilities, and screen-level components.

The application should include:
- Home
- Preferences
- Recommendations
- Book Details
- Saved Books

Keep the architecture simple and avoid unnecessary dependencies.

---

## 3. Homepage

### Prompt

Create a modern, minimal homepage for a book recommendation
application.

The page should contain:
- Brand/logo
- Short tagline
- Strong hero heading
- Description
- Primary CTA
- Search functionality

Keep the design clean, responsive, accessible, and suitable for
a modern portfolio project.

---

## 4. Google Books API

### Prompt

Create a reusable Google Books API utility for searching books.

Requirements:
- Accept a search query.
- Use the Google Books API.
- Read the API key from an environment variable.
- Handle missing API keys.
- Handle failed requests.
- Return normalized book objects.
- Safely handle missing book metadata.
- Do not expose secrets in source code.

---

## 5. Preference Selection

### Prompt

Create reusable React components for selecting:
- Reading mood
- Genre
- Reading length

The components should:
- Accept options as props.
- Track the selected value through the parent.
- Clearly show the selected state.
- Be keyboard accessible.
- Use semantic HTML.
- Avoid unnecessary dependencies.

---

## 6. Recommendation Logic

### Prompt

Create a simple recommendation system for Booklyn.

Use the user's:
- Mood
- Genre
- Reading length

to calculate a match score for books returned by Google Books.

Keep the algorithm understandable and deterministic.

Return books sorted by match score.

Do not use machine learning or introduce unnecessary complexity.

---

## 7. Routing

### Prompt

Set up React Router for the Booklyn application.

Create routes for:
- Home
- Preferences
- Recommendations
- Saved Books
- Book Details

Use reusable layout/navigation components and keep routing
simple.

---

## 8. Saved Books

### Prompt

Implement a saved-books feature using browser localStorage.

Requirements:
- Save books by ID.
- Prevent duplicate saved books.
- Load saved books when the application starts.
- Remove saved books.
- Keep React state synchronized with localStorage.
- Handle invalid localStorage data safely.
- Do not introduce a backend or database.

---

## 9. Book Details

### Prompt

Add a Book Details page to Booklyn.

When a user selects a book from recommendations, display:
- Cover
- Title
- Author
- Rating
- Description
- Publication information
- Page count
- Categories
- Save action
- Google Books link when available

Add a clear back navigation to the recommendations page.

Keep the page responsive and accessible.

---

## 10. Recommendation Layout

### Prompt

Improve the recommendation page layout.

At desktop width:
- Position the book cover on the left.
- Position book information on the right.
- Place the Save button below the book information.
- Keep the Back button at the top-left.

At mobile width:
- Stack the book cover and information vertically.
- Prevent horizontal overflow.

Keep the existing functionality and visual style.

---

## 11. Accessibility Review

### Prompt

Review the accessibility semantics of the preference selectors.

The current implementation uses buttons with aria-pressed and
radiogroup roles.

Check whether the ARIA pattern is semantically correct and make
the smallest necessary changes without changing the selection
behavior.

Keep native buttons and keyboard accessibility.

---

## 12. Saved Books UI

### Prompt

Polish the Saved Books screen.

Requirements:
- Add clear page heading.
- Add back navigation.
- Display saved books in a responsive grid.
- Provide an empty state when no books are saved.
- Allow users to view details.
- Allow users to remove saved books.
- Reuse existing BookCard and saved-book logic.
- Do not create a second storage system.

---

## 13. Responsive Design

### Prompt

Review the Booklyn application at 375px and 1280px widths.

Identify:
- Horizontal overflow
- Poor spacing
- Cards that are too wide
- Navigation issues
- Buttons that are difficult to use
- Text that becomes difficult to read

Make the smallest necessary CSS improvements without redesigning
the application.

---

## 14. Final Polish

### Prompt

Perform a final UI and UX review of Booklyn.

Check:
- Navigation consistency
- Button states
- Empty states
- Loading and error states
- Typography
- Spacing
- Responsive behavior
- Keyboard accessibility
- Visual hierarchy

Do not add unnecessary features.

Only make improvements that meaningfully improve usability,
accessibility, or visual consistency.

---

# AI Review Process

AI-generated code was not accepted without review.

For each major feature, the implementation was:
1. Generated or assisted by AI.
2. Reviewed manually.
3. Tested in the browser.
4. Adjusted where necessary.
5. Tested again before being considered complete.
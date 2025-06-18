# Flashcard App Architecture

## Project Structure

The application follows a modern, scalable React architecture with clear separation of concerns:

```
/src
├── /assets              # Static images, icons, etc.
├── /components          # Reusable UI components
│   ├── /ui             # Generic UI components (Button, Card, Input, Modal)
│   └── Navbar.jsx      # Navigation component
├── /features           # Domain-specific logic
│   └── /flashcards     # Flashcard-related components
│       ├── FlashcardList.jsx
│       └── FlashcardForm.jsx
├── /hooks              # Custom React hooks
│   ├── useAuth.js      # Authentication logic
│   └── useFlashcards.js # Flashcard/deck operations
├── /pages              # Top-level page components
│   ├── Dashboard.jsx   # Main dashboard
│   ├── DeckView.jsx    # Deck management
│   ├── StudyMode.jsx   # Study interface
│   ├── CreateDeck.jsx  # Deck creation
│   └── Login.jsx       # Authentication
├── /routes             # React Router configuration
│   └── AppRoutes.jsx   # Route definitions
├── /services           # External services & API calls
│   └── supabase.js     # Supabase client
├── /styles             # Global styles
│   └── globals.css     # Tailwind CSS imports
├── App.jsx             # Main app component
└── main.jsx            # React entry point
```

## Architecture Principles

### 1. **Separation of Concerns**
- **Components**: Reusable UI elements
- **Features**: Domain-specific business logic
- **Hooks**: Stateful logic abstraction
- **Pages**: Top-level route components
- **Services**: External API interactions

### 2. **Component Hierarchy**
- **UI Components**: Generic, reusable (Button, Card, Input, Modal)
- **Feature Components**: Domain-specific (FlashcardForm, FlashcardList)
- **Page Components**: Route-level containers
- **Layout Components**: Navigation, layout structure

### 3. **Data Flow**
- **Services**: Handle Supabase API calls
- **Hooks**: Manage state and business logic
- **Components**: Consume hooks for data and actions
- **Pages**: Orchestrate multiple components

## Key Custom Hooks

### `useAuth()`
- Manages authentication state
- Provides sign in/up/out methods
- Handles session persistence

### `useDecks()`
- Fetches and manages deck collections
- CRUD operations for decks
- Loading states

### `useDeck(deckId)`
- Manages individual deck and its cards
- Card CRUD operations
- Real-time updates

### `useStudySession(deckId)`
- Handles study session logic
- Progress tracking
- Statistics calculation

## UI Component System

### Core Components
- **Button**: Configurable variants (primary, secondary, success, danger, outline, ghost)
- **Card**: Container with header, content, footer sections
- **Input**: Form input with label and error handling
- **Modal**: Overlay dialogs with confirmation variants

### Design System
- **Consistent styling**: Tailwind CSS classes
- **Accessibility**: Proper ARIA labels, keyboard navigation
- **Responsive**: Mobile-first approach
- **Loading states**: Built-in loading indicators

## Routing Strategy

- **Centralized routes**: All routes defined in `/routes/AppRoutes.jsx`
- **Protected routes**: Authentication wrapper in `App.jsx`
- **Lazy loading**: Ready for code splitting
- **Nested routing**: Can extend for sub-routes

## State Management

- **Local state**: React useState for component-specific state
- **Shared state**: Custom hooks for cross-component logic
- **Server state**: Supabase real-time subscriptions
- **Form state**: Controlled components with validation

## Error Handling and Performance Strategies

### Error Handling with Error Boundaries
- **`ErrorBoundary` Component**: A dedicated React class component located at `src/components/ErrorBoundary.jsx` is implemented to catch JavaScript errors anywhere in its child component tree.
- **Fallback UI**: When an error is caught, the `ErrorBoundary` displays a generic "Something went wrong." fallback UI, preventing the entire application from crashing. This allows other parts of the application to remain functional.
- **Logging**: Errors caught by `componentDidCatch` are logged to the console, aiding in debugging.
- **Application**: Key parts of the application, including the main route handling in `App.jsx` and data-displaying sections within pages like `Dashboard.jsx`, `DeckView.jsx`, and complex forms like `FlashcardForm.jsx`, are wrapped with `<ErrorBoundary>` to isolate and gracefully handle potential runtime errors.

### Performance Optimization
- **`React.memo`**: As an initial step towards optimizing rendering performance, `React.memo` is applied to reusable, presentational UI components found in `src/components/ui/` (e.g., `Button`, `Card`, `Input`).
- **Benefit**: `React.memo` helps prevent unnecessary re-renders of these components if their props have not changed, even if their parent component re-renders. This can lead to a more responsive UI, especially in complex views or lists.
- **Further Optimizations**: Additional strategies like `useMemo`, `useCallback`, and code-splitting (already noted for routing) can be considered for more complex scenarios.

## Benefits of This Architecture

1. **Scalability**: Easy to add new features and components
2. **Maintainability**: Clear file organization and responsibility
3. **Reusability**: Shared components and hooks
4. **Testability**: Isolated, pure functions and components
5. **Developer Experience**: Intuitive file structure and imports

## Future Enhancements

- **Store**: Add Redux Toolkit or Zustand for complex state
- **Testing**: Further expand Jest + React Testing Library setup (initial setup was attempted but blocked by environment issues).
- **Storybook**: Component documentation and testing
- **PWA**: Service workers for offline functionality 
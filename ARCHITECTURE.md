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

## Benefits of This Architecture

1. **Scalability**: Easy to add new features and components
2. **Maintainability**: Clear file organization and responsibility
3. **Reusability**: Shared components and hooks
4. **Testability**: Isolated, pure functions and components
5. **Developer Experience**: Intuitive file structure and imports

## Future Enhancements

- **Store**: Add Redux Toolkit or Zustand for complex state
- **Testing**: Jest + React Testing Library setup
- **Storybook**: Component documentation and testing
- **Error Boundaries**: Graceful error handling
- **Performance**: React.memo, useMemo optimizations
- **PWA**: Service workers for offline functionality 
# FlashCards App

A modern, scalable flashcard application built with React, Vite, Tailwind CSS, and Supabase. Features a clean architecture with custom hooks, reusable components, and domain-driven design. Perfect for memorizing everything you'll forget next week.

## ✨ Features

- **🏗️ Modern Architecture**: Clean, scalable codebase with separation of concerns
- **🔧 Custom Hooks**: Reusable logic for auth, flashcards, and study sessions
- **🎨 Design System**: Consistent UI components with Tailwind CSS
- **📚 Deck Management**: Create, edit, and organize flashcard collections
- **🃏 Interactive Study Mode**: Flip cards, track progress, and review performance
- **🏷️ Tagging System**: Organize cards with custom tags
- **📊 Progress Tracking**: Monitor study sessions and accuracy metrics
- **🔍 Search & Filter**: Find specific decks and cards quickly
- **📱 Responsive Design**: Works seamlessly on desktop and mobile
- **🔐 Secure Authentication**: User accounts with Supabase Auth
- **☁️ Cloud Sync**: Real-time data synchronization

## 🏗️ Architecture

This project follows modern React best practices with a scalable architecture:

```
/src
├── /components      # Reusable UI components (Button, Card, Input, Modal)
├── /features        # Domain-specific logic (flashcards)
├── /hooks          # Custom hooks (useAuth, useFlashcards)
├── /pages          # Top-level views (Dashboard, Study, Login)
├── /routes         # React Router configuration
├── /services       # API calls and external services
├── /styles         # Global CSS and Tailwind config
├── App.jsx         # Main app component
└── main.jsx        # React entry point
```

**Key Benefits:**
- **Maintainable**: Clear separation of concerns
- **Scalable**: Easy to add new features
- **Reusable**: Shared hooks and components
- **Testable**: Pure functions and isolated logic

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation.

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + Heroicons
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Architecture**: Custom hooks, feature-based organization

## 📖 Setup Instructions

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flashcards
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Go to SQL Editor and run the schema from `supabase-schema.sql`

### 3. Configure Environment

Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Or edit `src/services/supabase.js` directly and replace the placeholder values.

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your app.

## 🗄️ Database Schema

The app uses the following tables with Row Level Security (RLS):

- **`decks`**: Store flashcard collections
- **`flashcards`**: Individual cards with front/back content and tags  
- **`study_sessions`**: Track study session progress
- **`card_reviews`**: Record individual card performance

All tables include RLS policies to ensure users can only access their own data.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your project on [vercel.com](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

The `vercel.json` configuration is already included for proper SPA routing.

### Manual Deploy

```bash
npm run build
# Upload the dist/ folder to your hosting provider
```

## 📖 Usage Guide

1. **Sign Up/Login**: Create an account or sign in
2. **Create a Deck**: Click "New Deck" and give it a title and description
3. **Add Cards**: Open your deck and add flashcards with questions, answers, and tags
4. **Study**: Click "Study" to start reviewing your cards with spaced repetition
5. **Track Progress**: View your accuracy and study statistics

## 🎯 Key Components

### Custom Hooks
- **`useAuth()`**: Authentication state and methods
- **`useDecks()`**: Deck collection management
- **`useDeck(id)`**: Individual deck and card operations
- **`useStudySession(id)`**: Study session logic and progress tracking

### UI Components
- **`Button`**: Configurable button with variants and loading states
- **`Card`**: Container component with header, content, footer
- **`Input`**: Form input with label and error handling
- **`Modal`**: Overlay dialogs with confirmation variants

### Feature Components
- **`FlashcardForm`**: Reusable form for adding/editing cards
- **`FlashcardList`**: Display and manage cards in a deck

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features

1. **New page**: Add to `/src/pages` and update routes
2. **New component**: Add to `/src/components/ui` for reusable UI
3. **New feature**: Add to `/src/features/[domain]`
4. **New hook**: Add to `/src/hooks`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this for your own projects.

---

*Built with ❤️ and a healthy dose of procrastination avoidance. Now featuring a clean architecture that won't make future you want to cry.*

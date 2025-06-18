import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDecks } from '../hooks/useFlashcards'
import { Add, MenuBook, Delete, Edit } from '@mui/icons-material'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  IconButton,
} from '@mui/material'
import { ConfirmModal } from '../components/ui/Modal'
import ErrorBoundary from '../components/ErrorBoundary'

export default function Dashboard() {
  const { decks, loading, deleteDeck } = useDecks()
  const [searchTerm, setSearchTerm] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

  const handleDeleteDeck = async (deckId) => {
    await deleteDeck(deckId)
    setShowDeleteConfirm(null)
  }

  const filteredDecks = decks.filter(deck =>
    deck.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (deck.description && deck.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" py={12}>
        <Typography variant="h6" color="text.secondary">Loading your decks...</Typography>
      </Box>
    )
  }

  return (
    <Box maxWidth={1000} mx="auto">
      <Box mb={8}>
        <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
          Your Flashcard Decks
        </Typography>
        <Typography color="text.secondary">
          {decks.length === 0
            ? "No decks yet. Time to create your first one and pretend you'll actually study."
            : `${decks.length} deck${decks.length !== 1 ? 's' : ''} ready for your procrastination.`
          }
        </Typography>
      </Box>

      {/* Search and Create */}
      <Box mb={6} display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
        <Box flex={1}>
          <TextField
            type="text"
            placeholder="Search decks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            size="small"
            variant="outlined"
          />
        </Box>
        <Button
          component={Link}
          to="/create-deck"
          startIcon={<Add />}
          variant="contained"
          sx={{ fontWeight: 600 }}
        >
          Create New Deck
        </Button>
      </Box>

      {/* Decks Grid */}
      <ErrorBoundary>
        {filteredDecks.length === 0 ? (
          <Card className="text-center py-12">
            <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No decks found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try a different search term.' : 'Get started by creating a new deck.'}
          </Typography>
          {!searchTerm && (
            <Box mt={4}>
              <Button
                component={Link}
                to="/create-deck"
                startIcon={<Add />}
                variant="contained"
              >
                Create New Deck
              </Button>
            </Box>
          )}
        </Card>
      ) : (
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr' }} gap={3}>
          {filteredDecks.map((deck) => (
            <Card key={deck.id} sx={{ p: 3, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 6 } }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Typography variant="h6" fontWeight={600} noWrap>
                  {deck.title}
                </Typography>
                <Box display="flex" gap={1}>
                  <IconButton
                    component={Link}
                    to={`/deck/${deck.id}`}
                    size="small"
                    color="primary"
                    title="Edit deck"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => setShowDeleteConfirm(deck.id)}
                    size="small"
                    color="error"
                    title="Delete deck"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              {deck.description && (
                <Typography color="text.secondary" variant="body2" mb={2}>
                  {deck.description}
                </Typography>
              )}
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  {deck.flashcards?.[0]?.count || 0} cards
                </Typography>
                <Button
                  component={Link}
                  to={`/study/${deck.id}`}
                  variant="outlined"
                  size="small"
                  startIcon={<MenuBook fontSize="small" />}
                >
                  Study
                </Button>
              </Box>
            </Card>
          ))}
        </div>
        )}
      </ErrorBoundary>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => handleDeleteDeck(showDeleteConfirm)}
        title="Delete Deck"
        message="Are you sure you want to delete this deck? This will also delete all flashcards in it."
        confirmText="Delete"
        variant="danger"
      />
    </Box>
  )
} 
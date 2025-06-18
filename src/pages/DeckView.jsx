import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDeck } from '../hooks/useFlashcards'
import { ArrowBack, Add, MenuBook } from '@mui/icons-material'
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
} from '@mui/material'
import Modal, { ConfirmModal } from '../components/ui/Modal'
import FlashcardForm from '../features/flashcards/FlashcardForm'
import FlashcardList from '../features/flashcards/FlashcardList'
import ErrorBoundary from '../components/ErrorBoundary'

export default function DeckView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { deck, cards, loading, createCard, updateCard, deleteCard } = useDeck(id)
  const [showCardForm, setShowCardForm] = useState(false)
  const [editingCard, setEditingCard] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

  const handleCardSubmit = async (formData) => {
    const { error } = editingCard
      ? await updateCard(editingCard.id, formData.front, formData.back, formData.tags)
      : await createCard(formData.front, formData.back, formData.tags)

    if (error) {
      console.error('Error saving card:', error.message)
      return
    }

    setShowCardForm(false)
    setEditingCard(null)
  }

  const handleEditCard = (card) => {
    setEditingCard(card)
    setShowCardForm(true)
  }

  const handleDeleteCard = async (cardId) => {
    await deleteCard(cardId)
    setShowDeleteConfirm(null)
  }

  const cancelCardForm = () => {
    setShowCardForm(false)
    setEditingCard(null)
  }

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" py={12}>
        <Typography variant="h6" color="text.secondary">Loading deck...</Typography>
      </Box>
    )
  }

  if (!deck) {
    return (
      <Box textAlign="center" py={12}>
        <Typography variant="h6" color="text.secondary">Deck not found</Typography>
      </Box>
    )
  }

  return (
    <Box maxWidth={800} mx="auto">
      <Box mb={6}>
        <Button
          variant="text"
          onClick={() => navigate('/')}
          startIcon={<ArrowBack />}
          sx={{ mb: 2 }}
        >
          Back to Dashboard
        </Button>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h4" fontWeight={700} color="text.primary">
              {deck.title}
            </Typography>
            {deck.description && (
              <Typography color="text.secondary" mt={1}>{deck.description}</Typography>
            )}
            <Typography variant="body2" color="text.secondary" mt={1}>
              {cards.length} card{cards.length !== 1 ? 's' : ''}
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <Button
              onClick={() => setShowCardForm(true)}
              startIcon={<Add />}
              variant="contained"
            >
              Add Card
            </Button>
            {cards.length > 0 && (
              <Button
                component={Link}
                to={`/study/${id}`}
                startIcon={<MenuBook />}
                variant="outlined"
                color="success"
              >
                Study
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* Cards List */}
      <FlashcardList
        cards={cards}
        onEdit={handleEditCard}
        onDelete={(cardId) => setShowDeleteConfirm(cardId)}
      />

      {/* Add First Card Button for Empty Deck */}
      {cards.length === 0 && (
        <Box textAlign="center" mt={6}>
          <Button
            onClick={() => setShowCardForm(true)}
            startIcon={<Add />}
            variant="contained"
          >
            Add First Card
          </Button>
        </Box>
      )}

      {/* Add/Edit Card Modal */}
      <Modal
        isOpen={showCardForm}
        onClose={cancelCardForm}
        title={editingCard ? 'Edit Card' : 'Add New Card'}
        size="lg"
      >
        <FlashcardForm
          initialData={editingCard ? {
            front: editingCard.front,
            back: editingCard.back,
            tags: editingCard.tags ? editingCard.tags.join(', ') : ''
          } : undefined}
          onSubmit={handleCardSubmit}
          onCancel={cancelCardForm}
          isEditing={!!editingCard}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => handleDeleteCard(showDeleteConfirm)}
        title="Delete Card"
        message="Are you sure you want to delete this flashcard?"
        confirmText="Delete"
        variant="danger"
      />
    </Box>
  )
} 
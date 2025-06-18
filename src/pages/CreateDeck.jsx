import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDecks } from '../hooks/useFlashcards'
import { ArrowLeft as ArrowLeftIcon } from '@mui/icons-material'
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from '@mui/material'

export default function CreateDeck() {
  const navigate = useNavigate()
  const { createDeck } = useDecks()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setLoading(true)
    try {
      const { data, error } = await createDeck(title, description)
      if (error) {
        console.error('Error creating deck:', error.message)
        alert('Error creating deck. Please try again.')
        return
      }
      navigate(`/deck/${data.id}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box maxWidth={600} mx="auto">
      <Box mb={6}>
        <Button
          variant="text"
          onClick={() => navigate('/')}
          startIcon={<ArrowLeftIcon />}
          sx={{ mb: 2 }}
        >
          Back to Dashboard
        </Button>
        <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
          Create New Deck
        </Typography>
        <Typography color="text.secondary" mb={2}>
          Start a new collection of flashcards. Pick a catchy title, maybe something like "Stuff I'll Forget Tomorrow."
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Deck Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              margin="normal"
              placeholder="e.g., Japanese Vocabulary, Programming Concepts, Dad Jokes"
            />
            <TextField
              label="Description (Optional)"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              multiline
              fullWidth
              margin="normal"
              placeholder="Brief description of what this deck covers..."
            />
            <Box display="flex" gap={2} mt={2}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => navigate('/')}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                loading={loading ? 1 : 0}
                disabled={!title.trim() || loading}
                fullWidth
              >
                Create Deck
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
} 
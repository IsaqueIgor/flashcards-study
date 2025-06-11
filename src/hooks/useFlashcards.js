import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

export const useDecks = () => {
  const [decks, setDecks] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDecks = async () => {
    try {
      const { data, error } = await supabase
        .from('decks')
        .select(`
          *,
          flashcards (count)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setDecks(data || [])
    } catch (error) {
      console.error('Error fetching decks:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const createDeck = async (title, description) => {
    try {
      const { data, error } = await supabase
        .from('decks')
        .insert([
          {
            title: title.trim(),
            description: description?.trim() || null,
            user_id: (await supabase.auth.getUser()).data.user.id
          }
        ])
        .select()
        .single()

      if (error) throw error
      await fetchDecks() // Refresh decks
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const deleteDeck = async (deckId) => {
    try {
      const { error } = await supabase
        .from('decks')
        .delete()
        .eq('id', deckId)

      if (error) throw error
      setDecks(decks.filter(deck => deck.id !== deckId))
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  useEffect(() => {
    fetchDecks()
  }, [])

  return {
    decks,
    loading,
    fetchDecks,
    createDeck,
    deleteDeck
  }
}

export const useDeck = (deckId) => {
  const [deck, setDeck] = useState(null)
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDeckAndCards = async () => {
    try {
      // Fetch deck
      const { data: deckData, error: deckError } = await supabase
        .from('decks')
        .select('*')
        .eq('id', deckId)
        .single()

      if (deckError) throw deckError
      setDeck(deckData)

      // Fetch cards
      const { data: cardsData, error: cardsError } = await supabase
        .from('flashcards')
        .select('*')
        .eq('deck_id', deckId)
        .order('created_at', { ascending: false })

      if (cardsError) throw cardsError
      setCards(cardsData || [])
    } catch (error) {
      console.error('Error fetching deck:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const createCard = async (front, back, tags) => {
    try {
      const cardData = {
        deck_id: deckId,
        front: front.trim(),
        back: back.trim(),
        tags: tags?.trim() ? tags.split(',').map(tag => tag.trim()) : null,
        user_id: (await supabase.auth.getUser()).data.user.id
      }

      const { data, error } = await supabase
        .from('flashcards')
        .insert([cardData])
        .select()
        .single()

      if (error) throw error
      setCards([data, ...cards])
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const updateCard = async (cardId, front, back, tags) => {
    try {
      const cardData = {
        front: front.trim(),
        back: back.trim(),
        tags: tags?.trim() ? tags.split(',').map(tag => tag.trim()) : null,
      }

      const { data, error } = await supabase
        .from('flashcards')
        .update(cardData)
        .eq('id', cardId)
        .select()
        .single()

      if (error) throw error
      setCards(cards.map(card => card.id === cardId ? data : card))
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const deleteCard = async (cardId) => {
    try {
      const { error } = await supabase
        .from('flashcards')
        .delete()
        .eq('id', cardId)

      if (error) throw error
      setCards(cards.filter(card => card.id !== cardId))
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  useEffect(() => {
    if (deckId) {
      fetchDeckAndCards()
    }
  }, [deckId])

  return {
    deck,
    cards,
    loading,
    fetchDeckAndCards,
    createCard,
    updateCard,
    deleteCard
  }
}

export const useStudySession = (deckId) => {
  const [sessionId, setSessionId] = useState(null)
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0
  })

  const createSession = async () => {
    try {
      const { data, error } = await supabase
        .from('study_sessions')
        .insert([{
          deck_id: deckId,
          user_id: (await supabase.auth.getUser()).data.user.id,
          cards_studied: 0,
          cards_correct: 0,
          cards_incorrect: 0
        }])
        .select()
        .single()

      if (error) throw error
      setSessionId(data.id)
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const recordCardReview = async (cardId, isCorrect) => {
    try {
      // Record individual card review
      await supabase
        .from('card_reviews')
        .insert([{
          session_id: sessionId,
          card_id: cardId,
          user_id: (await supabase.auth.getUser()).data.user.id,
          marked_correct: isCorrect
        }])

      // Update session stats
      const newStats = {
        ...sessionStats,
        total: sessionStats.total + 1,
        correct: isCorrect ? sessionStats.correct + 1 : sessionStats.correct,
        incorrect: !isCorrect ? sessionStats.incorrect + 1 : sessionStats.incorrect
      }
      setSessionStats(newStats)

      // Update session in database
      await supabase
        .from('study_sessions')
        .update({
          cards_studied: newStats.total,
          cards_correct: newStats.correct,
          cards_incorrect: newStats.incorrect
        })
        .eq('id', sessionId)

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const completeSession = async () => {
    try {
      await supabase
        .from('study_sessions')
        .update({
          completed_at: new Date().toISOString()
        })
        .eq('id', sessionId)

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  return {
    sessionId,
    sessionStats,
    createSession,
    recordCardReview,
    completeSession,
    resetStats: () => setSessionStats({ correct: 0, incorrect: 0, total: 0 })
  }
} 
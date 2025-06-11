import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDeck, useStudySession } from '../hooks/useFlashcards'
import { ArrowLeftIcon, CheckIcon, XMarkIcon, ArrowRightIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function StudyMode() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { deck, cards, loading } = useDeck(id)
  const { sessionStats, createSession, recordCardReview, completeSession, resetStats } = useStudySession(id)
  
  const [shuffledCards, setShuffledCards] = useState([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [studyComplete, setStudyComplete] = useState(false)

  useEffect(() => {
    if (cards.length > 0) {
      const shuffled = shuffleArray(cards)
      setShuffledCards(shuffled)
      createSession()
    }
  }, [cards])

  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const handleCardResponse = async (isCorrect) => {
    if (currentCardIndex >= shuffledCards.length) return

    await recordCardReview(shuffledCards[currentCardIndex].id, isCorrect)

    // Move to next card or complete session
    if (currentCardIndex < shuffledCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setShowAnswer(false)
    } else {
      await completeSession()
      setStudyComplete(true)
    }
  }

  const restartSession = () => {
    setCurrentCardIndex(0)
    setShowAnswer(false)
    resetStats()
    setStudyComplete(false)
    setShuffledCards(shuffleArray(cards))
    createSession()
  }

  const currentCard = shuffledCards[currentCardIndex]
  const progress = shuffledCards.length > 0 ? ((currentCardIndex + 1) / shuffledCards.length) * 100 : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-xl text-gray-600">Loading study session...</div>
      </div>
    )
  }

  if (!deck || cards.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="text-xl text-gray-600 mb-4">
          {!deck ? 'Deck not found' : 'No cards to study'}
        </div>
        <Link to="/">
          <Button>
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    )
  }

  if (studyComplete) {
    const accuracy = sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0
    
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckIcon className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Study Session Complete!</h1>
            <p className="text-gray-600">
              You've completed studying "{deck.title}". Time to celebrate or cry, depending on your results.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{sessionStats.total}</div>
              <div className="text-sm text-gray-500">Cards Studied</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{sessionStats.correct}</div>
              <div className="text-sm text-gray-500">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{sessionStats.incorrect}</div>
              <div className="text-sm text-gray-500">Incorrect</div>
            </div>
          </div>

          <div className="mb-8">
            <div className="text-3xl font-bold text-blue-600 mb-1">{accuracy}%</div>
            <div className="text-sm text-gray-500">Accuracy</div>
          </div>

          <div className="flex gap-4">
            <Button onClick={restartSession} className="flex-1">
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Study Again
            </Button>
            <Link to={`/deck/${id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                Edit Deck
              </Button>
            </Link>
            <Link to="/" className="flex-1">
              <Button variant="secondary" className="w-full">
                Dashboard
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Exit Study Mode
        </Button>
        
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{deck.title}</h1>
          <div className="text-sm text-gray-500">
            {currentCardIndex + 1} of {shuffledCards.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 text-sm text-gray-600 mb-6">
          <span>Correct: <span className="font-medium text-green-600">{sessionStats.correct}</span></span>
          <span>Incorrect: <span className="font-medium text-red-600">{sessionStats.incorrect}</span></span>
          <span>Remaining: <span className="font-medium">{shuffledCards.length - currentCardIndex - 1}</span></span>
        </div>
      </div>

      {/* Flashcard */}
      <Card className="min-h-[400px] mb-6">
        <div 
          className="p-8 h-[400px] flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-xl"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          <div className="text-center w-full">
            {!showAnswer ? (
              <>
                <div className="text-sm text-gray-500 mb-4">Question</div>
                <div className="text-lg text-gray-900 leading-relaxed">
                  {currentCard?.front}
                </div>
                <div className="text-sm text-gray-400 mt-8">
                  Click to reveal answer
                </div>
              </>
            ) : (
              <>
                <div className="text-sm text-gray-500 mb-4">Answer</div>
                <div className="text-lg text-gray-900 leading-relaxed">
                  {currentCard?.back}
                </div>
                {currentCard?.tags && currentCard.tags.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1 mt-4">
                    {currentCard.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {!showAnswer ? (
          <Button
            onClick={() => setShowAnswer(true)}
            className="flex-1"
            size="lg"
          >
            <ArrowRightIcon className="h-4 w-4 mr-2" />
            Show Answer
          </Button>
        ) : (
          <>
            <Button
              onClick={() => handleCardResponse(false)}
              variant="danger"
              className="flex-1"
              size="lg"
            >
              <XMarkIcon className="h-5 w-5 mr-2" />
              Incorrect
            </Button>
            <Button
              onClick={() => handleCardResponse(true)}
              variant="success"
              className="flex-1"
              size="lg"
            >
              <CheckIcon className="h-5 w-5 mr-2" />
              Correct
            </Button>
          </>
        )}
      </div>

      <div className="text-center mt-4 text-sm text-gray-500">
        {showAnswer 
          ? "How well did you know this card?" 
          : "Think about your answer, then click to reveal"
        }
      </div>
    </div>
  )
} 
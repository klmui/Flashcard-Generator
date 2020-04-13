import React from 'react'
import Flashcard from './Flashcard';

export default function FlashcardList({ flashcards }) {
  return (
    <div className="card-grid">
      {flashcards.map(flashcard => {
        // Makes a new Flashcard component passing in the flashcard.
        // Key is important for only rendering once if the content
        // of the flashcard did not change.
        return <Flashcard flashcard={flashcard} key={flashcard.id} />
      })}
    </div>
  )
}

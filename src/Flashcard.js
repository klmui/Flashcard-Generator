import React, { useState, useEffect, useRef } from 'react'

export default function Flashcard({ flashcard }) {
  // By default set to false because we want to show front side
  // useState(false) sets flip to false and setFlip is a method
  const [flip, setFlip] = useState(false);

  return (
    <div
      className={`card ${flip ? `flip` : ''}`} 
      onClick={() => setFlip(!flip)}
    >
      <div className="front">
        {flashcard.question}
        <div className="flashcard-options">
          {flashcard.options.map(option => {
            return <div className="flashcard-option">{option}</div>
          })}
        </div>
      </div>
      <div className="back">{flashcard.answer}</div>
    </div>
  )
}

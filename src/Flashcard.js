import React, { useState } from 'react'

export default function Flashcard({ flashcard }) {
  // By default set to false because we want to show front side
  // useState(false) sets flip to false and setFlip is a method
  const [flip, setFlip] = useState(false);

  return (
    <div onClick={() => setFlip(!flip)}>
      {flip ? flashcard.answer : flashcard.question}
    </div>
  )
}

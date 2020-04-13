import React, { useState, useEffect } from 'react';
import FlashcardList from './FlashcardList';
import './app.css';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)

  // useEffect hook for whenever the page load, empty array as soon as component mounts
  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10')
  }, [])

  return (
    <FlashcardList flashcards={flashcards} />
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "What is 2 + 2?",
    answer: "4",
    options: [
      '2',
      '3',
      '4',
      '5'
    ]
  },
  {
    id: 2,
    question: "Queston 2?",
    answer: "4",
    options: [
      '2',
      '3',
      '4',
      '5'
    ]
  }
]

export default App;

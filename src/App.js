import React, { useState, useEffect } from 'react';
import FlashcardList from './FlashcardList';
import './app.css';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)

  // useEffect hook for whenever the page load, empty array as soon as component mounts
  useEffect(() => {
    axios
      .get('https://opentdb.com/api.php?amount=10')
      .then(res => {
        // Call res.data (results is part of obj)
        setFlashcards(res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          // Incorrect answers at front and then correct answer last
          // Spread operator makes deep copy and concats
          const options = [
            ...questionItem.incorrect_answers.map(a => decodeString(a)
            ), 
            answer
          ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            // 50% of time we get .5 and 50% is -.5
            options: options.sort(() => Math.random() - .5)
          }
        }));
        console.log(res.data);
      });
  }, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }

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

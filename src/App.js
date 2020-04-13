import React, { useState, useEffect, useRef } from 'react'; // hooks
import FlashcardList from './FlashcardList';
import './app.css';
import axios from 'axios';

function App() {
  // States
  //const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  // Empty array is for very first load of page
  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories)
      })
  }, []);

  // useEffect hook for whenever the page load, empty array as soon as component mounts
  useEffect(() => {

  }, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    // prevent default allows us to go here and not submit
    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value
        }
      })
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
  }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map(category => {
              return <option value={category.id} key={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input type="number" id="amount" min="1" step="1" defaultValue={10} ref=
          {amountEl} />
        </div>
        <div className="form-group">
         <button className='btn'>Generate</button>
        </div>
      </form>

      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

// const SAMPLE_FLASHCARDS = [
//   {
//     id: 1,
//     question: "What is 2 + 2?",
//     answer: "4",
//     options: [
//       '2',
//       '3',
//       '4',
//       '5'
//     ]
//   },
//   {
//     id: 2,
//     question: "Queston 2?",
//     answer: "4",
//     options: [
//       '2',
//       '3',
//       '4',
//       '5'
//     ]
//   }
// ]

export default App;

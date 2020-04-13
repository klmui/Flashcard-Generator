import React, { useState, useEffect, useRef } from 'react'

export default function Flashcard({ flashcard }) {
  // By default set to false because we want to show front side
  // useState(false) sets flip to false and setFlip is a method
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState('initial');

  // Allows us to ref elements that persist through rerenders
  const frontEl = useRef();
  const backEl = useRef();

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    // Return max of front height or backheight, and min is 100
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  // Do this whenever... the things in the array change
  useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options]);
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight);
    // Gets called whenever this comp destorys itself
    return () => window.removeEventListener('resize', setMaxHeight);
  }, []);

  return (
    <div
      className={`card ${flip ? `flip` : ''}`} 
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEl}>
        {flashcard.question}
        <div className="flashcard-options">
          {flashcard.options.map(option => {
            return <div className="flashcard-option" key={option}>{option}</div>
          })}
        </div>
      </div>
      <div className="back" ref={backEl}>{flashcard.answer}</div>
    </div>
  )
}

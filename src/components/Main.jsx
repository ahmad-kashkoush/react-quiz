import { useReducer, useState } from "react";
import { questions } from "./../questions.json";
export default function Main() {
  const [{ number, showAnswer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  //   const [number, setNumber] = useState(0);
  //   const [showAnswer, setShowAnswer] = useState(false);
  //   const [points, setPoints] = useState(0);
  if (number === 0)
    return (
      <main className="main start">
        <h2>Welcome to react quiz</h2>
        <h3>{questions.length} questions to test your react mastery</h3>
        <button className="btn" onClick={() => dispatch({ type: "inc" })}>
          let's start
        </button>
      </main>
    );

  return (
    <main className="main">
      <div className="progress">
        <progress value={number} min="0" max={questions.length}></progress>
        <p>
          {" "}
          {number} of {questions.length}
        </p>
        <p>
          {points} of {totalPoints}
        </p>
      </div>
      <h3>{questions[number - 1].question}</h3>
      <div className="options">
        {questions[number - 1].options.map((op, i) => {
          if (!showAnswer)
            return (
              <button
                key={i}
                className="btn btn-option"
                value={i}
                onClick={handleOptionClick}
              >
                {op}
              </button>
            );
          return (
            <button
              key={i}
              className={`btn btn-option ${
                i === questions[0].correctOption ? "correct" : "wrong"
              }`}
            >
              {op}
            </button>
          );
        })}
      </div>
      <button className="btn" onClick={handleNumberChange}>
        next
      </button>
    </main>
  );
}

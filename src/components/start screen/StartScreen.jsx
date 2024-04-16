export default function StartScreen({ numOfQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to react quiz</h2>
      <h3>{numOfQuestions} questions to test your react mastery</h3>
      <button className="btn" onClick={() => dispatch({ type: "start" })}>
        let's start
      </button>
    </div>
  );
}

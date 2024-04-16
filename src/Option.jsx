export default function Option({ answer, isCorrect, onOptionClick, children }) {
  return (
    <button
      className={`btn btn-option ${answer === null ? "" : isCorrect ? "correct answer" : "wrong"}`}
      disabled={answer !== null}
      onClick={answer === null ? onOptionClick : undefined}
    >
      {children}
    </button>
  );
}

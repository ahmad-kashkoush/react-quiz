import { useQu } from "../QuestionsContext";

export default function Option({ children, isCorrect }) {
  const { answer, clickOption} = useQu();
  function handleOptionClick(e) {
    clickOption(e.target.value);
  }
  return (
    <button
      className={`btn btn-option ${
        answer === null ? "" : isCorrect ? "correct answer" : "wrong"
      }`}
      disabled={answer !== null}
      onClick={answer === null ? handleOptionClick: undefined}
    >
      {children}
    </button>
  );
}

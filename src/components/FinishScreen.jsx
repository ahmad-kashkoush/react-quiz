import { useQu } from "./QuestionsContext";

export default function FinishScreen() {
const { points, totalPoints, maxScore, restartQuiz}=useQu();
  const percent = Math.ceil((points / totalPoints) * 100);
  return (
    <>
      <p className="result">
        you scored <strong>{points}</strong> out of {totalPoints} points (
        {percent}%)
      </p>
      <p className="highscore">your highest score is:{maxScore}</p>
      <button
        className="btn btn-ui"
        onClick={restartQuiz}
      >
        Restart the Quiz
      </button>
    </>
  );
}


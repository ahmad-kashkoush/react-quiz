import { useQu } from "../QuestionsContext";

export default function StartScreen() {
  const { numOfQuestions, startQuiz, status } = useQu();

  return (
    <div className="start">
      <h2>Welcome to react quiz</h2>
      <h3>{numOfQuestions} questions to test your react mastery</h3>
      <button className="btn" onClick={() => startQuiz()}>
        let's start
      </button>
    </div>
  );
}

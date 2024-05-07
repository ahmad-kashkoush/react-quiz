import { useQu } from "../QuestionsContext";

export default function Progress() {
  const { index, numOfQuestions, points, totalPoints } = useQu();
  return (
    <div className="progress">
      <progress value={index + 1} min="0" max={numOfQuestions}></progress>
      <p>
        {" "}
        {index + 1} of {numOfQuestions}
      </p>
      <p>
        {points} of {totalPoints}
      </p>
    </div>
  );
}

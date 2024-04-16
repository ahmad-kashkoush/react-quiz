export default function Progress({
  index,
  numOfQuestions,
  points,
  totalPoints,
}) {
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

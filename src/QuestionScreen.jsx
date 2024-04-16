import  CountDownTimer  from "./CountDownTimer";
import  Option  from "./Option";
import  Progress from "./Progress";

export default function QuestionScreen({
  index,
  points,
  totalPoints,
  numOfQuestions,
  dispatch,
  questions,
  answer,
  timer,
}) {
  function handleOptionClick(e) {
    dispatch({ type: "inc", payload: +e.target.value });
  }
  function handleNumberChange(e) {
    // setNumber((i) => i + 1);
    dispatch({ type: "next" });
  }

  return (
    <>
      <Progress
        index={index}
        numOfQuestions={numOfQuestions}
        points={points}
        totalPoints={totalPoints}
      />

      <h3>{questions[index].question}</h3>
      <div className="options">
        {questions[index].options.map((op, i) => {
          return (
            <>
              <Option
                key={op}
                answer={answer}
                isCorrect={i === questions[index].correctOption}
                onOptionClick={handleOptionClick}
              >
                {" "}
                {op}
              </Option>
            </>
          );
        })}
      </div>
      {answer !== null && (
        <>
          <button className="btn btn-ui" onClick={handleNumberChange}>
            next
          </button>
          <CountDownTimer timer={timer} />
        </>
      )}
    </>
  );
}

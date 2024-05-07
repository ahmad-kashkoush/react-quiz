import { useQu } from "../QuestionsContext";
import CountDownTimer from "../timer/CountDownTimer";
import Option from "./Option";
import Progress from "./Progress";

export default function QuestionScreen() {
  const { index, questions, answer, clickNext } = useQu();

  function handleNumberChange(e) {
    clickNext();
  }

  return (
    <>
      <Progress />

      <h3>{questions[index].question}</h3>
      <div className="options">
        {questions[index].options.map((op, i) => (
          <Option key={op} isCorrect={i === questions[index].correctOption}>
            {" "}
            {op}
          </Option>
        ))}
      </div>
      {answer !== null && (
        <>
          <button className="btn btn-ui" onClick={handleNumberChange}>
            next
          </button>
          <CountDownTimer />
        </>
      )}
    </>
  );
}

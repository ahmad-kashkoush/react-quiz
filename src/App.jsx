// components
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/start screen/StartScreen";
import QuestionScreen from "./components/Question screen/QuestionScreen";
import FinishScreen from "./components/FinishScreen";
// hooks
import { useReducer } from "react";
import { useTicker } from "./components/timer/useTicker";
import { useQuestions } from "./components/Question screen/useQuestions";
//
import "./index.css";
const sec_per_question = 10;
const initialState = {
  questions: [],
  index: 0, // for question number
  points: 0,
  answer: null,
  // loading, error, ready, active, finished
  status: "loading",
  maxScore: 0,
  timer: 10,
};
function reducer(state, action) {
  const { type, payload } = action;
  const { index, questions, points, maxScore, timer } = state;
  switch (type) {
    case "setQuestions":
      return { ...state, questions: payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        timer: sec_per_question * questions.length,
      };
    case "next":
      return {
        ...state,
        index: index + 1,
        answer: null,
        status: index >= questions.length - 1 ? "finished" : "active",
        maxScore: Math.max(points, maxScore),
      };
    case "inc":
      return {
        ...state,
        answer: payload,
        points:
          points +
          (payload === questions[index].correctOption
            ? questions[index].points
            : 0),
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: questions,
        maxScore: maxScore,
      };
    case "tick":
      return {
        ...state,
        timer: timer - 1,
        status: timer === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("unknow Error");
  }
}
function App() {
  const [
    { status, questions, index, points, answer, maxScore, timer },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numOfQuestions = questions.length;
  const totalPoints = questions
    .map((q) => q.points)
    .reduce((prev, cnt) => cnt + prev, 0);
  useTicker(timer, status, dispatch);
  useQuestions(dispatch);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <QuestionScreen
            numOfQuestions={numOfQuestions}
            dispatch={dispatch}
            questions={questions}
            index={index}
            points={points}
            totalPoints={totalPoints}
            answer={answer}
            timer={timer}
          />
        )}
        {status === "finished" && (
          <FinishScreen
            totalPoints={totalPoints}
            points={points}
            maxScore={maxScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
export default App;

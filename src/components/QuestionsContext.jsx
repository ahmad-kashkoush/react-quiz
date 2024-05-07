import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";

import { useTicker } from "./timer/useTicker";
import { useEffect } from "react";
import { myQuestions } from "./../questions.json";
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

const QuestionContext = createContext();

function QuestionsProvider({ children }) {
  const [
    { status, questions, index, points, answer, maxScore, timer },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numOfQuestions = questions.length;
  const totalPoints = questions
    .map((q) => q.points)
    .reduce((prev, cnt) => cnt + prev, 0);
  useTicker(timer, status, dispatch);
  useEffect(
    function () {
      if (status === "loading")
        dispatch({ type: "setQuestions", payload: myQuestions });
    },
    []
  );

  function startQuiz() {
    dispatch({ type: "start" });
  }
  function clickOption(val) {
    dispatch({ type: "inc", payload: +val });
  }
  function clickNext() {
    dispatch({ type: "next" });
  }
  function restartQuiz() {
    dispatch({ type: "restart" });
  }
  return (
    <QuestionContext.Provider
      value={{
        status,
        questions,
        numOfQuestions,
        totalPoints,
        index,
        points,
        answer,
        maxScore,
        timer,
        startQuiz,
        clickOption,
        clickNext,
        restartQuiz,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}
function useQu() {
  const context = useContext(QuestionContext);
  return context;
}

export { useQu, QuestionsProvider };

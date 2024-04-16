import { useState } from "react";
import DateCounter from "./components/DateCounter";
import Header from "./components/Header";
import Main from "./components/Main";
import "./index.css";
import { useEffect } from "react";
import { useReducer } from "react";
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
  const [state, dispatch] = useReducer(reducer2, []);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "setQuestions", payload: data }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main />
    </div>
  );
}

export default App;

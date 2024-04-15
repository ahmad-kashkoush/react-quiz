import { useState } from "react";
import DateCounter from "./components/DateCounter";
import Header from "./components/Header";
import Main from "./components/Main";
import "./index.css";
import { useEffect } from "react";
import { useReducer } from "react";
function reducer2(state, action) {
  switch (action.type) {
    case "setQuestions":
      return action.payload;
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

import { useEffect } from "react";
import { myQuestions } from "./questions.json";

export function useQuestions(dispatch) {
  useEffect(
    function () {
      // fetch("http://localhost:8000/questions")
      //   .then((res) => res.json())
      //   .then((data) => dispatch({ type: "setQuestions", payload: data }))
      //   .catch((err) => dispatch({ type: "dataFaild" }));
      dispatch({ type: "setQuestions", payload: myQuestions });
    },
    [dispatch]
  );
}

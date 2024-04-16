import { useReducer, useState } from "react";

/**
 * useReducer Hook function
 * takes previous state and returns nextState after updating using action
 * @param {*} previousState
 * @param {*} action
 * @returns
 */
function reducer(state, action) {
  const { count, step } = state;
  const { payload, type } = action;
  switch (type) {
    case "dec":
      return { ...state, count: count - step };
    case "inc":
      return { ...state, count: count + step };
    case "setCount":
      return { ...state, count: payload };
    case "setStep":
      return { ...state, step: payload };
    case "reset":
      return { ...state, step: 1, count: 0 };
    default:
      throw new Error("unknown type");
  }
}
function DateCounter() {
  const initialState = { count: 0, step: 1 };
  const [{ count, step }, dispatch] = useReducer(reducer, initialState);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // // setCount((count) => count - 1);
    // // setCount((count) => count - step);
    dispatch({ type: "dec" });
  };

  const inc = function () {
    // // setCount((count) => count + 1);
    // // setCount((count) => count + step);
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({ type: "setCount", payload: +e.target.value });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: "setStep", payload: +e.target.value });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

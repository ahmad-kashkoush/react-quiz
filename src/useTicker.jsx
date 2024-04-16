import { useEffect } from "react";

export function useTicker(timer, status, dispatch) {
  useEffect(
    function () {
      if (status !== "active") return;
      const intervalFunc = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(intervalFunc);
    },
    [timer, status, dispatch]
  );
  return { timer };
}

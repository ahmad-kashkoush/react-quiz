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

//
import "./index.css";
import { QuestionsProvider, useQu } from "./components/QuestionsContext";

function App() {
  const { status } = useQu();
  console.log(status);
  return (
    
      <div className="app">
        <Header />
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && <StartScreen />}
          {status === "active" && <QuestionScreen />}
          {status === "finished" && <FinishScreen />}
        </Main>
      </div>
  
  );
}
export default App;

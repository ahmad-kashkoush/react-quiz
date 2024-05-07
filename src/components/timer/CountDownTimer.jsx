import { useQu } from "../QuestionsContext";

export default function CountDownTimer() {
  const { timer } = useQu();
  const min = Math.floor(timer / 60);
  const sec = Math.floor(timer % 60);
  return (
    <button className="btn" disabled>
      {min < 10 && "0"}
      {min}:{sec < 10 && "0"}
      {sec}
    </button>
  );
}

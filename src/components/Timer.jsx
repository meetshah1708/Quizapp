import { useEffect, useState } from "react";

export default function Timer({ setTimeOut, questionNumber }) {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) return setTimeOut(true);
    const interval = setInterval(() => {//decrement timer by 1 after each second 
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, setTimeOut]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);
  return timer;
}

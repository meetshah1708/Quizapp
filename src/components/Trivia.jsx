import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../assets/play.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";


export default function Trivia({
  // eslint-disable-next-line react/prop-types
  data,
  // eslint-disable-next-line react/prop-types
  questionNumber,
  // eslint-disable-next-line react/prop-types
  setQuestionNumber,
  // eslint-disable-next-line react/prop-types
  setTimeOut,
}) {
  const [ question, setQuestion ] = useState(null);                           //for states handling
  const [ selectedAnswer, setSelectedAnswer ] = useState(null);
  const [ className, setClassName ] = useState("answer");
  const [ letsPlay ] = useSound(play);
  const [ correctAnswer ] = useSound(correct);
  const [ wrongAnswer ] = useSound(wrong);

  useEffect(() => {                     //
    letsPlay();
  }, [ letsPlay ]);

  useEffect(() => {
    setQuestion(data[ questionNumber - 1 ]);
  }, [ data, questionNumber ]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {                 //when we click on any option this will check whether it is wrong or right
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(3000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    });
    // setTimeout(() => {
    //   setClassName(a.correct ? "answer correct" : "answer wrong");
    // }, 3000);

    // setTimeout(() => {
    delay(5000, () => {                 //if correcct go to next question and unselect all optn
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
        // setTimeout(() => {
        //   setQuestionNumber((prev) => prev + 1);
        //   setSelectedAnswer(null);
        // }, 1000);
      } else {                       // if wrong settimeout to true which will stop the game
        wrongAnswer();
        delay(1000, () => {
          setTimeOut(true);
        });
        // setTimeout(() => {
        //   setTimeOut(true);
        // }, 1000);
      }
      // }, 5000);
    })
  };
  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a) => (
          <div key={a}
            className={selectedAnswer === a ? className : "answer"}
            onClick={() => !selectedAnswer && handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}

import { useRef } from "react";

// eslint-disable-next-line react/prop-types
export default function Start({ setUsername }) {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value);//when clicked it will set username 
  };

  return (
    <div className="start">
      <input
        className="startInput"
        placeholder="enter your name"
        ref={inputRef}
      />
      <button className="startButton" onClick={handleClick}>
        Start
      </button>
    </div>
  );
}

import { React, useEffect, useState, useRef } from "react";
import LandingBackGround from "./threejs/LandingBackGround";
import "../css/landing.css";
import Overlay from "./overlay/LandingOverlay";
import word from "./words";

const Template = (props) => {
  return (
    <div id='landing'>
      <Overlay word={props.word} />
    </div>
  );
};

// mount될 시 바로 실행
const Landing = () => {
  const [i, setI] = useState(0);
  const words = word;

  while (true) {
    setTimeout(() => {
      if (i == word.length - 1) setI(0);
      else setI(i + 1);
    }, 23000);

    return (
      <>
        <LandingBackGround />
        <Template word={words[i]} />
      </>
    );
  }
};

export default Landing;

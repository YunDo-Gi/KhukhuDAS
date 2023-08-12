import { React, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Mesh } from "three";
import "../css/landing.css";
import Login from "./Login";
import SignUp from "./SignUp";
import Overlay from "./overlay/Landing";
import word from "./words";
import camera from "../assets/camera-overlays_23.png";
import { MeshBasicMaterial } from "three";

const Template = (props) => {
  return (
    <div id="landing">
      <Overlay word={props.word} />
      {props.isLogin && (
        <Login
          loginSetFalse={props.loginSetFalse}
          signUpSetTrue={props.signUpSetTrue}
          className="landing-login-modal"
        />
      )}
      {props.isSignUp && <SignUp signUpSetFalse={props.signUpSetFalse} />}
    </div>
  );
};

// mount될 시 바로 실행
const Landing = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [i, setI] = useState(0);
  const words = word;
  const isLoginHandler = (e) => {
    e.preventDefault();
    console.log(isLogin);
    setIsLogin(!isLogin);
  };

  const loginSetFalse = (e) => {
    e.preventDefault();
    setIsLogin(false);
  };

  const signUpSetTrue = (e) => {
    e.preventDefault();
    setIsSignUp(true);
    setIsLogin(false);
  };

  const signUpSetFalse = (e) => {
    e.preventDefault();
    setIsSignUp(false);
  };

  while (true) {
    setTimeout(() => {
      if (i == word.length - 1) setI(0);
      else setI(i + 1);
    }, 500);

    return (
      <>
        <Template
          isLogin={isLogin}
          isSignUp={isSignUp}
          isLoginHandler={isLoginHandler}
          loginSetFalse={loginSetFalse}
          signUpSetFalse={signUpSetFalse}
          signUpSetTrue={signUpSetTrue}
          word={words[i]}
        />
      </>
    );
  }
};

export default Landing;

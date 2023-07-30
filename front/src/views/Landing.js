import { React, useEffect, useState } from "react";
import "../css/landing.css";
import backgroundVideo from "../assets/video.mp4";
import Login from "./Login";
import SignUp from "./SignUp";
const Template = (props) => {
  return (
    <div id='landing'>
      <h1 id='landing-header-name'>project name</h1>
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        id='landing-background-video'
      />
      <button id='login-page-button' onClick={props.isLoginHandler}>
        Sign In
      </button>
      {props.isLogin && (
        <Login
          loginSetFalse={props.loginSetFalse}
          signUpSetTrue={props.signUpSetTrue}
        />
      )}
      {props.isSignUp && <SignUp signUpSetFalse={props.signUpSetFalse} />}
    </div>
  );
};

const Landing = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

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

  return (
    <Template
      isLogin={isLogin}
      isSignUp={isSignUp}
      isLoginHandler={isLoginHandler}
      loginSetFalse={loginSetFalse}
      signUpSetFalse={signUpSetFalse}
      signUpSetTrue={signUpSetTrue}
    />
  );
};

export default Landing;

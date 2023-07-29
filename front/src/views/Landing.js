import { React, useEffect, useState } from "react";
import "../css/landing.css";
import backgroundVideo from "../assets/video.mp4";
import Login from "./Login";
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
        login
      </button>
      {props.isLogin && <Login loginSetFalse={props.loginSetFalse} />}
    </div>
  );
};

const Landing = () => {
  const [isLogin, setIsLogin] = useState(false);

  const isLoginHandler = (e) => {
    e.preventDefault();
    console.log(isLogin);
    setIsLogin(!isLogin);
  };

  const loginSetFalse = (e) => {
    e.preventDefault();
    setIsLogin(false);
  };

  return (
    <Template
      isLogin={isLogin}
      isLoginHandler={isLoginHandler}
      loginSetFalse={loginSetFalse}
    />
  );
};

export default Landing;

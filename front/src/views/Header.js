import { React, useEffect, useState, useRef } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import "../css/header.css";
const Header = () => {
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
    <div id="header-box">
      <span className="header-title">내 방 어때 !?</span>
      <div className="header-login" onClick={isLoginHandler}>
        Login
      </div>
      <div className="header-explore">Explore</div>
      <div className="header-about">About</div>

      {isLogin && (
        <Login loginSetFalse={loginSetFalse} signUpSetTrue={signUpSetTrue} />
      )}
      {isSignUp && <SignUp signUpSetFalse={signUpSetFalse} />}
    </div>
  );
};

export default Header;

import { React, useEffect, useState, useRef } from "react";
import Login from "./Login";
import Register from "./Register";
import "../css/header.css";
const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const isLoginHandler = (e) => {
    e.preventDefault();
    console.log(isLogin);
    setIsLogin(!isLogin);
  };

  const loginSetFalse = (e) => {
    setIsLogin(false);
  };

  const registerSetTrue = () => {
    setIsRegister(true);
    setIsLogin(false);
  };

  const registerSetFalse = () => {
    setIsRegister(false);
  };

  return (
    <div id='header-box'>
      <span className='header-title'>내 방 어때 !?</span>
      <div className='header-login' onClick={isLoginHandler}>
        Login
      </div>
      <div className='header-explore'>Explore</div>
      <div className='header-about'>About</div>

      {isLogin && (
        <Login
          loginSetFalse={loginSetFalse}
          registerSetTrue={registerSetTrue}
          className='landing-login-modal'
        />
      )}
      {isRegister && <Register close={registerSetFalse} />}
    </div>
  );
};

export default Header;
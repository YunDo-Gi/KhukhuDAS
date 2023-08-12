import { React, useEffect, useState } from "react";
import axios from "axios";
import "../css/login.css";
const Template = (props) => {
  return (
    <div id="login">
      <button onClick={props.loginSetFalse} id="login-exit-button">
        X
      </button>

      <h1>Sign In Your Desk</h1>

      <div id="login-id-box">
        <input
          type="text"
          id="login-id"
          onChange={props.idHandler}
          value={props.id}
          placeholder="아이디"
        />
      </div>
      <div id="login-pw-box">
        <input
          type="password"
          id="login-pw"
          onChange={props.passwordHandler}
          value={props.password}
          placeholder="비밀번호"
        />
      </div>

      <br />

      <button onClick={props.submitInfoToServer} id="login-button">
        입력
      </button>
      <div id="login-sub-buttons">
        <a href="/">id 찾기</a>
        <a href="/">비밀 번호 찾기</a>
        <a onClick={props.signUpSetTrue}>회원가입</a>
      </div>
    </div>
  );
};

const Login = (props) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setsignUp] = useState(false);

  const idHandler = (e) => {
    e.preventDefault();
    setId(e.target.value);
  };

  const passwordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    setsignUp(true);
  };

  const submitInfoToServer = async () => {
    let url = "/api/v1/auth/authenticate";
    let data = {
      id,
      password,
    };

    let res = await axios.post(url, data, {
      headers: { "Content-Type": `application/json` },
    });
    console.log(res);
  };

  return Template({
    id,
    password,
    idHandler,
    passwordHandler,
    submitInfoToServer,
    signUpHandler,
    signUpSetTrue: props.signUpSetTrue,
    loginSetFalse: props.loginSetFalse,
  });
};

export default Login;

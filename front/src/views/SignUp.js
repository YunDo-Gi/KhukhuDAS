import { React, useEffect, useState } from "react";
import axios from "axios";
import "../css/login.css";
const Template = (props) => {
  return (
    <div id="login">
      <h1>Submit Your Desk</h1>

      <button onClick={props.signUpSetFalse} id="login-exit-button">
        X
      </button>
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
      <div id="login-email-box">
        <input
          type="email"
          id="login-email"
          onChange={props.emailHandler}
          value={props.email}
          placeholder="E-mail"
        />
      </div>

      <br />

      <div>취미를 선택하세요</div>
      <div id="login-hobby-box">
        <input type="checkbox" id="login-hobby-workout" />
        <label for="login-hobby-workout">운동</label>
        <input type="checkbox" id="login-hobby-read" />
        <label for="login-hobby-read">독서</label>
        <input type="checkbox" id="login-hobby-music" />
        <label for="login-hobby-music">음악</label>
        <br />

        <input type="checkbox" id="login-hobby-drawing" />
        <label for="login-hobby-drawing">그림</label>
        <input type="checkbox" id="login-hobby-photo" />
        <label for="login-hobby-photo">사진</label>
      </div>

      <br />
      <button onClick={props.submitInfoToServer} id="login-button">
        입력
      </button>
    </div>
  );
};

const Login = (props) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [hobby, setHobby] = useState([]);

  const idHandler = (e) => {
    e.preventDefault();
    setId(e.target.value);
  };

  const passwordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const emailHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const hobbyHandler = (e) => {
    e.preventDefault();
    setHobby(e.target.value);
  };

  const submitInfoToServer = async () => {
    let url = "/api/v1/auth/register";
    let data = {
      id,
      password,
      email,
    };

    let res = await axios.post(url, data, {
      headers: { "Content-Type": `application/json` },
    });
    console.log(res);
  };

  return Template({
    id,
    password,
    email,
    hobby,
    idHandler,
    passwordHandler,
    emailHandler,
    hobbyHandler,
    submitInfoToServer,
    signUpSetFalse: props.signUpSetFalse,
    loginSetFalse: props.loginSetFalse,
  });
};

export default Login;

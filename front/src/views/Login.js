import { React, useEffect, useState } from "react";
import "../css/login.css";
const Template = (props) => {
  return (
    <div id='login'>
      <h1>Submit Your Desk</h1>

      <form method='POST' action='/api/login'>
        <button onClick={props.loginSetFalse} id='login-exit-button'>
          X
        </button>
        <div id='login-id-box'>
          <label for='login-id'>아이디 *</label>
          <input
            type='text'
            id='login-id'
            onChange={props.idHandler}
            value={props.id}
          />
        </div>
        <br />
        <div id='login-pw-box'>
          <label for='login-pw'>비밀번호 *</label>
          <input
            type='password'
            id='login-pw'
            onChange={props.passwordHandler}
            value={props.password}
          />
        </div>
        <br />
        <div id='login-email-box'>
          <label for='login-email'>이메일 *</label>
          <input
            type='text'
            id='login-email'
            onChange={props.emailHandler}
            value={props.email}
          />
        </div>

        <br />

        <div id='login-hobby-box'>
          <div>취미 *</div>
          <label for='login-hobby-workout'>운동</label>
          <input type='checkbox' id='login-hobby-workout' />
          <label for='login-hobby-read'>독서</label>
          <input type='checkbox' id='login-hobby-read' />
          <label for='login-hobby-music'>음악</label>
          <input type='checkbox' id='login-hobby-music' />
          <br />

          <label for='login-hobby-drawing'>그림</label>
          <input type='checkbox' id='login-hobby-drawing' />
          <label for='login-hobby-photo'>사진</label>
          <input type='checkbox' id='login-hobby-photo' />
        </div>

        <br />
        <button>입력</button>
      </form>
    </div>
  );
};

const Login = (props) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [hobby, setHobby] = useState("");

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

  return Template({
    id,
    password,
    email,
    hobby,
    idHandler,
    passwordHandler,
    emailHandler,
    hobbyHandler,
    loginSetFalse: props.loginSetFalse,
  });
};

export default Login;

import { React, useEffect, useState, useRef } from "react";
import axios from "axios";
import "../css/login.css";

const Template = (props) => {
  return (
    <div id='login'>
      <button onClick={props.loginSetFalse} id='login-exit-button'>
        X
      </button>

      <h1>Sign In Your Desk</h1>

      <input
        type='text'
        id='login-id'
        onChange={props.idHandler}
        value={props.id}
        placeholder='이메일'
      />

      <input
        type='password'
        id='login-pw'
        onChange={props.passwordHandler}
        value={props.password}
        placeholder='비밀번호'
      />

      <br />

      <div className='login--buttons'>
        <div id='login-sub-button'>
          <a onClick={props.registerSetTrue}>계정 만들기</a>
        </div>
        <button onClick={props.submitInfoToServer} id='login-button'>
          로그인
        </button>
      </div>
    </div>
  );
};

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const token = useRef();

  const idHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const registerHandler = (e) => {
    e.preventDefault();
    setRegister(true);
  };

  const submitInfoToServer = async () => {
    let url = "/api/v1/auth/authenticate";
    let data = {
      email,
      password,
    };

    let res = await axios.post(url, data, {
      headers: { "Content-Type": `application/json` },
    });

    if (res.status === 200) {
      props.loginSetFalse();
      token.current = res.data.token;
      alert("로그인되었습니다.");
    } else {
      alert("잘못된 이메일 혹은 비밀번호입니다.");
    }
  };
  return Template({
    email,
    password,
    idHandler,
    passwordHandler,
    submitInfoToServer,
    registerHandler,
    registerSetTrue: props.registerSetTrue,
    loginSetFalse: props.loginSetFalse,
  });
};

export default Login;

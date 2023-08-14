import { React, useEffect, useState } from "react";
import axios from "axios";
import "../css/Register.css";
const Template = (props) => {
  return (
    <div id='register'>
      <h1>Submit Your Desk</h1>
      <button onClick={props.close} id='register-exit-button'>
        X
      </button>
      <input
        type='email'
        id='register-email'
        onChange={props.emailHandler}
        value={props.email}
        placeholder='E-mail'
      />

      <input
        type='password'
        id='register-pw'
        onChange={props.passwordHandler}
        value={props.password}
        placeholder='비밀번호'
      />

      <div className='warning'>
        {props.email == "" && <div>*아이디: 필수 정보입니다.</div>}
        {props.password == "" && <div>*비밀번호: 필수 정보입니다.</div>}
      </div>

      <input
        type='text'
        id='register-fullName'
        onChange={props.fullNameHandler}
        value={props.fullName}
        placeholder='이름'
      />

      <select id='register-job' onChange={props.jobHandler}>
        <option value=''>직업</option>
        <option value='student'>학생</option>
        <option value='teacher'>교사</option>
        <option value='soldier'>군인</option>
      </select>

      <div className='warning'>
        {props.fullName == "" && <div>*이름: 필수 정보입니다.</div>}
        {props.job == "" && <div>*직업: 필수 정보입니다.</div>}
      </div>

      <div>취미를 선택하세요 (개발 중)</div>

      <div id='register-hobby-box'>
        <input type='checkbox' id='register-hobby-workout' />
        <label for='register-hobby-workout'>운동</label>
        <input type='checkbox' id='register-hobby-read' />
        <label for='register-hobby-read'>독서</label>
        <input type='checkbox' id='register-hobby-music' />
        <label for='register-hobby-music'>음악</label>
        <input type='checkbox' id='register-hobby-drawing' />
        <label for='register-hobby-drawing'>그림</label>
        <input type='checkbox' id='register-hobby-photo' />
        <label for='register-hobby-photo'>사진</label>
      </div>
      <br />
      <div className='login-button'>
        <button onClick={props.submitInfoToServer} id='register-button'>
          입력
        </button>
      </div>
    </div>
  );
};

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [job, setJob] = useState("");
  const [hobby, setHobby] = useState([]);

  const fullNameHandler = (e) => {
    e.preventDefault();
    setFullName(e.target.value);
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

  const jobHandler = (e) => {
    e.preventDefault();
    setJob(e.target.value);
  };

  const submitInfoToServer = async () => {
    let url = "/api/v1/auth/register";

    if (!(email && fullName && password && job)) {
      alert("모든 항목을 입력해주십시오.");
      return;
    }

    let data = {
      fullName,
      password,
      email,
      job,
      city: "Kyung-ki-do",
    };

    let res = await axios.post(url, data, {
      headers: { "Content-Type": `application/json` },
    });

    console.log(props);

    if (res.status == 204) {
      alert("이미 존재하는 계정입니다.");
    } else {
      alert("회원가입이 완료되었습니다.");
      props.close();
    }
    console.log(res);
  };

  return Template({
    fullName,
    password,
    email,
    job,
    hobby,
    fullNameHandler,
    passwordHandler,
    emailHandler,
    jobHandler,
    hobbyHandler,
    submitInfoToServer,
    close: props.close,
    registerSetFalse: props.registerSetFalse,
  });
};

export default Register;

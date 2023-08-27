const nick = document.querySelector("#InputNick");
const password = document.querySelector("#InputPassword");
const email = document.querySelector("#InputEmail");
const realname = document.querySelector("#InputName");
const job = document.querySelector("#InputJob");
const age = document.querySelector("#InputAge");
const phoneNumber = document.querySelector("#InputPhoneNumber");
const form = document.querySelector(".register-form");
const profile = document.querySelector("#InputProfile");
const button = document.querySelector(".btn-submit");

// 나이 추가 함수
const addInputAgeValue = () => {
  for (let i = 0; i < 100; i++) {
    const age = document.querySelector("#InputAge");
    age.append(new Option(i, i));
  }
};

// 이미지 URL을 받아와서 보여주는 함수
const handleFiles = (e) => {
  console.log("이미지 선택");
  const selectedFile = profile.files[0];
  const fileReader = new FileReader();

  fileReader.readAsDataURL(selectedFile);

  fileReader.onload = function () {
    document.getElementById("previewImg").src = fileReader.result;
  };
};
profile.addEventListener("change", handleFiles);

// 회원 가입 함수
// 성공 시 토큰을 localStorage에 저장 (키 : jwt)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let body = new FormData();
  body.append(
    "signUpRequest",
    JSON.stringify({
      email: email.value + "@khu.ac.kr",
      job: job.options[job.selectedIndex].value,
      realName: realname.value,
      password: password.value,
      age: age.options[age.selectedIndex].value,
      nickname: nick.value,
      phoneNumber: phoneNumber.value,
    })
  );
  body.append("profileImg", profile.files[0]);

  fetch("http://127.0.0.1:8080/api/auth/sign-up", {
    method: "POST",
    body: body,
  }).then((res) => {
    if (res.status < 300) {
      console.log("회원 가입에 성공했습니다.");
      alert("회원 가입에 성공했습니다. \n로그인 페이지로 이동합니다.");
    } else {
      alert("이미 등록된 정보가 존재합니다.");
    }
  });
});

addInputAgeValue();

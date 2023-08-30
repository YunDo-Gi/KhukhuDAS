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

let reload = localStorage.getItem("reload");

// 나이 추가 함수
const addInputAgeValue = () => {
  for (let i = 0; i < 100; i++) {
    const age = document.querySelector("#InputAge");
    age.append(new Option(i, i));
  }
};

// 이미지 URL을 받아와서 보여주는 함수
const handleFiles = () => {
  const selectedFile = profile.files[0];
  const fileReader = new FileReader();

  fileReader.readAsDataURL(selectedFile);

  fileReader.onload = function () {
    document.getElementById("previewImg").src = fileReader.result;
  };

  return selectedFile;
};

// 회원 가입 함수
// 성공 시 토큰을 localStorage에 저장 (키 : jwt)
form.addEventListener("submit", (e) => {
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
  if (profile.files[0] != null) body.append("profileImg", profile.files[0]);
  const res = fetch("http://localhost:8080/api/auth/sign-up", {
    method: "POST",
    body: body,
  })
    .then((res) => {
      if (res.status == 201) {
        alert("회원 가입에 성공했습니다. \n로그인 페이지로 이동합니다.");
        location.href = "./login.html";
      } else {
        alert("이미 등록된 정보가 존재합니다.");
      }
    })
    .catch((e) => {
      alert(
        "[Temporal Error]\n회원 가입 요청이 정상적으로 이루어졌으나 승인 여부를 판단할 수 없습니다."
      );
    });
});
profile.addEventListener("change", handleFiles);
addInputAgeValue();

const nick = document.querySelector("#InputNick");
const password = document.querySelector("#InputPassword");
const email = document.querySelector("#InputEmail");
const realname = document.querySelector("#InputName");
const job = document.querySelector("#InputJob");
const age = document.querySelector("#InputAge");
const phoneNumber = document.querySelector("#InputPhoneNumber");
const profile = document.querySelector("#InputProfile");
const button = document.querySelector(".btn-submit");
const changeUser = document.querySelector("#ChangeUser");
const profileContainer = document.querySelector("#ProfileContainer");

let flag = false;

// 나이 추가 함수
const addInputAgeValue = () => {
  for (let i = 0; i < 100; i++) {
    const age = document.querySelector("#InputAge");
    age.append(new Option(i, i));
  }
};
addInputAgeValue();

const getUserInfo = () => {
  const url = "http://localhost:8080/api/auth/profile";
  const req = fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  }).then(async (res) => {
    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
    const { value, done } = await reader.read();

    let p = JSON.parse(value);

    nick.value = p.nickname;
    password.value = p.password;
    age.value = p.age;
    email.value = p.email;
    job.value = p.job;
    phoneNumber.value = p.phoneNumber;
    localStorage.getItem("profileImgUrl", p.profileImgUrl);
    realname.value = p.realName;
    console.log(p);
  });

  document.querySelector("#previewImg").src =
    "http://localhost:3000/public/default-avatar.jpg";
  if (localStorage.getItem("profileImgUrl") != "l") {
    document.querySelector("#previewImg").src =
      "http://localhost:8080/api/profileImg/" +
      localStorage.getItem("profileImgUrl");
  }
};

// 입장 시 데이터 받아옴
// 받아온 정보를 저장해야함. (그래야 취소한 경우 다시 복구 가능)
getUserInfo();

const infoChangeHandler = () => {
  if (flag == true) {
    nick.toggleAttribute("disabled");
    password.toggleAttribute("disabled");
    email.toggleAttribute("disabled");
    realname.toggleAttribute("disabled");
    job.toggleAttribute("disabled");
    age.toggleAttribute("disabled");
    phoneNumber.toggleAttribute("disabled");
    changeUser.innerHTML = "정보 수정하기";
    button.style.display = "none";
    profileContainer.style.display = "none";
    flag = false;
  } else {
    nick.removeAttribute("disabled");
    password.removeAttribute("disabled");
    email.removeAttribute("disabled");
    realname.removeAttribute("disabled");
    job.removeAttribute("disabled");
    age.removeAttribute("disabled");
    phoneNumber.removeAttribute("disabled");
    changeUser.innerHTML = "수정 취소";
    button.style.display = "block";
    profileContainer.style.display = "block";
    flag = true;
  }
};

const requestHandler = () => {
  const url = "http://localhost:8080/api/auth/profile";
  let body = new FormData();
  body.append(
    "updateRequest",
    JSON.stringify({
      email: email.value,
      job: job.options[job.selectedIndex].value,
      realName: realname.value,
      password: password.value,
      age: age.options[age.selectedIndex].value,
      nickname: nick.value,
      phoneNumber: phoneNumber.value,
    })
  );
  if (profile.files[0] != null) body.append("profileImg", profile.files[0]);

  const req = fetch(url, {
    method: "PUT",
    body: body,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  }).then(async (res) => {
    if (res.status == 200) {
      alert("정보가 변경되었습니다.");
    } else {
      alert("사용자 정보를 변경할 수 없습니다.");
    }
  });
};

changeUser.addEventListener("click", infoChangeHandler);
button.addEventListener("click", requestHandler);
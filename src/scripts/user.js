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
const profileImg = document.querySelector("#profileImg");
let imgBuffer = null;
let flag = false;

// 이미지 URL을 받아와서 보여주는 함수
const handleFiles = () => {
  const selectedFile = profile.files[0];
  const fileReader = new FileReader();

  fileReader.readAsDataURL(selectedFile);

  fileReader.onload = function () {
    profileImg.src = fileReader.result;
  };

  return selectedFile;
};

const getUserInfo = () => {
  const url =
    "http://localhost:8080/api/user/" + localStorage.getItem("userId");

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
    age.value = p.age;
    email.value = p.email;
    job.value = p.job;
    phoneNumber.value = p.phoneNumber;
    imgBuffer = "../public/default-avatar.jpg";
    if (p.profileImgURL != null)
      imgBuffer =
        "http://localhost:8080/api/profileImg/" +
        p.profileImgURL.replace("\\\\profileImg\\", "");

    profileImg.src = imgBuffer;
    realname.value = p.realName;
  });
};

// 입장 시 데이터 받아옴
// 받아온 정보를 저장해야함. (그래야 취소한 경우 다시 복구 가능)
getUserInfo();

const infoChangeHandler = () => {
  if (flag == true) {
    changeUser.innerHTML = "정보 수정하기";
    button.style.display = "none";
    profileContainer.style.display = "none";
    flag = false;
    profile.value = null;
    getUserInfo();
  } else {
    changeUser.innerHTML = "수정 취소";
    button.style.display = "block";
    profileContainer.style.display = "block";
    flag = true;
  }
};

const requestHandler = () => {
  const url = "http://localhost:8080/api/auth/profile";
  let body = new FormData();
  let data = {
    email: email.value,
    job: job.value,
    realName: realname.value,
    age: age.value,
    nickname: nick.value,
    phoneNumber: phoneNumber.value,
    isChangedProfileImg: false,
  };

  if (profile.files[0] != undefined) {
    data.isChangedProfileImg = true;
    body.append("profileImg", profile.files[0]);
    console.log(data);
  }

  body.append("updateRequest", JSON.stringify(data));

  const req = fetch(url, {
    method: "PUT",
    body: body,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  })
    .then(async (res) => {
      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      const { value, done } = await reader.read();
      let ret = JSON.parse(value).url.replace("\\profileImg\\", "");
      if (res.status == 200) {
        alert("정보가 변경되었습니다.");

        if (profile.files[0] != null) {
          await localStorage.setItem("profileImgUrl", ret); // 서버에서 파일 URL 받아오게 수정
          console.log(localStorage.getItem("profileImgUrl"));
        }

        getUserInfo();

        location.replace("./user.html");
      } else {
        alert("사용자 정보를 변경할 수 없습니다.");
      }
    })
    .catch((e) => console.log(e));
};

changeUser.addEventListener("click", infoChangeHandler);
button.addEventListener("click", requestHandler);
profile.addEventListener("change", handleFiles);

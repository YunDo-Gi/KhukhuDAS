const id = document.querySelector("#InputEmail");
const password = document.querySelector("#InputPassword");
const form = document.querySelector(".register-form");

localStorage.removeItem("userId");
localStorage.removeItem("nickname");
localStorage.removeItem("profileImgUrl");
localStorage.removeItem("jwt");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let principal = id.value + "@khu.ac.kr";
  let credential = password.value;

  let body = JSON.stringify({
    principal: principal,
    credential: credential,
  });

  fetch("http://localhost:8080/login", {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.headers.get("Authorization") != null) {
      localStorage.setItem("jwt", res.headers.get("Authorization"));

      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      const { value, done } = await reader.read();
      let userInfo = value.substring(1, value.length - 1).split(",");
      let userId = userInfo[0].replace('"memberId":', "");
      let nickname = userInfo[1].replace('"nickname":', "");
      nickname = nickname.substring(1, nickname.length - 1);
      let profileImgUrl = userInfo[2].substring(29, userInfo[2].length - 1);
      profileImgUrl = profileImgUrl.replace("\\", "");

      localStorage.setItem("userId", userId);
      localStorage.setItem("principal", principal);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("profileImgUrl", profileImgUrl);

      alert("로그인에 성공했습니다.");

      location.href = "./index.html";
    } else {
      alert("이메일 또는 비밀번호가 잘못되었습니다.");
    }
  });
});

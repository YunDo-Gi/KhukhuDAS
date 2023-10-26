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
  const url = "http://localhost:8080/login";

  let body = JSON.stringify({
    principal: principal,
    credential: credential,
  });

  fetch(url, {
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

      let userInfo = JSON.parse(value);
      let userId = userInfo.memberId;
      let nickname = userInfo.nickname;
      try {
        let profileImgUrl = userInfo.profileImgURL;
        profileImgUrl = profileImgUrl.replace("\\profileImg\\", "");
        profileImgUrl = profileImgUrl.replace("/profileImg/", "");
        localStorage.setItem("profileImgUrl", profileImgUrl);
      } catch (e) {
        profileImgUrl = "../../public/default-avatar.jpg";
        localStorage.setItem("profileImgUrl", profileImgUrl);
      }

      localStorage.setItem("userId", userId);
      localStorage.setItem("principal", principal);
      localStorage.setItem("nickname", nickname);

      alert("로그인에 성공했습니다.");

      location.href = "../index.html";
    } else {
      alert("이메일 또는 비밀번호가 잘못되었습니다.");
    }
  });
});

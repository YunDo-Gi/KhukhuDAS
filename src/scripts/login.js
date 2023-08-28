const id = document.querySelector("#InputEmail");
const password = document.querySelector("#InputPassword");
const form = document.querySelector(".register-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let body = JSON.stringify({
    principal: id.value + "@khu.ac.kr",
    credential: password.value,
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

      const reader = res.body
      .pipeThrough(new TextDecoderStream())
      .getReader();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        console.log(value);
      }

      alert(
          "로그인에 성공했습니다."
      );

      location.href="./index.html"

    } else {
      alert("이메일 또는 비밀번호가 잘못되었습니다.");
    }
  });
});

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
  }).then((res) => {
    if (res.headers.get("Authorization") != null) {
      localStorage.setItem("jwt", res.headers.get("Authorization"));
      alert(
        "토큰 값 :" +
          localStorage.getItem("jwt") +
          "\n" +
          "로그인에 성공했습니다."
      );
    } else {
      alert("이메일 또는 비밀번호가 잘못되었습니다.");
    }
  });
});

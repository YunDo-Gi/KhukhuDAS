const id = document.querySelector("#InputID");
const password = document.querySelector("#InputPassword");
const form = document.querySelector(".register-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let body = JSON.stringify({
    password: password.value,
    nickname: id.value,
  });

  const req = await fetch("http://localhost:8080/api/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
});

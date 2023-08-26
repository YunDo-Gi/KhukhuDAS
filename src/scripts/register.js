const id = document.querySelector("#InputID");
const password = document.querySelector("#InputPassword");
const email = document.querySelector("#InputEmail");
const realname = document.querySelector("#InputName");
const job = document.querySelector("#InputJob");
const age = document.querySelector("#InputAge");
const phoneNumber = document.querySelector("#InputPhoneNumber");
const form = document.querySelector(".register-form");
const profile = document.querySelector("#InputProfile");

// 나이 추가 함수
const addInputAgeValue = () => {
  for (let i = 0; i < 100; i++) {
    const age = document.querySelector("#InputAge");
    age.append(new Option(i, i));
  }
};

// 이미지를 생성하는 함수
const createProfileImage = () => {
  const file = profile.files[0];
  console.log(file);

  return file;
};

// 이미지 URL을 받아와서 보여주는 함수
const handleFiles = (e) => {
  const selectedFile = createProfileImage();
  const fileReader = new FileReader();

  fileReader.readAsDataURL(selectedFile);

  fileReader.onload = function () {
    document.getElementById("previewImg").src = fileReader.result;
  };
};

profile.addEventListener("change", handleFiles);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let body = JSON.stringify({
    email: email.value,
    job: job.options[job.selectedIndex].value,
    realName: realname.value,
    password: password.value,
    age: age.options[age.selectedIndex].value,
    nickname: id.value,
    phoneNumber: phoneNumber.value,
    profile: createProfileImage(),
  });

  const req = await fetch("http://localhost:8080/api/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
});

addInputAgeValue();

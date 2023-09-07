const files = document.querySelector("#InputProfile");
const indicator = document.querySelector(".carousel-indicators");
const inner = document.querySelector(".carousel-inner");
const title = document.querySelector("#InputTitle");
const comment = document.querySelector("#InputComment");
const interest = document.querySelector("#InputInterest");
const form = document.querySelector(".register-form");

// 이미지 URL을 받아와서 보여주는 함수
const handleFiles = async () => {
  // 초기화
  indicator.innerHTML = "";
  inner.innerHTML = "";

  const Files = files.files;
  for (let i = 0; i < Files.length; i++) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(Files[i]);

    // 요소 생성
    let button = document.createElement("button");
    if (i == 0) button.classList.add("active");
    button.setAttribute("type", "button");
    button.setAttribute("data-bs-target", "#carouselCaption");
    button.setAttribute("data-bs-slide-to", i);

    let item = document.createElement("div");
    if (i == 0) item.classList.add("active");
    item.classList.add("carousel-item");

    let img = document.createElement("img");
    img.classList.add("previewImg" + i);
    img.classList.add("d-block");
    img.classList.add("w-100");
    fileReader.onload = await function () {
      img.src = fileReader.result;
    };
    item.appendChild(img);

    // 요소 추가
    indicator.append(button);
    inner.appendChild(item);
    console.log(inner);
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = "http://localhost:8080/api/room";
  let body = new FormData();

  body.append(
    "makeUpRoom ",
    JSON.stringify({
      title: title.value,
      content: comment.value,
      interestType: interest.options[interest.selectedIndex].value,
    })
  );

  for (let i = 0; i < files.files.length; i++) {
    body.append("roomFile", files.files[i]);
  }

  try {
    console.log(localStorage.getItem("jwt"))
    const res = await fetch(url, {
      method: "POST",
      body: body,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });

    if (res.status == 200 || res.status == 201) {
      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      const { value, done } = await reader.read();
      alert(
        "방이 생성되었습니다.\n방 번호 : " +
          value.substring(17, value.length - 1)
      );
    } else alert("다시 한번 확인해 주시기 바랍니다.");
  } catch (e) {
    console.log("방을 생성할 수 없습니다.");
  }
});
files.addEventListener("change", handleFiles);

const room = document.querySelector(".get-room-test");
const indicator = document.querySelector(".carousel-indicators");
const inner = document.querySelector(".carousel-inner");

// 현재 입장한 방의 정보
var fileURLs = null;
var writer = null;

const setData = (data) => {
  fileURLs = data.fileURLs;
  writer = data.writer;

  localStorage.setItem("title", data.title);
  localStorage.setItem("content", data.content);
  localStorage.setItem("interestType", data.interestType);
  localStorage.setItem("isLike", data.isLike);
  localStorage.setItem("isMyRoom", data.isMyRoom);
  localStorage.setItem("likeCount", data.likeCount);
  localStorage.setItem("viewCount", data.viewCount);
  localStorage.setItem("writer", data.writer);
};

// 이미지 URL을 받아와서 보여주는 함수
const createCarousel = async (chuncks) => {
  // 초기화
  indicator.innerHTML = "";
  inner.innerHTML = "";

  const frame = document.querySelector(".iframe-wrapper");
  const carousel_caption = document.querySelector("#carouselCaption");
  const carousel_inner = document.querySelector(".carousel-inner");
  carousel_caption.style.width = frame.style.width;
  carousel_caption.style.height = frame.style.height;
  carousel_inner.style.width = frame.style.width;
  carousel_inner.style.height = frame.style.height;

  for (let i = 0; i < chuncks.length; i++) {
    // 요소 생성
    let button = document.createElement("button");
    if (i == 0) button.classList.add("active");
    button.setAttribute("type", "button");
    button.setAttribute("data-bs-target", "#carouselCaption");
    button.setAttribute("data-bs-slide-to", i);

    let item = document.createElement("div");
    if (i == 0) item.classList.add("active");
    item.classList.add("carousel-item");
    item.style.width = frame.style.width;
    item.style.height = frame.style.height;

    let img = document.createElement("img");
    img.classList.add("previewImg" + i);
    img.classList.add("d-block");
    img.style.width = frame.style.width;
    img.style.height = frame.style.height;
    img.src = chuncks[i].url;

    console.log(img.style.height);
    item.appendChild(img);

    // 요소 추가
    indicator.append(button);
    inner.appendChild(item);
  }
};

// file 형식으로 carousel에 child 추가
const getMedia = async (fileURLs) => {
  try {
    var chuncks = new Array();

    for (var i = 0; i < fileURLs.length; i++) {
      let readableStream = await fetch(
        "http://localhost:8080/api" +
          fileURLs[i].replace("\\\\room\\", "/roomImg/")
      );
      await chuncks.push(readableStream);
    }

    createCarousel(chuncks);
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 방 입장 시 동작
// 사용자 정보를 받아옴
// 받아온 정보를 통해서 방에서 표시할 이미지를 표현해줌
const getRoom = async (roomId) => {
  // 방 입장
  let url = `http://localhost:8080/api/room/${roomId}`;
  //localStorage.setItem("roomId", roomId); // id 저장, 방 수정 시 활용

  try {
    let res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });

    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
    const { value } = await reader.read();

    setData(JSON.parse(value));
    getMedia(fileURLs);
    console.log(JSON.parse(value));
  } catch (e) {
    console.log(e);
  }
};

const getRooms = async (interestType, sort) => {
  // 메인 페이지에 보여줄 거임
  // interest가 null인 경우 구분 안함
  // sort는 3가지 종류로 구성
  // 1. LIKE
  // 2. VIEW
  // 3. CHRONOLOGICAL
  const url =
    interestType == null
      ? `http://localhost:8080/api/rooms?sort=${sort}`
      : `http://localhost:8080/api/rooms?interest-type=${interestType}&sort=${sort}`;

  let res = await fetch(url);
  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  const { value } = await reader.read();

  return JSON.parse(value);
};

const likeThisRoom = async (roomId) => {
  let url = `http://localhost:8080/api/room/${roomId}/like`;

  let res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });

  console.log(res.status);
};

const unlikeThisRoom = async (roomId) => {
  let url = `http://localhost:8080/api/room/${roomId}/unlike`;

  let res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
  console.log(res.status);
};

const deleteRoom = async (roomId) => {
  // 방 입장
  let url = `http://localhost:8080/api/room/${roomId}`;
  localStorage.setItem("roomId", roomId); // id 저장, 방 수정 시 활용

  try {
    let res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });

    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
    const { value } = await reader.read();
    console.log(JSON.parse(value));
  } catch (e) {
    console.log(e);
  }
};

export { getRoom, getRooms, getMedia, setData };

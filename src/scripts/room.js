const room = document.querySelector(".get-room-test");
console.log(localStorage.getItem("jwt"))

const getRoom = async (roomId) => { // 방 입장
  let url = `http://localhost:8080/api/room/${roomId}`;
  localStorage.setItem("roomId", roomId) // id 저장, 방 수정 시 활용

  try {
    let res = await fetch(url, {
      method: "GET",
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

const getRooms = async (interestType, sort) => { // 메인 페이지에 보여줄 거임
  // interest가 null인 경우 구분 안함
  // sort는 3가지 종류로 구성
  // 1. LIKE
  // 2. VIEW
  // 3. CHRONOLOGICAL
  const url = (interestType == null) ? `http://localhost:8080/api/rooms?sort=${sort}` : `http://localhost:8080/api/rooms?interest-type=${interestType}&sort=${sort}`;
  
  let res = await fetch(url, );
  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  const { value } = await reader.read();
  
  console.log(JSON.parse(value));
}

const likeThisRoom = async (roomId) => {
  let url = `http://localhost:8080/api/room/${roomId}/like`;

  let res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
  
  console.log(res.status)
}

const unlikeThisRoom = async (roomId) => {
  let url = `http://localhost:8080/api/room/${roomId}/unlike`;

  let res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
  console.log(res.status)
}

const deleteRoom = async (roomId) => { // 방 입장
  let url = `http://localhost:8080/api/room/${roomId}`;
  localStorage.setItem("roomId", roomId) // id 저장, 방 수정 시 활용

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

room.addEventListener("click", async () => {
  // getRoom(1);
  await unlikeThisRoom(1);
  await likeThisRoom(1);
});
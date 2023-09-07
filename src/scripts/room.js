const room = document.querySelector(".get-room-test");
console.log(localStorage.getItem("jwt"))
const getRoom = async (roomId) => {
  let url = `http://localhost:8080/api/room/${roomId}`;

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
room.addEventListener("click", async () => {
  // getRoom(1);
  await unlikeThisRoom(1);
  await likeThisRoom(1);
});

const room = document.querySelector(".get-room-test");

const getRoom = async (roomId) => {
  let url = "http://localhost:8080/api/room/" + roomId;

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

room.addEventListener("click", () => {
  getRoom(3);
});

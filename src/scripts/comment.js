const input = document.querySelector("#comment-input")
const btn = document.querySelector("#comment-btn")

// 나중에 방 만들면 사용 예정
// const roomId = localStorage.getItem("roomId")

console.log(localStorage.getItem("jwt"))

const createComment = async (roomId) => {
  let url = `http://localhost:8080/api/room/${roomId}/comment`;

  let comment = input.value;
  if(comment != null) {
    try {
      let res = await fetch(url, {
        method: "POST",
        body:JSON.stringify({
          content : input.value
        }),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json"
        },
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    alert("댓글이 입력되지 않았습니다.")
  }
  
}

const updateComment = async (roomId, commentId) => {
  let url = `http://localhost:8080/api/room/${roomId}/comment/${commentId}`;
  try {
    let res = await fetch(url, {
      method: "PUT",
      body:JSON.stringify({
        content : input.value
      }),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json"
      },
    });
  } catch (e) {
    console.log(e);
  }
}

const createRecomment = async (roomId, commentId) => {
  let url = `http://localhost:8080/api/room/${roomId}/comment/${commentId}/recomment`;
  try {
    let res = await fetch(url, {
      method: "POST",
      body:JSON.stringify({
        content : input.value
      }),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json"
      },
    });
  } catch (e) {
    console.log(e);
  }
}

const updateRecomment = async (roomId, commentId, recommentId) => {
  let url = `http://localhost:8080/api/room/${roomId}/comment/${commentId}/recomment/${recommentId}`;
  try {
    let res = await fetch(url, {
      method: "PUT",
      body:JSON.stringify({
        content : input.value
      }),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json"
      },
    });
  } catch (e) {
    console.log(e);
  }
}

// test
btn.addEventListener("click", (roomId)=>{
  createRecomment(1,1);
})
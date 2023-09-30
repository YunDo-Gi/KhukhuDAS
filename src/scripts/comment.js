const input = document.querySelector("#comment-input");
const btn = document.querySelector("#comment-btn");
const test = document.querySelector(".test");
const box = document.querySelector(".comment-box");
const userImg = document.querySelector(".comment-user-img");
const likeBtn = document.querySelector(".like-button");
const likeCnt = document.querySelector(".like-counter");
const roomId = localStorage.getItem("roomId");
console.log(localStorage.getItem("jwt"));

const createComment = async (roomId) => {
  let url = `http://localhost:8080/api/room/${roomId}/comment`;

  let comment = input.value;

  if (comment != null) {
    try {
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          content: comment,
        }),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
      });

      getComment(1);
    } catch (e) {
      console.log(e);
    }
  } else {
    alert("댓글이 입력되지 않았습니다.");
  }
};

const updateComment = async (roomId, commentId) => {
  let url = `http://localhost:8080/api/room/${roomId}/comment/${commentId}`;
  try {
    let res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        content: input.value,
      }),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    });

    getComment(1); // roomId로 변경
  } catch (e) {
    console.log(e);
  }
};

const deleteComment = async (roomId, commentId) => {
  let url = `http://localhost:8080/api/room/${roomId}/comment/${commentId}`;
  try {
    let res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    });

    getComment(1); // roomId로 변경
  } catch (e) {
    console.log(e);
  }
};

const createRecomment = async (roomId, commentId) => {
  let url = `http://localhost:8080/api/room/${roomId}/comment/${commentId}/recomment`;
  try {
    let res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        content: input.value,
      }),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    });

    getComment(1); // roomId로 변경
  } catch (e) {
    console.log(e);
  }
};

const updateRecomment = async (roomId, commentId, recommentId) => {
  let url = `http://localhost:8080/api/room/${roomId}/comment/${commentId}/recomment/${recommentId}`;
  try {
    let res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        content: input.value,
      }),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    });

    getComment(1); // roomId로 변경
  } catch (e) {
    console.log(e);
  }
};

const deleteReComment = async (roomId, commentId, recommentId) => {
  let url = `http://localhost:8080/api/room/${roomId}/comment/${commentId}/recomment/${recommentId}`;
  try {
    let res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        content: input.value,
      }),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    });

    getComment(1); // roomId로 변경
  } catch (e) {
    console.log(e);
  }
};

const makeComment = async (roomId, json) => {
  for (var i = 0; i < json.length; i++) {
    let node = document.createElement("li");
    node.style = "width: 100%; display:flex; font-size:14px; padding-top:24px";

    let info = json[i].user;
    console.log(json[i]);

    let content = document.createElement("span");
    content.style.display = "inline";
    let user = document.createElement("span");
    let img = document.createElement("img");
    let btns = document.createElement("div");
    btns.style.fontSize = "12px";
    let commentId = document.createElement("hidden");
    commentId.value = json[i].commentId;

    img.src =
      "http://localhost:8080/api" +
      info.profileImgURL.replace("\\\\profileImg\\", "");
    img.style =
      "width:36px; height: 36px; border-radius:2.5rem; margin-right:18px";

    let name = document.createElement("div");
    name.style = "font-weight:900; display:inline";
    name.innerText = info.nickname + "  ";

    let comment = document.createElement("span");
    comment.innerText = json[i].content;

    let time = document.createElement("span");
    let timeDiff = Date.now() - Date.parse(json[i].createdDateTime);

    if (timeDiff / (7 * 24 * 60 * 60 * 1000) >= 1) {
      time.innerText =
        parseInt(timeDiff / (7 * 24 * 60 * 60 * 1000) / 1) + "주    ";
    } else if (timeDiff / (24 * 60 * 60 * 1000) >= 1) {
      time.innerText =
        parseInt(timeDiff / (24 * 60 * 60 * 1000) / 1) + "일    ";
    } else if (timeDiff / (60 * 60 * 1000) >= 1) {
      time.innerText = parseInt(timeDiff / (60 * 60 * 1000) / 1) + "시간    ";
    } else if (timeDiff / (60 * 1000) >= 1) {
      time.innerText = parseInt(timeDiff / (60 * 1000) / 1) + "분    ";
    } else {
      time.innerText = parseInt(timeDiff / 1000 / 1) + "초    ";
    }

    let recomment_btn = document.createElement("a");
    recomment_btn.innerText = "답글 달기";
    recomment_btn.style.color = "#737373";

    let delete_btn = document.createElement("a");
    delete_btn.innerText = "삭제";
    delete_btn.style.marginLeft = "5px";
    delete_btn.addEventListener("click", () => {
      deleteComment(roomId, commentId.value);
    });

    user.appendChild(name);
    user.appendChild(comment);
    user.style = "display:inline-box; align-items:center; ";

    btns.appendChild(time);
    btns.appendChild(recomment_btn);

    if (json[i].isMyComment) btns.appendChild(delete_btn);

    content.appendChild(user);
    content.appendChild(btns);

    node.appendChild(img);
    node.appendChild(content);
    node.appendChild(commentId);

    // node.appendChild(recomment_btn);
    box.append(node);
  }
};

const makeRecomment = async (json) => {};

const getComment = async (roomId) => {
  // 초기화
  box.textContent = "";
  likeCnt.innerText = "좋아요 " + localStorage.getItem("likeCount") + "개";
  let url = `http://localhost:8080/api/room/${roomId}/comment`;
  try {
    let res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      const { value } = await reader.read();
      makeComment(roomId, JSON.parse(value));
    });
  } catch (e) {
    console.log(e);
  }
};

getComment(1); // roomId로 변경

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

btn.addEventListener("click", () => {
  createComment(1);
  input.value = "";
});

likeBtn.addEventListener("click", async () => {
  if (localStorage.getItem("isLike")) {
    await unlikeThisRoom(1);
    likeBtn.style.color = "";
  } else {
    await likeThisRoom(1);
    likeBtn.style.color = "#F33040";
  }
  likeBtn.classList.toggle("fa-regular");
  likeBtn.classList.toggle("fa-solid");
});

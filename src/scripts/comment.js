import { getRoom } from "./room";

const input = document.querySelector("#comment-input");
const btn = document.querySelector("#comment-btn");
const test = document.querySelector(".test");
const box = document.querySelector(".comment-box");
const userImg = document.querySelector(".comment-user-img");
const likeBtn = document.querySelector(".like-button");
const likeCnt = document.querySelector(".like-counter");
const like_wrapper = document.querySelector(".likes-wrapper");
let roomId = localStorage.getItem("roomId");
const comment_wrapper = document.querySelector(".comments-wrapper");
let userName = null;
let targetId = null;

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

      getComment(roomId);
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

    getComment(roomId);
  } catch (e) {
    console.log(e);
  }
};

const createRecomment = async (roomId, commentId, comment) => {
  let url = `http://localhost:8080/api/room/${roomId}/comment/${commentId}/recomment`;
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
    getComment(roomId);
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

    getComment(roomId); // roomId로 변경
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

    getComment(roomId); // roomId로 변경
  } catch (e) {
    console.log(e);
  }
};

const showComment = async (roomId, json) => {
  box.textContent = "";
  for (var i = 0; i < json.length; i++) {
    let container = document.createElement("div");
    container.style =
      "display:flex; flex-direction: column; justify-content:left";

    let node = document.createElement("li");
    node.style = "width: 100%; display:flex; font-size:14px; padding-top:24px";

    let info = json[i].user;

    let {
      user,
      name,
      comment,
      timeDiff,
      time,
      btns,
      recomment_btn,
      delete_btn,
      content,
      img,
      commentId,
    } = createChildren(info);

    user.appendChild(name);
    user.appendChild(comment);

    timeCheck(timeDiff, time);
    btns.appendChild(time);
    btns.appendChild(recomment_btn);

    if (json[i].isMyComment) {
      btns.appendChild(delete_btn);
    }

    content.appendChild(user);
    content.appendChild(btns);

    node.appendChild(img);
    node.appendChild(content);
    node.appendChild(commentId);
    container.append(node);

    showRecomment(json, i, roomId, commentId, btns, container);

    box.append(container);
  }

  function showRecomment(json, i, roomId, commentId, btns, container) {
    for (let j = 0; j < json[i].recomments.length; j++) {
      let recomment_node = document.createElement("li");
      recomment_node.style =
        "width: 100%; display:flex; font-size:14px; padding-top:24px; margin-left:14px";

      let recomment_info = json[i].recomments[j];

      let recomment_content = document.createElement("span");
      recomment_content.style.display = "inline";

      let recomment_user = document.createElement("span");

      let target_name = document.createElement("span");
      target_name.innerText = "@" + json[i].user.nickname + " ";
      target_name.style.color = "blue";

      let recomment_img = document.createElement("img");

      let recomment_btns = document.createElement("div");
      recomment_btns.style.fontSize = "12px";

      let recomment_commentId = document.createElement("hidden");
      recomment_commentId.value = recomment_info.recommentId;

      if (recomment_info.user.profileImgURL != null)
        recomment_img.src =
          "http://localhost:8080/api" +
          recomment_info.user.profileImgURL.replace("\\\\profileImg\\", "");
      else recomment_img.src = "../public/default-avatar.jpg";

      recomment_img.style =
        "width:36px; height: 36px; border-radius:2.5rem; margin-right:18px";

      let recomment_name = document.createElement("div");
      recomment_name.style = "font-weight:900; display:inline";
      recomment_name.innerText = recomment_info.user.nickname + "  ";

      let recomment_comment = document.createElement("span");
      recomment_comment.innerText = recomment_info.content;

      let recomment_time = document.createElement("span");
      let recomment_timeDiff =
        Date.now() - Date.parse(recomment_info.createdDateTime);

      if (recomment_timeDiff / (7 * 24 * 60 * 60 * 1000) >= 1) {
        recomment_time.innerText =
          parseInt(recomment_timeDiff / (7 * 24 * 60 * 60 * 1000) / 1) +
          "주    ";
      } else if (recomment_timeDiff / (24 * 60 * 60 * 1000) >= 1) {
        recomment_time.innerText =
          parseInt(recomment_timeDiff / (24 * 60 * 60 * 1000) / 1) + "일    ";
      } else if (recomment_timeDiff / (60 * 60 * 1000) >= 1) {
        recomment_time.innerText =
          parseInt(recomment_timeDiff / (60 * 60 * 1000) / 1) + "시간    ";
      } else if (recomment_timeDiff / (60 * 1000) >= 1) {
        recomment_time.innerText =
          parseInt(recomment_timeDiff / (60 * 1000) / 1) + "분    ";
      } else {
        recomment_time.innerText =
          parseInt(recomment_timeDiff / 1000 / 1) + "초    ";
      }

      let recomment_recomment_btn = document.createElement("a");
      recomment_recomment_btn.addEventListener("click", (json) => {
        input.value = "@" + recomment_info.user.nickname + " ";
      });

      let recomment_delete_btn = document.createElement("a");
      recomment_delete_btn.innerText = "삭제";
      recomment_delete_btn.style.marginLeft = "5px";
      recomment_delete_btn.addEventListener("click", () => {
        deleteReComment(roomId, commentId.value, recomment_commentId.value);
      });

      recomment_user.appendChild(recomment_name);
      recomment_user.appendChild(target_name);
      recomment_user.appendChild(recomment_comment);
      recomment_user.style = "display:inline-box; align-items:center; ";

      recomment_btns.appendChild(recomment_time);
      recomment_btns.appendChild(recomment_recomment_btn);

      if (recomment_info.isMyComment)
        recomment_btns.appendChild(recomment_delete_btn);

      recomment_content.appendChild(recomment_user);
      recomment_content.appendChild(recomment_btns);

      recomment_node.appendChild(recomment_img);
      recomment_node.appendChild(recomment_content);
      recomment_node.appendChild(recomment_commentId);

      container.appendChild(recomment_node);
    }
  }

  function timeCheck(timeDiff, time) {
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
  }
  function createChildren(info) {
    let content = document.createElement("span");
    content.style.display = "inline";

    let user = document.createElement("span");
    user.style = "display:inline-box; align-items:center; ";
    let img = document.createElement("img");

    let btns = document.createElement("div");
    btns.style.fontSize = "12px";

    let commentId = document.createElement("hidden");
    commentId.value = json[i].commentId;

    if (info.profileImgURL != null)
      img.src =
        "http://localhost:8080/api" +
        info.profileImgURL.replace("\\\\profileImg\\", "");
    else img.src = "../public/default-avatar.jpg";

    img.style =
      "width:36px; height: 36px; border-radius:2.5rem; margin-right:18px";

    let name = document.createElement("div");
    name.style = "font-weight:900; display:inline";
    name.innerText = info.nickname + "  ";

    let comment = document.createElement("span");
    comment.innerText = json[i].content;
    comment.style.overflow = "auto";

    let time = document.createElement("span");
    let timeDiff = Date.now() - Date.parse(json[i].createdDateTime);

    let recomment_btn = document.createElement("a");
    recomment_btn.addEventListener("click", (json) => {
      input.value = "@" + info.nickname + " ";
      userName = input.value;
      targetId = commentId.value;
    });
    recomment_btn.innerText = "답글 달기";

    let delete_btn = document.createElement("a");
    delete_btn.innerText = "삭제";
    delete_btn.style.marginLeft = "5px";

    delete_btn.addEventListener("click", () => {
      deleteComment(roomId, commentId.value);
    });

    return {
      user,
      name,
      comment,
      timeDiff,
      time,
      btns,
      recomment_btn,
      delete_btn,
      content,
      img,
      commentId,
    };
  }
};

const getComment = async (roomId) => {
  // 초기화
  box.textContent = "";
  like_wrapper.innerText = localStorage.getItem("likeCount");

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
      await showComment(roomId, JSON.parse(value));
      comment_wrapper.innerText = JSON.parse(value).length;
    });
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
  if (res.status == 400) return false;
  return true;
};

const unlikeThisRoom = async (roomId) => {
  let url = `http://localhost:8080/api/room/${roomId}/unlike`;

  let res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
  if (res.status == 400) return false;
  return true;
};

btn.addEventListener("click", async () => {
  if (input.value[0] == "@" && targetId != null)
    await createRecomment(
      roomId,
      targetId,
      input.value.substring(userName.length)
    );
  else await createComment(roomId);

  input.value = "";
});

comment_wrapper.addEventListener("click", async () => {
  if ((await localStorage.getItem("isLike")) == "true") {
    likeBtn.classList.add("fa-solid");
    likeBtn.style.color = "#F33040";
  } else {
    likeBtn.classList.remove("fa-solid");
    likeBtn.style.color = "";
  }
  getComment(roomId);
});

likeBtn.addEventListener("click", async () => {
  if ((await localStorage.getItem("isLike")) == "true") {
    await unlikeThisRoom(localStorage.getItem("roomId"));
    likeBtn.style.color = "";
    likeBtn.classList.remove("fa-solid");
  } else {
    await likeThisRoom(localStorage.getItem("roomId"));
    likeBtn.style.color = "#F33040";
    likeBtn.classList.add("fa-regular");
    likeBtn.classList.add("fa-solid");
  }
  await getRoom(roomId);
  getComment(roomId);
});

export {
  createComment,
  updateComment,
  deleteComment,
  createRecomment,
  updateRecomment,
  deleteReComment,
  showComment,
  getComment,
  likeThisRoom,
  unlikeThisRoom,
};

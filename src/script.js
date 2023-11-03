import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import Experience from "./Experience/Experience.js";
import { getComment } from "./scripts/comment.js";
import { isTokenExpire } from "./scripts/sidebar.js";

const experience = new Experience(document.querySelector("canvas.webgl"));

const iframeWrapper = document.querySelector(".iframe-wrapper");
const btnRoomZoom = document.querySelector(".btn-room-zoom");
const btnComment = document.querySelector(".comments-wrapper");
const input = document.querySelector("#comment-input");
const btn = document.querySelector("#comment-btn");
const test = document.querySelector(".test");
const box = document.querySelector(".comment-box");
const userImg = document.querySelector(".comment-user-img");
const likeBtn = document.querySelector(".like-button");
const likeCnt = document.querySelector(".like-counter");
const roomId = localStorage.getItem("roomId");
let userName = null;
let targetId = null;

btnRoomZoom.addEventListener("click", () => {
  // iframeWrapper.classList.toggle('active-popup')
});

btnComment.addEventListener("click", () => {
  getComment(localStorage.getItem("roomId"));
});

var token = localStorage.getItem("jwt");

const sidebarChangeContent = async (token) => {
  const menu__box = document.querySelector(".menu__box");
  let node = document.createElement("li");

  if (isTokenExpire(token)) {
    let login = document.createElement("a");
    login.classList.add("menu__item");
    login.setAttribute("data-bs-toggle", "modal");
    login.setAttribute("data-bs-target", "#login-modal");
    login.innerText = "Login";
    login.href = "./views/login.html";
    node.appendChild(login);
    menu__box.prepend(node);

    const logout = document.querySelector(".logout");
    logout.style.display = "none";

    const create = document.querySelector(".create");
    create.style.display = "none";
  } else {
    let avatar = document.createElement("img");
    let userName = document.createElement("a");
    let a = document.createElement("a");
    let child = document.createElement("div");

    child.classList.add("userInfo");
    child.classList.add("d-flex");
    child.classList.add("justify-content-around");
    child.classList.add("align-items-center");
    child.classList.add("mb-4");
    child.classList.add("w-75");
    a.classList.add("userInfo");
    a.classList.add("menu_item");

    // 아바타를 public 폴더에서 바로 가져오게 수정
    avatar.src = "../../public/default-avatar.jpg";
    avatar.style.paddingLeft = "12px";
    if (
      localStorage.getItem("profileImgUrl") != "../../public/default-avatar.jpg"
    ) {
      avatar.src =
        "http://localhost:8080/api/profileImg/" +
        localStorage.getItem("profileImgUrl");
      console.log(localStorage.getItem("profileImgUrl"));
    }
    avatar.alt = "Avatar";
    avatar.classList.add("w-25");
    userName.innerText = localStorage.getItem("nickname");
    userName.href = "./views/user.html";
    userName.style.textDecoration = "none";

    child.appendChild(avatar);
    child.appendChild(userName);
    node.appendChild(child);
    node.appendChild(a);

    menu__box.prepend(node);

    const logout = document.querySelector(".logout");
    logout.style.display = "block";

    const create = document.querySelector(".create");
    create.style.display = "block";
  }
};

const hamburger = document.querySelector(".hamburger-menu");

hamburger.addEventListener("click", sidebarChangeContent(token));

const lg = document.querySelector(".logout-btn");

lg.addEventListener("click", async (e) => {
  e.preventDefault();

  const url = "http://localhost:8080/api/auth/logout";

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  })
    .then((res) => {
      let status = res.status;

      if (status == 200) {
        alert("로그아웃 되었습니다.");
        localStorage.removeItem("userId");
        localStorage.removeItem("nickname");
        localStorage.removeItem("profileImgUrl");
        localStorage.removeItem("jwt");
        location.replace("./index.html");
      } else {
        alert("[Temporal Error]\n로그아웃 요청이 실패했습니다.");
      }
    })
    .catch((e) => {
      alert(e);
    });
});

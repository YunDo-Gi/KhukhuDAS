import * as THREE from "three";
import gsap from "gsap";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import * as dat from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

import Experience from "../Experience.js";
import EventEmitter from "../Utils/EventEmitter.js";
import Controls from "./Controls.js";
import { getRoom, getMedia, setData } from "../../scripts/room.js";
import { getComment } from "../../scripts/comment.js";
import PaintingRoom from "./PaintingRoom.js";
import ReadingRoom from "./ReadingRoom.js";
import PhotoRoom from "./PhotoRoom.js";
import SoccerRoom from "./SoccerRoom.js";
import GamingRoom from "./GamingRoom.js";
import Objects from "./Objects.js";
import Apt from "./Apt.js";
import { dummyJSON, dummyJSON2 } from "./dummyJson.js";
import * as room from "../../scripts/room.js";

const btnHome = document.querySelector(".btn-home");
const btnRoomZoom = document.querySelector(".btn-room-zoom");
const btnToRoom = document.querySelector(".btn-to-room");
const btnRetunFromZoom = document.querySelector(".btn-return-from-zoom");
const likes = document.querySelector(".likes-wrapper");
const views = document.querySelector(".views-wrapper");
const comments = document.querySelector(".comments-wrapper");
const iframeWrapper = document.querySelector(".iframe-wrapper");
const rightArrow = document.querySelector(".arrow-wrapper-right");
const leftArrow = document.querySelector(".arrow-wrapper-left");
const svgWrapper = document.querySelector(".arrow-svg-wrapper");
const infoCard = document.querySelector(".info-card");
const cardTitle = document.querySelector(".info-card-title");
const cardComment = document.querySelector(".info-card-comment");
const cardWriter = document.querySelector(".info-card-writer");
const roomWrapper = document.querySelector(".room-wrapper");

// drop down menu
const optionMenu = document.querySelector(".select-menu");
const selectBtn = optionMenu.querySelector(".select-btn");
const options = optionMenu.querySelectorAll(".option");
const sBtn_text = optionMenu.querySelector(".sBtn-text");
const title_logo = document.querySelector(".landing-wrapper");

selectBtn.addEventListener("click", () =>
  optionMenu.classList.toggle("active")
);

btnHome.addEventListener("click", () => {
  views.classList.add("hidden");
  comments.classList.add("hidden");
  likes.classList.add("hidden");
  optionMenu.classList.add("hidden");
  infoCard.classList.add("hidden");
  btnRoomZoom.classList.add("hidden");
  cardTitle.classList.add("hidden");
  cardComment.classList.add("hidden");
  cardWriter.classList.add("hidden");
});

let fetchData = room.getRooms(null, "CHRONOLOGICAL");

let settingDone = false;
let current_page = 1;
let pages = null;

export default class World extends EventEmitter {
  constructor() {
    super();

    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.renderer = this.experience.renderer;
    this.time = this.experience.time;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      // this.readingRoom = new ReadingRoom();
      // this.paintingRoom = new PaintingRoom();
      // this.photoRoom = new PhotoRoom();
      // this.soccerRoom = new SoccerRoom();
      this.objects = new Objects();
      this.apt = new Apt();
      this.camera = this.experience.camera;
      this.size = this.experience.sizes;
      this.controls = new Controls();
      this.apts = [];

      // Pagenation
      this.rooms = [];

      // this.heart = null;
      // this.setHeart();

      // Set rooms
      this.setRooms();
      settingDone = true;
      // this.fillApt();

      // Set Iframe
      // this.setIframe();

      // this.text = null
      // this.setText()

      options.forEach((option) => {
        option.addEventListener("click", () => {
          let selectedOption = option.querySelector(".option-text").innerText;
          sBtn_text.innerText = selectedOption;
          optionMenu.classList.remove("active");

          let api = null;

          for (let room of this.rooms) {
            this.scene.remove(room.getModel());
            document
              .querySelector(".room-page-wrapper")
              .removeChild(
                document.querySelector(".room-page-wrapper").lastChild
              );
          }

          // API 호출
          let data = null;
          switch (selectedOption) {
            case "VIEW":
              console.log("view");
              // data = api
              break;
            case "LIKE":
              console.log("like");
              // data = api
              break;
            case "CHRONOLOGICAL":
              console.log("chrono");
              // data = api
              break;
          }
          current_page = 1;
          this.getRooms(fetchData); // data
          this.rooms[current_page - 1]
            .getModel()
            .scale.copy(this.rooms[current_page - 1].getScale());
          this.rooms[current_page - 1]
            .getModel()
            .position.copy(this.rooms[current_page - 1].getCenterPosition());
          this.rooms[current_page - 1].setBackground();
          pages = document.querySelectorAll(".room-page-wrapper>span>svg");
        });
      });

      this.trigger("worldReady");
    });
  }

  getRooms(data) {
    for (let i = 0; i < data.length; i++) {
      switch (data[i].interestType) {
        case "READING":
          this.rooms[i] = new ReadingRoom();
          break;
        case "PICTURE":
          this.rooms[i] = new PaintingRoom();
          break;
        case "PHOTO":
          this.rooms[i] = new PhotoRoom();
          break;
        case "EXERCISE":
          this.rooms[i] = new SoccerRoom();
          break;
        case "GAMING":
          this.rooms[i] = new GamingRoom();
          break;
      }
      this.rooms[i].setLikes(data[i].likeCount);
      this.rooms[i].setData(data[i]);
      this.setFrames(
        this.rooms[i].getType(),
        this.rooms[i].frames,
        data[i].fileURLs
      );
      this.addRoomIcon(i);
    }
  }

  setApts(data) {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 0; i < 1; i++) {
      // data.length
      let randNum = Math.floor(Math.random() * arr.length);
      let index = 1; // arr.slice(randNum, randNum + 1);
      arr.splice(randNum, 1);
      switch (data[i].interestType) {
        case "READING":
          this.apts[i] = new ReadingRoom();
          this.apts[i]
            .getModel()
            .position.set(
              this.apt.getAptPositionsReading(index).x,
              this.apt.getAptPositionsReading(index).y,
              this.apt.getAptPositionsReading(index).z
            );
          break;
        case "PICTURE":
          this.apts[i] = new PaintingRoom();
          this.apts[i]
            .getModel()
            .position.set(
              this.apt.getAptPositionsPainting(index).x,
              this.apt.getAptPositionsPainting(index).y,
              this.apt.getAptPositionsPainting(index).z
            );
          break;
        case "PHOTO":
          this.apts[i] = new PhotoRoom();
          this.apts[i]
            .getModel()
            .position.set(
              this.apt.getAptPositionsPhoto(index).x,
              this.apt.getAptPositionsPhoto(index).y,
              this.apt.getAptPositionsPhoto(index).z
            );
          break;
        case "EXERCISE":
          this.apts[i] = new SoccerRoom();
          this.apts[i]
            .getModel()
            .position.set(
              this.apt.getAptPositionsPhoto(index).x,
              this.apt.getAptPositionsPhoto(index).y,
              this.apt.getAptPositionsPhoto(index).z
            );
          break;
        case "GAMING":
          this.apts[i] = new GamingRoom();
          this.apts[i]
            .getModel()
            .position.set(
              this.apt.getAptPositionsPhoto(index).x,
              this.apt.getAptPositionsPhoto(index).y,
              this.apt.getAptPositionsPhoto(index).z
            );
          break;
      }

      this.setFrames(
        this.apts[i].getType(),
        this.apts[i].frames,
        data[i].fileURLs
      );
      this.apts[i].getModel().rotation.set(0, Math.PI * 0.5, 0);
      this.apts[i].getModel().scale.copy(this.apts[i].getAptScale());
    }

    const gui = new dat.GUI();
    gui.add(this.apts[0].getModel().position, "x");
    gui.add(this.apts[0].getModel().position, "y");
    gui.add(this.apts[0].getModel().position, "z");
  }

  async setRooms() {
    if (!settingDone) {
      await fetchData.then((res) => {
        this.getRooms(res); // 디폴트로 받아오는 데이터
        this.setApts(res); // 디폴트로 받아오는 데이터
      });
    }

    let page_size = this.rooms.length;

    pages = document.querySelectorAll(".room-page-wrapper>span>svg");

    btnToRoom.addEventListener("click", async () => {
      this.rooms[current_page - 1].setBackground();
      await getRoom(this.rooms[current_page - 1].getData().id);
      localStorage.setItem("roomId", this.rooms[current_page - 1].getData().id);

      likes.innerText = this.rooms[current_page - 1].getLikes();
      views.innerText = localStorage.getItem("viewCount");
      cardTitle.innerText = this.rooms[current_page - 1].getData().title;
      cardComment.innerText = this.rooms[current_page - 1].getData().content;
      cardWriter.innerText =
        this.rooms[current_page - 1].getData().writer.nickname;
      console.log(this.rooms[current_page - 1].getData());
      getComment(this.rooms[current_page - 1].getData().id);

      infoCard.classList.remove("hidden");
      cardTitle.classList.remove("hidden");
      cardComment.classList.remove("hidden");
      cardWriter.classList.remove("hidden");
    });

    // Set room contents

    const containers = [likes, views, comments];
    const icons = [
      `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path style="fill: #f5626b" d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/></svg>`,
      `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path style="fill: whitesmoke" d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"/></svg>`,
      `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path style="fill: whitesmoke" d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80Zm-80 400q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720L720-240H160Z"/></svg>`,
    ];
    let texts = [
      this.rooms[current_page - 1].getLikes(),
      this.rooms[current_page - 1].getData().commentCount,
      this.rooms[current_page - 1].getData().viewCount,
    ];
    for (let i = 0; i < 3; i++) {
      let iconContainer = document.createElement("div");
      iconContainer.style.marginBottom = "5px";
      iconContainer.style.marginRight = "10px";
      let textContainer = document.createElement("div");
      iconContainer.innerHTML = icons[i];
      textContainer.innerHTML = `${texts[i]}`;
      containers[i].appendChild(iconContainer);
      containers[i].appendChild(textContainer);
    }
    // Handle page navigation

    this.rooms[current_page - 1]
      .getModel()
      .scale.copy(this.rooms[current_page - 1].getScale());
    this.rooms[current_page - 1]
      .getModel()
      .position.copy(this.rooms[current_page - 1].getCenterPosition());

    rightArrow.addEventListener("click", () => {
      console.log("right");
      if (current_page < page_size) {
        pages[current_page - 1].classList.toggle("selected");
        gsap.to(this.rooms[current_page - 1].getModel().position, {
          duration: 1,
          x: this.rooms[current_page - 1].getRightPosition().x,
          ease: "power2.inOut",
          onComplete: () => {
            this.rooms[current_page - 1].getModel().scale.set(0, 0, 0);
          },
        });
        pages[current_page].classList.toggle("selected");
        this.rooms[current_page].setBackground();
        this.rooms[current_page]
          .getModel()
          .scale.copy(this.rooms[current_page].getScale());
        this.rooms[current_page]
          .getModel()
          .position.copy(this.rooms[current_page].getLeftPostion());
        gsap.to(this.rooms[current_page].getModel().position, {
          duration: 1,
          x: this.rooms[current_page].getCenterPosition().x,
          ease: "power2.inOut",
          onComplete: async () => {
            current_page += 1;
            await getRoom(this.rooms[current_page - 1].getData().id);
            await localStorage.setItem(
              "roomId",
              this.rooms[current_page - 1].getData().id
            );
            likes.innerText = this.rooms[current_page - 1].getLikes();
            views.innerText = localStorage.getItem("viewCount");
            cardTitle.innerText = this.rooms[current_page - 1].getData().title;
            cardComment.innerText =
              this.rooms[current_page - 1].getData().content;
            cardWriter.innerText =
              this.rooms[current_page - 1].getData().writer.nickname;
            console.log(this.rooms[current_page - 1].getData());
            getComment(this.rooms[current_page - 1].getData().id);

            infoCard.classList.remove("hidden");
            cardTitle.classList.remove("hidden");
            cardComment.classList.remove("hidden");
            cardWriter.classList.remove("hidden");
          },
        });
      }
    });

    leftArrow.addEventListener("click", () => {
      console.log("left");
      if (current_page > 1) {
        pages[current_page - 1].classList.toggle("selected");
        gsap.to(this.rooms[current_page - 1].getModel().position, {
          duration: 1,
          x: this.rooms[current_page - 1].getLeftPostion().x,
          ease: "power2.inOut",
          onComplete: () => {
            this.rooms[current_page - 1].getModel().scale.set(0, 0, 0);
          },
        });
        pages[current_page - 2].classList.toggle("selected");
        this.rooms[current_page - 2].setBackground();
        this.rooms[current_page - 2]
          .getModel()
          .scale.copy(this.rooms[current_page - 2].getScale());
        this.rooms[current_page - 2]
          .getModel()
          .position.copy(this.rooms[current_page - 2].getRightPosition());
        gsap.to(this.rooms[current_page - 2].getModel().position, {
          duration: 1,
          x: this.rooms[current_page - 2].getCenterPosition().x,
          ease: "power2.inOut",
          onComplete: async () => {
            current_page -= 1;
            await getRoom(this.rooms[current_page - 1].getData().id);
            await localStorage.setItem(
              "roomId",
              this.rooms[current_page - 1].getData().id
            );
            likes.innerText = this.rooms[current_page - 1].getLikes();
            views.innerText = localStorage.getItem("viewCount");
            cardTitle.innerText = this.rooms[current_page - 1].getData().title;
            cardComment.innerText =
              this.rooms[current_page - 1].getData().content;
            cardWriter.innerText =
              this.rooms[current_page - 1].getData().writer.nickname;
            console.log(this.rooms[current_page - 1].getData());
            getComment(this.rooms[current_page - 1].getData().id);

            infoCard.classList.remove("hidden");
            cardTitle.classList.remove("hidden");
            cardComment.classList.remove("hidden");
            cardWriter.classList.remove("hidden");
          },
        });
      }
    });

    // 방 확대 시 이동 및 회전
    btnRoomZoom.addEventListener("click", () => {
      const currentRoom = this.rooms[current_page - 1];
      const camera = this.camera.getOrthographicCamera();
      this.addIframe(currentRoom);
      switch (currentRoom.getType()) {
        case "reading":
          gsapPosition(currentRoom, -0.31, -1.64);
          gsapRotation(currentRoom, 0);
          gsapZoom(camera, 8);
          break;
        case "painting":
          gsap.to(currentRoom.getModel().position, {
            duration: 2,
            x: -1.465,
            y: -0.599,
            ease: "power2.inOut",
            onComplete: () => {
              console.log("painting");
              currentRoom.removeObjects();
            },
          });
          gsapRotation(currentRoom, 0, 0.05);
          gsapZoom(camera, 5.6);
          break;
        case "photo":
          gsapPosition(currentRoom, -0.262, -1.584);
          gsap.to(currentRoom.getModel().rotation, {
            duration: 2,
            x: 0,
            y: Math.PI * 0.5,
            z: 0.05,
            ease: "power2.inOut",
            onComplete: () => {
              iframeWrapper.classList.remove("hidden");
            },
          });
          gsapZoom(camera, 13);
          break;
        case "exercise":
          gsap.to(currentRoom.getModel().position, {
            duration: 2,
            x: -0.308,
            y: -0.071,
            ease: "power2.inOut",
            onComplete: () => {
              currentRoom.removeObjects();
            },
          });
          gsap.to(currentRoom.getModel().rotation, {
            duration: 2,
            x: 0,
            y: 0,
            z: 0,
            ease: "power2.inOut",
            onComplete: () => {
              iframeWrapper.classList.remove("hidden");
            },
          });
          gsapZoom(camera, 4.1);
          break;
        case "gaming":
          gsap.to(currentRoom.getModel().position, {
            duration: 2,
            x: 0.509,
            y: -0.2015,
            ease: "power2.inOut",
            onComplete: () => {
              currentRoom.removeObjects();
            },
          });
          gsap.to(currentRoom.getModel().rotation, {
            duration: 2,
            x: 0,
            y: 0,
            z: 0,
            ease: "power2.inOut",
            onComplete: () => {
              iframeWrapper.classList.remove("hidden");
            },
          });
          gsapZoom(camera, 6);
          break;
        default:
          console.log("default");
      }

      this.heart.scale.set(0, 0, 0);
      views.classList.add("hidden");
      comments.classList.add("hidden");
      infoCard.classList.add("hidden");
      likes.classList.add("hidden");
      cardTitle.classList.add("hidden");
      cardComment.classList.add("hidden");
      cardWriter.classList.add("hidden");
    });

    function gsapPosition(room, xValue, yValue) {
      gsap.to(room.getModel().position, {
        duration: 2,
        x: xValue,
        y: yValue,
        ease: "power2.inOut",
      });
    }

    function gsapRotation(room, yValue, zValue = 0) {
      gsap.to(room.getModel().rotation, {
        duration: 2,
        y: yValue,
        z: zValue,
        ease: "power2.inOut",
        onComplete: () => {
          iframeWrapper.classList.remove("hidden");
        },
      });
    }

    function gsapZoom(camera, value) {
      gsap.to(camera, {
        duration: 2,
        zoom: value,
        ease: "power2.inOut",
        onUpdate: function () {
          camera.updateProjectionMatrix();
        },
        onComplete: () => {
          btnRetunFromZoom.classList.remove("hidden");
        },
      });
    }

    btnRetunFromZoom.addEventListener("click", () => {
      gsap.to(this.rooms[current_page - 1].getModel().rotation, {
        duration: 2,
        x: -Math.PI * 0.1,
        y: Math.PI * 0.25,
        z: 0,
        ease: "power2.inOut",
      });
      gsap.to(this.rooms[current_page - 1].getModel().position, {
        duration: 2,
        x: this.rooms[current_page - 1].getCenterPosition().x,
        y: this.rooms[current_page - 1].getCenterPosition().y,
        ease: "power2.inOut",
        onComplete: () => {
          views.classList.remove("hidden");
          comments.classList.remove("hidden");
          likes.classList.remove("hidden");
          infoCard.classList.remove("hidden");
          cardTitle.classList.remove("hidden");
          cardComment.classList.remove("hidden");
          cardWriter.classList.remove("hidden");
          this.heart.scale.set(0.002, 0.002, 0.002);
        },
      });
      if (
        this.rooms[current_page - 1].getType() === "painting" ||
        this.rooms[current_page - 1].getType() === "gaming" ||
        this.rooms[current_page - 1].getType() === "exercise"
      ) {
        this.rooms[current_page - 1].addObjects();
      }
      iframeWrapper.classList.add("hidden");
    });

    // const gui = new dat.GUI();
    // gui.add(this.rooms[current_page - 1].getModel().scale, "z");
    // gui.add(this.rooms[current_page - 1].getModel().position, "x");
    // gui.add(this.rooms[current_page - 1].getModel().position, "y");
    // gui.add(this.rooms[current_page - 1].getModel().position, "z");
    // gui.add(this.rooms[current_page - 1].getModel().rotation, "x");
    // gui.add(this.rooms[current_page - 1].getModel().rotation, "y");
    // gui.add(this.rooms[current_page - 1].getModel().rotation, "z");
  }

  setFrames(type, frame, data) {
    for (let j = 0; j < Math.min(data.length, frame.length); j++) {
      if (type === "exercise" || type === "gaming") {
        frame[j].children[1].material = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(data[j]),
        });
      } else {
        frame[j].material = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(data[j]),
        });
      }
    }
  }

  fillApt(scale) {
    this.apts[i]
      .getModel()
      .position.set(
        this.apt.getAptPositions(i).x,
        this.apt.getAptPositions(i).y,
        this.apt.getAptPositions(i).z
      );
    this.apts[i].getModel().rotation.set(0, Math.PI * 0.5, 0);
    this.apts[i].getModel().scale.copy(this.apts[i].getAptScale());
  }

  addRoomIcon(turn) {
    let newDiv = document.createElement("span");
    newDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M446.667-163.666V-461L186.666-611.334V-314l260.001 150.334Zm66.666 0L773.334-314v-298L513.333-461.108v297.442ZM480-518l256.334-149L480-815.334 222.999-667 480-518ZM153.333-256q-15.833-9.284-24.583-24.475-8.75-15.192-8.75-33.191v-332.668q0-17.999 8.75-33.191 8.75-15.191 24.583-24.475l293.334-169q15.885-9 33.442-9 17.558 0 33.224 9l293.334 169q15.833 9.284 24.583 24.475 8.75 15.192 8.75 33.191v332.668q0 17.999-8.75 33.191-8.75 15.191-24.583 24.475L513.333-87q-15.885 9-33.442 9-17.558 0-33.224-9L153.333-256ZM480-480Z"/></svg>`;
    if (turn === 0)
      newDiv.innerHTML = `<svg class = "selected" xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M446.667-163.666V-461L186.666-611.334V-314l260.001 150.334Zm66.666 0L773.334-314v-298L513.333-461.108v297.442ZM480-518l256.334-149L480-815.334 222.999-667 480-518ZM153.333-256q-15.833-9.284-24.583-24.475-8.75-15.192-8.75-33.191v-332.668q0-17.999 8.75-33.191 8.75-15.191 24.583-24.475l293.334-169q15.885-9 33.442-9 17.558 0 33.224 9l293.334 169q15.833 9.284 24.583 24.475 8.75 15.192 8.75 33.191v332.668q0 17.999-8.75 33.191-8.75 15.191-24.583 24.475L513.333-87q-15.885 9-33.442 9-17.558 0-33.224-9L153.333-256ZM480-480Z"/></svg>`;
    document.querySelector(".room-page-wrapper").appendChild(newDiv);
  }

  addIframe(room) {
    switch (room.getType()) {
      case "reading":
        iframeWrapper.style.height = this.size.height * 0.9 + "px";
        iframeWrapper.style.width = this.size.height * 0.9 * 1.01 + "px";
        break;
      case "painting":
        iframeWrapper.style.height = this.size.height * 0.9 + "px";
        iframeWrapper.style.width = this.size.height * 0.9 * 0.99 + "px";
        break;
      case "photo":
        iframeWrapper.style.height = this.size.height * 0.795 + "px";
        iframeWrapper.style.width = this.size.height * 0.9 * 1.04 + "px";
        break;
      case "exercise":
        iframeWrapper.style.height = this.size.height * 0.795 + "px";
        iframeWrapper.style.width = this.size.height * 0.795 * 0.71 + "px";
        break;
      case "gaming":
        iframeWrapper.style.height = this.size.height * 0.805 + "px";
        iframeWrapper.style.width = this.size.height * 0.86 + "px";
        break;
      default:
        console.log("default");
    }

    // newIframe.src = "../views/login.html"
    // iframeWrapper.appendChild(newIframe)
    // let newIframe = document.createElement('iframe')
  }

  setIframe() {
    let root = new THREE.Object3D();
    root.position.set(0, 0, -8);
    this.scene.add(root);

    let test = this.makeIframeObject(1, 1);
    test.rotation.set(0, Math.PI * 0.25, 0);
    test.css3dObject.element.textContent =
      "I am an HTML <div> element mixed into the WebGL scene. This text is editable!";
    test.css3dObject.element.style.opacity = "1";
    test.css3dObject.element.style.background = "tomato";

    root.add(test);
  }

  setHeart() {
    const heartX = -25;
    const heartY = -25;
    const heartShape = new THREE.Shape();
    heartShape.moveTo(25 + heartX, 25 + heartY);
    heartShape.bezierCurveTo(
      25 + heartX,
      25 + heartY,
      20 + heartX,
      0 + heartY,
      0 + heartX,
      0 + heartY
    );
    heartShape.bezierCurveTo(
      -30 + heartX,
      0 + heartY,
      -30 + heartX,
      35 + heartY,
      -30 + heartX,
      35 + heartY
    );
    heartShape.bezierCurveTo(
      -30 + heartX,
      55 + heartY,
      -10 + heartX,
      77 + heartY,
      25 + heartX,
      95 + heartY
    );
    heartShape.bezierCurveTo(
      60 + heartX,
      77 + heartY,
      80 + heartX,
      55 + heartY,
      80 + heartX,
      35 + heartY
    );
    heartShape.bezierCurveTo(
      80 + heartX,
      35 + heartY,
      80 + heartX,
      0 + heartY,
      50 + heartX,
      0 + heartY
    );
    heartShape.bezierCurveTo(
      35 + heartX,
      0 + heartY,
      25 + heartX,
      25 + heartY,
      25 + heartX,
      25 + heartY
    );

    const extrudeSettings = {
      depth: 8,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1,
    };

    const materialRed = new THREE.MeshBasicMaterial({
      color: 0xf5626b,
    });

    const geometryHeart = new THREE.ExtrudeGeometry(
      heartShape,
      extrudeSettings
    );
    this.heart = new THREE.Mesh(geometryHeart, materialRed);

    this.heart.position.set(0.1, 1.7, 8);
    this.heart.rotation.set(Math.PI, 0, 0);

    this.heart.scale.set(0, 0, 0);

    this.scene.add(this.heart);
  }

  setText() {
    const fontLoader = new FontLoader();

    fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
      const textGeometry = new TextGeometry("Hello Three.js", {
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      textGeometry.computeBoundingBox();
      textGeometry.center();

      const textMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true,
      });
      this.text = new THREE.Mesh(textGeometry, textMaterial);

      this.text.position.set(0, -1, 8);
      this.text.rotation.set(0, Math.PI * 0.25, 0);

      this.scene.add(this.text);

      // const gui = new dat.GUI();
      // gui.add(this.text.position, "x");
      // gui.add(this.text.position, "y");
      // gui.add(this.text.position, "z");
      // gui.add(this.text.rotation, "x");
      // gui.add(this.text.rotation, "y");
      // gui.add(this.text.rotation, "z");
    });
  }

  makeIframeObject(width, height) {
    const obj = new THREE.Object3D();

    // this.iframe.src = [ './views/login.html' ];

    // const element = document.createElement('iframe');
    const element = document.createElement("div");
    element.width = width + "px";
    element.height = height + "px";

    let css3dObject = new CSS3DObject(element);
    obj.css3dObject = css3dObject;
    obj.add(css3dObject);

    // make an invisible plane for the DOM element to chop
    // clip a WebGL geometry with it.
    var material = new THREE.MeshPhongMaterial({
      opacity: 0.15,
      color: new THREE.Color(0xfafafa),
      blending: THREE.NoBlending,
      // side	: THREE.DoubleSide,
    });
    var geometry = new THREE.BoxGeometry(width, height, 0.1);
    var mesh = new THREE.Mesh(geometry, material);
    obj.add(mesh);

    return obj;
  }

  getHeart() {
    return this.heart;
  }

  update() {
    if (this.heart) {
      gsap.to(
        this.heart.rotation,
        {
          duration: 0.1,
          y: this.heart.rotation.y + 0.04,
          ease: "power2.inOut",
        },
        "same"
      );
      gsap.to(
        this.heart.position,
        {
          duration: 0.1,
          y: Math.abs(Math.sin(this.time.elapsed / 1000)) * 0.05 + 1.7,
          ease: "power2.inOut",
        },
        "same"
      );
    }
  }
}

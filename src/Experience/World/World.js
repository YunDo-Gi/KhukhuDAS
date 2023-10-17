import * as THREE from "three";
import gsap from "gsap";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import * as dat from 'lil-gui'

import Experience from "../Experience.js";
import EventEmitter from "../Utils/EventEmitter.js";
import Controls from "./Controls.js";

import PaintingRoom from "./PaintingRoom.js";
import ReadingRoom from "./ReadingRoom.js";
import ReadingRoomApt from "./ReadingRoomApt.js";
import PhotoRoom from "./PhotoRoom.js";
import SoccerRoom from "./SoccerRoom.js";
import BasicRoom from "./BasicRoom.js";
import Objects from "./Objects.js";
import Apt from "./Apt.js";

const btnRoomZoom = document.querySelector(".btn-room-zoom");
const btnToRoom = document.querySelector(".btn-to-room");

export default class World extends EventEmitter {
  constructor() {
    super();

    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.renderer = this.experience.renderer;

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
      this.controls = new Controls();
      this.apts = [];

      // Pagenation
      this.rooms = [];
      
      // Set rooms
      this.setRooms();
      this.fillApt();

      // Set GUI
      const gui = new dat.GUI()
      gui.add(this.rooms[0].getModel().scale, 'x')
      gui.add(this.rooms[0].getModel().scale, 'y')
      gui.add(this.rooms[0].getModel().scale, 'z')
      // gui.add(this.rooms[1].getModel().rotation, 'x')
      // gui.add(this.rooms[1].getModel().rotation, 'y')
      // gui.add(this.rooms[1].getModel().rotation, 'z')
      // gui.add(this.apts[0].getModel().position, 'x')
      // gui.add(this.apts[0].getModel().position, 'y')
      // gui.add(this.apts[0].getModel().position, 'z')

      this.trigger("worldReady");
    });
  }

  getRooms() {
    // fetch API
    let dummyJSON = [
      {
          "id": 2,
          "title": "내방",
          "content": "이쁘지?",
          "interestType": "READING",
          "writer": {
              "memberId": 1,
              "nickname": "마팅",
              "profileImgURL": null
          },
          "commentCount": 0,
          "createdDateTime": "2023-09-13T17:04:52.341923",
          "modifiedDateTime": "2023-09-13T17:04:52.341866",
          "viewCount": 0,
          "likeCount": 2,
          "fileURLs": [
            "background/basic_bg.png",
            "background/game_bg.png"
          ]
      },
      {
          "id": 1,
          "title": "내방",
          "content": "이쁘지?",
          "interestType": "PAINTING",
          "writer": {
              "memberId": 1,
              "nickname": "마팅",
              "profileImgURL": null
          },
          "commentCount": 0,
          "createdDateTime": "2023-09-13T17:04:51.669563",
          "modifiedDateTime": "2023-09-13T17:04:51.668273",
          "viewCount": 0,
          "likeCount": 1,
          "fileURLs": [
            "background/basic_bg.png",
            "background/game_bg.png", 
            "background/read_bg.png"
          ]
      },
      {
        "id": 3,
        "title": "내방",
        "content": "이쁘지?",
        "interestType": "PHOTO",
        "writer": {
            "memberId": 1,
            "nickname": "마팅",
            "profileImgURL": null
        },
        "commentCount": 0,
        "createdDateTime": "2023-09-13T17:04:51.669563",
        "modifiedDateTime": "2023-09-13T17:04:51.668273",
        "viewCount": 0,
        "likeCount": 1,
        "fileURLs": [
          "background/basic_bg.png",
          "background/game_bg.png"
        ]
    }
    ]

    for(let i = 0; i < dummyJSON.length; i++)
    {
      let room = null
      switch (dummyJSON[i].interestType) {
        case "READING":
          this.rooms[i] = new ReadingRoom()
          this.setFrames(this.rooms[i].frames, dummyJSON[i].fileURLs)
          this.apts[i] = new ReadingRoomApt()
          this.setFrames(this.apts[i].frames, dummyJSON[i].fileURLs)
          break;
        case "PAINTING":
          this.rooms[i] = new PaintingRoom()
          this.setFrames(this.rooms[i].frames, dummyJSON[i].fileURLs)
          break;
        case "PHOTO":
          this.rooms[i] = new PhotoRoom()
          this.setFrames(this.rooms[i].frames, dummyJSON[i].fileURLs)
          break;
      }
      this.addRoomIcon(i)
    }
  }

  setRooms()
  {
    this.getRooms()
    console.log(this.rooms)

    let page_size = this.rooms.length;
    let current_page = 1;

    const pages = document.querySelectorAll(".room-page-wrapper>span>svg");

    btnToRoom.addEventListener("click", () => {
      this.rooms[current_page - 1].setBackground();
    })

    // Handle page navigation
    this.rooms[current_page - 1]
    .getModel()
    .scale.copy(this.rooms[current_page - 1].getScale());
  this.rooms[current_page - 1]
    .getModel()
    .position.copy(this.rooms[current_page - 1].getCenterPosition());

  document
    .querySelector(".arrow-wrapper-right")
    .addEventListener("click", () => {
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
          onComplete: () => {
            current_page += 1;
          },
        });
      }
    });

  document
    .querySelector(".arrow-wrapper-left")
    .addEventListener("click", () => {
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
          onComplete: () => {
            current_page -= 1;
          },
        });
      }
    });

    // btnRoomZoom.addEventListener("click", () => {
    //   gsap.to(
    //     this.rooms[current_page - 1].getModel().position,
    //     {
    //       duration: 1,
    //       x: this.rooms[current_page - 1].getCenterPosition().x - this.rooms[current_page - 1].getIframePosition().x,
    //       y: this.rooms[current_page - 1].getCenterPosition().y - this.rooms[current_page - 1].getIframePosition().y,
    //       z: this.rooms[current_page - 1].getCenterPosition().z - this.rooms[current_page - 1].getIframePosition().z,
    //       ease: "power2.inOut",
    //     },
    //     "same");
    //   gsap.to(
    //     this.rooms[current_page - 1].getModel().rotation,
    //     {
    //       duration: 1,
    //       x: this.rooms[current_page - 1].getIframeRotation().x,
    //       y: this.rooms[current_page - 1].getIframeRotation().y,
    //       z: this.rooms[current_page - 1].getIframeRotation().z,
    //       ease: "power2.inOut",
    //     },
    //     "same"
    //   );
    // });
  }

  setFrames(frame, data)
  {
    for(let j = 0; j < Math.min(data.length, frame.length); j++)
    {
      frame[j].material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(data[j]) })
    }
  }

  fillApt(scale) {
    // this.apts = [...this.rooms]
    // for(let room of this.apts)
    // {
    //   let ran = Math.floor(Math.random() * this.apts.length);
    //   if(this.apt.getAptPositions()[ran].filled === false) continue;
    //   apt.getModel().position.set(this.apt.getAptPositions()[0].position.x, this.apt.getAptPositions()[0].position.y, this.apt.getAptPositions()[0].position.z)
    // }
    this.apts[0].getModel().position.set(this.apt.getAptPositions(0).x, this.apt.getAptPositions(0).y, this.apt.getAptPositions(0).z)
    this.apts[0].getModel().rotation.set(0, Math.PI * 0.5, 0)
    this.apts[0].getModel().scale.copy(this.apts[0].getAptScale())
  }

  addRoomIcon(turn)
  {
    let newDiv = document.createElement('span')
    newDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M446.667-163.666V-461L186.666-611.334V-314l260.001 150.334Zm66.666 0L773.334-314v-298L513.333-461.108v297.442ZM480-518l256.334-149L480-815.334 222.999-667 480-518ZM153.333-256q-15.833-9.284-24.583-24.475-8.75-15.192-8.75-33.191v-332.668q0-17.999 8.75-33.191 8.75-15.191 24.583-24.475l293.334-169q15.885-9 33.442-9 17.558 0 33.224 9l293.334 169q15.833 9.284 24.583 24.475 8.75 15.192 8.75 33.191v332.668q0 17.999-8.75 33.191-8.75 15.191-24.583 24.475L513.333-87q-15.885 9-33.442 9-17.558 0-33.224-9L153.333-256ZM480-480Z"/></svg>`
    if(turn === 0) newDiv.innerHTML = `<svg class = "selected" xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M446.667-163.666V-461L186.666-611.334V-314l260.001 150.334Zm66.666 0L773.334-314v-298L513.333-461.108v297.442ZM480-518l256.334-149L480-815.334 222.999-667 480-518ZM153.333-256q-15.833-9.284-24.583-24.475-8.75-15.192-8.75-33.191v-332.668q0-17.999 8.75-33.191 8.75-15.191 24.583-24.475l293.334-169q15.885-9 33.442-9 17.558 0 33.224 9l293.334 169q15.833 9.284 24.583 24.475 8.75 15.192 8.75 33.191v332.668q0 17.999-8.75 33.191-8.75 15.191-24.583 24.475L513.333-87q-15.885 9-33.442 9-17.558 0-33.224-9L153.333-256ZM480-480Z"/></svg>`
    document.querySelector('.room-page-wrapper').appendChild(newDiv)
  }

  // setZoom(room) {
  //   gsap.to(room, {
  //     x: room.position.x - room.getFramePosition().x,
  //     y: room.position.y - room.getFramePosition().y,
  //     z: room.position.z - room.getFramePosition().z,
  //     duration: 1,
  //     ease: "power2.inOut",
  //   });
  // }



  update() {}
}

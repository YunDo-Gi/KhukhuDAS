import * as THREE from "three";
import gsap from "gsap";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";

import Experience from "../Experience.js";
import EventEmitter from "../Utils/EventEmitter.js";
import Controls from "./Controls.js";

import PaintingRoom from "./PaintingRoom.js";
import ReadingRoom from "./ReadingRoom.js";
import PhotoRoom from "./PhotoRoom.js";
import SoccerRoom from "./SoccerRoom.js";
import BasicRoom from "./BasicRoom.js";
import Objects from "./Objects.js";
import Apt from "./Apt.js";

const btnRoomZoom = document.querySelector(".btn-room-zoom");

export default class World extends EventEmitter {
  constructor() {
    super();

    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.readingRoom = new ReadingRoom();
      this.paintingRoom = new PaintingRoom();
      this.photoRoom = new PhotoRoom();
      this.soccerRoom = new SoccerRoom();
      this.objects = new Objects();
      this.apt = new Apt();
      this.camera = this.experience.camera;
      this.controls = new Controls();

      // Pagenation
      this.rooms = [];
      
      // Set rooms
      this.setRooms();

      // Handle zoom
    //   btnRoomZoom.addEventListener("click", () => {
    //     gsap.to(
    //       this.rooms[current_page - 1].getModel().position,
    //       {
    //         duration: 1,
    //         x: this.rooms[current_page - 1].getFramePosition().x,
    //         y: this.rooms[current_page - 1].getFramePosition().y,
    //         z: this.rooms[current_page - 1].getFramePosition().z,
    //         ease: "power2.inOut",
    //       },
    //       "same"
    //     );
    //     gsap.to(
    //       this.rooms[current_page - 1].getModel().rotation,
    //       {
    //         duration: 1,
    //         x: this.rooms[current_page - 1].getFrameRotation().x,
    //         y: this.rooms[current_page - 1].getFrameRotation().y,
    //         z: this.rooms[current_page - 1].getFrameRotation().z,
    //         ease: "power2.inOut",
    //       },
    //       "same"
    //     );
    //   });

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
              "/room/3c4ed563-14b9-4ccd-a8ab-a1e363bc7a99.JPG",
              "/room/d866285c-1edc-4f7f-ad18-0e629c94763f.jpg"
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
              "/room/4f42109d-1911-4e16-b2ef-14641813bf5b.JPG",
              "/room/e661e149-b87c-47a3-9c79-123ec7f95445.jpg"
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
            "/room/4f42109d-1911-4e16-b2ef-14641813bf5b.JPG",
            "/room/e661e149-b87c-47a3-9c79-123ec7f95445.jpg"
        ]
    }
    ]

    // for(const room of dummyJSON)
    // {
    //   switch (room.interestType) {
    //     case "READING":
    //       this.testRooms[`room` + room.id] = new ReadingRoom()
    //       break;
    //     case "PAINTING":
    //       this.testRooms[`room` + room.id] = new PaintingRoom()
    //       break;
    //     case "PHOTO":
    //       this.testRooms[`room` + room.id] = new PhotoRoom()
    //       break;
    //   }
    // }

    for(let i = 0; i < dummyJSON.length; i++)
    {
      switch (dummyJSON[i].interestType) {
        case "READING":
          this.rooms[i] = new ReadingRoom()
          break;
        case "PAINTING":
          this.rooms[i] = new PaintingRoom()
          break;
        case "PHOTO":
          this.rooms[i] = new PhotoRoom()
          break;
      }
    }
  }

  setRooms()
  {
    this.getRooms()

    let page_size = this.rooms.length;
    let current_page = 2;

    const pages = document.querySelectorAll(".room-page-wrapper>svg");

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
  }

  update() {}
}

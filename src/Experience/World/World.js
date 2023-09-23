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
      this.rooms = [this.readingRoom, this.paintingRoom, this.photoRoom];
      const pages = document.querySelectorAll(".room-page-wrapper>svg");
      const page_size = 3;
      let current_page = 2;

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

  update() {}
}

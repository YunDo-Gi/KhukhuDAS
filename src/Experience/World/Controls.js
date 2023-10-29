import * as THREE from "three";
import GSAP from "gsap";

import Experience from "../Experience.js";

const btnHome = document.querySelector(".btn-home");
const btnToRoom = document.querySelector(".btn-to-room");
const roomWrapper = document.querySelector(".room-wrapper");
const btnRoomZoom = document.querySelector(".btn-room-zoom");
const loginWrapper = document.querySelector(".login-wrapper");
const btnSubmit = document.querySelector(".btn-submit");
const views = document.querySelector(".views-wrapper");
const comments = document.querySelector(".comments-wrapper");
const btnRetunFromZoom = document.querySelector(".btn-return-from-zoom");
const likes = document.querySelector(".likes-wrapper");
const menu = document.querySelector(".select-menu");

let flag = false;
let returnable = false;

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.objects = this.experience.objects;
    this.renderer = this.experience.renderer;

    this.progress = 0;
    this.dummyVector = new THREE.Vector3(0, 0, 0);

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.position = new THREE.Vector3(0, 0, 0);
    this.lookAtPosition = new THREE.Vector3(0, 0, 0);

    this.directionalVector = new THREE.Vector3(0, 0, 0);
    this.staticVector = new THREE.Vector3(0, 1, 0);
    this.crossVector = new THREE.Vector3(0, 0, 0);

    this.setMain();

    // this.setPath()
    this.setScroll();
    

    btnToRoom.addEventListener("click", () => {
      GSAP.to(this.camera.orthographicCamera.position, {
        duration: 2,
        x: this.dummyVector.x,
        y: this.dummyVector.y,
        z: this.dummyVector.z,
        ease: "power2.inOut",
      });
      GSAP.to(this.camera.orthographicCamera.rotation, {
        duration: 2,
        y: -Math.PI,
        ease: "power2.inOut",
        onComplete: () => {
          btnToRoom.classList.add("hidden");
          flag = false;
          returnable = true;
          roomWrapper.classList.remove("hidden");
          likes.classList.remove("hidden");
          comments.classList.remove("hidden");
          views.classList.remove("hidden");
          menu.classList.remove("hidden");
          this.world.getHeart().scale.set(0.002, 0.002, 0.002);
        },
        // this.objects.move = false
      });
      this.renderer.setBG();
    });

    // 방 확대
    btnRoomZoom.addEventListener("click", () => {
      likes.classList.add("hidden");
      views.classList.add("hidden");
      comments.classList.add("hidden");
      menu.classList.add("hidden");
      // const camera = this.camera.orthographicCamera
      // GSAP.to(camera, {
      //     duration: 2,
      //     zoom: 8,
      //     ease: "power2.inOut",
      //     onUpdate: function () {
      //         camera.updateProjectionMatrix();
      //     },
      //     onComplete: () => {
      //         btnRetunFromZoom.classList.remove('hidden')
      //     }
      // })
      roomWrapper.classList.add("hidden");
    });

    btnRetunFromZoom.addEventListener("click", () => {
      const camera = this.camera.orthographicCamera;
      GSAP.to(camera, {
        duration: 2,
        zoom: 1,
        ease: "power2.inOut",
        onUpdate: function () {
          camera.updateProjectionMatrix();
        },
        onComplete: () => {
          menu.classList.remove("hidden");
          roomWrapper.classList.remove("hidden");
        },
      });
      btnRetunFromZoom.classList.add("hidden");
    });
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      window.removeEventListener("wheel", this.scrollOnceEvent);
      document.querySelector(".arrow-svg-wrapper").classList.add("hidden");
      GSAP.to( document.querySelector(".landing-wrapper"), {
        duration: 2,
        opacity: 0,
        ease: "power2.inOut", 
        onComplete: () => {
          document.querySelector(".landing-wrapper").remove();
          this.onWheel();
          this.toApt();
          btnToRoom.classList.remove("hidden");
        }
      });
      GSAP.to(this.camera.orthographicCamera.position, {
        duration: 2,
        x: this.position.x,
        y: this.position.y,
        z: this.position.z,
        ease: "power2.inOut",
      });
      GSAP.to(this.camera.orthographicCamera.rotation, {
        duration: 2,
        y: -Math.PI * 0.5,
        ease: "power2.inOut",
      });
    }
  }

  setMain() {
    this.scrollOnceEvent = this.onScroll.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
    flag = true;
  }

  setPath() {
    this.curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-5, 0, 0),
        new THREE.Vector3(0, 0, -5),
        new THREE.Vector3(5, 0, 0),
        new THREE.Vector3(0, 0, 5),
      ],
      true
    );

    const points = this.curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    const curveObject = new THREE.Line(geometry, material);
    this.scene.add(curveObject);
  }

  setScroll() {
    this.line = new THREE.LineCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 12, 0)
    );

    const points = this.line.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    const lineObject = new THREE.Line(geometry, material);
    this.scene.add(lineObject);
  }

  onWheel() {
    flag = true;

    window.addEventListener("wheel", (event) => {
      if (event.deltaY > 0) {
        this.lerp.target -= 0.02;
      } else {
        this.lerp.target += 0.02;
      }
    });
  }

  toApt() {
    btnHome.addEventListener("click", () => {
      if (returnable) {
        GSAP.to(this.camera.orthographicCamera.position, {
          duration: 2,
          x: this.position.x,
          y: this.position.y,
          z: this.position.z,
          ease: "power2.inOut",
        });
        returnable = false;
      }
      GSAP.to(this.camera.orthographicCamera.rotation, {
        duration: 2,
        y: -Math.PI * 0.5,
        ease: "power2.inOut",
      });
      // this.objects.move = false
      this.renderer.setBG();
      this.onWheel();
      btnToRoom.classList.remove("hidden");
      likes.classList.add("hidden");
      menu.classList.add("hidden");
      roomWrapper.classList.add("hidden");
    });
  }

  update() {
    if (flag) {
      this.lerp.current = GSAP.utils.interpolate(
        this.lerp.current,
        this.lerp.target,
        this.lerp.ease
      );

      const limit = 0.5;
      this.lerp.target = GSAP.utils.clamp(0, limit, this.lerp.target);
      this.lerp.current = GSAP.utils.clamp(0, limit, this.lerp.current);

      this.line.getPointAt(this.lerp.current % 1, this.position);
      this.camera.orthographicCamera.position.copy(this.position);
    }
  }
}

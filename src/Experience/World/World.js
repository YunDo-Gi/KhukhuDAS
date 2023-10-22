import * as THREE from "three";
import gsap from "gsap";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

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
const btnToRoom = document.querySelector(".btn-to-room");
const btnRetunFromZoom = document.querySelector('.btn-return-from-zoom')
const likes = document.querySelector('.likes-wrapper')
const iframeWrapper = document.querySelector('.iframe-wrapper')
const rightArrow = document.querySelector('.arrow-wrapper-right')
const leftArrow = document.querySelector('.arrow-wrapper-left') 

// drop down menu
const optionMenu = document.querySelector(".select-menu")
const selectBtn = optionMenu.querySelector(".select-btn")
const options = optionMenu.querySelectorAll(".option")
const sBtn_text = optionMenu.querySelector(".sBtn-text")

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"))

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
  "id": 1,
  "title": "내방",
  "content": "이쁘지?",
  "interestType": "READING",
  "writer": {
      "memberId": 1,
      "nickname": "마팅",
      "profileImgURL": null
  },
  "commentCount": 0,
  "createdDateTime": "2023-09-13T17:04:51.669563",
  "modifiedDateTime": "2023-09-13T17:04:51.668273",
  "viewCount": 0,
  "likeCount": 0,
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
    "background/game_bg.png",
    "background/basic_bg.png",
    "background/game_bg.png"
  ]
}
]
let dummyJSON2 = [
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
  "id": 1,
  "title": "내방",
  "content": "이쁘지?",
  "interestType": "READING",
  "writer": {
      "memberId": 1,
      "nickname": "마팅",
      "profileImgURL": null
  },
  "commentCount": 0,
  "createdDateTime": "2023-09-13T17:04:51.669563",
  "modifiedDateTime": "2023-09-13T17:04:51.668273",
  "viewCount": 0,
  "likeCount": 0,
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
    "background/basic_bg.png",
    "background/game_bg.png"
  ]
}
]

let settingDone = false
let current_page = 1;
let pages = null


export default class World extends EventEmitter {
  constructor() {
    super();

    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.renderer = this.experience.renderer;
    this.time = this.experience.time

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

      this.heart = null
      this.setHeart()
      
      // Set rooms
      this.setRooms()
      settingDone = true
      // this.fillApt();

      // Set Iframe
      // this.setIframe();
      

      
      // this.text = null
      // this.setText()

      // Set GUI
      // const gui = new dat.GUI()
      // gui.add(this.apts[3].getModel().position, 'x')
      // gui.add(this.apts[3].getModel().position, 'y')
      // gui.add(this.apts[3].getModel().position, 'z')

      options.forEach(option =>{
        option.addEventListener("click", ()=>{
            let selectedOption = option.querySelector(".option-text").innerText;
            sBtn_text.innerText = selectedOption;
            optionMenu.classList.remove("active");

            let api = null

            for(let room of this.rooms)
            {
              this.scene.remove(room.getModel())
              document.querySelector('.room-page-wrapper').removeChild(document.querySelector('.room-page-wrapper').lastChild)
            }

            // API 호출
            let data = null
            switch (selectedOption) {
              case "VIEW":
                console.log("view")
                // data = api
                break;
              case "LIKE":
                console.log("like")
                // data = api
                break;
              case "CHRONOLOGICAL":
                console.log("chrono")
                // data = api
                break;
            }
            current_page = 1;
            this.getRooms(dummyJSON2) // data
            this.rooms[current_page - 1].getModel().scale.copy(this.rooms[current_page - 1].getScale());
            this.rooms[current_page - 1].getModel().position.copy(this.rooms[current_page - 1].getCenterPosition())
            this.rooms[current_page - 1].setBackground()
            pages = document.querySelectorAll(".room-page-wrapper>span>svg")
        });
    });
      

      this.trigger("worldReady");
    });
  }

  getRooms(data) {
    for(let i = 0; i < data.length; i++)
    {
      switch (data[i].interestType) {
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
      this.rooms[i].setLikes(data[i].likeCount)
      this.setFrames(this.rooms[i].frames, data[i].fileURLs)
      this.addRoomIcon(i)
    }
  }

  setApts(data) 
  {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    for(let i = 0; i < data.length; i++)
    {
      let randNum = Math.floor(Math.random() * arr.length)
      let index = arr.slice(randNum, randNum + 1)
      arr.splice(randNum, 1)
      switch (data[i].interestType) {
        case "READING":
          this.apts[i] = new ReadingRoom()
          this.apts[i].getModel().position.set(this.apt.getAptPositionsReading(index).x, this.apt.getAptPositionsReading(index).y, this.apt.getAptPositionsReading(index).z)
          break;
        case "PAINTING":
          this.apts[i] = new PaintingRoom()
          this.apts[i].getModel().position.set(this.apt.getAptPositionsPainting(index).x, this.apt.getAptPositionsPainting(index).y, this.apt.getAptPositionsPainting(index).z)
          break;
        case "PHOTO":
          this.apts[i] = new PhotoRoom()
          this.apts[i].getModel().position.set(this.apt.getAptPositionsPhoto(index).x, this.apt.getAptPositionsPhoto(index).y, this.apt.getAptPositionsPhoto(index).z)
          break;
      }
      this.setFrames(this.apts[i].frames, data[i].fileURLs)
      this.apts[i].getModel().rotation.set(0, Math.PI * 0.5, 0)
      this.apts[i].getModel().scale.copy(this.apts[i].getAptScale())
    }
  }

  setRooms()
  {
    if(!settingDone)
    {
      this.getRooms(dummyJSON) // 디폴트로 받아오는 데이터
      this.setApts(dummyJSON) // 디폴트로 받아오는 데이터
    } 

    let page_size = this.rooms.length;

    pages = document.querySelectorAll(".room-page-wrapper>span>svg")

    btnToRoom.addEventListener("click", () => {
      this.rooms[current_page - 1].setBackground();
    })

    likes.innerHTML = this.rooms[current_page - 1].getLikes()


    // Handle page navigation

    this.rooms[current_page - 1]
    .getModel()
    .scale.copy(this.rooms[current_page - 1].getScale());
  this.rooms[current_page - 1]
    .getModel()
    .position.copy(this.rooms[current_page - 1].getCenterPosition());

  rightArrow
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
            likes.innerHTML = this.rooms[current_page - 1].getLikes()
          },
        });
      }
    });

  leftArrow
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
            likes.innerHTML = this.rooms[current_page - 1].getLikes()
          },
        });
      }
    });

    // 방 확대 시 이동 및 회전
    btnRoomZoom.addEventListener("click", () => {
      gsap.to(
        this.rooms[current_page - 1].getModel().rotation,
        {
          duration: 2,
          y: 0,
          ease: 'power2.inOut',
          onComplete: () => {
            iframeWrapper.classList.remove('hidden')
          }
        })
      gsap.to(
        this.rooms[current_page - 1].getModel().position,
        {
          duration: 2,
          x: -0.31,
          y: -1.65,
          ease: 'power2.inOut',
        })
        this.heart.scale.set(0, 0, 0)
        likes.classList.add('hidden')
    });

    btnRetunFromZoom.addEventListener("click", () => {
      gsap.to(
        this.rooms[current_page - 1].getModel().rotation,
        {
          duration: 2,
          x: -Math.PI * 0.1,
          y: Math.PI * 0.25,
          ease: 'power2.inOut'   
        })
      gsap.to(
        this.rooms[current_page - 1].getModel().position,
        {
          duration: 2,
          x: this.rooms[current_page - 1].getCenterPosition().x,
          y: this.rooms[current_page - 1].getCenterPosition().y,
          ease: 'power2.inOut',
          onComplete: () => {
            likes.classList.remove('hidden')
            this.heart.scale.set(0.002, 0.002, 0.002);
          }
        })
      iframeWrapper.classList.add('hidden')
    });

    // const gui = new dat.GUI()
    // gui.add(this.rooms[current_page - 1].getModel().position, 'x')
    // gui.add(this.rooms[current_page - 1].getModel().position, 'y')
    // gui.add(this.rooms[current_page - 1].getModel().position, 'z')
    // gui.add(this.rooms[current_page - 1].getModel().rotation, 'x')
    // gui.add(this.rooms[current_page - 1].getModel().rotation, 'y')
    // gui.add(this.rooms[current_page - 1].getModel().rotation, 'z')
  }

  setFrames(frame, data)
  {
    for(let j = 0; j < Math.min(data.length, frame.length); j++)
    {
      frame[j].material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(data[j]) })
    }
  }

  fillApt(scale) {
    this.apts[i].getModel().position.set(this.apt.getAptPositions(i).x, this.apt.getAptPositions(i).y, this.apt.getAptPositions(i).z)
    this.apts[i].getModel().rotation.set(0, Math.PI * 0.5, 0)
    this.apts[i].getModel().scale.copy(this.apts[i].getAptScale())
  }

  addRoomIcon(turn)
  {
    let newDiv = document.createElement('span')
    newDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M446.667-163.666V-461L186.666-611.334V-314l260.001 150.334Zm66.666 0L773.334-314v-298L513.333-461.108v297.442ZM480-518l256.334-149L480-815.334 222.999-667 480-518ZM153.333-256q-15.833-9.284-24.583-24.475-8.75-15.192-8.75-33.191v-332.668q0-17.999 8.75-33.191 8.75-15.191 24.583-24.475l293.334-169q15.885-9 33.442-9 17.558 0 33.224 9l293.334 169q15.833 9.284 24.583 24.475 8.75 15.192 8.75 33.191v332.668q0 17.999-8.75 33.191-8.75 15.191-24.583 24.475L513.333-87q-15.885 9-33.442 9-17.558 0-33.224-9L153.333-256ZM480-480Z"/></svg>`
    if(turn === 0) newDiv.innerHTML = `<svg class = "selected" xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M446.667-163.666V-461L186.666-611.334V-314l260.001 150.334Zm66.666 0L773.334-314v-298L513.333-461.108v297.442ZM480-518l256.334-149L480-815.334 222.999-667 480-518ZM153.333-256q-15.833-9.284-24.583-24.475-8.75-15.192-8.75-33.191v-332.668q0-17.999 8.75-33.191 8.75-15.191 24.583-24.475l293.334-169q15.885-9 33.442-9 17.558 0 33.224 9l293.334 169q15.833 9.284 24.583 24.475 8.75 15.192 8.75 33.191v332.668q0 17.999-8.75 33.191-8.75 15.191-24.583 24.475L513.333-87q-15.885 9-33.442 9-17.558 0-33.224-9L153.333-256ZM480-480Z"/></svg>`
    document.querySelector('.room-page-wrapper').appendChild(newDiv)
  }

  addIframe(src)
  {
    let newIframe = document.createElement('iframe')
    newIframe.src = src
    iframeWrapper.appendChild(newIframe)
  }

  setIframe()
  {
    let root = new THREE.Object3D()
    root.position.set(0, 0, -8)
    this.scene.add(root)

    let test = this.makeIframeObject(1, 1)
    test.rotation.set(0, Math.PI * 0.25, 0)
    test.css3dObject.element.textContent = "I am an HTML <div> element mixed into the WebGL scene. This text is editable!"
    test.css3dObject.element.style.opacity = "1"
    test.css3dObject.element.style.background = "tomato"

    root.add(test)
  }

  setHeart()
  {
    const heartX = -25;
    const heartY = -25;
    const heartShape = new THREE.Shape();
    heartShape.moveTo(25 + heartX, 25 + heartY);
    heartShape.bezierCurveTo(25 + heartX, 25 + heartY, 20 + heartX, 0 + heartY, 0 + heartX, 0 + heartY);
    heartShape.bezierCurveTo(-30 + heartX, 0 + heartY, -30 + heartX, 35 + heartY, -30 + heartX, 35 + heartY);
    heartShape.bezierCurveTo(-30 + heartX, 55 + heartY, -10 + heartX, 77 + heartY, 25 + heartX, 95 + heartY);
    heartShape.bezierCurveTo(60 + heartX, 77 + heartY, 80 + heartX, 55 + heartY, 80 + heartX, 35 + heartY);
    heartShape.bezierCurveTo(80 + heartX, 35 + heartY, 80 + heartX, 0 + heartY, 50 + heartX, 0 + heartY);
    heartShape.bezierCurveTo(35 + heartX, 0 + heartY, 25 + heartX, 25 + heartY, 25 + heartX, 25 + heartY);

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

    const geometryHeart = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    this.heart = new THREE.Mesh(geometryHeart, materialRed);

    this.heart.position.set(0.1, 1.7, 8)
    this.heart.rotation.set(Math.PI, 0, 0)

    this.heart.scale.set(0, 0, 0)

    this.scene.add(this.heart);
  }

  setText()
  {
    const fontLoader = new FontLoader()

    fontLoader.load(
        '/fonts/helvetiker_regular.typeface.json',
        (font) =>
        {
          const textGeometry = new TextGeometry(
            'Hello Three.js',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
          )
          textGeometry.computeBoundingBox()
          textGeometry.center()

          const textMaterial = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true})
          this.text = new THREE.Mesh(textGeometry, textMaterial)

          this.text.position.set(0, -1, 8)
          this.text.rotation.set(0, Math.PI * 0.25, 0)

          this.scene.add(this.text)

          const gui = new dat.GUI()
          gui.add(this.text.position, 'x')
          gui.add(this.text.position, 'y')
          gui.add(this.text.position, 'z')
          gui.add(this.text.rotation, 'x')
          gui.add(this.text.rotation, 'y')
          gui.add(this.text.rotation, 'z')
        }
    )
  }

  makeIframeObject(width, height) {
    const obj = new THREE.Object3D

    // const element = document.createElement('iframe');
    // this.iframe.src = [ './views/login.html' ];
    
    const element = document.createElement('div');
    element.width = width + 'px'
    element.height = height + 'px'

    let css3dObject = new CSS3DObject( element );
    obj.css3dObject = css3dObject
    obj.add(css3dObject)

    // make an invisible plane for the DOM element to chop
    // clip a WebGL geometry with it.
    var material = new THREE.MeshPhongMaterial({
        opacity	: 0.15,
        color	: new THREE.Color( 0xfafafa ),
        blending: THREE.NoBlending,
        // side	: THREE.DoubleSide,
    });
    var geometry = new THREE.BoxGeometry( width, height, 0.1 );
    var mesh = new THREE.Mesh( geometry, material );
    obj.add( mesh );

    return obj
  }

  getHeart()
  {
    return this.heart
  }

  update() 
  {
    if(this.heart)
    {
      gsap.to(this.heart.rotation, {
        duration: 0.1,
        y: this.heart.rotation.y + 0.04,
        ease: 'power2.inOut'
      }, "same")
      gsap.to(this.heart.position, {
        duration: 0.1,
        y: Math.abs(Math.sin( this.time.elapsed / 1000)) * 0.05 + 1.7,
        ease: "power2.inOut" 
      }, "same")
    }
  }
}



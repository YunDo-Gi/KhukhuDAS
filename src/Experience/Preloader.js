import * as THREE from 'three'
import GSAP from 'gsap'

import EventEmitter from './Utils/EventEmitter.js'
import Experience from './Experience.js'

export default class Preloader extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.resources = this.experience.resources
        this.camera = this.experience.camera
        this.world = this.experience.world

        this.world.on('worldReady', () => {
            // this.setSources()
            this.playIntro()
        })
    }

    setSources()
    {
        this.room = this.world.readingRoom.getModel()
        this.paintingRoom = this.world.paintingRoom.getModel()
        this.roomChildren = this.world.readingRoom.getRoomChildren()
        // this.cubes = filterObjectsByString(this.roomChildren, 'cube')
        // console.log(this.cubes)
    }

    firstIntro()
    {
        // 클릭 시 바로 실행되지 않게 하기 위함
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline()

            this.timeline.to(".preloader", {
                opacity: 0,
                onComplete: () => {
                    document.querySelector('.preloader').classList.add('hidden')
                }
            })
        })
            
        
    }

    // popUp()
    // {
    //     return new Promise((resolve) => {
    //         this.popUpTimeline = new GSAP.timeline()

    //         // 그룹핑 작업은 추후에 진행
    //         for (const obj in this.roomChildren)
    //         {
    //             console.log(this.roomChildren[obj].name)
    //             this.popUpTimeline.to(this.roomChildren[obj].scale, {
    //                 duration: 0.1,
    //                 x: 1,
    //                 y: 1,
    //                 z: 1,
    //                 ease: 'back.out(2.5)'
    //             })
    //         }
    //     })
    // }

    async playIntro()
    {
        await this.firstIntro()
        // const clickHandler = () => {
        //     this.playSecondIntro()
        //     window.removeEventListener('click', clickHandler)
        // }
        // window.addEventListener('click', clickHandler)
    }

    // async playSecondIntro()
    // {
    //     await this.secondIntro()
    //     await this.playPopUp()
    //     // this.setButtons()
    // }

    // playPopUp()
    // {
    //     this.popUp()
    // }
}

// 함수
function filterObjectsByString(obj, str) {
    const result = {};
    for (const key in obj) {
      if (key.includes(str)) {
        result[key] = obj[key];
      }
    }
    return result;
  }
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
            this.setSources()
            this.playIntro()
        })
    }

    setSources()
    {
        this.room = this.world.readingRoom.getModel()
        this.roomChildren = this.world.readingRoom.getRoomChildren()
        console.log(this.roomChildren)
        // this.cubes = filterObjectsByString(this.roomChildren, 'cube')
        // console.log(this.cubes)
    }

    firstIntro()
    {
        // 클릭 시 바로 실행되지 않게 하기 위함
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline()

            this.timeline.to(this.world.cube.getCube().scale, {
                duration: 1,
                x: 1.4,
                y: 1.4,
                z: 1.4,
                ease: 'back.out(2.5)'
            }).to(this.world.cube.getCube().position, {
                duration: 1,
                z: 4,
                ease: 'power1.out',
                onComplete: resolve
            })
        })
            
        
    }

    async secondIntro()
    {
        return new Promise((resolve) => {
            this.secondTimeline = new GSAP.timeline()

            this.secondTimeline.to(this.world.cube.getCube().position, {
                duration: 1,
                z: 0,
                ease: 'power1.out'
            }, "same").to(this.world.cube.getCube().rotation, {
                y: 2 * Math.PI + Math.PI * 0.25,
            }, "same").to(this.world.cube.getCube().scale, {
                x: 4,
                y: 4,
                z: 4
            }, "same").to(this.world.cube.getCube().position, {
                y: 3.5
            }, "same").to(this.world.cube.getCube().scale, {
                x: 0,
                y: 0,
                z: 0,
                onComplete: resolve
            })
        })
    }

    popUp()
    {
        return new Promise((resolve) => {
            this.popUpTimeline = new GSAP.timeline()
        
            // this.room.children.forEach(child => {
            //     if(child instanceof THREE.Mesh)
            //     {
            //         this.popUpTimeline.to(child.scale, {
            //             duration: 1,
            //             x: 1,
            //             y: 1,
            //             z: 1,
            //             ease: 'back.out(2.5)'
            //           });
            //     }
            //     else
            //     {
            //         child.children.forEach(mesh => {
            //             {
            //                 this.popUpTimeline.to(mesh.scale, {
            //                     duration: 0.1,
            //                     x: 1,
            //                     y: 1,
            //                     z: 1,
            //                     ease: 'back.out(2.5)'
            //                 })
            //             }
            //         })
            //     }
            //   });

            // for (const obj in this.world.getPainting().childern)
            // {
            //     this.popUpTimeline.to(this.world.getPainting().childern.scale, {
            //         duration: 0.1,
            //         x: 1,
            //         y: 1,
            //         z: 1,
            //         ease: 'back.out(2.5)'
            //     })
            // }

            // 그룹핑 작업은 추후에 진행
            for (const obj in this.roomChildren)
            {
                console.log(this.roomChildren[obj].name)
                this.popUpTimeline.to(this.roomChildren[obj].scale, {
                    duration: 0.1,
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.5)'
                })
            }
        })
    }

    async playIntro()
    {
        await this.firstIntro()
        const clickHandler = () => {
            this.playSecondIntro()
            window.removeEventListener('click', clickHandler)
        }
        window.addEventListener('click', clickHandler)
    }

    async playSecondIntro()
    {
        await this.secondIntro()
        await this.playPopUp()
        // this.setButtons()
    }

    playPopUp()
    {
        this.popUp()
    }

    // setButtons()
    // {
    //     this.buttonTimeline = new GSAP.timeline()

    //     document.getElementsByClassName("is-next")[0].addEventListener("click", () => {
    //         console.log("next-clicked")
    //         this.buttonTimeline.to(this.camera.instance.position, {duration: 1, x: this.camera.instance.position.x - 100, ease: "power2.inOut"})
    //     })
        
    //     document.getElementsByClassName("inner")[0].addEventListener("click", () => {
    //         console.log("mid-clicked")
    //         if(this.camera.instance.position != this.world.readingRoom.getFramePosition())
    //         {
    //             this.buttonTimeline.to(this.camera.instance.position, {
    //                 duration: 1, 
    //                 x: 3,
    //                 y: 3,
    //                 z: 1,
    //                 ease: "power2.inOut"})
    //         }
    //         console.log(this.camera.instance.position)
    //         console.log(this.world.readingRoom.getFramePosition())
    //     })
        
    //     document.getElementsByClassName("is-previous")[0].addEventListener("click", () => {
    //         console.log("previous-clicked")
    //         this.buttonTimeline.to(this.camera.instance.position, {duration: 1, x: this.camera.instance.position.x - 100, ease: "power2.inOut"})
    //     })
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
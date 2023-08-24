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
        this.room = this.world.painting.getModel()
        this.roomChildren = this.world.painting.getRoomChildren()
        console.log(this.roomChildren)
    }

    firstIntro()
    {
        this.timeline = new GSAP.timeline()

        this.timeline.to(this.world.cube.getCube().scale, {
            duration: 1,
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: 'back.out(2.5)'
        }).to(this.room.position, {
            duration: 1,
            x: -1,
            ease: 'power1.out'
        })
    }

    playIntro()
    {
        this.firstIntro()
    }
}
import * as THREE from 'three'
import gsap from 'gsap'

import Experience from '../Experience.js'
import EventEmitter from '../Utils/EventEmitter.js'

export default class Objects
{
    constructor() 
    {

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Setup
        this.bookObj = this.resources.items.bookObject.scene
        this.cameraObj = this.resources.items.cameraObject.scene
        this.eizelObj = this.resources.items.eizelObject.scene
        this.gameObj = this.resources.items.gameObject.scene
        this.lampObj = this.resources.items.lampObject.scene
        this.paintingObj = this.resources.items.paintObject.scene
        this.soccerObj = this.resources.items.soccerObject.scene

        this.objects = [this.bookObj, this.cameraObj, this.eizelObj, this.gameObj, this.lampObj, this.paintingObj, this.soccerObj]


        this.setObjects()
    }

    setObjects()
    {
        for (const obj in this.objects)
        {
            this.objects[obj].scale.set(0.004, 0.004, 0.004)
            this.objects[obj].position.set(-10, 0, Math.random() * (this.sizes.aspectRatio * this.sizes.frustumSize) - (this.sizes.aspectRatio * this.sizes.frustumSize) / 2)
            this.objects[obj].rotation.x = Math.PI * Math.random()
            this.objects[obj].rotation.y = Math.PI * 0.25
            this.objects[obj].rotation.z = Math.PI * Math.random()
            this.scene.add(this.objects[obj])
        }
    }

    update()
    {
        // Animate objects
        gsap.to(this.objects[0].position, {duration: 0.1, y: Math.sin( this.time.elapsed / 1000) * 2 - 2, ease: "power2.inOut"})
        gsap.to(this.objects[1].position, {duration: 0.1, y: Math.sin( this.time.elapsed / 1000 + Math.PI / 5) * 2 - 2, ease: "power2.inOut"})
        gsap.to(this.objects[2].position, {duration: 0.1, y: Math.sin( this.time.elapsed / 1000 + Math.PI / 3) * 2 - 2, ease: "power2.inOut"})
        gsap.to(this.objects[3].position, {duration: 0.1, y: Math.sin( this.time.elapsed / 1000 + Math.PI / 2) * 2 - 2, ease: "power2.inOut"})
        gsap.to(this.objects[4].position, {duration: 0.1, y: Math.sin( this.time.elapsed / 1000 + Math.PI / 1.5) * 2 - 2, ease: "power2.inOut"})
        gsap.to(this.objects[5].position, {duration: 0.1, y: Math.sin( this.time.elapsed / 1000 + Math.PI / 1.2) * 2 - 2, ease: "power2.inOut"})
        gsap.to(this.objects[6].position, {duration: 0.1, y: Math.sin( this.time.elapsed / 1000 + Math.PI / 1.1) * 2 - 2, ease: "power2.inOut"})
    }
}
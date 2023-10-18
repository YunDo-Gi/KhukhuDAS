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

        this.move = true

        // Setup
        this.bookObj = this.resources.items.bookObject.scene
        this.cameraObj = this.resources.items.cameraObject.scene
        this.eizelObj = this.resources.items.eizelObject.scene
        this.gameObj = this.resources.items.gameObject.scene
        this.lampObj = this.resources.items.lampObject.scene
        this.paintingObj = this.resources.items.paintObject.scene
        this.soccerObj = this.resources.items.soccerObject.scene

        // Set rotation
        this.bookObj.rotation.set(Math.PI * 0.3, Math.PI, Math.PI * 0.25)
        this.cameraObj.rotation.set(Math.PI * 0.3, Math.PI, Math.PI * 0.25)
        this.eizelObj.rotation.set(Math.PI * 0.1, Math.PI, Math.PI * 0.25)
        this.gameObj.rotation.set(Math.PI * 0.3, Math.PI, Math.PI * 0.25)
        this.lampObj.rotation.set(Math.PI * 0.3, Math.PI, Math.PI * 0.25)
        this.paintingObj.rotation.set(Math.PI * 0.3, Math.PI, Math.PI * 0.25)
        this.soccerObj.rotation.set(Math.PI * 0.3, Math.PI, Math.PI * 0.25)


        this.objects = [this.bookObj, this.cameraObj, this.eizelObj, this.gameObj, this.lampObj, this.paintingObj, this.soccerObj]


        this.setObjects()
    }

    setObjects()
    {
        let randNum = 0.1
        for (const obj in this.objects)
        {
            if(this.objects[obj] == this.objects[2]) this.objects[obj].scale.set(0.2, 0.2, 0.2)
            else this.objects[obj].scale.set(0.004, 0.004, 0.004)
            this.objects[obj].position.set(randNum * (this.sizes.aspectRatio * this.sizes.frustumSize) - (this.sizes.aspectRatio * this.sizes.frustumSize) / 2 - 0.5, 0, -8)
            this.scene.add(this.objects[obj])
            randNum += 0.145
        }
    }

    update()
    {
        // Animate objects
        if(this.move)
        {
            gsap.to(this.objects[0].position, {duration: 0.1, y: Math.sin( this.time.elapsed / 1000) * 2 - 2, ease: "power2.inOut"}, "same")
            gsap.to(this.objects[1].position, {duration: 0.1, y: Math.sin( this.time.elapsed / 1000 + Math.PI / 1.2) * 2 - 2, ease: "power2.inOut"}, "same")
            gsap.to(this.objects[2].position, {duration: 0.1, y: Math.sin( this.time.elapsed / 1000 + Math.PI / 3) * 2 - 2, ease: "power2.inOut"}, "same")
            gsap.to(this.objects[3].position, {duration: 0.1, y: Math.sin( this.time.elapsed / 1000 + Math.PI / 1.1) * 2 - 2, ease: "power2.inOut"}, "same")
            gsap.to(this.objects[4].position, {duration: 0.1, y: Math.sin( this.time.elapsed / 1000 + Math.PI / 1.5) * 2 - 2, ease: "power2.inOut"}, "same")
            gsap.to(this.objects[5].position, {duration: 0.1, y: Math.sin( this.time.elapsed / 1000 + Math.PI / 5) * 2 - 2, ease: "power2.inOut"}, "same")
            gsap.to(this.objects[6].position, {duration: 0.1, y: Math.sin( this.time.elapsed / 1000 + Math.PI / 2) * 2 - 2, ease: "power2.inOut"}, "same")
        }   
    }
}
import * as THREE from 'three'
import gsap from 'gsap'

import Experience from '../Experience.js'
import EventEmitter from '../Utils/EventEmitter.js'

export default class Objects
{
    constructor() 
    {

        this.experience = new Experience()
        this.renderer = this.experience.renderer
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resource = this.resources.items.AptModel

        // Setup
        this.model = this.resource.scene
        console.log(this.model)
        this.model.position.set(1, 5, 1)
        this.model.scale.set(100, 100, 100)

        this.scene.add(this.model)
    }

    update()
    {

    }
}
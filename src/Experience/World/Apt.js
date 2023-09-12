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
        this.cube = new THREE.Mesh(new THREE.BoxGeometry(1, 5, 1), new THREE.MeshBasicMaterial({color: 0xff0000}))
        this.scene.add(this.cube)

        this.cube.position.set(5, 0, 0)
        


        this.setObjects()
    }

    setObjects()
    {

    }

    update()
    {

    }
}
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
        this.model.position.set(7, -16.5, 0)
        this.model.scale.set(0.003, 0.003, 0.003)
        this.model.rotation.set(0, Math.PI * 0.5, 0)

        // 현빈님 모델 기준
        this.aptPositions = [
            new THREE.Vector3(7, 4.2, -3.3), new THREE.Vector3(7, 4.2, 0), new THREE.Vector3(7, 4.2, 3.3),
            new THREE.Vector3(7, 1, -3.3), new THREE.Vector3(7, 1, 0), new THREE.Vector3(7, 1, 3.3),
            new THREE.Vector3(7, -2.3, -3.3), new THREE.Vector3(7, -2.3, 0), new THREE.Vector3(7, -2.3, 3.3)
        ]

        
        this.scene.add(this.model)
    }

    getAptPositions(i)
    {
        return this.aptPositions[i]
    }

    update()
    {

    }
}
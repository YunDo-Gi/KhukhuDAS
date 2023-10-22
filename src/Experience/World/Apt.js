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
        this.sizes = this.experience.sizes
        this.resources = this.experience.resources

        this.resource = this.resources.items.AptModel

        // Setup
        this.model = this.resource.scene
        this.model.position.set(7, -16.5, 0)
        // const screenScale = this.sizes.width * 0.0000015
        // this.model.scale.set(screenScale, screenScale, screenScale)
        this.model.scale.set(0.003, 0.003, 0.003)
        this.model.rotation.set(0, Math.PI * 0.5, 0)

        // 현빈님 모델 기준
        this.aptPositionsReading = [
            new THREE.Vector3(7, 4.2, -3.3), new THREE.Vector3(7, 4.2, 0), new THREE.Vector3(7, 4.2, 3.3),
            new THREE.Vector3(7, 1, -3.3), new THREE.Vector3(7, 1, 0), new THREE.Vector3(7, 1, 3.3),
            new THREE.Vector3(7, -2.3, -3.3), new THREE.Vector3(7, -2.3, 0), new THREE.Vector3(7, -2.3, 3.3)
        ]

        this.aptPositionsPainting = [
            new THREE.Vector3(8.5, 4.2, -1.7), new THREE.Vector3(8.5, 4.2, 1.6), new THREE.Vector3(8.5, 4.2, 4.9),
            new THREE.Vector3(8.5, 1, -1.7), new THREE.Vector3(8.5, 1, 1.6), new THREE.Vector3(8.5, 1, 4.9),
            new THREE.Vector3(8.5, -2.3, -1.7), new THREE.Vector3(8.5, -2.3, 1.6), new THREE.Vector3(8.5, -2.3, 4.9)
        ]

        this.aptPositionsPhoto = [
            new THREE.Vector3(6.9, 4.2, -3.3), new THREE.Vector3(6.9, 4.2, 0), new THREE.Vector3(6.9, 4.2, 3.3),
            new THREE.Vector3(6.9, 1, -3.3), new THREE.Vector3(6.9, 1, 0), new THREE.Vector3(6.9, 1, 3.3),
            new THREE.Vector3(6.9, -2.3, -3.3), new THREE.Vector3(6.9, -2.3, 0), new THREE.Vector3(6.9, -2.3, 3.3)
        ]

        this.scene.add(this.model)
    }

    getAptPositionsReading(i)
    {
        return this.aptPositionsReading[i]
    }

    getAptPositionsPainting(i)
    {
        return this.aptPositionsPainting[i]
    }

    getAptPositionsPhoto(i)
    {
        return this.aptPositionsPhoto[i]
    }

    update()
    {

    }
}
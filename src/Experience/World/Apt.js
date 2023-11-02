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
        this.model.position.set(7, -2.3, 0)
        // const screenScale = this.sizes.width * 0.0000015
        // this.model.scale.set(screenScale, screenScale, screenScale)
        this.model.scale.set(0.0031, 0.0031, 0.0031)
        this.model.rotation.set(0, Math.PI * 0.5, 0)

        // 현빈님 모델 기준
        this.aptPositionsReading = [
            new THREE.Vector3(7, 4.6, -3.4), new THREE.Vector3(7, 4.6, 0), new THREE.Vector3(7, 4.6, 3.4),
            new THREE.Vector3(7, 1.2, -3.4), new THREE.Vector3(7, 1.2, 0), new THREE.Vector3(7, 1.2, 3.4),
            new THREE.Vector3(7, -2.2, -3.4), new THREE.Vector3(7, -2.2, 0), new THREE.Vector3(7, -2.2, 3.4)
        ]

        this.aptPositionsPainting = [
            new THREE.Vector3(8.5, 4.55, -1.8), new THREE.Vector3(8.5, 4.55, 1.6), new THREE.Vector3(8.5, 4.55, 5),
            new THREE.Vector3(8.5, 1.15, -1.8), new THREE.Vector3(8.5, 1.15, 1.6), new THREE.Vector3(8.5, 1.15, 5),
            new THREE.Vector3(8.5, -2.2, -1.8), new THREE.Vector3(8.5, -2.2, 1.6), new THREE.Vector3(8.5, -2.2, 5)
        ]

        this.aptPositionsPhoto = [
            new THREE.Vector3(7, 4.55, -3.4), new THREE.Vector3(7, 4.55, 0), new THREE.Vector3(7, 4.55, 3.4),
            new THREE.Vector3(7, 1.2, -3.4), new THREE.Vector3(7, 1.2, 0), new THREE.Vector3(7, 1.2, 3.4),
            new THREE.Vector3(7, -2.2, -3.4), new THREE.Vector3(7, -2.2, 0), new THREE.Vector3(7, -2.2, 3.4)
        ]

        this.aptPositionsExercise = [
            new THREE.Vector3(8.6, 6, -2.75), new THREE.Vector3(8.6, 6, 0.64), new THREE.Vector3(8.6, 6, 4),
            new THREE.Vector3(8.6, 2.68, -2.75), new THREE.Vector3(8.6, 2.68, 0.64), new THREE.Vector3(8.6, 2.68, 4),
            new THREE.Vector3(8.6, -0.75, -2.75), new THREE.Vector3(8.6, -0.75, 0.64), new THREE.Vector3(8.6, -0.75, 4)
        ]

        this.aptPositionsGaming = [
            new THREE.Vector3(7.3, 6.3, -3.62), new THREE.Vector3(7.3, 6.3, -0.24), new THREE.Vector3(7.3, 6.3, 3.1),
            new THREE.Vector3(7.3, 2.9, -3.62), new THREE.Vector3(7.3, 2.9, -0.24), new THREE.Vector3(7.3, 2.9, 3.1),
            new THREE.Vector3(7.3, -0.5,-3.62), new THREE.Vector3(7.3, -0.5, -0.24), new THREE.Vector3(7.3, -0.5, 3.1)
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

    getAptPositionsExercise(i)
    {
        return this.aptPositionsExercise[i]
    }

    getAptPositionsGaming(i)
    {
        return this.aptPositionsGaming[i]
    }

    update()
    {

    }
}
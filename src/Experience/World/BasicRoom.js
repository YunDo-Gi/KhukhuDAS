import * as THREE from 'three'

import Experience from '../Experience.js'
import Room from './Room.js'

export default class BasicRoom extends Room
{
    constructor() 
    {
        super()
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer
        this.resources = this.experience.resources

        // Setup
        this.resource = this.resources.items.BasicRoomModel
        this.background = 'background/basic_bg.png';
        this.framePosition = null

        this.centerPosition = new THREE.Vector3(0.47, 0.26, 9)
        this.rightPosition = new THREE.Vector3(8.47, -1, 8)
        this.leftPosition = new THREE.Vector3(-7.53, -1, 8)
        this.scale = new THREE.Vector3(0.00205, 0.00205, 0.00205)

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene


        this.model.scale.set(0, 0, 0)
        this.model.rotation.y = Math.PI * 0.25
        this.model.rotation.x = -Math.PI * 0.1

        this.scene.add(this.model)
    }
}
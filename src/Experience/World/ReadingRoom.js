import * as THREE from 'three'

import Experience from '../Experience.js'

export default class ReadingRoom
{
    constructor() 
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Setup
        this.resource = this.resources.items.ReadingRoomModel
        this.roomChildren = {}
        this.framePosition = null

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        console.log(this.model.children[0].name)

        // this.model.scale.set(0.2, 0.2, 0.2)
        this.model.scale.set(0, 0, 0)
        this.model.position.set(-0.8, -0.8, 8)
        this.model.rotation.y = Math.PI * 0.25
        this.model.rotation.x = -Math.PI * 0.1

        this.scene.add(this.model)
    }

    getModel()
    {
        return this.model
    }
}
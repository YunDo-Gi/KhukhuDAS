import * as THREE from 'three'

import Experience from '../Experience.js'

export default class PhotoRoom
{
    constructor() 
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Setup
        this.resource = this.resources.items.PhotoRoomModel
        this.framePosition = null

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene

        // this.model.scale.set(0.2, 0.2, 0.2)

        this.model.scale.set(0, 0, 0)
        this.model.position.set(0, -1, 8)
        this.model.rotation.y = Math.PI * 0.25
        this.model.rotation.x = -Math.PI * 0.1


        this.scene.add(this.model)
    }

    getModel()
    {
        return this.model
    }
}
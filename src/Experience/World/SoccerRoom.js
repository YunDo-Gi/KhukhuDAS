import * as THREE from 'three'

import Experience from '../Experience.js'

export default class SoccerRoom
{
    constructor() 
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer
        this.resources = this.experience.resources

        // Setup
        this.resource = this.resources.items.SoccerRoomModel
        this.background = 'background/soccer_bg.png';
        this.framePosition = null

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene


        // this.model.scale.set(0.00205, 0.00205, 0.00205)
        this.model.scale.set(0, 0, 0)
        this.model.position.set(0.47, 0.26, 9)
        this.model.rotation.y = Math.PI * 0.25
        this.model.rotation.x = -Math.PI * 0.1

        this.scene.add(this.model)
    }

    getModel()
    {
        return this.model
    }
    
    setBackground()
    {
        this.renderer.renderBackground(this.background)
    }
}
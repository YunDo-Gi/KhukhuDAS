import * as THREE from 'three'

import Experience from '../Experience.js'
import Room from './Room.js'

export default class PhotoRoom extends Room
{
    constructor() 
    {
        super();
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer
        this.resources = this.experience.resources

        // Setup
        this.resource = this.resources.items.PhotoRoomModel
        this.background = 'background/photo_bg.png';

        this.centerPosition = new THREE.Vector3(0, -0.9, 8)
        this.rightPosition = new THREE.Vector3(8, -0.9, 8)
        this.leftPosition = new THREE.Vector3(-8, -0.9, 8)
        this.scale = new THREE.Vector3(0.2, 0.2, 0.2)
        this.aptScale = new THREE.Vector3(0.3, 0.3, 0.3)

        this.iframePosition = new THREE.Vector3(0, 0, 0)
        this.iframeRotation = new THREE.Vector3(0, Math.PI * 0.5, 0)

        this.setModel()
        this.getFrame()
    }

    setModel()
    {
        this.model = this.resource.scene.clone()


        this.model.scale.set(0, 0, 0)
        this.model.rotation.y = Math.PI * 0.25
        this.model.rotation.x = -Math.PI * 0.1

        this.scene.add(this.model)
    }

    getFrame()
    {
        this.frames = this.model.children.filter((child) =>
        {
            if(child.name.includes('ii') || child.name.includes('ii1') || child.name.includes('ii2') || child.name.includes('ii3'))
            {
                if(child.name.includes('ii')) this.iframePosition.copy(child.position)
                return true
            }
            return false
        })
    }
}
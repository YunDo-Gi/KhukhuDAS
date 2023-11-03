import * as THREE from 'three'

import Experience from '../Experience.js'
import Room from './Room.js'

export default class GamingRoom extends Room
{
    constructor() 
    {
        super();
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer
        this.resources = this.experience.resources

        this.type = 'gaming'

        // Setup
        this.resource = this.resources.items.GameRoomModel
        this.background = 'background/game_bg.png';
        this.roomChildren = {}

        this.iframePosition = new THREE.Vector3(-0.31, -1.65, 8)
        this.iframeRotation = new THREE.Vector3(0, Math.PI * 0.5, 0)

        this.centerPosition = new THREE.Vector3(0.23, 0.12, 8)
        this.rightPosition = new THREE.Vector3(8, 0.12, 8)
        this.leftPosition = new THREE.Vector3(-8, 0.12, 8)
        this.scale = new THREE.Vector3(0.00205, 0.00205, 0.00205)
        this.aptScale = new THREE.Vector3(0.0031, 0.0031, 0.0031);

        this.removedObjects = []

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
            if(child.name === '8')
            {
                return true
            }
            return false
        })
    }

    removeObjects()
    {
        this.model.children.filter((child) =>
        {
            if(child.name.includes('233') || child.name.includes('261') || child.name.includes('367') ||
               child.name.includes('354') || child.name.includes('365') || child.name.includes('353') ||
               child.name.includes('363') || child.name.includes('352') || child.name.includes('361') ||
               child.name.includes('351') || child.name.includes('231') || child.name == '26' || child.name == '23' || 
               child.name == '15' || child.name == '14' || child.name == '13' || child.name == 'game-photo')
            {
                this.removedObjects.push(child)
                child.visible = false
            }
        })
    }

    addObjects()
    {
        this.removedObjects.forEach((child) =>
        {
            child.visible = true
        })
    }
}
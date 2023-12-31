import * as THREE from 'three'

import Experience from '../Experience.js'
import Room from './Room.js'

export default class PaintingRoom extends Room
{
    constructor() 
    {
        super();
        
        // Setup
        this.resource = this.resources.items.PaintingRoomModel
        this.background = 'background/paint_bg.png';

        this.type = 'painting'

        this.centerPosition = new THREE.Vector3(0, -0.55, 9)
        this.rightPosition = new THREE.Vector3(8, -0.55, 9)
        this.leftPosition = new THREE.Vector3(-8, -0.55, 9)
        this.scale = new THREE.Vector3(0.2, 0.2, 0.2)
        this.aptScale = new THREE.Vector3(0.3, 0.3, 0.3)

        this.iframePosition = new THREE.Vector3(0, 0, 0)
        this.iframeRotation = new THREE.Vector3(0, Math.PI * 0.5, 0)

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


        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                // child.material.transparent = true
                // child.material.opacity = 0.3
            }
        })

        this.scene.add(this.model)
    }

    getFrame()
    {
        this.frames = this.model.children.filter((child) =>
        {
            if(child.name.includes('oo3') || child.name.includes('oo4') || child.name.includes('oo5'))
            {
                if(child.name.includes('oo5')) this.iframePosition.copy(child.position)
                return true
            }
            return false
        })
    }

    removeObjects()
    {
        this.model.children.filter((child) =>
        {
            if(child.name.includes('brush2') || child.name.includes('brush3') || child.name.includes('Cylinder1') ||
               child.name.includes('Cylinder') || child.name.includes('Cylinder5') || child.name.includes('Subdivision_Surface_1'))
            {
                this.removedObjects.push(child)
                child.visible = false
            }
            if(child.name.includes('Cube'))
            {
                child.children[11].visible = false
                child.children[12].visible = false
                this.removedObjects.push(child.children[11], child.children[12])

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
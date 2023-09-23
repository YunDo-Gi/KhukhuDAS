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

        this.centerPosition = new THREE.Vector3(0, -1, 8)
        this.rightPosition = new THREE.Vector3(8, -1, 8)
        this.leftPosition = new THREE.Vector3(-8, -1, 8)
        this.scale = new THREE.Vector3(0.2, 0.2, 0.2)
        this.framePosition = new THREE.Vector3(0, 0, 0)
        this.frameRotation = new THREE.Vector3(0, Math.PI * 0.5, 0)

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene


        this.model.scale.set(0, 0, 0)
        this.model.rotation.y = Math.PI * 0.25
        this.model.rotation.x = -Math.PI * 0.1

        // this.model.traverse((child) =>
        // {
        //     if(child instanceof THREE.Mesh)
        //     {
        //         if(child.name === 'frame')
        //         {
        //             console.log(child)
        //             child.material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('background/main.png') })
        //             console.log(child.position)
        //         }
        //     }
        // })


        this.scene.add(this.model)
    }
}
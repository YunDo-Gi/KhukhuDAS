import * as THREE from 'three'

import Experience from '../Experience.js'

export default class Painting
{
    constructor() 
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Setup
        this.resource = this.resources.items.PaintingRoomModel
        this.roomChildren = {}

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        console.log(this.model.children[0].name)

        this.model.scale.set(0.2, 0.2, 0.2)
        this.model.position.set(25, 0, 0)
        this.model.rotation.y = Math.PI * 0.75


        // this.model.traverse((child) =>
        // {
        //     if(child instanceof THREE.Mesh)
        //     {
        //         this.roomChildren[child.name.toLowerCase()] = child
        //         // child.castShadow = true
        //         // child.receiveShadow = true
        //         // this.roomChildren[child.name.toLowerCase()].scale.set(0, 0, 0)
        //         this.model.scale.set(0, 0, 0)
        //     }
        // })

        this.scene.add(this.model)
    }

    getModel()
    {
        return this.model
    }

    getRoomChildren()
    {
        return this.roomChildren
    }

    setTextures()
    {
        
    }

    // getSelectables()
    // {
    //     return this.model.children.filter((child) =>
    //     {
    //         if(child.name.includes('selectable'))
    //         {
    //             return true
    //         }
    //     })
    // }
}
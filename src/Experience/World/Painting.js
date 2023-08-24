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
        this.resource = this.resources.items.RoomPaintingModel2
        this.roomChildren = {}

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.005, 0.005, 0.005)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                this.roomChildren[child.name.toLowerCase()] = child
                child.castShadow = true
                child.receiveShadow = true
                // this.model.scale.set(0, 0, 0)
            }
        })

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
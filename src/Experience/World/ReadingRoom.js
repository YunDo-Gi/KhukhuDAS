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
        // for(child in this.model.children)
        // {
        //     console.log(child)
        // }
        this.model.scale.set(0.4, 0.4, 0.4)
        this.model.position.set(-2, -2, -1.8)
        this.model.rotation.y = -Math.PI * 0.25

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                if(child.name.includes('canvas4'))
                {
                    this.framePosition = child.position
                    // console.log(this.framePosition)
                }
                this.roomChildren[child.name.toLowerCase()] = child
                // child.castShadow = true
                // child.receiveShadow = true
                this.roomChildren[child.name.toLowerCase()].scale.set(0, 0, 0)
                // console.log(this.roomChildren[child.name.toLowerCase()].material)
                this.roomChildren[child.name.toLowerCase()].material.lights = false
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

    getFramePosition()
    {
        return this.framePosition
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
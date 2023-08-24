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
        this.resource = this.resources.items.RoomPhotoModel2

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.005, 0.005, 0.005)
        this.scene.add(this.model)

        // this.model.traverse((child) =>
        // {
        //     if(child instanceof THREE.Mesh)
        //     {
        //         child.castShadow = true
        //     }
        // })
    }

    getModel()
    {
        return this.model
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
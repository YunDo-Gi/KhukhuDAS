import * as THREE from 'three'

import Experience from '../Experience.js'

export default class Objects
{
    constructor() 
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Setup
        const objectNames = ['bookObject', 'cameraObject', 'eizelObject', 'gameObject', 'lampObject', 'paintObject', 'soccerObject'];
        const variableNames = ['book', 'camera', 'eizel', 'game', 'lamp', 'paint', 'soccer'];

        for (let i = 0; i < objectNames.length; i++) {
            this[variableNames[i]] = this.resources.items[objectNames[i]];
            console.log("check: " + this[variableNames[i]].scene)
        }

        // this.objectChildren = []
        // for (const item in this.resources.items)
        // {
        //     if (item.includes('Object'))
        //     {
        //         this.objectChildren.push(item)
        //     }
        // }
        // console.log(this.resources.items)
        // this.book = this.resources.items.bookObject

        // this.setObjects()
    }

    setObjects()
    {
        this.model = this.resource.scene
        console.log(this.model.children[0].name)

        this.model.scale.set(0.4, 0.4, 0.4)
        this.model.position.set(0, 4, 0)
        this.model.rotation.y = Math.PI * 0.25

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                this.roomChildren[child.name.toLowerCase()] = child
                // child.castShadow = true
                // child.receiveShadow = true
                // this.roomChildren[child.name.toLowerCase()].scale.set(0, 0, 0)
                this.model.scale.set(0, 0, 0)
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
}
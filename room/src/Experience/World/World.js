import * as THREE from 'three'

import Experience from '../Experience.js'
import Painting from './Painting.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            // this.environment = new Environment()
            this.painting = new Painting()
            this.camera = this.experience.camera
            console.log(this.painting.model.getObjectByName('frame'))
            this.camera.setPosition(this.painting.model.getObjectByName('frame'))
            this.camera.setTarget(this.painting.model.getObjectByName('frame'))
            this.onClickObject = this.painting.model.getObjectByName('frame')

            // this.camera.setTarget(this.painting.model.position)
            this.painting.model.castShadow = true
            this.painting.model.receiveShadow = true

            this.setSunLight()
        })
        
        // Test mesh


        // const testMesh = new THREE.Mesh(
        //     new THREE.BoxGeometry(1, 1, 1),
        //     new THREE.MeshBasicMaterial({ wireframe: false, color: 'green'})
        // )
        // this.testMesh = testMesh
        // this.scene.add(testMesh)

        // const testMesh2 = new THREE.Mesh(
        //     new THREE.BoxGeometry(1, 1, 1),
        //     new THREE.MeshBasicMaterial({ wireframe: false, color: 'green'})
        // )
        // this.testMesh2 = testMesh2
        // testMesh2.position.x = 2
        // this.scene.add(testMesh2)
    }

    getPainting()
    {
        console.log(this.painting)
        return this.painting
    }

    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 2)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3, 3, - 2.25)
        this.scene.add(this.sunLight)
    }

    getObject()
    {
        return this.onClickObject
    }
}
import * as THREE from 'three'

import Experience from '../Experience.js'
import EventEmitter from '../Utils/EventEmitter.js'
import Cube from './Cube.js'
import Painting from './Painting.js'

export default class World extends EventEmitter
{
    constructor()
    {
        super()

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
            // console.log(this.painting.model)

            this.cube = new Cube()
            
            // this.camera.setPosition(this.painting.model.getObjectByName('frame'))
            // this.camera.setTarget(this.painting.model)
            // this.onClickObject = this.painting.model.getObjectByName('frame')

            // this.camera.setTarget(this.painting.model.position)
            // this.painting.model.castShadow = true
            // this.painting.model.receiveShadow = true

            // this.setSunLight()

            // this.pointlight =  new THREE.PointLight(0xffffff, 100, 100)
            // this.pointlight.position.set(-20, 10, 0)
            // this.scene.add(this.pointlight)

            this.trigger('worldReady')
        })
        
        // Test mesh

        // const testMesh = new THREE.Mesh(
        //     new THREE.BoxGeometry(1, 1, 1),
        //     new THREE.MeshBasicMaterial({ wireframe: false, color: 'green'})
        // )
        // this.testMesh = testMesh
        // this.testMesh.position.x = 
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
        this.sunLight = new THREE.DirectionalLight('#ffffff', 0.5)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3, 3, - 2.25)
        this.scene.add(this.sunLight)
    }

    getObject()
    {
        return [this.testMesh, this.testMesh2]
    }
}
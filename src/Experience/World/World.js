import * as THREE from 'three'

import Experience from '../Experience.js'
import EventEmitter from '../Utils/EventEmitter.js'
import Controls from './Controls.js'

import Painting from './Painting.js'
import ReadingRoom from './ReadingRoom.js'
import Objects from './Objects.js'

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
            this.readingRoom = new ReadingRoom()
            this.paintingRoom = new Painting()
            this.objects = new Objects()
            this.camera = this.experience.camera
            // console.log(this.painting.model)
            this.controls = new Controls()

            
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

    update()
    {

    }
}
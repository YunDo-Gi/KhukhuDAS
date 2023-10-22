import * as THREE from 'three'

import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import sources from './sources.js'
import Preloader from './Preloader.js'
import Controls from './World/Controls.js'
import Objects from './World/Objects.js'


let instance = null

export default class Experience
{
    constructor(canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this

        // Global access to the experience (useful for debugging)
        window.experience = this

        /// Options
        this.canvas = canvas

        // Setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.world = new World()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.preloader = new Preloader()
        this.controls = new Controls()
        this.resources.on('ready', () =>
        {
            this.objects = new Objects()
        })

        // helpers
        const axisHelper = new THREE.AxesHelper(10)
        this.scene.add(axisHelper)

        const gridHelper = new THREE.GridHelper(20, 20)
        this.scene.add(gridHelper)

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }
    
    update()
    {
        this.camera.update()
        this.renderer.update()
        if(this.controls)
        {
            this.controls.update()
        }
        if (this.objects)
        {
            this.objects.update()
        }
        if (this.world)
        {
            this.world.update()
        }
    }
}
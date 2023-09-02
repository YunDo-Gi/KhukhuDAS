import * as THREE from 'three'

import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import sources from './sources.js'
import Raycast from './Raycast.js'
import Preloader from './Preloader.js'
import Controls from './World/Controls.js'

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
        // 적용되는 순서가 중요하다.
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.world = new World()
        this.camera = new Camera()
        this.renderer = new Renderer()
        // this.raycast = new Raycast()
        this.preloader = new Preloader()
        this.controls = new Controls()

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
    }
}
import * as THREE from 'three'

import Experience from './Experience.js'

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.useLegacyLights = false
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
        this.instance.setClearColor('#ECE6CC', 1)
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update()
    {
        this.instance.setViewport(0, 0, this.sizes.width, this.sizes.height)
        this.instance.render(this.scene, this.camera.instance)

        // Second scene
        // this.instance.setScissorTest(true)
        // this.instance.setViewport(
        //     this.sizes.width - this.sizes.width / 3,
        //     this.sizes.height - this.sizes.height / 3,
        //     this.sizes.width / 3,
        //     this.sizes.height / 3
        // )

        // this.instance.setScissor(
        //     this.sizes.width - this.sizes.width / 3,
        //     this.sizes.height - this.sizes.height / 3,
        //     this.sizes.width / 3,
        //     this.sizes.height / 3
        // )

        // this.instance.render(this.scene, this.camera.instance)

        // this.instance.setScissorTest(false)
    }
}
import * as THREE from 'three'

import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.world = this.experience.world
        
        this.setInstance()
        this.setControls()

    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(-10, 15, -15)
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.target.set(-20, 0, 0)
        // 수평 방향 회전 제한
        this.controls.minAzimuthAngle = Math.PI * 0.5
        this.controls.maxAzimuthAngle = Math.PI 
        // 수직 방향 회전 제한
        this.controls.minPolarAngle = Math.PI * 0.25
        this.controls.maxPolarAngle = Math.PI * 0.5
        // 이동 제한
        this.controls.enablePan = true
        var minPan = new THREE.Vector3( - 0.2, - 0.2, - 0.2 );
        var maxPan = new THREE.Vector3( 0.2, 0.2, 0.2 );
        this.controls.target.clamp( minPan, maxPan );

        this.controls.rotateSpeed = 0.5

        this.controls.enableZoom = false
        this.controls.enableDamping = true
    }

    setPosition(target)
    {
        console.log(target.position.x)
        this.instance.position.set(target.position.x + 1, target.position.y + 1, target.position.z + 1)
    }

    setTarget(target)
    {

        this.controls.target = target.position
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}
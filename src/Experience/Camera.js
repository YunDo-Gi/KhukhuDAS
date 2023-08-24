import * as THREE from 'three'
import gsap from "gsap";

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

        // Buttons
        document.getElementsByClassName("is-next")[0].addEventListener("click", () => {
            console.log("clicked")
            gsap.to(this.instance.position, {duration: 1, y: this.instance.position.y + 10, ease: "power2.inOut"})
        })

        document.getElementsByClassName("is-previous")[0].addEventListener("click", () => {
            console.log("clicked")
            gsap.to(this.instance.position, {duration: 1, y: this.instance.position.y - 10, ease: "power2.inOut"})
        })
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
            75, 
            this.sizes.width / this.sizes.height, 
            0.1, 
            100)
        this.instance.position.set(0, 10, 0)
        this.scene.add(this.instance)
    }

    // setOrthographicCamera()
    // {
    //     this.orthographicCamera = new THREE.OrthographicCamera(
    //         -this.sizes.width / 2, 
    //         this.sizes.width / 2, 
    //         this.sizes.height / 2, 
    //         -this.sizes.height / 2, 
    //         0.1, 
    //         100)
    // }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        // this.controls.target.set(-20, 0, 0)
        // 수평 방향 회전 제한
        this.controls.minAzimuthAngle = Math.PI * 0.5
        this.controls.maxAzimuthAngle = Math.PI 
        // 수직 방향 회전 제한
        this.controls.minPolarAngle = Math.PI * 0.25
        this.controls.maxPolarAngle = Math.PI * 0.5
        // 이동 제한
        this.controls.enablePan = false
        // var minPan = new THREE.Vector3( - 0.2, - 0.2, - 0.2 );
        // var maxPan = new THREE.Vector3( 0.2, 0.2, 0.2 );
        // this.controls.target.clamp( minPan, maxPan );

        this.controls.rotateSpeed = 0.5

        // this.controls.enableZoom = false
        this.controls.enableDamping = true
    }

    setPosition(target)
    {
        console.log(target.position)
        this.instance.position.set(target.position.x, target.position.y + 1, target.position.z)
    }

    setTarget(target)
    {
        console.log(target.position)  
        this.controls.target = target.position
    }

    resize()
    {
        this.instance.aspect = this.sizes.aspectRatio
        this.instance.updateProjectionMatrix()
    }

    movePosition()
    {
                
    }

    update()
    {
        this.controls.update()
    }
}
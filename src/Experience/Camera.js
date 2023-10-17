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
        this.setOrthographicCamera()
        this.setControls()

    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
            35, //75
            this.sizes.aspectRatio,
            0.1, 
            100)
        this.scene.add(this.instance)
        // this.instance.position.set(2, 0, -7)

        // this.helper = new THREE.CameraHelper(this.instance)
        // this.scene.add(this.helper)

        this.instance.position.x = 29;
        this.instance.position.y = 14;
        this.instance.position.z = 12;
    }

    setOrthographicCamera()
    {
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspectRatio * this.sizes.frustumSize) / 2,
            (this.sizes.aspectRatio * this.sizes.frustumSize) / 2,
            this.sizes.frustumSize / 2,
            -this.sizes.frustumSize / 2,
            0,
            10)

        this.scene.add(this.orthographicCamera)

        // this.orthographicCamera.position.y = 5.65;
        // this.orthographicCamera.position.z = 10;
        // this.orthographicCamera.rotation.y = 0;

        this.helper = new THREE.CameraHelper(this.orthographicCamera)
        this.scene.add(this.helper)
    }

    setOrthographicCameraZoom(e)
    {
        this.orthographicCamera.zoom = e
        this.orthographicCamera.updateProjectionMatrix()
    }

    setScrollCamera()
    {

    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        // this.controls.target.set(2, 2, 0)
        // 수평 방향 회전 제한
        // this.controls.minAzimuthAngle = Math.PI * 0.5
        // this.controls.maxAzimuthAngle = Math.PI 
        // 수직 방향 회전 제한
        // this.controls.minPolarAngle = Math.PI * 0.25
        // this.controls.maxPolarAngle = Math.PI * 0.5
        // 이동 제한
        this.controls.enablePan = false
        // var minPan = new THREE.Vector3( - 0.2, - 0.2, - 0.2 );
        // var maxPan = new THREE.Vector3( 0.2, 0.2, 0.2 );
        // this.controls.target.clamp( minPan, maxPan );

        this.controls.rotateSpeed = 0.5

        this.controls.enableZoom = true
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

        this.orthographicCamera.left = -this.sizes.width / 2
        this.orthographicCamera.right = this.sizes.width / 2
        this.orthographicCamera.top = this.sizes.height / 2
        this.orthographicCamera.bottom = -this.sizes.height / 2
        this.orthographicCamera.updateProjectionMatrix()
    }

    movePosition()
    {
                
    }

    update()
    {
        this.controls.update()

        this.helper.matrixWorldNeedsUpdate = true
        this.helper.update()
        this.helper.position.copy(this.orthographicCamera.position)
        this.helper.rotation.copy(this.orthographicCamera.rotation)
    }
}
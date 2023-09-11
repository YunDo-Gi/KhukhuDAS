import * as THREE from 'three'
import GSAP from 'gsap'

import Experience from '../Experience.js'

export default class Controls 
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.progress = 0
        this.dummyVector = new THREE.Vector3(0 ,0 ,0)

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1
        }

        this.position = new THREE.Vector3(0 ,0 ,0)
        this.lookAtPosition = new THREE.Vector3(0 ,0 ,0)

        this.directionalVector = new THREE.Vector3(0 ,0 ,0)
        this.staticVector = new THREE.Vector3(0 ,-1 ,0)
        this.crossVector = new THREE.Vector3(0 ,0 ,0)

        this.setPath()
    }

    setPath()
    {
        this.curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -5, 0, 0 ),
            new THREE.Vector3( 0, 0, -5 ),
            new THREE.Vector3( 5, 0, 0 ),
            new THREE.Vector3( 0, 0, 5 )
        ], true );
        
        const points = this.curve.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        
        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
        
        const curveObject = new THREE.Line( geometry, material );
        this.scene.add(curveObject);
    }

    // setButtons()
    // {
    //     document.getElementsByClassName("is-next")[0].addEventListener("click", () => {
    //         console.log("next-clicked")
    //         this.lerp.target += 0.1
    //         // if(this.lerp.target > 1)
    //         // {
    //         //     this.lerp.target = 0
    //         // }
    //         // this.progress += 0.1
    //     })
        
    //     document.getElementsByClassName("inner")[0].addEventListener("click", () => {
    //         console.log("mid-clicked")
    //     })
        
    //     document.getElementsByClassName("is-previous")[0].addEventListener("click", () => {
    //         console.log("previous-clicked")
    //         this.lerp.target -= 0.1
    //         if(this.lerp.target < 0)
    //         {
    //             this.lerp.target = 1
    //         }
    //         // if(this.progress < 0)
    //         // {
    //         //     this.progress = 1
    //         // }
    //     })
    // }

    update()
    {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current, 
            this.lerp.target, 
            this.lerp.ease
        )
        // this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target)
        // this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current)

        this.curve.getPointAt( this.lerp.current % 1, this.position );
        this.camera.orthographicCamera.position.copy(this.position)

        // this.curve.getPointAt( this.lerp.current + 0.01, this.lookAtPosition );
        // this.camera.orthographicCamera.lookAt(this.lookAtPosition)

        this.directionalVector.subVectors(
            this.curve.getPointAt((this.lerp.current % 1) + 0.000001),
             this.position).normalize()
        this.crossVector.crossVectors(this.directionalVector, this.staticVector)
        this.camera.orthographicCamera.lookAt(this.crossVector)
    }
}
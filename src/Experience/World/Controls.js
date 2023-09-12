import * as THREE from 'three'
import GSAP from 'gsap'

import Experience from '../Experience.js'

const btnChangePosition = document.querySelector('.btn-change-position')
let flag = false
btnChangePosition.addEventListener('click', () => {
    flag = !flag
})


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
        this.staticVector = new THREE.Vector3(0 ,1 ,0)
        this.crossVector = new THREE.Vector3(0 ,0 ,0)

        // this.setPath()
        this.setScroll()
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

    setScroll()
    {
        this.line = new THREE.LineCurve3(
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(1, 10, 0)
        )

        const points = this.line.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

        const lineObject = new THREE.Line( geometry, material );
        this.scene.add(lineObject);


        window.addEventListener('wheel', (event) =>
        {
            console.log(event)
            if(event.deltaY > 0) {
                this.lerp.target += 0.01
            } else {
                this.lerp.target -= 0.01
            }
        })
    }

    update()
    {
        if(flag) {
            this.lerp.current = GSAP.utils.interpolate(
                this.lerp.current, 
                this.lerp.target, 
                this.lerp.ease
            )

            const limit = 0.5
            this.lerp.target = GSAP.utils.clamp(0, limit, this.lerp.target)
            this.lerp.current = GSAP.utils.clamp(0, limit, this.lerp.current)

            this.line.getPointAt(this.lerp.current % 1, this.position)
            this.camera.orthographicCamera.position.copy(this.position)
        }


        

        // this.curve.getPointAt( this.lerp.current % 1, this.position );
        // this.camera.orthographicCamera.position.copy(this.position)

        // this.curve.getPointAt( this.lerp.current + 0.01, this.lookAtPosition );
        // this.camera.orthographicCamera.lookAt(this.lookAtPosition)

        // this.directionalVector.subVectors(
        //     this.curve.getPointAt((this.lerp.current % 1) + 0.000001),
        //      this.position).normalize()
        // this.crossVector.crossVectors(this.directionalVector, this.staticVector)
        // this.camera.orthographicCamera.lookAt(this.crossVector)
    }
}
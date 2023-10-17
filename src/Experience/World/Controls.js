import * as THREE from 'three'
import GSAP from 'gsap'

import Experience from '../Experience.js'


const btnChangePosition = document.querySelector('.btn-change-position')
const btnToRoom = document.querySelector('.btn-to-room')
const aptWrapper = document.querySelector('.apt-wrapper')
const roomWrapper = document.querySelector('.room-wrapper')
const btnRoomZoom = document.querySelector('.btn-room-zoom')
const loginWrapper = document.querySelector('.login-wrapper')
const btnSubmit = document.querySelector('.btn-submit')

let flag = false
let returnable = false

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
        this.world = this.experience.world
        this.objects = this.experience.objects
        this.renderer = this.experience.renderer;


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

        document.querySelector('.btn-submit').addEventListener('click', () => {
            loginWrapper.classList.remove('active-popup')
            flag = true
            this.onWheel()
            aptWrapper.classList.remove('hidden')
            roomWrapper.classList.add('hidden')
        })

        btnChangePosition.addEventListener('click', () => {
            if(returnable) {
                GSAP.to(this.camera.orthographicCamera.position, {
                    duration: 2,
                    x: this.position.x,
                    y: this.position.y,
                    z: this.position.z,
                    ease: "power2.inOut"
                })
                returnable = false
            }
            GSAP.to(this.camera.orthographicCamera.rotation, {
                duration: 2,
                y: -Math.PI * 0.5,
                ease: 'power2.inOut'
            })
            // this.objects.move = false
            this.renderer.setBG()
            aptWrapper.classList.remove('hidden')
            roomWrapper.classList.add('hidden')
        })

        btnToRoom.addEventListener('click', () => {
            GSAP.to(this.camera.orthographicCamera.position, {
                duration: 2,
                x: this.dummyVector.x,
                y: this.dummyVector.y,
                z: this.dummyVector.z,
                ease: "power2.inOut"
            })
            GSAP.to(this.camera.orthographicCamera.rotation, {
                duration: 2,
                y: -Math.PI,
                ease: 'power2.inOut',
                onComplete: () => {
                    aptWrapper.classList.add('hidden');
                    flag = false;
                    returnable = true;
                    roomWrapper.classList.remove('hidden');
                  }
            // this.objects.move = false
            })
            this.renderer.setBG()
        })

        btnRoomZoom.addEventListener('click', () => {
            const camera = this.camera.orthographicCamera
            GSAP.to(camera, {
                duration: 2,
                zoom: 3,
                ease: "power2.inOut",
                onUpdate: function () {
                    camera.updateProjectionMatrix();
                }
            })
        })

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
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 12, 0)
        )

        const points = this.line.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

        const lineObject = new THREE.Line( geometry, material );
        this.scene.add(lineObject);
    }

    onWheel()
    {
        GSAP.to(this.camera.orthographicCamera.rotation, {
            duration: 2,
            y: -Math.PI * 0.5,
            ease: 'power2.inOut'
        })

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
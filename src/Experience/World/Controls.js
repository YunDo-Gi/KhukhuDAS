import * as THREE from 'three'

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

        this.setPath()
        this.setButtons()
    }

    setPath()
    {
        this.curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -10, 0, 10 ),
            new THREE.Vector3( -5, 5, 5 ),
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 5, -5, 5 ),
            new THREE.Vector3( 10, 0, 10 )
        ], true );
        
        const points = this.curve.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        
        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
        
        const curveObject = new THREE.Line( geometry, material );
        this.scene.add(curveObject);
    }

    setButtons()
    {
        document.getElementsByClassName("is-next")[0].addEventListener("click", () => {
            console.log("next-clicked")
            this.progress += 0.1
        })
        
        document.getElementsByClassName("inner")[0].addEventListener("click", () => {
            console.log("mid-clicked")
        })
        
        document.getElementsByClassName("is-previous")[0].addEventListener("click", () => {
            console.log("previous-clicked")
            this.progress -= 0.1
            if(this.progress < 0)
            {
                this.progress = 1
            }
        })
    }

    update()
    {
        this.camera.orthographicCamera.position.copy(this.dummyVector)
        this.curve.getPointAt( this.progress % 1, this.dummyVector );
    }
}
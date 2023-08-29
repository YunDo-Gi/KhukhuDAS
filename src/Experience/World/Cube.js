import * as THREE from 'three'

import Experience from '../Experience.js'

export default class Cube 
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.world = this.experience.world


        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( {color: 'pink'} );
        this.cube = new THREE.Mesh( geometry, material );
        this.cube.position.set(0, 0, 0)
        this.cube.rotation.y = Math.PI * 0.25
        this.scene.add( this.cube );
    }

    getCube()
    {
        return this.cube
    }
}
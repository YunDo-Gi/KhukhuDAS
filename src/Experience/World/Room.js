import * as THREE from 'three'
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

import Experience from '../Experience.js'

export default class Room
{
    constructor()
    {
        this.experience = new Experience()
        this.renderer = this.experience.renderer
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.frames = {}
        this.likes = 0
        this.type = ''
    }

    getModel()
    {
        return this.model
    }
    
    getLeftPostion()
    {
        return this.leftPosition
    }

    getRightPosition()
    {
        return this.rightPosition
    }

    getCenterPosition()
    {
        return this.centerPosition
    }

    getScale()
    {
        return this.scale
    }

    getAptScale()
    {
        return this.aptScale
    }

    setBackground()
    {
        this.renderer.renderBackground(this.background)
    }

    getIframePosition()
    {
        return this.iframePosition
    }

    getIframeRotation()
    {
        return this.iframeRotation
    }

    setLikes(n)
    {
        this.likes = n
    }

    getLikes()
    {
        return this.likes
    }

    getType()
    {
        return this.type
    }

    makeIframeObject(width, height) {
        const obj = new THREE.Object3D
    
        // const element = document.createElement('iframe');
        // this.iframe.src = [ './views/login.html' ];
        const element = document.createElement('div');
        element.width = width + 'px'
        element.height = height + 'px'
    
        let css3dObject = new CSS3DObject( element );
        obj.css3dObject = css3dObject
        obj.add(css3dObject)
    
        // make an invisible plane for the DOM element to chop
        // clip a WebGL geometry with it.
        var material = new THREE.MeshPhongMaterial({
            opacity	: 0.15,
            color	: new THREE.Color( 0x111111 ),
            blending: THREE.NoBlending,
            // side	: THREE.DoubleSide,
        });
        var geometry = new THREE.BoxGeometry( width, height, 1 );
        var mesh = new THREE.Mesh( geometry, material );
        obj.add( mesh );
    
        return obj
    }
}
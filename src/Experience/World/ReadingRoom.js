import * as THREE from 'three'
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";

import Experience from '../Experience.js'
import Room from './Room.js'

export default class ReadingRoom extends Room
{
    constructor() 
    {
        super();
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer
        this.resources = this.experience.resources

        this.type = 'reading'

        // Setup
        this.resource = this.resources.items.ReadingRoomModel
        this.background = 'background/read_bg.png';

        this.iframePosition = new THREE.Vector3(-0.31, -1.65, 8)
        this.iframeRotation = new THREE.Vector3(0, Math.PI * 0.5, 0)

        this.centerPosition = new THREE.Vector3(0, -1, 8)
        this.rightPosition = new THREE.Vector3(8, -1, 8)
        this.leftPosition = new THREE.Vector3(-8, -1, 8)
        this.scale = new THREE.Vector3(0.2, 0.2, 0.2)
        this.aptScale = new THREE.Vector3(0.3, 0.3, 0.3)

        this.setModel()
        this.getFrame()
        // this.setIframe()
    }

    setModel()
    {
        this.model = this.resource.scene.clone()

        this.model.scale.set(0, 0, 0)
        this.model.rotation.y = Math.PI * 0.25
        this.model.rotation.x = -Math.PI * 0.1

        this.scene.add(this.model)
    }

    setIframe()
    {
        let root = new THREE.Object3D()
        this.scene.add(root)

        let test = this.makeIframeObject(0.1, 0.1)
        test.position.x = 0
        test.position.y = 0
        test.position.z = 0
        test.rotation.y = Math.PI * 0.5
        test.css3dObject.element.style.background = 'red'

        root.add(test)


        // this.iframe = document.createElement('iframe')
        // this.iframe.src = [ './views/login.html' ];
        // this.iframe.width = '100%'
        // this.iframe.height = '100%'

        // // Set the position and rotation of the iframe
        // const position = new THREE.Vector3(0, 1.5, 0)
        // const rotation = new THREE.Euler(0, Math.PI, 0)

        // // Create a new three.js object to hold the iframe
        // this.iframeObject = new CSS3DObject(this.iframe)

        // this.iframeObject.position.copy(position)
        // this.iframeObject.rotation.copy(rotation)
        // this.iframeObject.add(this.iframe)

        // // Add the iframe object to the scene
        // this.scene.add(this.iframeObject)
    }

    getFrame()
    {
        this.frames = this.model.children.filter((child) =>
        {
            if(child.name.includes('pp2') || child.name.includes('pp3'))
            {
                if(child.name.includes('pp3')) this.iframePosition.copy(child.position)
                return true
            }
            return false
        })
    }
}
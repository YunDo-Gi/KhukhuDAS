import * as THREE from 'three'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import gsap from 'gsap'

import Experience from './Experience.js'

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setInstance()
        this.setRendererCSS()

        this.setBG()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.useLegacyLights = false
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    setRendererCSS()
    {
        this.rendererCSS = new CSS3DRenderer();
		this.rendererCSS.setSize(this.sizes.width, this.sizes.height);
		this.canvas.appendChild(this.rendererCSS.domElement);
    }

    setBackground(scene, backgroundImageWidth, backgroundImageHeight) {
        const windowSize = function(withScrollBar) {
            let wid = 0;
            let hei = 0;
            if (typeof window.innerWidth != "undefined") {
                wid = window.innerWidth;
                hei = window.innerHeight;
            }
            else {
                if (document.documentElement.clientWidth == 0) {
                    wid = document.body.clientWidth;
                    hei = document.body.clientHeight;
                }
                else {
                    wid = document.documentElement.clientWidth;
                    hei = document.documentElement.clientHeight;
                }
            }
            return { width: wid - (withScrollBar ? (wid - document.body.offsetWidth + 1) : 0), height: hei };
        };
    
        if (this.scene.background) {
    
            var size = windowSize(true);
            var factor = (backgroundImageWidth / backgroundImageHeight) / (size.width / size.height);
    
            this.scene.background.offset.x = factor > 1 ? (1 - 1 / factor) / 2 : 0;
            this.scene.background.offset.y = factor > 1 ? 0 : (1 - factor) / 2;
    
            this.scene.background.repeat.x = factor > 1 ? 1 / factor : 1;
            this.scene.background.repeat.y = factor > 1 ? 1 : factor;
        }
    }

    renderBackground(backImg)
    {
        const renderer = this;
        const img = new Image();
        img.onload = function () {
	        renderer.scene.background = new THREE.TextureLoader().load(backImg);
	        renderer.setBackground(this.scene, img.width, img.height);
        };
        img.src = backImg;
    }

    setBG()
    {
        const backImg = 'background/main.png';
        this.renderBackground(backImg);
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update()
    {
        this.instance.setViewport(0, 0, this.sizes.width, this.sizes.height)
        this.instance.render(this.scene, this.camera.orthographicCamera)

        // Second scene
        this.instance.setScissorTest(true)
        this.instance.setViewport(
            this.sizes.width - this.sizes.width / 3,
            this.sizes.height - this.sizes.height / 3,
            this.sizes.width / 3,
            this.sizes.height / 3
        )

        this.instance.setScissor(
            this.sizes.width - this.sizes.width / 3,
            this.sizes.height - this.sizes.height / 3,
            this.sizes.width / 3,
            this.sizes.height / 3
        )

        this.instance.render(this.scene, this.camera.instance)

        this.instance.setScissorTest(false)
    }    
}

// Funcitons

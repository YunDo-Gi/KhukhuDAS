import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { gsap } from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

THREE.ColorManagement.enabled = false

/**
 * Frames
 */



/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.landingCanvas')

// Scene
const scene = new THREE.Scene()

// Helpers
const axisHelper = new THREE.AxesHelper(10)
scene.add(axisHelper)

const gridHelper = new THREE.GridHelper(20, 20)
scene.add(gridHelper)

/**
 * Textures
 */

/**
 * Fonts
 */
// const fontLoader = new FontLoader()
const material = new THREE.MeshBasicMaterial()

// fontLoader.load(
//     '/fonts/helvetiker_regular.typeface.json',
//     (font) =>
//     {
//         const textGeometry = new TextGeometry(
//             'Cool Logo',
//             {
//                 font: font,
//                 size: 0.2,
//                 height: 0.2,
//                 curveSegments: 6,
//                 bevelEnabled: true,
//                 bevelThickness: 0.03,
//                 bevelSize: 0.02,
//                 bevelOffset: 0,
//                 bevelSegments: 5
//             }
//         )
//         textGeometry.center()

//         const text = new THREE.Mesh(textGeometry, material)
//         scene.add(text)

//         text.position.y = 3.5
//     }
// )

const modelLoader = new GLTFLoader()
const model = null
modelLoader.load("/models/Object/book.gltf", (gltf) => {
    console.log(gltf.scene)
    scene.add(gltf.scene)
    gltf.scene.scale.set(0.002, 0.002, 0.002)
    gltf.scene.position.set(0, 3.5, 0)
    gltf.scene.rotation.x = Math.PI * 0.25
})

const geometry = new THREE.SphereGeometry( 0.3, 20, 20 );
const sphere1 = new THREE.Mesh( geometry, material );
const sphere2 = new THREE.Mesh( geometry, material );
const sphere3 = new THREE.Mesh( geometry, material );
const sphere4 = new THREE.Mesh( geometry, material );
const sphere5 = new THREE.Mesh( geometry, material );
const sphere6 = new THREE.Mesh( geometry, material );

sphere2.position.x = 0.5;
sphere3.position.x = 1;
sphere4.position.x = 0.7;
sphere5.position.x = -1;
sphere6.position.x = -0.5;

sphere2.position.z = -0.5;
sphere3.position.z = -1;
sphere4.position.z = -1.5;
sphere5.position.z = -2;


scene.add( sphere1, sphere2, sphere3, sphere4, sphere5, sphere6 );



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    //Update background
    if(scene.background) {
        setBackground(scene, img.width, img.height);
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 3
camera.position.z = 2
scene.add(camera)

const orthographicCamera = new THREE.OrthographicCamera(
    (-sizes.width / sizes.height * 5) / 2,
    (sizes.width / sizes.height * 5) / 2,
    5 / 2,
    -5 / 2,
    -10,
    10)

orthographicCamera.position.y = 4;
scene.add(orthographicCamera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animation
    gsap.to(sphere1.position, {duration: 0.1, y: Math.abs( Math.sin( elapsedTime ) ) * 3 + 0.3, ease: "ease.inOut"})
    gsap.to(sphere2.position, {duration: 0.1, y: Math.abs( Math.sin( elapsedTime + Math.PI / 5) ) * 3.2 + 0.3, ease: "power2.inOut"})
    gsap.to(sphere3.position, {duration: 0.1, y: Math.abs( Math.sin( elapsedTime + Math.PI / 6 ) ) * 3 + 0.3, ease: "power2.inOut"})
    gsap.to(sphere4.position, {duration: 0.1, y: Math.abs( Math.sin( elapsedTime + Math.PI / 3) ) * 3 + 0.3, ease: "power2.inOut"})
    gsap.to(sphere5.position, {duration: 0.1, y: Math.abs( Math.sin( elapsedTime + Math.PI / 2) ) * 3.6 + 0.3, ease: "power2.inOut"})
    gsap.to(sphere6.position, {duration: 0.1, y: Math.abs( Math.sin( elapsedTime + Math.PI / 7) ) * 3.7 + 0.3, ease: "power2.inOut"})

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


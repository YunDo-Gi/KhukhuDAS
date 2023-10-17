import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector('canvas.webgl'))


const iframeWrapper = document.querySelector('.iframe-wrapper')
const btnRoomZoom = document.querySelector('.btn-room-zoom')

btnRoomZoom.addEventListener('click', () => {
    // iframeWrapper.classList.toggle('active-popup')  
})
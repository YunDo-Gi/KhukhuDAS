import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector('canvas.webgl'))

const loginWrapper = document.querySelector('.login-wrapper')
const iframeWrapper = document.querySelector('.iframe-wrapper')
const btnPopup = document.querySelector('.btn-popup')
const btnRoomZoom = document.querySelector('.btn-room-zoom')

btnPopup.addEventListener('click', () => {
    loginWrapper.classList.toggle('active-popup')  
})

btnRoomZoom.addEventListener('click', () => {
    iframeWrapper.classList.toggle('active-popup')  
})
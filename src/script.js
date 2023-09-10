import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector('canvas.webgl'))

const loginWrapper = document.querySelector('.login-wrapper')
const btnPopup = document.querySelector('.btn-popup')

btnPopup.addEventListener('click', () => {
    loginWrapper.classList.toggle('active-popup')  
})
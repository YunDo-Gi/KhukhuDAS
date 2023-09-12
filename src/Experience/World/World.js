import * as THREE from 'three'
import gsap from 'gsap'

import Experience from '../Experience.js'
import EventEmitter from '../Utils/EventEmitter.js'
import Controls from './Controls.js'

import Painting from './Painting.js'
import ReadingRoom from './ReadingRoom.js'
import PhotoRoom from './PhotoRoom.js'
import Objects from './Objects.js'
import Apt from './Apt.js'

export default class World extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            // this.environment = new Environment()
            this.readingRoom = new ReadingRoom()
            this.paintingRoom = new Painting()
            this.photoRoom = new PhotoRoom()
            this.objects = new Objects()
            this.apt = new Apt()
            this.camera = this.experience.camera
            // console.log(this.painting.model)
            this.controls = new Controls()

            // Pagenation
        this.rooms = [this.readingRoom, this.paintingRoom, this.photoRoom]
        const pages = document.querySelectorAll('.room-page-wrapper>svg')
        const page_size = 3;
        let current_page = 2;


        // Handle page navigation
        document.querySelector('.arrow-wrapper-right').addEventListener('click', () => {
            console.log('right')
            if(current_page < page_size)
            {
                pages[current_page - 1].classList.toggle('selected')
                gsap.to(this.rooms[current_page - 1].getModel().scale, {
                    duration: 1,
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "power2.inOut"
                })
                current_page += 1
                pages[current_page - 1].classList.toggle('selected')
                gsap.to(this.rooms[current_page - 1].getModel().scale, {
                    duration: 1,
                    x: 0.2,
                    y: 0.2,
                    z: 0.2,
                    ease: "power2.inOut"
                })
            }
        })

        document.querySelector('.arrow-wrapper-left').addEventListener('click', () => {
            console.log('left')
            if(current_page > 1)
            {
                pages[current_page - 1].classList.toggle('selected')
                gsap.to(this.rooms[current_page - 1].getModel().scale, {
                    duration: 1,
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "power2.inOut"
                })
                current_page -= 1
                pages[current_page - 1].classList.toggle('selected')
                gsap.to(this.rooms[current_page - 1].getModel().scale, {
                    duration: 1,
                    x: 0.2,
                    y: 0.2,
                    z: 0.2,
                    ease: "power2.inOut"
                })
            }
        })

            this.trigger('worldReady')
        })        
    }

    setRooms()
    {

    }

    update()
    {

    }
}
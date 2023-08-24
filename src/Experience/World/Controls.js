import * as THREE from 'three'

import Experience from '../Experience.js'

export default class Controls 
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setPath()
    }

    setPath()
    {
        
    }
}
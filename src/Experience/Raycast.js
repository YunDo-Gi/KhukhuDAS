import * as THREE from "three";

import Experience from "./Experience.js";

export default class Raycast {
  constructor() 
  {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes
    this.camera = this.experience.camera;
    this.model = this.experience.model;
    this.world = this.experience.world;

    this.raycaster = new THREE.Raycaster();
    // const rayOrigin = new THREE.Vector3(- 3, 0, 0)
    // const rayDirection = new THREE.Vector3(10, 0, 0)
    // rayDirection.normalize()
    this.currentIntersect = null

    const mouse = new THREE.Vector2();

    window.addEventListener('mousemove', (event) =>
    {   
        mouse.x = event.clientX / this.sizes.width * 2 - 1
        mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
        this.raycaster.setFromCamera(mouse, this.camera.instance);
        this.setMouseRay();
    })
  }

  setMouseRay() {
    // mouse
    const objectsToTest = this.world.getObject();
    // console.log(objectsToTest)
    const intersects = this.raycaster.intersectObject(objectsToTest);
    // console.log(intersects)

    // hover
    for(const object of objectsToTest)
    {
        object.material.color.set('#ff0000')
    }

    for(const intersect of intersects)
    {
        intersect.object.material.color.set('#0000ff')
    }

    // mouse enter / leave
    if(intersects.length)
    {
        if(!this.currentIntersect)
        {
            console.log('mouse enter')
        }

        this.currentIntersect = intersects[0]
    }
    else
    {
        if(this.currentIntersect)
        {
            console.log('mouse leave')
        }
        
        this.currentIntersect = null
    }

    // click
    // 이거 여러번 찍히는데 수정 필요함 아마 mousemove 안에 있어서 그런듯
    window.addEventListener('click', () =>
    {
        if(this.currentIntersect)
        {
            switch(this.currentIntersect.object)
            {
                case objectsToTest[0]:
                    console.log('click on object 1')
                    break
    
                case objectsToTest[1]:
                    console.log('click on object 2')
                    break
            }
        }
    })
  }
}

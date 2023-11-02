import * as THREE from "three";

import Experience from "../Experience.js";
import Room from "./Room.js";

export default class SoccerRoom extends Room {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.renderer = this.experience.renderer;
    this.resources = this.experience.resources;

    this.type = "exercise";

    // Setup
    this.resource = this.resources.items.SoccerRoomModel;
    this.background = "background/exercise_bg.png";

    this.iframePosition = new THREE.Vector3(-0.31, -1.65, 8);
    this.iframeRotation = new THREE.Vector3(0, Math.PI * 0.5, 0);

    this.centerPosition = new THREE.Vector3(0.47, 0.26, 9);
    this.rightPosition = new THREE.Vector3(8.47, 0.26, 8);
    this.leftPosition = new THREE.Vector3(-7.53, 0.26, 8);
    this.scale = new THREE.Vector3(0.00205, 0.00205, 0.00205);
    this.aptScale = new THREE.Vector3(0.3, 0.3, 0.3);
    this.removedObjects = [];

    this.setModel();
    this.getFrame();
  }

  setModel() {
    this.model = this.resource.scene;

    this.model.scale.set(0, 0, 0);
    this.model.rotation.y = Math.PI * 0.25;
    this.model.rotation.x = -Math.PI * 0.1;

    this.scene.add(this.model);
  }

  getFrame() {
    this.frames = this.model.children.filter((child) => {
      if (child.name.includes("19")) {
        return true;
      }
      return false;
    });
  }

  removeObjects() {
    this.model.children.filter((child) => {
      if (
        child.name == "Cylinder1" ||
        child.name == "Cylinder2" ||
        child.name == "Cylinder3" ||
        child.name == "Cylinder4" ||
        child.name == "Cylinder5" ||
        child.name == "Cylinder6" ||
        child.name == "Cylinder10" ||
        child.name == "Cylinder11" ||
        child.name == "Cylinder12" ||
        child.name == "Cylinder13" ||
        child.name == "Cylinder14" ||
        child.name == "Cylinder15" ||
        child.name == "Cylinder20" ||
        child.name == "Cylinder9" ||
        child.name == "Cube8" ||
        child.name == "Sphere2"
      ) {
        this.removedObjects.push(child);
        child.visible = false;
      }
    });
  }

  addObjects() {
    this.removedObjects.forEach((child) => {
      child.visible = true;
    });
  }
}

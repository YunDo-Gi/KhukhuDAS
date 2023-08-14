import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, Detailed, Environment, useFBX } from "@react-three/drei";
import Alien from "./Models/Alien";
import Bunny from "./Models/Bunny";
export default function DownMesh({ index, z, speed }) {
  const ref = useRef();
  // useThree gives you access to the R3F state model
  const { viewport, camera } = useThree();
  // getCurrentViewport is a helper that calculates the size of the viewport
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);
  // useGLTF is an abstraction around R3F's useLoader(GLTFLoader, url)
  const { nodes, materials, scene } = useGLTF("/models/Bunny.gltf");
  // It can automatically handle draco and meshopt-compressed assets without you having to
  // worry about binaries and such ...
  // By the time we're here the model is loaded, this is possible through React suspense

  // Local component state, it is safe to mutate because it's fixed data
  const [data] = useState({
    // Randomly distributing the objects along the vertical
    y: THREE.MathUtils.randFloatSpread(height * 6),
    // This gives us a random value between -1 and 1, we will multiply it with the viewport width
    x: THREE.MathUtils.randFloatSpread(1.5),
    // How fast objects spin, randFlost gives us a value between min and max, in this case 8 and 12
    spin: THREE.MathUtils.randFloat(8, 12),
    // Some random rotations, Math.PI represents 360 degrees in radian
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  // useFrame executes 60 times per second
  useFrame((state, dt) => {
    // Make the X position responsive, slowly scroll objects up at the Y, distribute it along the Z
    // dt is the delta, the time between this frame and the previous, we can use it to be independent of the screens refresh rate
    // We cap dt at 0.1 because now it can't accumulate while the user changes the tab, it will simply stop
    if (dt < 0.1)
      ref.current.position.set(
        index === 0 ? 0 : data.x * width,
        (data.y = -Math.tan(
          state.clock.elapsedTime / Math.log((index + 5) ** 2)
        )),
        // (data.y -= dt * speed),
        -z
      );
    // Rotate the object around
    ref.current.rotation.set(
      (data.rX += dt / data.spin),
      Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
      (data.rZ += dt / data.spin)
    );

    // If they're too far up, set them back to the bottom
    if (data.y < -1000 * index - 7) {
      console.log(data.y);

      data.y = height;
    }
  });

  // Using drei's detailed is a nice trick to reduce the vertex count because
  // we don't need high resolution for objects in the distance. The model contains 3 decimated meshes ...

  console.log(nodes);

  return (
    <Detailed ref={ref} distances={[0, 65, 80]}>
      <group></group>
    </Detailed>
  );
}

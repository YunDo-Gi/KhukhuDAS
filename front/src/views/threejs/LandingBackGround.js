import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, Detailed, Environment } from "@react-three/drei";
import { Physics, useBox } from "@react-three/cannon";

import UpMesh from "./UpMesh";
import DownMesh from "./DownMesh";
import "./test.css";
import { AmbientLight } from "three";

export default function LandingBackGround({
  speed = 2,
  count = 6,
  depth = 8,
  easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)),
}) {
  return (
    <div id='landing-canvas'>
      <Canvas
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 20, near: 0.01, far: depth + 15 }}>
        <color attach='background' args={["#EFC245"]} />
        <hemisphereLight color='white' groundColor='blue' intensity={0.75} />

        <Physics>
          {Array.from({ length: count }, (_, i) => (
            <UpMesh
              key={i}
              index={i}
              z={Math.round(easing(i / count) * depth)}
              speed={speed}
            />
          ))}

          {Array.from({ length: count }, (_, i) => (
            <DownMesh
              key={i}
              index={i}
              z={Math.round(easing(i / count) * depth)}
              speed={speed}
            />
          ))}
        </Physics>

        <Environment preset='sunset' />
      </Canvas>
    </div>
  );
}

import "./style.css"
import ReactDOM from "react-dom/client"
import { Canvas } from "@react-three/fiber"
import Room from "./components/Room.jsx"

import * as THREE from "three"
const root = ReactDOM.createRoot(document.querySelector("#root"))

root.render(
  <Canvas
    flat
    shadows={true}
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [30, 12, -40],
    }}
    onCreated={({ gl }) => {
      gl.toneMapping = THREE.NoToneMapping
    }}
  >
    <Room />
  </Canvas>
)

import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { useControls } from "leva"
const Outside = () => {
  const { p } = useControls({
    p: {
      value: {
        x: -2,
        y: 0,
        z: 0,
      },
      step: 0.1,
    },
  })
  const field = useGLTF("/gltf/field.glb")
  console.log(field)
  return (
    <>
      <primitive object={field.scene} scale={2} position={[p.x, p.y, p.z]} />
    </>
  )
}

export default Outside

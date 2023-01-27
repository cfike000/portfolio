import React, { useRef, useState } from "react"
import { useGLTF, Text3D, PresentationControls, Float } from "@react-three/drei"
import * as THREE from "three"
import { useControls } from "leva"
import { Physics, RigidBody, Debug } from "@react-three/rapier"
import Guitar from "./Guitar.jsx"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect } from "react"
import gsap from "gsap"

const Room = () => {
  const lampLight = useRef()

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
  THREE.ColorManagement.legacyMode = false
  const floorRef = useRef()
  const lightRef = useRef()
  const woodFloor = useGLTF("/gltf/floorFull.glb")
  const rug = useGLTF("/gltf/rugRound.glb")

  const wallWindow = useGLTF("/gltf/wallWindow.glb")
  const computer = useGLTF("/gltf/computerScreen.glb")
  const desk = useGLTF("/gltf/desk.glb")
  const keyboard = useGLTF("/gltf/computerKeyboard.glb")
  const mouse = useGLTF("/gltf/computerMouse.glb")
  const tableLamp = useGLTF("/gltf/lampRoundTable.glb")
  const deskChair = useGLTF("/gltf/chairDesk.glb")
  const bookcase = useGLTF("/gltf/bookcaseOpen.glb")
  const stand = useGLTF("/gltf/stand.glb")
  const books = useGLTF("/gltf/books.glb")
  const speaker = useGLTF("/gltf/speakerSmall.glb")
  const wallDoorway = useGLTF("/gltf/wallDoorway.glb")
  const pointer = useGLTF("/gltf/pointer.glb")
  const wall = useGLTF("/gltf/wall.glb")
  const lightswitch = useGLTF("/gltf/lightswitch.glb")

  const tableRef = useRef()
  const zoomButton = useRef()
  const box = useRef()
  const [zoomIn, setZoomIn] = useState(false)
  const { camera } = useThree()
  const itemsToCastShadow = [
    computer,
    desk,
    tableLamp,
    deskChair,
    bookcase,
    stand,
    books,
    speaker,
  ]
  itemsToCastShadow.forEach((item) => {
    item.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
      }
    })
  })

  const itemsToReceiveShadow = [
    woodFloor,
    rug,
    wallWindow,
    wallDoorway,
    wall,

    bookcase,
  ]
  itemsToReceiveShadow.forEach((item) => {
    item.scene.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true
      }
    })
  })
  const cameraPosition = camera.position
  useEffect(() => {
    if (zoomIn) {
      gsap.to(box.current.position, {
        duration: 2,
        x: 6.1,
        y: 6.8,
        z: -2.1,
        ease: "power4.out",
      })
      gsap.to(cameraPosition, {
        duration: 2,
        x: 12.7,
        y: 8.1,
        z: -6.1,
        ease: "power4.out",
      })
    } else {
      gsap.to(box.current.position, {
        duration: 2,
        x: 0,
        y: 0,
        z: 0,
        ease: "power4.out",
      })
      gsap.to(cameraPosition, {
        duration: 2,
        x: 30,
        y: 12,
        z: -40,
        ease: "power4.out",
      })
    }
  }, [zoomIn])
  useFrame((state, delta) => {
    camera.lookAt(box.current.position)
    pointer.scene.lookAt(
      new THREE.Vector3(
        camera.position.x,
        camera.position.y * Math.PI * 2,
        camera.position.z
      )
    )
    // pointer.scene.position.y = Math.sin(state.clock.elapsedTime) * 0.3 + 10.5
  })
  // if (lightRef.current) {
  //   // lightRef.current.shadow.bias = 0.0001
  // }
  return (
    <PresentationControls
      enabled={false}
      polar={[-0.1, 0.1]}
      azimuth={[-0.2, 0.2]}
    >
      <ambientLight intensity={0.15} />
      <Float
        speed={0.2}
        rotationIntensity={0.2}
        floatIntensity={0.2}
        floatingRange={[-0.1, 0.1]}
      >
        <Physics>
          <Debug />
          {/* <RigidBody type="fixed"> */}
          <primitive
            ref={floorRef}
            object={woodFloor.scene}
            scale={[20, 20, 24]}
            position={[0, 0, 0]}
          />
          {/* </RigidBody> */}
          <spotLight
            ref={lightRef}
            castShadow
            position={[23.2, 15.5, -18]}
            intensity={0.25}
            color="white"
            shadow-mapSize={[2048, 2048]}
          />

          <primitive object={rug.scene} scale={15} position={[2.7, 1, -2.8]} />

          <primitive
            rotation-y={Math.PI}
            ref={tableRef}
            object={desk.scene}
            scale={[15, 12, 11]}
            position={[15.4, 0.4, -4.3]}
          />
          <primitive
            object={wallWindow.scene}
            scale={[20, 10, 5]}
            position={[0, 0.8, 0]}
          />
          <mesh ref={box} scale={1} position={[0, 0, 0]}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="red" wireframe />
          </mesh>
          <primitive
            onClick={() => {
              setZoomIn(!zoomIn)
            }}
            ref={zoomButton}
            object={pointer.scene}
            position={[12.1, 7, -4.2]}
            scale={[0.001, 0.002, 0.001]}
            rotation={[Math.PI * 1.5, 0, Math.PI * 2.5]}
          />
          <primitive
            rotation-y={Math.PI * 0.7}
            object={computer.scene}
            scale={10}
            position={[8, 5, -1]}
          />
          <primitive
            rotation-y={Math.PI}
            object={keyboard.scene}
            scale={10}
            position={[11.7, 5, -3.8]}
          />
          <primitive
            object={mouse.scene}
            scale={10}
            position={[7.4, 5, -3.1]}
          />
          <primitive
            object={tableLamp.scene}
            scale={10}
            position={[13.7, 5, -0.7]}
          />
          <pointLight
            ref={lampLight}
            intensity={0.2}
            color="white"
            position={[14.4, 7.7, -1.3]}
          />
          <primitive
            object={deskChair.scene}
            scale={10}
            rotation-y={Math.PI * 0.4}
            position={[8.3, 1.3, -6.1]}
          />
          <primitive
            object={stand.scene}
            scale={2}
            rotation-y={Math.PI * 0.9}
            position={[16.8, 3, -1.5]}
          />
          <Guitar
            scale={1.2}
            rotation-y={Math.PI * -1.9}
            rotation-x={Math.PI}
            rotation-z={Math.PI * 1.5}
            position={[15.9, 4.1, -2]}
          />
          <primitive
            object={bookcase.scene}
            scale={10}
            position={[0.3, 0.9, -0.1]}
          />
          <primitive
            object={books.scene}
            scale={15}
            position={[3.6, 7, -2.1]}
            rotation-x={Math.PI}
            rotation-z={Math.PI}
          />
          <primitive
            object={speaker.scene}
            scale={[10, 6, 10]}
            position={[1.5, 4.6, -1]}
          />
          <primitive
            rotation-y={Math.PI * 1.5}
            object={wallDoorway.scene}
            scale={[12, 10, 5]}
            position={[0, 0.8, -24]}
          />
          <primitive
            rotation-y={Math.PI * 1.5}
            object={wall.scene}
            scale={[12, 10, 5]}
            position={[0, 0.8, -12.2]}
          />
          {/* <primitive
        rotation-y={Math.PI * 1.5}
        object={lightswitch.scene}
        scale={[12, 10, 5]}
        position={[p.x, p.y, p.z]}
      /> */}
          <Text3D
            font={"/poppins.json"}
            position={[0, 16.1, -2.1]}
            rotation-y={Math.PI * 0.5}
            size={2.5}
          >
            Fike
            <meshStandardMaterial color="yellowgreen" />
          </Text3D>
          <Text3D
            font={"/poppins.json"}
            position={[9.3, 16.1, 0]}
            rotation-y={Math.PI}
            size={2.5}
          >
            Carl
            <meshStandardMaterial color="yellowgreen" />
          </Text3D>
        </Physics>
      </Float>
    </PresentationControls>
  )
}

export default Room

import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

// Scene 
const scene = new THREE.Scene()

// Create object 
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh( geometry, material )
cube.position.set(0, 0, 0)
scene.add(cube)

// Scale 
cube.scale.set(1, 1, 1)   

// Camera 
const sizes = { 
  width: window.innerWidth, 
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer 
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)

// Animations 
const tick = () => {
  
  // Render 
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
  // function gets called on each frame 
}

tick()
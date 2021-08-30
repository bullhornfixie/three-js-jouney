import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

console.log(gsap)

// Scene 
const scene = new THREE.Scene()

// Create object 
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

const cube = new THREE.Mesh( geometry, material )
cube.position.set( 0, 0, 0)
scene.add( cube )

// Scale 
cube.scale.set(1, 1, 1)   

// Camera 
const sizes = { width: 800, height: 600 }
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer 
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)

gsap.to(cube.position, { duration: 1, delay: 1, x: 2})
// Not animating the cube but the cube position 

const tick = () => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
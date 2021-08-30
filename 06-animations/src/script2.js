import './style.css'
import * as THREE from 'three'

// Scene 
const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

// Create object 
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
// renders in <canvas> in HTML file 
renderer.setSize(sizes.width, sizes.height)
// resizes <canvas> element in DOM

// Clock 
const clock = new THREE.Clock()

// Animations 
const tick = () => {

  // Clock 
  const elapsedTime = clock.getElapsedTime()
  console.log(elapsedTime)

  // Update objects 
  // cube.position.x += 0.01
  // each time the function is called 
  // cube position moves along x axes by 0.01 
  // give the effect of motion to the right 

  // Update objects - spin 
  // cube.rotation.y += 0.002 

  cube.rotation.y = elapsedTime
  // using Elapsed time makes the motion speed independent of frame speed

  // Update objects - up and down 
  cube.position.y = Math.sin(elapsedTime)
  
  // Render 
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
  // function gets called on each frame 

}

tick()
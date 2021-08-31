import './style.css'
import * as THREE from 'three'

// Spin cube with mouse 

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
const sizes = { width: 800, height: 800 }

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 200) 
// (FOV, aspect ratio, near plane, far plane)

camera.position.x = 2
camera.position.y = 2
camera.position.z = 2
scene.add(camera)

// Cursor
const cursor = {
  x: 0,
  y: 0
}

window.addEventListener('mousemove', (event) => 
// when mouse moves log the co-ordinates of mouse on Y and X axes 
{
  cursor.x = - (event.clientX / sizes.width - 0.5)
  cursor.y = event.clientY / sizes.width - 0.5
  // reduces range by dividing by width 
  // by adding - 0.5 the range either side of the cube goes from -0.5 to +0.5
  console.log(cursor.x)
})

// Renderer 
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)

// Animations 
const tick = () => {

  // Update Camera 
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  camera.position.y = cursor.y * 5
  // 1 revolution from -0.5 to 0.5 along x axes shows 4 faces of cube
  camera.lookAt(cube.position)


  // Render 
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
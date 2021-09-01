import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Scene 
const scene = new THREE.Scene()

// Float32 array 
// const positionArray = new Float32Array(9)
// // Vertex1
// positionsArray[0] = 0 // x
// positionsArray[1] = 0 // y
// positionsArray[2] = 0 // z

// // Vertex2
// positionsArray[3] = 0 // x
// positionsArray[4] = 1 // y
// positionsArray[5] = 0 // z


// // Vertex3
// positionsArray[6] = 0 // x
// positionsArray[7] = 0 // y
// positionsArray[8] = 0 // z

const vertices = new Float32Array([ 
  0, 0, 0, // Vertex1
  0, 1, 0, // Vertex2
  1, 0, 0  // Vertex3
])

const geometry = new THREE.BufferGeometry()

const positionsAttribute = new THREE.BufferAttribute( vertices, 3 )
geometry.setAttribute('position', positionsAttribute)


const material = new THREE.MeshBasicMaterial({ 
  color: 0x00ff00, 
  wireframe: true
})

const mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, 0, 0)
scene.add( mesh )

// Sizes 
const sizes = { 
  width: window.innerWidth,
  height: window.innerHeight
}

// Resize
window.addEventListener('resize', () => {

  // Update sizes
  sizes.width = window.innerWidth 
  sizes.height = window.innerHeight

  // Update camera 
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer 
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 200) 
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
{
  cursor.x = - (event.clientX / sizes.width - 0.5)
  cursor.y = event.clientY / sizes.width - 0.5
})

// Renderer 
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)

// Orbit Controls 
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.update()

// Animations 
const tick = () => {

  // Update Camera 
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  camera.position.y = cursor.y * 5
  camera.lookAt(mesh.position)

  // Render 
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()

import './style.css'
import * as THREE from 'three'

// Scene 
const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

const cubeA = new THREE.Mesh( geometry, material )
cubeA.position.set( 0.5, -1.5, 1.0)

const cubeB = new THREE.Mesh( geometry, material )
cubeB.position.set( 1, 1.5, -0.6)

const group = new THREE.Group()
group.add( cubeA)
group.add( cubeB)

scene.add( group )


// Scale 
group.scale.set(2, 0.5, 0.5)   

// Rotation 
group.rotation.y = Math.PI * 0.26
group.rotation.x = Math.PI * 0.26

// Axes Helper 
const axesHelper = new THREE.AxesHelper(2) // add axes and change length 
scene.add(axesHelper)

// Camera 
const sizes = { width: 800, height: 600 }

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer 
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
// also resizes canvas element in DOM

renderer.render(scene, camera)
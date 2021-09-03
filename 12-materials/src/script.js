import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Textures 
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/1.png') 
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

// Gradient with lighting 
gradientTexture.minFilter = THREE.NearestFilter 
gradientTexture.magFilter = THREE.NearestFilter

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object 
// const material = new THREE.MeshBasicMaterial()

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial()
// when close to camera gets lighter 

// const material = new THREE.MeshLambertMaterial()
// this material reacts to light

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0xff0000)

const material = new THREE.MeshToonMaterial()
material.gradientMap = gradientTexture

// material.map = doorColorTexture
// material.color.set('#ff00ff')
// material.color = new THREE.Color('#ff00ff') // instance of color class 
// material.wireframe = true

// material.transparent = true
// material.alphaMap = doorAlphaTexture

// Transparency 
// material.opacity = 0.5
// material.transparent = true

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16), 
  material
)

sphere.position.x = -1.5

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  // a plane is flat surface / 2D and thus only requires 2 co-ordinates for x and y axes 
  material
)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material 
)

torus.position.x = 1.5

scene.add(sphere, plane, torus)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Lights 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5) // (color, intensity )
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4 
scene.add(pointLight)

window.addEventListener('resize', () =>
{
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

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects 
    sphere.rotation.y = 0.1 * elapsedTime 
    plane.rotation.y = 0.1 * elapsedTime 
    torus.rotation.y = 0.1 * elapsedTime 

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
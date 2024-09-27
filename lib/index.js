const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")
const { Presets } = require("cli-progress")
const SingleBar = require("cli-progress").SingleBar
const colors = require("ansi-colors")
const { log } = require("console")


function createProject(name, core, installPackages) {

  const coreName = () => {
    switch (core) {
      case 'webpack':
        return 'Webpack'
      case 'three':
        return 'Three Js'
      case 'three-basic':
        return 'Three Js'
      case 'three-shader':
        return 'Three Js Shaders'
      case 'three-master':
        return 'Three Js Advance'
      default:
        return 'Webpack'
    }
  }

  //SECTION PATH
  const appRoot = path.join(process.cwd(), name)

  if (!fs.existsSync(appRoot)) {
    fs.mkdirSync(appRoot)
  } else {
    return console.error(`${colors.redBright(`Couldn't create project ${name}\nDirectory with same name already exists.`)}`)
  }

  const srcPath = path.join(appRoot, "src")
  fs.mkdirSync(srcPath)

  const publicPath = path.join(appRoot, "public")
  fs.mkdirSync(publicPath)

  const shaderPath = path.join(appRoot, "src/shaders")


  //!SECTION

  //SECTION CORE JS 

  const coreJs = () => {
    switch (core) {
      //STUB - THREE
      case 'three':
        return `
        
        import './styles.css'
        import * as THREE from 'three'
        import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
        import * as dat from 'lil-gui'
        
        // Debug
        const gui = new dat.GUI()
        
        //Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        
        // Canvas
        const canvas = document.querySelector('canvas.webgl')
        
        // Scene
        const scene = new THREE.Scene()
        
        // Camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.z=5
        scene.add(camera)
        
        //Geometry
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        
        // Material
        const material = new THREE.MeshStandardMaterial()
        material.roughness = 0.4
        
        // Objects
        const cube = new THREE.Mesh(geometry, material)
        
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(5000, 5000), material)
        plane.rotation.x = - Math.PI * 0.5
        plane.position.y = - 1
        
        scene.add(cube, plane)
        
        
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, .2)
        gui.add(ambientLight, 'intensity', 0, 2).name('Ambient Light')
        scene.add(ambientLight)
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0x0000fc, 0.8)
        directionalLight.position.set(2, 0.5, 0.5)
        const dL = gui.addFolder('Directional Light')
        dL.add(directionalLight, 'intensity', 0, 2).name('intensity')
        dL.add(directionalLight.position, 'x', -5, 5).name('x')
        dL.add(directionalLight.position, 'y', -5, 5).name('y')
        dL.add(directionalLight.position, 'z', -5, 5).name('z')
        scene.add(directionalLight)
        
        // Point light
        const pointLight = new THREE.PointLight(0xff9000, 1.5, 10, 2)
        pointLight.position.set(.33,  .33, 1.3)
        const pL = gui.addFolder('Point Light')
        pL.add(pointLight, 'intensity', 0, 2).name('intensity')
        pL.add(pointLight.position, 'x', -5, 5).name('x')
        pL.add(pointLight.position, 'y', -5, 5).name('y')
        pL.add(pointLight.position, 'z', -5, 5).name('z')
        scene.add(pointLight)
        
        // Helpers
        const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
        scene.add(directionalLightHelper)
        
        const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
        scene.add(pointLightHelper)
        
        
        //Handle Resize
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
        const animate = () => {
            const elapsedTime = clock.getElapsedTime()
        
            // Rotate objects
            cube.rotation.y = 0.1 * elapsedTime
            cube.rotation.x = 0.15 * elapsedTime
        
            // Update controls
            controls.update()
        
            // Render
            renderer.render(scene, camera)
        
            // Call animate again on the next frame
            window.requestAnimationFrame(animate)
        }
        animate()

        `//!STUB

      //STUB - THREE BASIC
      case 'three-basic':
        return `
                
        import './styles.css'
        import * as THREE from 'three'
        import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
        
        import * as dat from 'lil-gui'
        
        // Constants 
        const sizes = { width: innerWidth, height: innerHeight }
        const clock = new THREE.Clock()
        
        const fps = { value: 60, current: 0, frame: 0, time: clock.getElapsedTime() }
        fps.interval = 1 / fps.value
        
        // Variables 
        let scene, renderer, gui, controls, camera, delta = 0, time = 0
        
        function init() {
        
          // Debug
          gui = new dat.GUI()
        
          // Scene
          scene = new THREE.Scene()
        
          //FPS
          gui && fpsDebug()
        
          // Camera
          camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height, 0.01, 1000)
          camera.position.z = 2
          scene.add(camera)
        
          // Renderer
          renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
          renderer.outputColorSpace = THREE.SRGBColorSpace
          renderer.toneMapping = THREE.ReinhardToneMapping
          document.body.append(renderer.domElement)
          resize()
        
          // Controls
          controls = new OrbitControls(camera, renderer.domElement)
          controls.enableDamping = true
        
          // Cube
          const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial())
          scene.add(cube)
        
          eventListeners()
          loop()
        }
        
        function eventListeners() {
          addEventListener('resize', resize)
        }
        
        function resize() {
          sizes.width = innerWidth
          sizes.height = innerHeight
          camera.aspect = sizes.width / sizes.height
          camera.updateProjectionMatrix()
          renderer.setSize(sizes.width, sizes.height)
          renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
        }
        
        function fpsDebug() {
          const debug = gui.addFolder("FPS")
          debug.add(fps, 'current').name('FPS Display').listen()
          debug.add(fps, 'value').min(1).max(300).name('FPS Limit').onChange(() => fps.interval = 1 / fps.value)
        }
        
        function updateFPS() {
          var currentTime = clock.getElapsedTime()
          if (currentTime - fps.time >= 1) {
            fps.time = currentTime
            fps.current = fps.frame
            fps.frame = 0
          }
          fps.frame++
        }
        
        const loop = () => {
        
          delta += clock.getDelta()
        
          time = clock.getElapsedTime()
        
          if (delta > fps.interval) {
        
            gui && updateFPS() // FPS Display Update
        
            controls.update() // Orbit Control Update
        
            renderer.render(scene, camera) // Renderer Update
        
            delta = delta % fps.interval
        
          }
          requestAnimationFrame(loop)
        }
        
        init()       
        
        `//!STUB

      //STUB - THREE SHADERS
      case 'three-shader':
      case 'three-shaders':
        return `      
        
        import './styles.css'
        import * as THREE from 'three'
        import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
              
              
        import * as dat from 'lil-gui'
        import vertex from './shaders/vertex.glsl'
        import fragment from './shaders/fragment.glsl'
              
        // Constants 
        const sizes = { width: innerWidth, height: innerHeight }
        const clock = new THREE.Clock()
              
        const fps = { value: 60, current: 0, frame: 0, time: clock.getElapsedTime() }
        fps.interval = 1 / fps.value
              
        // Variables 
        let delta = 0
        let time = 0
              
        let scene, renderer, gui, controls, camera, shaderPlane
              
        function init() {
        
          // Debug
          gui = new dat.GUI()
        
          // Scene
          scene = new THREE.Scene()
        
          //FPS
          gui && fpsDebug()
        
          // Camera
          camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height, 0.01, 1000)
          camera.position.z = 2
          scene.add(camera)
        
          // Renderer
          renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
          renderer.outputColorSpace = THREE.SRGBColorSpace
          renderer.toneMapping = THREE.ReinhardToneMapping
          document.body.append(renderer.domElement)
          resize()
        
          // Controls
          controls = new OrbitControls(camera, renderer.domElement)
          controls.enableDamping = true
        
          shaderPlane = createShaderPlane()
          gui && createObjectDebug(shaderPlane, 'Shader Plane')
        
        
          scene.add(shaderPlane)
        
          eventListeners()
          loop()
        }
        
        function createShaderPlane() {        
        
          //Geometry
          const planeGeometry = new THREE.PlaneGeometry(1, 1, 46, 64)        
        
          // Material
          const material = new THREE.ShaderMaterial({
            side: 2,
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms: {
              uTime: {
                value: time
              },
              offset: {
                value: -1
              },
              scale: {
                value: 10
              },
              blur: {
                value: 1
              },
              height: {
                value: 1
              },
              padding: {
                value: 0.001
              }
            }
          })
        
          const shader = gui.addFolder("ShaderUniforms")
          shader.add(material.uniforms.padding, 'value').name('Padding').step(.0001).min(0).max(1)
          shader.add(material.uniforms.offset, 'value').name('Offset').step(.1).min(-1).max(1)
          shader.add(material.uniforms.blur, 'value').name('Blur').step(.01).min(0).max(1)
          shader.add(material.uniforms.scale, 'value').name('Scale').step(.01).min(-100).max(100)
          shader.add(material.uniforms.height, 'value').name('Height').step(.01).min(1).max(10)
        
        
          // Mesh
          const shaderPlane = new THREE.Mesh(planeGeometry, material)
        
          return shaderPlane        
        
        }
        
        function createObjectDebug(object, title) {
          const debug = gui.addFolder(title)
        
          createDebug(debug, object, "visible", "Visible")
        
          const position = debug.addFolder('Position')
          createDebug(position, object.position, "x", "Position X")
          createDebug(position, object.position, "y", "Position Y")
          createDebug(position, object.position, "z", "Position Z")
        
          const rotation = debug.addFolder('Rotation')
          createDebug(rotation, object.rotation, "x", "Rotation X")
          createDebug(rotation, object.rotation, "y", "Rotation Y")
          createDebug(rotation, object.rotation, "z", "Rotation Z")
        }
        
        function createDebug(debug = gui, obj, target, name, min = -5, max = 5, step = .001) {
          debug.close()
          debug.add(obj, target).min(min).max(max).step(step).name(name)
        }
        
        function eventListeners() {
          addEventListener('resize', resize)
        }
        
        function resize() {
          sizes.width = innerWidth
          sizes.height = innerHeight
          camera.aspect = sizes.width / sizes.height
          camera.updateProjectionMatrix()
          renderer.setSize(sizes.width, sizes.height)
          renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
        }
        
        function fpsDebug() {
          const debug = gui.addFolder("FPS")
          debug.add(fps, 'current').name('FPS Display').listen()
          debug.add(fps, 'value').min(1).max(300).name('FPS Limit').onChange(() => fps.interval = 1 / fps.value)
        }
        
        function updateFPS() {
          var currentTime = clock.getElapsedTime()
          if (currentTime - fps.time >= 1) {
            fps.time = currentTime
            fps.current = fps.frame
            fps.frame = 0
          }
          fps.frame++
        }
        
        const loop = () => {
        
          delta += clock.getDelta()
        
          time = clock.getElapsedTime()
        
          shaderPlane.material.uniforms.uTime.value=time
        
          if (delta > fps.interval) {
          
            gui && updateFPS() // FPS Display Update
          
            controls.update() // Orbit Control Update
          
            renderer.render(scene, camera) // Renderer Update
          
            delta = delta % fps.interval
          
          }
          requestAnimationFrame(loop)
        }
        
        init()
        
        `//!STUB

      //STUB - WEBPACK
      case 'three-master':
        return `
                
        import './styles.css'
        import * as THREE from 'three'
        import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
        import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
        import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
        import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"
        import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
        import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
        import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
        import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
        import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'

        import gsap from 'gsap'

        import * as dat from 'lil-gui'
        import vertex from './shaders/vertex.glsl'
        import fragment from './shaders/fragment.glsl'

        // Constants 
        const sizes = { width: innerWidth, height: innerHeight }
        const isAndroid = /Mobi|Android/i.test(navigator.userAgent) && !window.MSStream
        const isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent) && !window.MSStream
        const isMobileDevice = isAndroid || isIOS
        const mouse = new THREE.Vector3(), gyro = new THREE.Vector2(), clock = new THREE.Clock()

        const fps = { value: 60, current: 0, frame: 0, time: clock.getElapsedTime() }
        fps.interval = 1 / fps.value

        // Variables 
        let delta = 0
        let time = 0

        let scene, renderer, composer, gui, manager, controls, gltfLoader, rgbeLoader, textureLoader, raycaster, camera, planeGeometry, mixer,bgTexture

        let group

        function init() {
        
          // Debug
          gui = new dat.GUI()
        
          // Scene
          scene = new THREE.Scene()
        
          // Loading Manager
          manager = new THREE.LoadingManager()
        
          // GLTF Loader
          gltfLoader = new GLTFLoader(manager)
        
          // Draco Loader
          const draco = new DRACOLoader(manager)
          draco.setDecoderConfig({ type: 'js' })
          draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
          gltfLoader.setDRACOLoader(draco)
        
          // RGBE Loader
          rgbeLoader = new RGBELoader(manager)
        
          // Texture Loader
          textureLoader = new THREE.TextureLoader(manager)
        
        
          // Environment
          environmentSetup()
        
        
          // Raycaster
          raycaster = new THREE.Raycaster()
        
          //FPS
          gui && fpsDebug()
        
          // Camera
          camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height, 0.01, 1000)
          scene.add(camera)
        
        
          // Renderer
          renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
          renderer.outputColorSpace = THREE.SRGBColorSpace
          renderer.toneMapping = THREE.ReinhardToneMapping
          document.body.append(renderer.domElement)
          postprocessing()
          resize()
        
          // Controls
          controls = new OrbitControls(camera, renderer.domElement)
          controls.enableDamping = true
        
          //Geometry
          planeGeometry = new THREE.PlaneGeometry(1, 1, 46, 64)
        
          //Group
          group = new THREE.Group()
          scene.add(group)
        
        
          //Objects
          const plane = createBasicPlane()
          plane.position.y = -.501
          plane.rotation.x = THREE.MathUtils.degToRad(90)
          gui && createObjectDebug(plane, 'Basic Plane')
        
          const shaderPlane = createShaderPlane()
          shaderPlane.position.y = .501
          shaderPlane.rotation.x = THREE.MathUtils.degToRad(-90)
          gui && createObjectDebug(shaderPlane, 'Shader Plane')
        
          const box = createGlassBox()
          gui && createObjectDebug(box, 'Glass Box')
        
          group.add(shaderPlane, plane, box)
          group.position.y = -.25
        
          loadModel()
        
          // Group Animation
          gsap.to(group.rotation, {
            duration: 15,
            y: Math.PI * 2,
            ease: "none",
            repeat: -1,
            onUpdate: () => {
              shaderPlane.material.uniforms.uTime.value = time
            }
          })
        
          eventListeners()
          loop()
        }

        function environmentSetup() {
          rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/kloppenheim_07_puresky_2k.hdr', (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace
            texture.mapping = THREE.EquirectangularReflectionMapping
            scene.environment = texture
            const bgTexture = texture 
            scene.background = texture
          })
        }

        function postprocessing() {
        
          const renderTarget = new THREE.WebGLRenderTarget(sizes.width, sizes.height, {
            samples: 4,
            type: THREE.FloatType,
          })
        
          const renderScene = new RenderPass(scene, camera)
          composer = new EffectComposer(renderer, renderTarget)
        
          const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.25, 0.5, 1)
          if (gui) {
            const bloom = gui.addFolder('Bloom')
          
            bloom.add(bloomPass, 'enabled')
            bloom.add(bloomPass, 'strength').min(-1.5).max(1.5)
            bloom.add(bloomPass, 'radius').min(-1.5).max(1.5)
            bloom.add(bloomPass, 'threshold').min(-1.5).max(1.5)
            bloom.close()
          }
        
          const outputPass = new OutputPass()
        
          if (renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2) {
            const smaaPass = new SMAAPass()
            composer.addPass(smaaPass)
          }
        
          composer.addPass(renderScene)
          composer.addPass(bloomPass)
          composer.addPass(outputPass)
        }

        function createShaderPlane() {
        
          // Material
          const material = new THREE.ShaderMaterial({
            side: 2,
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms: {
              uTime: {
                value: time
              },
              offset: {
                value: -1
              },
              scale: {
                value: 10
              },
              blur: {
                value: 1
              },
              height: {
                value: 1
              },
              padding: {
                value: 0.001
              }
            }
          })
        
          const shader = gui.addFolder("ShaderUniforms")
          shader.add(material.uniforms.padding, 'value').name('Padding').step(.0001).min(0).max(1)
          shader.add(material.uniforms.offset, 'value').name('Offset').step(.1).min(-1).max(1)
          shader.add(material.uniforms.blur, 'value').name('Blur').step(.01).min(0).max(1)
          shader.add(material.uniforms.scale, 'value').name('Scale').step(.01).min(-100).max(100)
          shader.add(material.uniforms.height, 'value').name('Height').step(.01).min(1).max(10)
        
        
        
          // Mesh
          const shaderPlane = new THREE.Mesh(planeGeometry, material)
        
          return shaderPlane
        
        
        }

        function createBasicPlane() {
        
          // Material
          const material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            color: 'black'
          })
        
          // Mesh
          const basicPlane = new THREE.Mesh(planeGeometry, material)
        
          return basicPlane
        }

        function createGlassBox() {
          //Geometry
          const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 16, 16, 16)
        
        
          // Material
          const material = new THREE.MeshPhysicalMaterial({
            transmission: 1,
            thickness: 1.27,
            ior: 1.5,
            roughness: 0.,
          })
        
          // Mesh
          const box = new THREE.Mesh(boxGeometry, material)
        
          return box
        }

        function loadModel() {
          gltfLoader.load('https://threejs.org/examples/models/gltf/PrimaryIonDrive.glb', (glb) => {
            const model = glb.scene
            model.traverse((obj) => {
              if(obj.material && obj.material.name.includes('constant1')){
                console.log(obj.material);
                obj.material.emissive=new THREE.Color('red')
              }
            
              if (obj.isMesh) {
                obj.material.emissiveIntensity=9
                obj.material.side = 2
                obj.material.transparent = false
              }
            })
            model.scale.set(.5, .5, .5)
          
            //Loading model animations
            mixer = new THREE.AnimationMixer(model)
            const clip = glb.animations[0]
            mixer.clipAction(clip.optimize()).play()
          
            group.add(model)
          })
        
        }

        function createObjectDebug(object, title) {
          const debug = gui.addFolder(title)
        
          createDebug(debug, object, "visible", "Visible")
        
          const position = debug.addFolder('Position')
          createDebug(position, object.position, "x", "Position X")
          createDebug(position, object.position, "y", "Position Y")
          createDebug(position, object.position, "z", "Position Z")
        
          const rotation = debug.addFolder('Rotation')
          createDebug(rotation, object.rotation, "x", "Rotation X")
          createDebug(rotation, object.rotation, "y", "Rotation Y")
          createDebug(rotation, object.rotation, "z", "Rotation Z")
        }

        function createDebug(debug = gui, obj, target, name, min = -5, max = 5, step = .001) {
          debug.close()
          debug.add(obj, target).min(min).max(max).step(step).name(name)
        }

        function eventListeners() {
        
          addEventListener('resize', resize)
          addEventListener('mousemove', setMouse)
          window.DeviceMotionEvent && addEventListener('devicemotion', setGyro)
        
        }

        function setMouse(e) {
          mouse.set(e.clientX / innerWidth, e.clientY / innerHeight)
        }

        function setGyro(event) {
          gyro.x = THREE.MathUtils.clamp(event.accelerationIncludingGravity.x, -.5, .5)
          gyro.y = THREE.MathUtils.clamp(event.accelerationIncludingGravity.y, 0, 5) * (isIOS ? -1 : 1)
        }

        function resize() {
          sizes.width = innerWidth
          sizes.height = innerHeight
          camera.aspect = sizes.width / sizes.height
          camera.updateProjectionMatrix()
          renderer.setSize(sizes.width, sizes.height)
          renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
          composer.setSize(sizes.width, sizes.height)
          composer.setPixelRatio(Math.min(devicePixelRatio, 2))
        
        }

        function fpsDebug() {
          const debug = gui.addFolder("FPS")
          debug.add(fps, 'current').name('FPS Display').listen()
          debug.add(fps, 'value').min(1).max(300).name('FPS Limit').onChange(() => fps.interval = 1 / fps.value)
        }

        function updateFPS() {
          var currentTime = clock.getElapsedTime()
          if (currentTime - fps.time >= 1) {
            fps.time = currentTime
            fps.current = fps.frame
            fps.frame = 0
          }
          fps.frame++
        }

        const loop = () => {
        
          delta += clock.getDelta()
        
          time = clock.getElapsedTime()
        
          camera.position.x = Math.sin(time) * 3
          camera.position.z = Math.cos(time) * 4
        
          camera.position.y = -Math.sin(time)
        
          camera.lookAt(group.position)
          camera.updateProjectionMatrix()
        
        
          if (delta > fps.interval) {
          
            gui && updateFPS() // FPS Display Update
          
            controls.update() // Orbit Control Update
          
            composer.render() // Composer Update
          
            mixer && mixer.update(delta) // Model Animation Update
          
            // renderer.render(scene, camera) // Renderer Update
          
            delta = delta % fps.interval
          
          }
          requestAnimationFrame(loop)
        }

        init()
        
        `//!STUB

      //STUB - WEBPACK Default
      default:
        return `import './styles.css'`
      //!STUB
    }
  }

  const indexFilePath = path.join(srcPath, "index.js")
  fs.writeFileSync(indexFilePath, coreJs())

  //!SECTION

  //SECTION CORE HTML 

  const coreHtml = () => {
    switch (core) {
      case 'three':
        return '<canvas class="webgl"></canvas>'
      case 'three-basic':
      case 'three-shader':
      case 'three-master':
        return ''

      default:
        return '<h1>Hello, Webpack</h1>'

    }
  }

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${coreName()}</title>
  </head>
  <body>
      ${coreHtml()}
  </body>
  </html>
  `
  const htmlFilePath = path.join(srcPath, "index.html")
  fs.writeFileSync(htmlFilePath, htmlContent)

  //!SECTION

  //SECTION CORE CSS

  const coreCss = () => {
    switch (core) {
      case 'three':
      case 'three-basic':
      case 'three-shader':
      case 'three-master':
        return 'overflow: hidden;'
      default:
        return ''
    }
  }

  const cssContent = `
    * {box-sizing: border-box;}
    html,
    body {
        min-height: 100%;
        background: #fff;
        color: #000;
    }
    
    body {
      ${coreCss()}
        font-size: 1.4rem;
        text-rendering: optimizeLegibility;
    }
    
    body,ul,ol,dl {margin: 0;}
    
    h1 {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
        margin: 0;
        padding: 0;
    }
    `
  const cssFilePath = path.join(srcPath, "styles.css")
  fs.writeFileSync(cssFilePath, cssContent)

  //!SECTION

  //SECTION CORE GLSL

  if (core == 'three-shader' || core == 'three-master') {
    fs.mkdirSync(shaderPath)

    //STUB Vertex Shader 

    const vertex = `    
    varying vec2 vuv;
    uniform float uTime;
    uniform float blur;
    uniform float offset;
    uniform float scale;
    uniform float height;
    uniform float padding;
    
    vec3 hash3(vec2 p)
    {
        vec3 q=vec3(dot(p,vec2(127.1,311.7)),
        dot(p,vec2(269.5,183.3)),
        dot(p,vec2(419.2,371.9)));
        return fract(sin(q)*43758.5453);
    }
    
    float voronoise(in vec2 p,float u,float v)
    {
        float k=1.+63.*pow(1.-v,6.);
        
        vec2 i=floor(p);
        vec2 f=fract(p);
        
        vec2 a=vec2(0.,0.);
        for(int y=-2;y<=2;y++)
        for(int x=-2;x<=2;x++)
        {
            vec2 g=vec2(x,y);
            vec3 o=hash3(i+g)*vec3(u,u,1.);
            vec2 d=g-f+o.xy;
            float w=pow(1.-smoothstep(0.,1.414,length(d)),k);
            a+=vec2(o.z*w,w);
        }
        
        return a.x/a.y;
    }
    void main()
    {
        
        float distanceFromCenterX=abs(position.x);
        float distanceFromCenterY=abs(position.y);
    
        float padding =padding/2. -.0000001;
    
        bool insideBorder=distanceFromCenterX<(.5-padding)&&distanceFromCenterY<(.5-padding);
        
        float bump=insideBorder?voronoise(uv*scale,offset*sin(uTime),blur)*height:0.;
        
        vec4 modelPosition=modelMatrix*vec4(position.xy,bump,1.);
        vec4 viewPosition=viewMatrix*modelPosition;
        vec4 projectedPosition=projectionMatrix*viewPosition;
        gl_Position=projectedPosition;
        
        vuv=uv;
    }`
    fs.writeFileSync(path.join(shaderPath, "vertex.glsl"), vertex)

    //!STUB

    //STUB Fragment Shader 

    const fragment = `
    varying vec2 vuv;
    uniform float uTime;
    
    void main(){
        gl_FragColor=vec4(vuv.x*3.,vuv.y*3.,clamp(sin(uTime/10.),.1,.9)*3.,1.);
    }   
    `
    fs.writeFileSync(path.join(shaderPath, "fragment.glsl"), fragment)

    //!STUB

  }

  //!SECTION

  //SECTION Webpack Config


  const webpackConfig = `
  const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
  new MiniCssExtractPlugin({
    filename: './styles.css',
  }),
]

const fs = require('fs')
const publicDirectory = path.resolve(__dirname, 'public')
if (fs.existsSync(publicDirectory) && fs.readdirSync(publicDirectory).length > 0) {
  plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: '' },
      ],
    })
  )
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './bundle.js',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /.(html)$/,
        use: ['html-loader'],
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /.(jpg|png|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext]',
        },
      },
      {
        test: /.(glsl|frag|vert)$/,
        use: ['raw-loader', 'glslify-loader'],
      },
    ],
  },
  plugins: plugins,
  devServer: {
    host: 'localhost',
    port: 3000, 
    open: true,
    allowedHosts: 'all',
    hot: false,
    watchFiles: ['src/**', 'public/**'], 
    static: {
      watch: true,
      directory: path.join(__dirname, 'public'), 
    },
  },
};
  `
  fs.writeFileSync(path.join(appRoot, "webpack.config.js"), webpackConfig)

  //!SECTION


  //SECTION Package Installer

  const packagesToInstall = [
    "copy-webpack-plugin",
    "html-loader",
    "html-webpack-plugin",
    "mini-css-extract-plugin",
    "raw-loader",
    "@babel/core",
    "@babel/preset-env",
    "babel-loader",
    "css-loader",
    "glslify-loader@",
    "terser-webpack-plugin",
    "webpack",
    "webpack-cli",
    "webpack-dev-server",
  ]


  //SECTION Package JSON

  const packageJson = {
    name: name.toLowerCase().replaceAll(' ', '-'),
    version: "1.0.0",
    description: `A ${name} App`,
    main: "src/index.js",
    scripts: {
      start: "webpack-dev-server --open --mode development",
      build: "webpack --mode production",
    },
    "devDependencies": {
      "@babel/core": "^7.23.9",
      "@babel/preset-env": "^7.23.9",
      "babel-loader": "^9.1.3",
      "copy-webpack-plugin": "^12.0.2",
      "css-loader": "^6.10.0",
      "glslify-loader": "^2.0.0",
      "html-loader": "^5.0.0",
      "html-webpack-plugin": "^5.6.0",
      "mini-css-extract-plugin": "^2.8.0",
      "raw-loader": "^4.0.2",
      "terser-webpack-plugin": "^5.3.10",
      "webpack": "^5.90.2",
      "webpack-cli": "^5.1.4",
      "webpack-dev-server": "^5.0.2"
    },
  }

  const packageJsonPath = path.join(appRoot, "package.json")

  switch (core) {
    case 'three':
    case 'three-basic':
    case 'three-shader':
      pushPackage('three', 'lil-gui')
      break
    case 'three-master':
      pushPackage('three', 'lil-gui', 'gsap')
      break
  }

  function pushPackage(...args) {
    args.forEach(arg => packagesToInstall.push('nondevpackage-' + arg))
  }

  //!SECTION
  if (installPackages) {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4))
    const progressBar = new SingleBar({
      format: colors.blueBright('Generating ') + colors.whiteBright('[') + colors.greenBright('{bar}') + colors.whiteBright('] ') + colors.greenBright('{percentage}%') + colors.whiteBright(' |') + colors.magentaBright(' Time Remaining: ') + colors.yellowBright('{eta}s'),
      hideCursor: true,
      clearOnComplete: true
    }, Presets.rect)

    try {
      let i = 0
      progressBar.start(packagesToInstall.length, 0, { eta: "N/A" })
      console.clear()
      for (const packageName of packagesToInstall) {
        if (i == 0) console.log(`${colors.blueBright('Generating')} ${colors.whiteBright('[                                        ]')} ${colors.greenBright('0%')} ${colors.whiteBright('|')} ${colors.magentaBright('Time Remaining:')} ${colors.yellowBright('N/A')}`)
        const command = packageName.includes('nondevpackage-') ? `npm install ${packageName.replace('nondevpackage-', '')} ` : `npm install ${packageName} --save-dev`
        execSync(command, { cwd: appRoot })
        if (i == 0) console.clear()
        progressBar.increment()
        i++
      }
      progressBar.stop()
      console.clear()
      console.log(`${colors.blueBright(`
  
      ██╗    ██╗███████╗██████╗ ██████╗  █████╗  ██████╗██╗  ██╗ 
      ██║    ██║██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██║ ██╔╝ 
      ██║ █╗ ██║█████╗  ██████╔╝██████╔╝███████║██║     █████╔╝  
      ██║███╗██║██╔══╝  ██╔══██╗██╔═══╝ ██╔══██║██║     ██╔═██╗  
      ╚███╔███╔╝███████╗██████╔╝██║     ██║  ██║╚██████╗██║  ██╗ 
       ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═╝     ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ 
  `)}
  Created "${colors.greenBright(name)}" ${colors.blueBright('Webpack')} app.\n`)
    } catch (error) {
      progressBar.stop()
      console.error("An error occurred:", error)
    }
  } else {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4).slice(0, -1) +
      `,
      "dependencies": {
          ${core == 'three-master' ? `"gsap": "^3.12.5",` : ''}
          "lil-gui": "^0.19.1",
          "three": "^0.161.0"
      }
  }
  `)

    console.clear()
    console.log(`${colors.blueBright(`

  ██╗    ██╗███████╗██████╗ ██████╗  █████╗  ██████╗██╗  ██╗ 
  ██║    ██║██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██║ ██╔╝ 
  ██║ █╗ ██║█████╗  ██████╔╝██████╔╝███████║██║     █████╔╝  
  ██║███╗██║██╔══╝  ██╔══██╗██╔═══╝ ██╔══██║██║     ██╔═██╗  
  ╚███╔███╔╝███████╗██████╔╝██║     ██║  ██║╚██████╗██║  ██╗ 
   ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═╝     ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ 
`)}
Created "${colors.greenBright(name)}" ${colors.blueBright('Webpack')} app.
${colors.green('Run')} npm ${colors.cyan('i')} to ${colors.magentaBright('install')} all ${colors.blueBright('packages')}.`)
  }

  //!SECTION

}

module.exports = {
  createProject
}

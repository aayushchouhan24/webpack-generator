#!/usr/bin/env node

import fs from "fs"
import path from "path"
import { execSync } from "child_process"
import { Presets, SingleBar } from "cli-progress"
import colors from 'ansi-colors'
import minimist from 'minimist'

const appName = process.argv[2] || "webpack-app"

const templateType = minimist(process.argv.slice(2))['core'] || 'webpack'

const createApp = async () => {
  const appRoot = path.join(process.cwd(), appName)

  if (!fs.existsSync(appRoot)) {
    fs.mkdirSync(appRoot)
  }

  const coreName = () => {
    switch (templateType) {
      case 'webpack':
        return 'Webpack'
      case 'three':
        return 'Three Js'
      case 'three-basic':
        return 'Three Js'
      case 'three-shader':
        return 'Three Js'
      default:
        return 'Webpack'
    }
  }

  const packageJson = {
    name: appName,
    version: "1.0.0",
    description: `A ${coreName()} App`,
    main: "src/index.js",
    scripts: {
      start: "webpack-dev-server --open --mode development",
      build: "webpack --mode production",
    }
  }

  const packageJsonPath = path.join(appRoot, "package.json")
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4))

  const srcPath = path.join(appRoot, "src")
  fs.mkdirSync(srcPath)

  const coreJs = () => {
    switch (templateType) {
      case 'webpack':
        return `import './styles.css'`
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
camera.position.set(2.2, 0.8, 2.1)
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
        `
      case 'three-basic':
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

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2.2, 0.8, 2.1)
scene.add(camera)

// Cube
const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial())
scene.add(cube)

//Handle Resize
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Renderer
const renderer = new THREE.WebGLRenderer()
document.body.append(renderer.domElement)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const clock = new THREE.Clock()
const loop = () => {
  const elapsedTime = clock.getElapsedTime()
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()
        `
      case 'three-shader':
        return `
import './styles.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'

// Debug
const gui = new dat.GUI()

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2.2, 0.8, 2.1)
scene.add(camera)

// ShaderMaterial
const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment
})

// Cube
const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), shaderMaterial)
scene.add(cube)

//Handle Resize
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Renderer
const renderer = new THREE.WebGLRenderer()
document.body.append(renderer.domElement)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const clock = new THREE.Clock()
const loop = () => {
  const elapsedTime = clock.getElapsedTime()
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()
        `
      default:
        return `import './styles.css'`
    }
  }

  const indexFilePath = path.join(srcPath, "index.js")
  fs.writeFileSync(indexFilePath, coreJs())

  const publicPath = path.join(appRoot, "public")
  fs.mkdirSync(publicPath)

  const coreHtml = () => {
    switch (templateType) {
      case 'webpack':
        return '<h1>Hello, Webpack</h1>'
      case 'three':
        return '<canvas class="webgl"></canvas>'
      case 'three-basic':
        return ''
      case 'three-shader':
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
    <title>My Webpack App</title>
</head>
<body>
    ${coreHtml()}
</body>
</html>
`

  const htmlFilePath = path.join(srcPath, "index.html")
  fs.writeFileSync(htmlFilePath, htmlContent)

  const coreCss = () => {
    switch (templateType) {
      case 'webpack':
        return 'overflow: hidden;'
      case 'three':
        return 'overflow: hidden;'
      case 'three-basic':
        return 'overflow: hidden;'
      case 'three-shader':
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

  if (templateType === 'three-shader') {
    const shaderPath = path.join(appRoot, "src/shaders")
    fs.mkdirSync(shaderPath)

    const vertex = `
varying vec2 vuv;
void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    vuv = uv;
}
    `
    const vertexPath = path.join(shaderPath, "vertex.glsl")
    fs.writeFileSync(vertexPath, vertex)

    const fragment = `
varying vec2 vuv;
void main()
{
    gl_FragColor = vec4(vuv.x,vuv.y,1.0,1.0);
}
    `
    const fragmentPath = path.join(shaderPath, "fragment.glsl")
    fs.writeFileSync(fragmentPath, fragment)

  }




  const webpackConfig = `
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const TerserPlugin = require('terser-webpack-plugin');
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  
  const plugins = [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ];
  
  // Check if the 'public' directory contains files
  const fs = require('fs');
  const publicDirectory = path.resolve(__dirname, 'public');
  if (fs.existsSync(publicDirectory) && fs.readdirSync(publicDirectory).length > 0) {
    plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public', to: '' },
        ],
      })
    );
  }
  
  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/',
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
      static: path.resolve(__dirname, 'dist'),
      port: 3000,
    },
  };  
  `

  const webpackConfigPath = path.join(appRoot, "webpack.config.js")
  fs.writeFileSync(webpackConfigPath, webpackConfig)

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
  switch (templateType) {
    case 'three':
      packagesToInstall.push('three', 'lil-gui')
      break
    case 'three-basic':
      packagesToInstall.push('three', 'lil-gui')
      break
    case 'three-shader':
      packagesToInstall.push('three', 'lil-gui')
      break
  }


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
      const command = `npm install ${packageName} --save-dev`
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
Created "${colors.greenBright(appName)}" ${colors.blueBright('Webpack')} app.\n`)
  } catch (error) {
    progressBar.stop()
    console.error("An error occurred:", error)
  }
}
createApp()

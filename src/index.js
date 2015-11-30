import {lerpKeyframes as lerp} from './keyframes'
import {runWorker} from './update'
import Renderer from './renderers/DOMRetained'
import assets from './test-scene-1'

const stage = document.createElement('div')
const FPS = 24
const FRAME_COUNT = 400

function makeUpdate () {
  let then = performance.now()
  let now = performance.now()
  let dT = now - then
  let elapsed = 0
  let frame = 0
  let paused = false

  return function update () {
    then = now
    now = performance.now()
    dT = now - then    
    paused = document.hidden || now - then  > 1000 / FPS

    if (!paused) {
      elapsed = elapsed > FPS * FRAME_COUNT ? 0 : elapsed + dT
      frame = elapsed / FPS
    }
    for (let asset of assets) {
      asset.active = lerp(asset.keyframes.active, frame)
    }
    r.render(assets, frame)
    requestAnimationFrame(update)
  }
}

const r = new Renderer(stage)
const pauseBtn = document.createElement('button')

window.r = r
stage.style.width = '800px'
stage.style.height = '600px'
document.body.appendChild(stage)
requestAnimationFrame(makeUpdate())

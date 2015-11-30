import {lerpKeyframes as lerp} from './keyframes'
import {runWorker} from './update'
import Renderer from './renderers/DOMRetained'
import assets from './test-scene-1'

const stage = document.createElement('div')
const FPS = 24
const FRAME_COUNT = 400
const app = {
  paused: false,
  frame: 0
}

function makeUpdate () {
  let then = 0
  let now = 0
  let dT = now - then
  let elapsed = 0

  return function update () {
    then = now
    now = performance.now()
    dT = now - then > 1000 / FPS ? 0 : now - then
    app.paused = app.paused || document.hidden

    pauseBtn.innerText = app.paused ? 'Play' : 'Pause'
    stage.style.backgroundColor = app.paused ? 'gray' : 'white'
    if (!app.paused) {
      elapsed = elapsed > FPS * FRAME_COUNT ? 0 : elapsed + dT
      app.frame = elapsed / FPS
    }
    for (let asset of assets) {
      asset.active = lerp(asset.keyframes.active, app.frame)
    }
    r.render(assets, app.frame)
    requestAnimationFrame(update)
  }
}

const r = new Renderer(stage)
const pauseBtn = document.createElement('button')

window.r = r
stage.style.width = '800px'
stage.style.height = '600px'
document.body.appendChild(pauseBtn)
document.body.appendChild(stage)
pauseBtn.addEventListener('click', () => app.paused = !app.paused)
requestAnimationFrame(makeUpdate())

import {extend} from './utils'
import {Keyframe as KF, lerpKeyframes as lerp} from './keyframes'

const STAGE = document.createElement('div')
const TICK_INTERVAL_MS = 1000 / 100

let ID = 0
let frame = 0

function KFs (kfs) {
  this.position = kfs.position || [new KF('linear', 0, [0, 0])]
  this.scale= kfs.scale || [new KF('linear', 0, [1, 1])]
  this.rotation = kfs.rotation || [new KF('linear', 0, 0)]
  this.opacity = kfs.opacity || [new KF('linear', 0, 1)]
}

class Asset {
  constructor (tag, text, style, keyframes) {
    this.id = ID++
    this.active = true
    this.tag = tag
    this.text = text
    this.style = style
    this.keyframes = keyframes
  }
}

class Renderable {
  constructor(asset) {
    const el = document.createElement(asset.tag) 

    el.innerText = asset.text
    el.dataset.id = asset.id
    extend(el.style, asset.style)
    this.el = el
    this.id = asset.id
    this.active = false
  }
}

class Renderer {
  constructor() {
    this.renderables = new Map
  }

  loadAssets(assets) {
    for (let asset of assets) {
      this.renderables.set(asset.id, new Renderable(asset))
    } 
  }

  render(assets, frame) {
    for (let asset of assets) {
      let r = this.renderables.get(asset.id)

      if (!r) throw new Error('Missing renderable!')

      if (asset.active) {
        if (!r.active) STAGE.appendChild(r.el)
        r.active = true
      }
      else {
        if (r.active) STAGE.removeChild(r.el)
        r.active = false
      }

      let position = lerp(asset.keyframes.position, frame)
      let rotation = lerp(asset.keyframes.rotation, frame)
      let scale = lerp(asset.keyframes.scale, frame)
      let opacity = lerp(asset.keyframes.opacity, frame)
      let transform = `translate3d(${position[0]}px, ${position[1]}px, 0px) ` +
                      `rotateZ(${rotation}deg) ` +
                      `scale3d(${scale[0]}, ${scale[1]}, 1)`

      r.el.style.transform = transform
      r.el.style.opacity = opacity
      r.el.innerText = asset.text
    } 
  }
}

function update () {
  frame = (frame + 1) % 900
}

function render () {
  r.render(assets, frame)
  requestAnimationFrame(render)
}

const r = new Renderer
const header = new Asset('h1', 'hello world', {
  position: 'absolute',
  color: 'teal',
  width: '20%',
  textAlign: 'center',
  display: 'block'
}, new KFs({
  position: [
    new KF('bounceOut', 0, [10, 20]),
    new KF('backOut', 100, [1020, 302]),
    new KF('elasticOut', 300, [200, 509]),
    new KF('expoOut', 900, [20, 110])
  ]
}))
const assets = [header]
window.r = r

r.loadAssets(assets)
setInterval(update, TICK_INTERVAL_MS)
requestAnimationFrame(render)
STAGE.style.width = '800px'
STAGE.style.height = '600px'
document.body.appendChild(STAGE)

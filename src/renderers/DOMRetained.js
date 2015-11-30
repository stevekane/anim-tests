import {lerpKeyframes as lerp} from '../keyframes'
import {extend} from '../utils'

export class Renderable {
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

export default class DOMRetained {
  constructor (stageEl) {
    this.stage = { el: stageEl }
    this.renderables = new Map
  }

  render(assets, frame) {
    // remove unused renderables
    renderables:
    for (let [id, renderable] of this.renderables) {
      assets:
      for (let asset of assets) {
        if (asset.id === id) continue renderables
      }
      this.renderables.delete(id)
      //TODO: should remove from stage as well?
    }

    // create needed renderables
    for (let asset of assets) {
      if (!this.renderables.get(asset.id)) {
        this.renderables.set(asset.id, new Renderable(asset))
      }
    }

    // update all active renderables
    for (let asset of assets) {
      let r = this.renderables.get(asset.id)
      let p = this.renderables.get(asset.parentId) || this.stage

      if (asset.active) {
        if (!r.active) p.el.appendChild(r.el)
        r.active = true
      }
      else {
        if (r.active) p.el.removeChild(r.el)
        r.active = false
      }

      let position = lerp(asset.keyframes.position, frame)
      let rotation = lerp(asset.keyframes.rotation, frame)
      let scale = lerp(asset.keyframes.scale, frame)
      let opacity = lerp(asset.keyframes.opacity, frame)
      let skew = lerp(asset.keyframes.skew, frame)
      let transform = `translate3d(${position[0]}px, ${position[1]}px, 0px) ` +
                      `rotateZ(${rotation}deg) ` +
                      `scale3d(${scale[0]}, ${scale[1]}, 1) ` +
                      `skewX(${skew[0]}deg) skewY(${skew[1]}deg)`

      r.el.style.transform = transform
      r.el.style.opacity = opacity
      r.el.value = asset.text
    } 
  }  
}

import {v4 as UUID} from 'node-uuid'

export default class Asset {
  constructor (tag, parentId, text, style, keyframes) {
    this.id = UUID()
    this.parentId = parentId
    this.active = true
    this.tag = tag
    this.text = text
    this.style = style
    this.keyframes = keyframes
  }
}

import eases from 'eases'

function lerp(v0, v1, f) {
  return v0 * (1 - f) + v1 * f
}

function lerpAll (v0s, v1s, f) {
  var i = -1
  var results = []

  while (++i < v0s.length) {
    results.push(lerp(v0s[i], v1s[i], f)) 
  }
  return results
}

function step (v0, v1, f) {
  return 0
}

export function Keyframe (type, frame, value) {
  this.type = type
  this.frame = frame
  this.value = value
}

export function KFs (kfs={}) {
  this.position = kfs.position || [new Keyframe('linear', 0, [0, 0])]
  this.scale = kfs.scale || [new Keyframe('linear', 0, [1, 1])]
  this.rotation = kfs.rotation || [new Keyframe('linear', 0, 0)]
  this.opacity = kfs.opacity || [new Keyframe('linear', 0, 1)]
  this.skew = kfs.skew || [new Keyframe('linear', 0, [0, 0])]
  this.active = kfs.active || [new Keyframe('step', 0, true)]
}

export function lerpKeyframes (kfs, f) {
  var i = kfs.length

  while (i--) if (kfs[i].frame <= f) break

  const left = kfs[i]
  const right = kfs[i+1]

  if (!right || right.frame === left.frame) return left.value

  const easingFn = eases[left.type] || step
  const tNormal = (f - left.frame) / (right.frame - left.frame)
  const tAdjusted = easingFn(tNormal)
  const lerpFn = left.value.length ? lerpAll : lerp

  return lerpFn(left.value, right.value, tAdjusted)
}

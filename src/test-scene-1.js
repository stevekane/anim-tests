import Asset from './Asset'
import {KFs, Keyframe as KF} from './keyframes'

const box = new Asset('div', null, '', {
  position: 'absolute',
  backgroundColor: 'teal',
  width: '40%',
  height: '40%'
}, new KFs({
  active: [
    new KF('step', 0, true),
    new KF('step', 400, false)
  ],
  position: [
    new KF('bounceOut', 0, [100, 20]),
    new KF('sineInOut', 100, [100, 300]),
    new KF('bounceOut', 400, [100, 20])
  ],
  scale: [
    new KF('bounceOut', 0, [1.0, 1.0]),
    new KF('linear', 100, [1.5, 1.5]),
    new KF('linear', 400, [1.0, 1.0])
  ],
  opacity: [
    new KF('bounceOut', 0, 0.0), 
    new KF('linear', 100, 1.0), 
    new KF('bounceOut', 400, 0.0), 
  ]
}))
const header = new Asset('h1', box.id, 'Hello World', {
  color: 'white',
  textAlign: 'center'
}, new KFs)
const ul = new Asset('ul', box.id, '', {
  fontSize: '24px',
  color: 'white'
}, new KFs({
  active: [
    new KF('step', 0, false),
    new KF('step', 50, true)
  ]
}))
const li1 = new Asset('li', ul.id, 'greetings emmi!', {
   
}, new KFs({
  skew: [
    new KF('expoInOut', 0, [-50, 0]),
    new KF('expoInOut', 60, [-50, 0]),
    new KF('expoInOut', 70, [0, 0])
  ],
  position: [
    new KF('bounceOut', 0, [400, 0]),
    new KF('bounceOut', 50, [400, 0]),
    new KF('bounceOut', 60, [0, 0])
  ]
}))
const li2 = new Asset('li', ul.id, 'things are heating up!', {

}, new KFs({
  skew: [
    new KF('expoInOut', 0, [-50, 0]),
    new KF('expoInOut', 70, [-50, 0]),
    new KF('expoInOut', 80, [0, 0])
  ],
  position: [
    new KF('expoInOut', 0, [400, 0]),
    new KF('expoInOut', 60, [400, 0]),
    new KF('expoInOut', 70, [0, 0])
  ]
}))
const li3 = new Asset('li', ul.id, 'animation is real!', {

}, new KFs({
  skew: [
    new KF('expoInOut', 0, [-50, 0]),
    new KF('expoInOut', 80, [-50, 0]),
    new KF('expoInOut', 90, [0, 0])
  ],
  position: [
    new KF('expoInOut', 0, [400, 0]),
    new KF('expoInOut', 70, [400, 0]),
    new KF('expoInOut', 80, [0, 0])
  ]
}))

export default [box, header, ul, li1, li2, li3]

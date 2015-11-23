var budo = require('budo')
var babelify = require('babelify')
var server = budo('./src/index.js', {
  live: true,
  port: 8080,
  browserify: {
    transform: babelify.configure({presets: ['es2015']})
  }
})

server.on('connect', console.log.bind(console, 'connected'))
server.on('error', console.log.bind(console))

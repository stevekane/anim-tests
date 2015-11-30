export function runWorker () {
  const FPS = 60
  const PING_INTERVAL = 1000 / FPS

  let frame = 0

  function ping () {
    self.postMessage(frame++)
  }

  setInterval(ping, PING_INTERVAL)
}

export default function FnWorker (fn) {
  const str = fn.toString() 
  const b = new Blob(['(', str, ')()'], {type: 'text/javascript'})
  const u = window.URL.createObjectURL(b)
  const w = new Worker(u)

  window.URL.revokeObjectURL(u)
  return w
}

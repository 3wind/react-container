export function fontSize (val: number) {
  const clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const scale = Math.max(clientHeight, 610) / 700
  const fontSize = 100 * scale
  return val * fontSize
}

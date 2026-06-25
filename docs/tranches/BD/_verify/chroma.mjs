import { PNG } from 'pngjs'
import fs from 'node:fs'

function srgbToOklab(r, g, b) {
  const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4) }
  const R = lin(r), G = lin(g), B = lin(b)
  const l = 0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B
  const m = 0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B
  const s = 0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B
  const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s)
  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
  const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
  const C = Math.sqrt(a * a + bb * bb)
  let H = Math.atan2(bb, a) * 180 / Math.PI; if (H < 0) H += 360
  return { L, C, H }
}

const file = process.argv[2]
// region: [x0,y0,x1,y1] as fractions of W/H — default = top field band (above the card)
const reg = (process.argv[3] || '0.02,0.02,0.98,0.30').split(',').map(Number)
const png = PNG.sync.read(fs.readFileSync(file))
const { width: W, height: H } = png
const x0 = Math.floor(reg[0] * W), y0 = Math.floor(reg[1] * H), x1 = Math.floor(reg[2] * W), y1 = Math.floor(reg[3] * H)
let n = 0, sC = 0, sL = 0, warm = 0, teal = 0, sumA = 0, sumB = 0
const hist = {}
for (let y = y0; y < y1; y += 2) {
  for (let x = x0; x < x1; x += 2) {
    const i = (W * y + x) << 2
    const r = png.data[i], g = png.data[i + 1], b = png.data[i + 2]
    // skip near-white glass plate (L very high + near-zero chroma) and near-black
    const { L, C, H: hue } = srgbToOklab(r, g, b)
    if (L > 0.97 && C < 0.01) continue
    n++; sC += C; sL += L
    const rad = hue * Math.PI / 180; sumA += C * Math.cos(rad); sumB += C * Math.sin(rad)
    if (hue >= 25 && hue <= 95) warm++
    if (hue >= 180 && hue <= 270) teal++
    const bk = Math.round(hue / 30) * 30; hist[bk] = (hist[bk] || 0) + 1
  }
}
const meanC = sC / n, meanL = sL / n
const chromaWeightedH = ((Math.atan2(sumB, sumA) * 180 / Math.PI) + 360) % 360
console.log(JSON.stringify({
  file: file.split('/').pop(), region: reg, sampledPx: n,
  meanChroma: +meanC.toFixed(4), meanL: +meanL.toFixed(3),
  chromaWeightedHue: +chromaWeightedH.toFixed(1),
  warmFrac: +(warm / n).toFixed(3), tealFrac: +(teal / n).toFixed(3),
  clearsField045: meanC >= 0.045,
}, null, 0))

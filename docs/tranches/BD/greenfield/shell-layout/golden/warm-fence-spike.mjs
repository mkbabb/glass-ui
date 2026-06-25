// Spike: prove the warmHeroHue() fold maps the 4 cool sectionHues into the warm arc
// without collapsing the 11-category spectrum to a single hue (distinctness preserved).
//
// The warm arc is [-40 .. +130] (rose 320/-40 → through cream → amber 130), the band
// the existing warm hero stops occupy (rose 359.8, tomato 30.4, amber 69.6, violet 317.5).
// The COOL band [180,270] (teal/ocean/indigo/slate) must be folded OUT.

const SECTION_HUE = {
  foundations: 317.5, // violet  (sc7)  warm-side
  substrates:  222.8, // teal    (sc3)  COOL  <-- offender
  forms:       265.5, // indigo  (sc2)  COOL  <-- offender
  display:     69.6,  // amber   (sc5)  warm
  containers:  239.6, // slate   (sc9)  COOL  <-- offender
  navigation:  208.0, // ocean   (sc11) COOL  <-- offender
  dock:        30.4,  // tomato  (sc6)  warm
  data:        305.9, // purple  (sc1)  warm-side
  feedback:    8.4,   // ruby    (sc8)  warm
  motion:      291.9, // periwinkle (sc12) borderline-cool
  compositions:128.8, // olive   (sc10) warm-green edge
};

// warmHeroHue: fold any hue into the warm arc by reflecting the cool band across
// its nearest warm boundary, preserving relative ordering => distinctness survives.
// Warm arc expressed on a 0..360 wheel as the complement of the cool exclusion
// zone (180..270). We map a cool hue h in [180,270] to the warm wheel by a smooth
// monotone remap: the cool span [180,270] (width 90) -> the warm vacancy
// [290 .. 360+50=410≡50] (rose->amber via cream), keeping order.
const COOL_LO = 180, COOL_HI = 270;
const WARM_LO = 290;            // start just past periwinkle, in violet
const WARM_HI = 410;            // 410 ≡ 50 (amber), through cream(360/0)/rose
function warmHeroHue(h) {
  h = ((h % 360) + 360) % 360;
  if (h < COOL_LO || h > COOL_HI) return h; // already warm — untouched
  const t = (h - COOL_LO) / (COOL_HI - COOL_LO);    // 0..1 across the cool span
  const mapped = WARM_LO + t * (WARM_HI - WARM_LO); // monotone into warm vacancy
  return ((mapped % 360) + 360) % 360;
}
function inWarmArc(h){ h=((h%360)+360)%360; return !(h>COOL_LO && h<COOL_HI); }

let allWarm = true; const out = [];
for (const [k,h] of Object.entries(SECTION_HUE)){
  const w = warmHeroHue(h);
  const ok = inWarmArc(w);
  allWarm = allWarm && ok;
  out.push(`${k.padEnd(13)} ${h.toFixed(1).padStart(6)} -> ${w.toFixed(1).padStart(6)}  ${ok?'WARM':'COOL!!'}`);
}
console.log(out.join("\n"));
// distinctness: all 11 mapped hues pairwise >= 8 deg apart?
const mapped = Object.values(SECTION_HUE).map(warmHeroHue).sort((a,b)=>a-b);
let minGap = 360;
for (let i=1;i<mapped.length;i++) minGap = Math.min(minGap, mapped[i]-mapped[i-1]);
// wrap gap
minGap = Math.min(minGap, 360 - mapped[mapped.length-1] + mapped[0]);
console.log(`\nALL WARM: ${allWarm}   min pairwise hue gap: ${minGap.toFixed(1)} deg (distinct if >= ~8)`);

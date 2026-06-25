// Spike v2: the GOLDEN two-leg approach.
//  Leg (a) DATA re-index: re-point the 4 cool sectionHues onto chosen DISTINCT warm
//          ramp slots (the data fix — clean break, the identity intent preserved).
//  Leg (b) STRUCTURAL fence: warmHeroHue() clamp as the born-RED gate guard so a
//          future cool row CANNOT leak. The fence is identity on already-warm hues.
//
// Re-index targets chosen on the √φ-spaced warm spectrum (rose→amber→violet→ruby),
// each category keeping its semantic intent but warm:

const REINDEX = {
  // unchanged warm categories (survival of the fittest):
  foundations: 317.5, // violet — system root (warm-side, KEEP)
  display:     69.6,  // amber — atomic primitives (KEEP)
  dock:        30.4,  // tomato — headline (KEEP)
  data:        305.9, // purple — ledger (KEEP)
  feedback:    8.4,   // ruby — status (KEEP)
  compositions:128.8, // olive-green — real scenes (KEEP, warm-green edge)
  motion:      291.9, // periwinkle->KEEP as warm-violet (291.9 is OUT of [180,270], warm)
  // RE-INDEXED cool four -> distinct warm slots, intent preserved:
  substrates:  20.0,  // teal "water/droplet" -> warm rose-coral (aqua-warm read)
  forms:       340.0, // indigo "input" -> warm magenta-rose (distinct from substrates 20)
  containers:  50.0,  // slate "glass surfaces" -> warm gold (distinct)
  navigation:  95.0,  // ocean "nav chrome" -> warm chartreuse-amber (distinct)
};

const COOL_LO=180, COOL_HI=270, WARM_LO=290, WARM_HI=410;
function warmHeroHue(h){h=((h%360)+360)%360;if(h<COOL_LO||h>COOL_HI)return h;const t=(h-COOL_LO)/(COOL_HI-COOL_LO);return((WARM_LO+t*(WARM_HI-WARM_LO))%360+360)%360;}
function inWarmArc(h){h=((h%360)+360)%360;return !(h>COOL_LO&&h<COOL_HI);}

let allWarm=true;const rows=[];
for(const[k,h]of Object.entries(REINDEX)){const w=warmHeroHue(h);const ok=inWarmArc(w);allWarm=allWarm&&ok;rows.push(`${k.padEnd(13)} reindexed=${h.toFixed(1).padStart(6)} fenced=${w.toFixed(1).padStart(6)} ${ok?'WARM':'COOL!!'}`);}
console.log(rows.join("\n"));
const mapped=Object.values(REINDEX).map(warmHeroHue).sort((a,b)=>a-b);
let minGap=360;for(let i=1;i<mapped.length;i++)minGap=Math.min(minGap,mapped[i]-mapped[i-1]);minGap=Math.min(minGap,360-mapped[mapped.length-1]+mapped[0]);
console.log(`\nALL WARM: ${allWarm}   min pairwise gap: ${minGap.toFixed(1)} deg (distinct >= ~8)`);
// Also assert the fence is IDENTITY on these (already warm => no double-bend):
const identity = Object.values(REINDEX).every(h=>Math.abs(warmHeroHue(h)-(((h%360)+360)%360))<0.01);
console.log(`fence is identity on re-indexed warm hues: ${identity}`);

// HONEST composite: the REAL menu rgba (live getComputedStyle) over the REAL flat page
// pixel (live document.elementFromPoint behind the menu = rgb(251,250,248)). NOT a hardcoded
// field. backdrop-filter blur of a flat near-uniform field ≈ the field itself, so the
// composite = menu-fill (oklab α=0.808) src-over the flat page. This is the §3 flat condition.
function oklabToLin(L,a,b){
  const l_=L+0.3963377774*a+0.2158037573*b;
  const m_=L-0.1055613458*a-0.0638541728*b;
  const s_=L-0.0894841775*a-1.2914855480*b;
  const l=l_**3,m=m_**3,s=s_**3;
  return [
    +4.0767416621*l-3.3077115913*m+0.2309699292*s,
    -1.2684380046*l+2.6097574011*m-0.3413193965*s,
    -0.0041960863*l-0.7034186147*m+1.7076147010*s];
}
function linToSrgb(c){c=Math.max(0,Math.min(1,c));return c<=0.0031308?c*12.92:1.055*Math.pow(c,1/2.4)-0.055;}
function srgbToLinC(c){c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4);}
function rgbToOklab(r,g,b){
  const lr=srgbToLinC(r),lg=srgbToLinC(g),lb=srgbToLinC(b);
  const l=0.4122214708*lr+0.5363325363*lg+0.0514459929*lb;
  const m=0.2119034982*lr+0.6806995451*lg+0.1073969566*lb;
  const s=0.0883024619*lr+0.2817188376*lg+0.6299787005*lb;
  const L=0.2104542553*Math.cbrt(l)+0.7936177850*Math.cbrt(m)-0.0040720468*Math.cbrt(s);
  const a=1.9779984951*Math.cbrt(l)-2.4285922050*Math.cbrt(m)+0.4505937099*Math.cbrt(s);
  const bb=0.0259040371*Math.cbrt(l)+0.7827717662*Math.cbrt(m)-0.8086757660*Math.cbrt(s);
  return {L:+L.toFixed(3),C:+Math.hypot(a,bb).toFixed(4),a:+a.toFixed(4),b:+bb.toFixed(4)};
}
// menu fill: oklab(0.936403 0.00557132 0.0133027 / 0.808)
const [mr,mg,mb]=oklabToLin(0.936403,0.00557132,0.0133027).map(linToSrgb).map(c=>c*255);
const a=0.808;
// flat page behind (live): rgb(251,250,248)
const [pr,pg,pb]=[251,250,248];
const cr=mr*a+pr*(1-a), cg=mg*a+pg*(1-a), cb=mb*a+pb*(1-a);
console.log('menu fill solid rgb', [mr,mg,mb].map(Math.round));
console.log('COMPOSITED menu over flat page rgb', [cr,cg,cb].map(Math.round));
console.log('COMPOSITED oklab', rgbToOklab(cr,cg,cb));
// highlighted: oklab(0.915626 0.00551148 0.0130686 / 0.52) over the composited menu surface
const [hr,hg,hb]=oklabToLin(0.915626,0.00551148,0.0130686).map(linToSrgb).map(c=>c*255);
const ha=0.52;
const xr=hr*ha+cr*(1-ha),xg=hg*ha+cg*(1-ha),xb=hb*ha+cb*(1-ha);
console.log('HIGHLIGHT over menu oklab', rgbToOklab(xr,xg,xb));

function oklabToLin(L,a,b){const l_=L+0.3963377774*a+0.2158037573*b,m_=L-0.1055613458*a-0.0638541728*b,s_=L-0.0894841775*a-1.2914855480*b;const l=l_**3,m=m_**3,s=s_**3;return[4.0767416621*l-3.3077115913*m+0.2309699292*s,-1.2684380046*l+2.6097574011*m-0.3413193965*s,-0.0041960863*l-0.7034186147*m+1.7076147010*s];}
function linToSrgb(c){c=Math.max(0,Math.min(1,c));return c<=0.0031308?c*12.92:1.055*Math.pow(c,1/2.4)-0.055;}
function srgbToLinC(c){c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4);}
function rgbToOklab(r,g,b){const lr=srgbToLinC(r),lg=srgbToLinC(g),lb=srgbToLinC(b);const l=0.4122214708*lr+0.5363325363*lg+0.0514459929*lb,m=0.2119034982*lr+0.6806995451*lg+0.1073969566*lb,s=0.0883024619*lr+0.2817188376*lg+0.6299787005*lb;const L=0.2104542553*Math.cbrt(l)+0.7936177850*Math.cbrt(m)-0.0040720468*Math.cbrt(s),a=1.9779984951*Math.cbrt(l)-2.4285922050*Math.cbrt(m)+0.4505937099*Math.cbrt(s),bb=0.0259040371*Math.cbrt(l)+0.7827717662*Math.cbrt(m)-0.8086757660*Math.cbrt(s);return {L:+L.toFixed(3),C:+Math.hypot(a,bb).toFixed(4),b:+bb.toFixed(4)};}
// dark menu oklab(0.379439 0.00991643 0.0168573 / 0.8944) over rgb(11,10,9)
const [mr,mg,mb]=oklabToLin(0.379439,0.00991643,0.0168573).map(linToSrgb).map(c=>c*255);
const a=0.8944,[pr,pg,pb]=[11,10,9];
const cr=mr*a+pr*(1-a),cg=mg*a+pg*(1-a),cb=mb*a+pb*(1-a);
console.log('DARK composited menu rgb',[cr,cg,cb].map(Math.round),rgbToOklab(cr,cg,cb));

# D3 pass-10 critic: floor v9's --dock-control-press-bg in the dark arm, by token arithmetic (no paint).
# floor v9: oklch(from var(--foreground) l c h / var(--fill-selected)); dark --foreground hsl(30 14% 90%) (dark-arm.css:86);
# --fill-selected 0.12 (color-radius.css:161). Composited in sRGB (the plate's own mix space) over two dark grounds.
import colorsys, math
def hsl(h,s,l): return colorsys.hls_to_rgb(h/360,l/100,s/100)
def lin(c): return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
def oklab_L(rgb):
    r,g,b=[lin(c) for c in rgb]
    l=0.4122214708*r+0.5363325363*g+0.0514459929*b; m=0.2119034982*r+0.6806995451*g+0.1073969566*b; s=0.0883024619*r+0.2817188376*g+0.6299787005*b
    return 0.2104542553*l**(1/3)+0.7936177850*m**(1/3)-0.0040720468*s**(1/3)
def oklch_to_rgb(L,C,h):
    a=C*math.cos(math.radians(h)); b=C*math.sin(math.radians(h))
    l_=L+0.3963377774*a+0.2158037573*b; m_=L-0.1055613458*a-0.0638541728*b; s_=L-0.0894841775*a-1.2914855480*b
    l,m,s=l_**3,m_**3,s_**3
    r=4.0767416621*l-3.3077115913*m+0.2309699292*s; g=-1.2684380046*l+2.6097574011*m-0.3413193965*s; bb=-0.0041960863*l-0.7034186147*m+1.7076147010*s
    enc=lambda c: 12.92*c if c<=0.0031308 else 1.055*c**(1/2.4)-0.055
    return [min(1,max(0,enc(x))) for x in (r,g,bb)]
cream=hsl(30,14,90); a=0.12
for name,g in [("dark veil ink oklch(0.17 0.03 70), opaque", oklch_to_rgb(0.17,0.03,70)), ("pure black", (0,0,0))]:
    out=[a*c+(1-a)*x for c,x in zip(cream,g)]
    print(f"{name}: OKLab L {oklab_L(g):.3f} -> {oklab_L(out):.3f} under the press layer ({'LIFTS' if oklab_L(out)>oklab_L(g) else 'darkens'})")
print("every sRGB channel of the cream ink exceeds the ground's in both cases:", all(c>x for c,x in zip(cream, oklch_to_rgb(0.17,0.03,70))))

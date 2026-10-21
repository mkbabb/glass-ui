# H6-2 read from paint: for each cast, the frames where an interior gap between two inked clusters
# exceeds 1.3x the settled frame's widest gap, with both flanking clusters at >= 0.9 of the settled glyph ink.
import sys,glob,os,json
from PIL import Image
def clusters(f):
  g0=Image.open(f).convert("L"); w,h=g0.size; p0=g0.load()
  pb=p0[w//2,3]
  # plate tone: median of the row band; ink = distance from it
  g=Image.new("L",(w,h)); px=g.load()
  ys=sorted(p0[x,h//2] for x in range(w)); pt=ys[len(ys)//2]
  for y in range(h):
    for x in range(w): px[x,y]=255-min(255,abs(p0[x,y]-pt))
  bg=255
  rows=[sum(1 for x in range(w) if px[x,y]<bg-70) for y in range(h)]
  yc=max(range(h),key=lambda y:rows[y])
  cols=[min(px[x,y] for y in range(max(0,yc-10),min(h,yc+10))) for x in range(w)]
  thr=bg-40
  cl=[];s=p=None
  for x,v in enumerate(cols):
    if v<thr:
      if s is None: s=p=x
      elif x-p<=6: p=x
      else: cl.append((s,p,min(cols[s:p+1]))); s=p=x
  if s is not None: cl.append((s,p,min(cols[s:p+1])))
  return cl,bg
res={}
for d in sorted(glob.glob(sys.argv[1]+"/cast-*")):
  fs=sorted(glob.glob(d+"/f*.png"))
  if not fs: continue
  last,bg=clusters(fs[-1]); lg=[last[i+1][0]-last[i][1] for i in range(len(last)-1)]
  ink=min(c[2] for c in last) if last else 0  # darkest settled glyph
  full=bg-0.9*(bg-ink)
  mg=max(lg) if lg else 0
  hits=[]
  for f in fs:
    cl,_=clusters(f)
    for i in range(len(cl)-1):
      gap=cl[i+1][0]-cl[i][1]
      if gap>=75 and cl[i][2]<=full+15 and cl[i+1][2]<=full+15:
        hits.append((os.path.basename(f),gap)); break
  res[os.path.basename(d)]={"settledMaxGap":mg,"holeFrames":len(hits),"frames":hits}
  print(os.path.basename(d), "settled max gap",mg,"hole frames",len(hits),hits[:8])
json.dump(res,open(sys.argv[2],"w"),indent=1)

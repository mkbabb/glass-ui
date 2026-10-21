import sys
from PIL import Image
src,out,t0,t1,x0,x1=sys.argv[1],sys.argv[2],int(sys.argv[3]),int(sys.argv[4]),int(sys.argv[5]),int(sys.argv[6])
im=Image.open(src).convert("RGB"); W,H=im.size; th=(H+2)//14
sel=[im.crop((x0,i*th,x1,i*th+th-2)) for i in range(t0,t1)]
s=4; o=Image.new("RGB",((x1-x0)*s,len(sel)*(th-2)*s),"white")
for k,t in enumerate(sel): o.paste(t.resize(((x1-x0)*s,(th-2)*s),Image.LANCZOS),(0,k*(th-2)*s))
o.save(out)

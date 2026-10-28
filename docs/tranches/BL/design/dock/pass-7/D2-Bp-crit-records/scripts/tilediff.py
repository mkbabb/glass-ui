# tilediff.py (D2 pass 7, B′ critic): mean absolute grey difference of consecutive FM strip tiles (14 tiles, inset 4 px),
# to tell a held painted frame (difference at the rest-tile level) from two distinct frames. Run from the records dir.
from PIL import Image, ImageChops, ImageStat
casts=[('filmstrips/webkit-main/main','warm-collapse'),('filmstrips/webkit-main/rerun2','warm-expand'),('filmstrips/webkit-dark/main','first-expand'),('filmstrips/webkit-dark/rerun2','warm-collapse'),('fmlow/dark-r2','warm-expand'),('fmlow/dark-r3','warm-collapse')]
for d,c in casts:
    im=Image.open(f'{d}/strip-webkit-{c}.png').convert('L'); W,H=im.size; th=H/14
    t=[im.crop((0,int(i*th)+4,W,int((i+1)*th)-4)) for i in range(14)]
    m=lambda a,b: ImageStat.Stat(ImageChops.difference(t[a],t[b])).mean[0]
    print(f'{d:32s} {c:14s}', ' '.join(f'{i+1}-{i+2}:{m(i,i+1):.2f}' for i in range(1,7)), '| rest 11-12:%.2f 12-13:%.2f'%(m(10,11),m(11,12)))

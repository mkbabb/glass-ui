# fs-scene.py (D2 pass 9, fresh critic; reading aid, enters no row): writes a scratch copy of the harness whose `swap` scene takes
# &fs=1: face "short" is one wide tab (132 px), face "long" three 40 px icons with the run's 4 px gaps, so the tab's centre is
# the middle icon's centre: a true far-side geometry (heir = the middle icon, a unit arriving on the far side). The landed
# harness is not edited; the scratch copy lives in the seat dir and is removed with it.
import shutil,sys
src,dst=sys.argv[1],sys.argv[2]
shutil.copytree(src,dst,dirs_exist_ok=True)
p=dst+'/scenes.mjs'; s=open(p,encoding='utf8').read()
a='''            <DockLayer id="short" label="Short">
              <DockControl aria-label="A">A</DockControl>
              <DockControl aria-label="B">B</DockControl>
            </DockLayer>'''
b='''            <DockLayer v-if="fsx" id="short" label="Short"><DockControl shape="tab" style="width:132px;min-width:132px">WideTabFace</DockControl></DockLayer>
            <DockLayer v-if="fsx" id="long" label="Long"><DockControl aria-label="C">C</DockControl><DockControl aria-label="D">D</DockControl><DockControl aria-label="E">E</DockControl></DockLayer>
            <DockLayer v-if="!fsx" id="short" label="Short">
              <DockControl aria-label="A">A</DockControl>
              <DockControl aria-label="B">B</DockControl>
            </DockLayer>'''
assert a in s; s=s.replace(a,b)
a2='<DockLayer id="long" label="Long">\n              <DockControl aria-label="C">C</DockControl>\n              <DockControl shape="tab">Tools'
assert a2 in s; s=s.replace(a2,a2.replace('<DockLayer id="long"','<DockLayer v-if="!fsx" id="long"'))
a3='const three = q.get("three") === "1";'
assert a3 in s; s=s.replace(a3,a3+'\nconst fsx = q.get("fs") === "1";')
open(p,'w',encoding='utf8').write(s)

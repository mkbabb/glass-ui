# instrument.py <useDockScene.ts>: the scene's in-page trace for diagnosis builds only (never landed): when window.__dockTrace exists,
# each write() appends every painting unit's box, spans, fronts, path and roles; arm() appends each armed path.
import sys,re
p=sys.argv[1]; s=open(p).read()
a='''        land();
    }

    /** The episode, and with it the window, ends on the frame every lane'''
assert a in s
t='''        { const T = (window as any).__dockTrace; if (T) { const lb = (m: Mover) => (m.el.textContent || "").trim().slice(0, 8); const R = (v: any) => Array.isArray(v) ? v.map(R) : typeof v === "number" ? +v.toFixed(2) : v; T.push({ k: "w", t: +performance.now().toFixed(1), frame, P: R([P.lo, P.hi]), u: units.filter(({ m }) => painting(m)).map(({ m, box }) => ({ l: lb(m), box: R([box.lo, box.hi]), laid: R((() => { const h = spanOf(laid(m), m, vert); return [h.lo, h.hi]; })()), v: R(m.vis), own: R(m.own), fo: R(frontOf.get(m) ?? null), seam: R(m.seam), en: m.enter ? { from: R(m.enter.from), q: R(m.enter.ex.lane.value) } : undefined, jn: m.joined || undefined, rv: m.reveal ? R([m.reveal.s, m.reveal.e, m.reveal.ds, m.reveal.de]) : undefined, ex: m.exit ? { s0: R(m.exit.s0), e0: R(m.exit.e0), to: R(m.exit.to ?? null), lead: R(m.exit.path?.lead ?? null), pto: R(m.exit.path?.to ?? null), cut: m.exit.path?.cut, r: R(m.exit.r), d: R(m.exit.d), mv: m.exit.moving, heir: m.exit.heir ? lb(m.exit.heir) : undefined, q: R(m.exit.ex.lane.value) } : undefined })) }); } }
'''
s=s.replace(a,t+a)
b='''            x.heir = h;
'''
assert b in s
s=s.replace(b,b+'''            { const T = (window as any).__dockTrace; if (T) { const lb = (u?: Mover) => u ? (u.el.textContent || "").trim().slice(0, 8) : null; T.push({ k: "arm", m: lb(m), tied: lb(heir), enter: !!heir?.enter, joined: !!heir?.joined, gated: !!heir && !h, ds: +ds.toFixed(2), de: +de.toFixed(2), moving: !!x.moving, s0: +x.s0.toFixed(2), e0: +x.e0.toFixed(2) }); } }
''')
open(p,'w').write(s)

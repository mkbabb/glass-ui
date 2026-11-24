"""framesof.py: print the recorded frames of chosen cut cells, compactly.

    python3 framesof.py <cuts.json> <surface> <route> [open|close] [limit]

One line per frame: ms from the tap, effective opacity, share on screen, top, left,
width, height, computed scale, filter, scrim. Then the cell's steps (frames whose box
moved or resized by more than 4 px from the frame before while showing at 0.3 or more).
"""
import json, sys
f, surf, route = sys.argv[1:4]
phase = sys.argv[4] if len(sys.argv) > 4 else "close"
limit = int(sys.argv[5]) if len(sys.argv) > 5 else 60
d = json.load(open(f))
for r in d[1:]:
    if r.get("surface") == surf and r.get("route") == route:
        fr = r.get(phase + "Frames", [])
        print(f"{surf} {route} {phase}: closed={r.get('closed')} pressed={r.get('pressed')} cuts={r.get(phase, {}).get('cuts')}")
        for x in fr[:limit]:
            print(f"  {x['t']:>4} op={x.get('op')} vf={x.get('vf')} top={x.get('top')} left={x.get('left')} w={x.get('w')} h={x.get('h')} sc={x.get('sc')} fl={x.get('fl')} scrim={x.get('scrim')}")
        print("  steps:", json.dumps(r.get(phase, {}).get("steps", [])[:12]))

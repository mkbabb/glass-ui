"""Class sweep: a visual change with no π surface that renders it (pass 14 FN-07, and the dead routes fix-15 found
while curing it).

Row 4 of the formation checklist: every visual claim carries π and DELTA. Pass 14 FN-07: W-E.8 §3 item 5 changed
Metric's corners and §6 named no surface that renders Metric. Curing it, fix-15 found the same hole a second way:
§6 surfaces, gate rows and probes that name a demo route the manifest does not route, so the capture or the reading
is the "Page not found" page (W-E.4 `/overlays/*` and `/forms/select`, W-E.10 `/forms/buttons`, W-F.2, W-F.5 F5-G4,
W-K.5, W-K.10).

Two arms, over every wave spec:

  STYLE  a component stylesheet that §4 (the files the wave touches) names (`src/components/<dir>/…css`, or
         `<dir>/styles….css`) changes paint; §6 must name the component (its directory or its Pascal name) or a demo
         route whose story renders it (the story SFC, or a family member it imports, names the component's tag or
         imports its directory). §3 is not read: it cites HEAD's stylesheets as evidence as often as it edits them.
         A wave that edits a stylesheet without changing paint says so in §6, naming the component.
  ROUTE  a demo route (`/<category>/<id>`) named anywhere in a spec must be a route of `demo/stories/manifest.ts`,
         unless the line says the route is dead (the wave's subject is the dead route, or the line records that the
         route renders the not-found page).

Usage: pi-surface.py <root>, where <root> is a checkout of HEAD (the manifest and stories are read from it). Exit 1
while any instance is open. BL_ROOT reads another copy of the plan.
"""
import os
import re
import sys

from plan_dag import WAVES, spec_ids, text, section

DEAD = re.compile(r"not[- ]found|not a route|dead route|no route|Page not found|not in the manifest|time out on", re.I)
# Waves whose subject is the dead-route defect itself; they name the routes to record it.
DEAD_SUBJECT = {
    "W-A.1": "§2 and A1-G6 record the dead-route specs (`/forms/select` and three more) as the defect W-A.1 cures",
    "W-A.6": "§2 and A6-G3 record the battery's two dead routes as the defect W-A.6 cures",
    "W-L.6": "§2 records the 10 unrouted story SFCs (#58) and places them with W-D.1",
}


def manifest(root):
    m = open(os.path.join(root, "demo/stories/manifest.ts"), encoding="utf-8").read()
    routes = {f"/{a}/{b}" for a, b in re.findall(r's\(\s*"([a-z-]+)",\s*"([a-z0-9.-]+)"', m)}
    cats = set(re.findall(r'id: "([a-z-]+)",\n\s*title', m))
    return routes, cats


def story_text(root, route):
    """The story SFC behind a route, with the family members it imports."""
    f = os.path.join(root, "demo/stories" + route + ".vue")
    if not os.path.isfile(f):
        return ""
    t = open(f, encoding="utf-8").read()
    for imp in re.findall(r'import\("(\./[\w.-]+\.vue)"\)', t):
        g = os.path.normpath(os.path.join(os.path.dirname(f), imp))
        if os.path.isfile(g):
            t += open(g, encoding="utf-8").read()
    return t


def pascal(d):
    return "".join(x.capitalize() for x in d.split("-"))


def renders(story, d, root):
    names = {pascal(d)}
    idx = os.path.join(root, "src/components", d, "index.ts")
    if os.path.isfile(idx):
        names |= set(re.findall(r"default as (\w+)", open(idx, encoding="utf-8").read()))
    return bool(re.search(r"@glass/components/" + re.escape(d) + r"\b", story)
                or any(re.search(r"<" + re.escape(n) + r"[\s/>]", story) for n in names))


def main():
    if len(sys.argv) != 2 or not os.path.isdir(sys.argv[1]):
        print("usage: pi-surface.py <root: a checkout of HEAD>")
        return 2
    root = sys.argv[1]
    routes, cats = manifest(root)
    out, n_style, n_route = [], 0, 0
    for w in spec_ids():
        s4, s6 = section(w, 4), section(w, 6)
        dirs = set()
        for d, fn in re.findall(r"src/components/([a-z0-9-]+)/([^\s`,;)]*)", s4):
            if re.search(r"\.css\b", fn) or fn.startswith("styles"):
                dirs.add(d)
        for d, _ in re.findall(r"`([a-z0-9-]+)/(styles[^\s`]*\.css|[a-z-]+\.css)[:`]", s4):
            if os.path.isdir(os.path.join(root, "src/components", d)):
                dirs.add(d)
        named = set(re.findall(r"(?<![\w./-])(/[a-z-]+/[a-z0-9-]+)(?![\w/.-])", s6)) & routes
        for d in sorted(dirs):
            n_style += 1
            idx = os.path.join(root, "src/components", d, "index.ts")
            names = {d, pascal(d)} | (set(re.findall(r"default as (\w+)", open(idx, encoding="utf-8").read())) if os.path.isfile(idx) else set())
            if any(re.search(r"(?<![\w-])" + re.escape(x) + r"s?(?![\w-])", s6, re.I) for x in names):
                continue
            if any(renders(story_text(root, r), d, root) for r in named):
                continue
            out.append(f"OPEN STYLE  waves/{w}.md §6: §4 changes a stylesheet of `src/components/{d}`, and §6 names neither the component nor a route that renders it")
        if w in DEAD_SUBJECT:
            continue
        for i, line in enumerate(text(w).split("\n"), 1):
            for r in re.findall(r"(?<![\w./-])(/[a-z-]+/[a-z0-9-]+)(?![\w/.-])", line):
                if r.split("/")[1] not in cats | {"overlays"}:
                    continue
                n_route += 1
                if r not in routes and not DEAD.search(line):
                    out.append(f"OPEN ROUTE  waves/{w}.md:{i}: `{r}` is not a manifest route (it renders the not-found page)")
    for r in out:
        print(r)
    print(f"component stylesheets {n_style}, demo route mentions {n_route}, manifest routes {len(routes)}, open {len(out)}")
    return 1 if out else 0


if __name__ == "__main__":
    sys.exit(main())

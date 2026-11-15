# plants5.py <name> apply|revert|list: MEASURE-5's counter-tests. plants4.py's, less the struck form
# (g2-compact) and the old snap plant (g4-snap), with the plants whose source moved rewritten, and
# RULINGS-4's: RU-25 (a lane inset inside the plate's edge; the neighbour cut removed), RU-26 (fitWhole
# restored as built), RU-27 (the flag never set; a length written for the percentage), RU-28 (the open
# seat's width rule restored), and the two plants MEASURE-4 left with no bite read again (g4-ghost on
# cells that track the ghost wherever it is held; g2-lane on the cells with a narrow end lane).
import importlib.util, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("plants4", os.path.join(HERE, "..", "m4", "plants4.py"))
p4 = importlib.util.module_from_spec(spec); spec.loader.exec_module(p4)
p4.ORIG = os.path.join(HERE, ".plant-orig")
D = p4.D
P = dict(p4.P)
for k in ("g2-compact", "g4-snap"): P.pop(k)
P["g2-curve"] = ("G-2 (inside the curve): the curve inset never written",
    [(D+"composables/useDockBody.ts", "        const had = el.style.getPropertyValue(\"--dock-curve-inset\") !== \"\";\n        // RU-30", "        if (open) return null;\n        const had = el.style.getPropertyValue(\"--dock-curve-inset\") !== \"\";\n        // RU-30")])
P["g4-snap2"] = ("G-4 (the open seat changes in a scrolling run): the rest 9 px off its snap position",
    [(D+"composables/useDockRun.ts", "        return inView ? clamped : anchorFor(run, open);", "        return Math.min((inView ? clamped : anchorFor(run, open)) + 9, max);")])
P["g2-fitwhole"] = ("G-2/G-13 (RU-26): fitWhole restored as built (the window read as clientWidth less two reserves, the run capped by a length)",
    [(D+"composables/useDockBody.ts", "        const room = v && fits ? `${Math.floor(((port - span) / 2) * 100) / 100}px` : \"\";\n        return { run, fits, whole, room };",
      "        const room = v && fits ? `${Math.floor(((port - span) / 2) * 100) / 100}px` : \"\";\n        if (!v && same && n >= 2) { run.style.removeProperty(\"max-inline-size\"); const rs = getComputedStyle(run); const reserve = Number.parseFloat(rs.paddingInlineStart) || 0; const gap = Number.parseFloat(rs.columnGap) || 0; const win = run.clientWidth - 2 * reserve; if (span > win + 0.5) { const pitch = size + gap; const k = Math.floor((win + gap) / pitch); const left = win - (k * pitch - gap); if (k >= 1 && left > 0.5) run.style.setProperty(\"max-inline-size\", `${run.offsetWidth - left}px`); } }\n        return { run, fits, whole, room };")])
P["g2-whole-never"] = ("G-2 (RU-27): the whole-seat flag never set",
    [(D+"composables/useDockBody.ts", "        const whole = !v && !fits && same", "        const whole = false && !v && !fits && same")])
P["g2-whole-length"] = ("G-2 (RU-27): a length written in place of the percentage (the carrier caps the run at n pitches in px)",
    [(D+"composables/useDockBody.ts", "        const room = v && fits ? `${Math.floor(((port - span) / 2) * 100) / 100}px` : \"\";\n        return { run, fits, whole, room };",
      "        const room = v && fits ? `${Math.floor(((port - span) / 2) * 100) / 100}px` : \"\";\n        if (whole) { const rs = getComputedStyle(run); const R = Number.parseFloat(rs.paddingInlineStart) || 0; const G = Number.parseFloat(rs.columnGap) || 0; const k = Math.floor((port - R + G) / (size + G)); run.style.setProperty(\"max-inline-size\", `${k * (size + G) - G + R}px`); } else run.style.removeProperty(\"max-inline-size\");\n        return { run, fits, whole, room };"),
     (D+"styles/run.css", "        max-inline-size: calc(\n            round(down, 100% - var(--dock-run-reserve-inline) + var(--dock-run-gap), var(--dock-pitch)) -\n                var(--dock-run-gap) + var(--dock-run-reserve-inline)\n        );\n", "")])
P["g4-openseat"] = ("G-4 (RU-28): the open seat's width rule restored (three pitches)",
    [(D+"styles/run.css", None, "\n@layer components { .glass-dock :where(.dock-layers) > .dock-run > [aria-current]:not([aria-current=\"false\"]), .glass-dock :where(.dock-layers) > .dock-run > [data-glass-dock-seat]:has([aria-current]:not([aria-current=\"false\"])) { inline-size: var(--dock-open-seat); } }\n")])
P["g2-laneinset"] = ("G-2 (RU-25): a lane inset 12 px inside the plate's edge on a side with no neighbour",
    [(D+"composables/useDockBody.ts", "            const lane = { ...P };\n            const prev = order[i - 1];\n            const next = order[i + 1];", "            const lane = { ...P };\n            const prev = order[i - 1];\n            const next = order[i + 1];\n            if (!vert && !prev) lane.l += 12;")])
P["g2-nocut"] = ("G-2 (RU-25): the neighbour cut removed (each lane is the plate's whole box)",
    [(D+"composables/useDockBody.ts", "                if (prev) lane.l = Math.max(lane.l, boundary(prev, t));\n                if (next) lane.r = Math.min(lane.r, boundary(t, next));", "                void prev;\n                void next;")])
if __name__ == "__main__":
    p4.P = P
    name, act = (sys.argv[1], sys.argv[2]) if len(sys.argv) > 2 else (None, "list")
    if act == "list":
        import json; print(json.dumps({k: v[0] for k, v in P.items()}, indent=1))
    elif act == "apply": p4.apply(name)
    elif act == "revert": p4.revert(name)

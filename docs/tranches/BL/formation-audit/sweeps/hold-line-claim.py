"""Class sweep: a static hold line whose pattern catches fewer spellings than the claim it states (pass 11, FK-01).

A hold line passes at HEAD and earns its place by its bite. `hold-line-scope.py` reads the file axis (which files a
hold line reads against the files its wave writes). This sweep reads the spelling axis: the regression a hold
line's pass cell names, written in each form the tree uses or a seat would plausibly write. W-H.6 H6-G3 claimed "the
overshoot is not written as a negative length" and caught only `-<n>px` as the first value; `-2rem`, `0 -32px` and
`calc(-1 * 32px)` passed it.

CLAIMS below holds, per static hold line, the spellings its own claim covers (each a plant appended to a file in a
checkout of HEAD) and the forms its cure legitimately writes (a plant that must pass). This lists:

  UNREAD   a labelled, unstruck hold line with a static span (`!`, `test`, `grep`, `git grep`, `rg`, `sed`, `awk`,
           no build, browser or placeholder) that CLAIMS does not carry: a new hold line must state its spellings
  HEAD     the hold line does not exit 0 at <root> (a hold line passes at HEAD; a RED one is a born-RED row)
  NARROW   a spelling of the claimed regression, planted, leaves the gate at exit 0
  WIDE     a form the cure writes, planted, makes the gate exit nonzero (the gate cannot be passed by its own cure)

A CLAIMS entry whose gate is no longer a hold line (re-written as a born-RED row) is printed as a NOTE and not run.
Plants go into tracked files, so a `git grep` span reads them. Each file is restored byte for byte after its
plant, and a created file is removed. Usage: hold-line-claim.py <root>, where <root> is a checkout of HEAD (a
worktree). Exit 1 while any row is open. BL_ROOT reads another copy of the plan.
"""
import os
import re
import subprocess
import sys

from gates import gates

STATIC = re.compile(r"^\s*(?:!\s*)?(?:test|grep|git grep|rg|sed|awk)\b")
HEAVY = re.compile(r"\b(npx|npm|vitest|playwright|vite|gh|curl)\b|\$H\b|\$D3_OUT|\bdist/|\.cache/|<[^>]*>|…")

# (wave, gate id prefix) -> [(file, plant text, "red" | "green", what it is)]
CLAIMS = {
    ("W-0.10", "G3"): [  # "one door for the anchor": no anchor part published beside the `reference` prop
        ("src/components/popover/index.ts", 'export { PopoverAnchor } from "reka-ui";', "red", "the part re-exported from the popover barrel"),
        ("src/index.ts", 'export { PopoverAnchor } from "reka-ui";', "red", "the part re-exported from the root barrel"),
        ("src/components/tooltip/index.ts", 'export { PopperAnchor as TooltipAnchor } from "reka-ui";', "red", "the anchor published under the tooltip"),
    ],
    ("W-0.2", "G3"): [  # "every read falls back to a token, or to `transparent`; no colour literal"
        ("src/components/toggle-group/styles.css", ".x { color: var(--toggle-tint, #888); }", "red", "a hex fallback"),
        ("src/components/toggle-group/styles.css", ".x { color: var(--toggle-tint,#888); }", "red", "a hex fallback, unspaced"),
        ("src/components/toggle-group/styles.css", ".x { color: var(--toggle-tint, oklch(0.5 0 0)); }", "red", "a colour function fallback"),
        ("src/components/toggle-group/styles.css", ".x { color: var(--toggle-tint, color-mix(in oklab, var(--foreground) 40%, white)); }", "red", "a mix of a token and a literal"),
        ("src/components/toggle-group/styles.css", ".x { color: var(--toggle-tint, var(--foreground, #888)); }", "red", "a token with a literal fallback of its own"),
        ("src/components/toggle-group/styles.css", ".x { --control-edge-ring: 0 0 0 1px color-mix(in oklab, var(--toggle-tint, transparent) 40%, transparent); background-color: color-mix(in oklab, var(--toggle-tint, var(--foreground)) 12%, transparent); color: color-mix(in oklab, var(--toggle-tint, var(--foreground)) 90%, var(--foreground)); }", "green", "§3's template lines"),
    ],
    ("W-B.15", "B15-G3"): [  # "the page scroller stays native": no non-passive wheel or touchmove listener in `src`
        ("src/composables/sidebar/useSidebarFollow.ts", 'window.addEventListener("wheel", () => {});', "red", "one-line addEventListener (the stated bite)"),
        ("src/composables/sidebar/useSidebarFollow.ts", 'window.addEventListener(\n    "wheel",\n    () => {},\n);', "red", "addEventListener over several lines (the tree's prettier form, `useDockState.ts:394`)"),
        ("src/composables/sidebar/useSidebarFollow.ts", 'useEventListener(window, "touchmove", () => {});', "red", "vueuse useEventListener"),
        ("src/components/dock/GlassDock.vue", '<div @wheel="() => {}"></div>', "red", "a template @wheel handler"),
        ("src/composables/sidebar/useSidebarFollow.ts", 'h("div", { onWheel: () => {} });', "red", "a render-function onWheel"),
        ("src/composables/sidebar/useSidebarFollow.ts", 'window.addEventListener(\n    "wheel",\n    () => {},\n    { passive: true },\n);', "green", "a passive listener over several lines"),
        ("src/components/dock/GlassDock.vue", '<div @wheel.passive="() => {}"></div>', "green", "a passive template handler"),
    ],
    ("W-G.2", "G2-G4"): [  # "the library never destroys the shared device"
        ("src/composables/glass/webgpu/useWebGPUCanvas.ts", "device.destroy();", "red", "the stated bite"),
        ("src/composables/glass/webgpu/useWebGPUCanvas.ts", "device?.destroy();", "red", "an optional call (W-G.2 §2's own reading uses `device\\??`)"),
        ("src/composables/glass/webgpu/useWebGPUCanvas.ts", "gpuDevice.destroy();", "red", "a prefixed device name"),
        ("src/composables/glass/webgl/visibility.ts", "sharedDevice.destroy();", "red", "a destroy outside `webgpu/` (the claim is the library's)"),
        ("src/composables/glass/webgpu/useWebGPUCanvas.ts", "texture.destroy();", "green", "a resource of the device, not the device"),
    ],
    ("W-H.6", "H6-G3"): [  # "the overshoot is computed from the rung's radius token, not written as a negative length"
        ("src/styles/glass/material.css", ".x::after { inset: -32px; }", "red", "the stated bite"),
        ("src/styles/glass/material.css", ".x::after { inset: -2rem; }", "red", "another unit"),
        ("src/styles/glass/material.css", ".x::after { inset:-2rem; }", "red", "another unit, unspaced"),
        ("src/styles/glass/material.css", ".x::after { inset: 0 -32px; }", "red", "after a first value"),
        ("src/styles/glass/material.css", ".x::after { inset: calc(-1 * 32px); }", "red", "a literal in calc()"),
        ("src/styles/glass/material.css", ".x::after { inset: calc(0px - 32px); }", "red", "a literal difference in calc()"),
        ("src/styles/glass/material.css", ".x::after { top: -10%; }", "red", "a percentage"),
        ("src/styles/glass/material.css", ".x::after { inset-inline-start: -8px; }", "red", "a logical side"),
        ("src/styles/glass/material.css", ".x::after { inset: calc(var(--radius-ctx) * -1); }", "green", "the cure: computed from the radius token"),
        ("src/styles/glass/material.css", ".x { --plant-inset: -4px; }", "green", "a custom property that ends in -inset"),
    ],
    ("W-L.1", "G-L1-5"): [  # "only `DarkModeGlyph.vue` draws"
        ("src/components/dark-mode-toggle/index.ts", "// <svg viewBox=\"0 0 472.39 472.39\">", "red", "a second drawing in the directory (the stated bite)"),
        ("src/components/menu/DropdownMenuItem.vue", '<svg viewBox="0 0 472.39 472.39" aria-hidden="true"></svg>', "red", "the glyph re-drawn by a menu row outside the directory"),
    ],
    ("W-L.3", "G-L3-9"): [  # "no static `text-sm`/`text-xs` in its sources (templates and class strings)"
        ("src/components/dock/GlassDock.vue", '<p class="text-sm">x</p>', "red", "a template class (the stated bite)"),
        ("src/components/dock/constants.ts", 'export const PLANT = "md:text-xs";', "red", "a variant class string"),
        ("src/styles/glass/material.css", ".x { @apply text-sm; }", "red", "an @apply in a stylesheet"),
        ("src/components/dock/GlassDock.vue", "<!-- --control-text-sm -->", "green", "the library's own control token"),
        ("src/styles/glass/material.css", "/* a CSS comment that names text-sm */", "green", "a CSS comment naming the rung"),
    ],
}


def run(span, root):
    return subprocess.run(["bash", "-c", span], cwd=root, capture_output=True, timeout=120).returncode


def gate_exit(spans, root):
    codes = [run(s, root) for s in spans]
    return 0 if all(c == 0 for c in codes) else 1


def planted(root, path, text):
    f = os.path.join(root, path)
    old = open(f, "rb").read() if os.path.exists(f) else None
    with open(f, "ab") as h:
        h.write(("\n" + text + "\n").encode())
    return f, old


def restore(f, old):
    if old is None:
        os.remove(f)
    else:
        open(f, "wb").write(old)


def main():
    if len(sys.argv) != 2 or not os.path.isdir(sys.argv[1]):
        print("usage: hold-line-claim.py <root: a checkout of HEAD>")
        return 2
    root = sys.argv[1]
    out, notes = [], []
    n = n_plants = 0
    seen = set()
    for g in gates():
        spans = [s for s in g.spans if STATIC.match(s) and not HEAVY.search(s)]
        key = next((k for k in CLAIMS if k[0] == g.wave and g.gid.startswith(k[1] + " ")), None)
        if key:
            seen.add(key)
        if g.struck or not spans:
            continue
        if not g.hold:
            if key:
                notes.append(f"NOTE  waves/{g.wave}.md:{g.line} {g.gid[:40]} is not a hold line (a born-RED row); its CLAIMS entry is not run")
            continue
        if not key:
            out.append(f"OPEN UNREAD  waves/{g.wave}.md:{g.line} {g.gid[:40]}: a static hold line with no CLAIMS entry")
            continue
        n += 1
        if gate_exit(spans, root) != 0:
            out.append(f"OPEN HEAD    waves/{g.wave}.md:{g.line} {g.gid[:40]}: exits nonzero at HEAD; a hold line passes at HEAD")
            continue
        for path, text, want, what in CLAIMS[key]:
            n_plants += 1
            f, old = planted(root, path, text)
            try:
                code = gate_exit(spans, root)
            finally:
                restore(f, old)
            if want == "red" and code == 0:
                out.append(f"OPEN NARROW  waves/{g.wave}.md:{g.line} {g.gid[:40]}: exit 0 with {what} planted in {path}: {text[:70]!r}")
            if want == "green" and code != 0:
                out.append(f"OPEN WIDE    waves/{g.wave}.md:{g.line} {g.gid[:40]}: exit {code} with {what} planted in {path}: {text[:70]!r}")
    for k in CLAIMS:
        if k not in seen:
            notes.append(f"NOTE  CLAIMS entry {k} matches no gate row")
    for r in notes + out:
        print(r)
    print(f"static hold lines {n}, plants {n_plants}, open {len(out)}")
    return 1 if out else 0


if __name__ == "__main__":
    sys.exit(main())

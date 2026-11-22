# s4edit.py <worktree> <light-hover> <dark-hover> <current>: S4's source edits (RU-92, RU-94 as amended for R8-2, C8-M5,
# R8-9; RU-95 as amended for R8-1; RU-96 as amended for R8-8). The steps come from H5's readings (s9/inkstep.py) and are
# read again on the S4 build.
import sys
W, LH, DH, C = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
def edit(p, pairs):
    s = open(W + "/" + p).read()
    for old, new in pairs:
        c = s.count(old); assert c == 1, (p, c, old[:90]); s = s.replace(old, new)
    open(W + "/" + p, "w").write(s)
# The hover step per scheme beside the dock's level token (RU-94 as amended: "a dark line beside RU-93's token").
edit("src/styles/tokens/glass.css", [
 ("""    --glass-level-dock: 1;
""", f"""    --glass-level-dock: 1;
    /* The dock's hover step, % of its ink (W-I.8 RU-94): the weaker of 5 and 6.5 % whose hover
       reads 1.1 against the dock, per scheme (question 18's default). */
    --dock-hover-step: {LH}%;
"""),
 (""".dark {
    --glass-level-dock: 0.7;
}""", f""".dark {{
    --glass-level-dock: 0.7;
    --dock-hover-step: {DH}%;
}}"""),
])
edit("src/components/dock/styles/dock.css", [
 ("""    /* W-I.8 RU-56: inside a dock the current seat's fill, a hovered seat's fill and a segmented
       control's selected mark are the dock's own ink over whatever the plate is, so they keep
       their distance from the plate at any level and in both schemes. Two steps in rising
       strength, hover and current, one pair for both schemes (RU-68: the current step is the
       strongest the current and pressed seats' words allow, and no step of 12 % or more keeps
       them at 4.5:1; the hover is P0a's 8 %). The `:root` lines (tokens/sizing.css) stay for a
       DockControl outside any dock. */
    .glass-dock {
        --dock-control-hover-bg: color-mix(in oklab, var(--dock-fg-on-aurora, var(--foreground)) 8%, transparent);
        --dock-control-active-bg: color-mix(in oklab, var(--dock-fg-on-aurora, var(--foreground)) 10%, transparent);
        --glass-capsule-fill: var(--dock-control-active-bg);
    }

    /* R7-6 (RU-68): inside a dock a press is the seat's press scale over its own fill and 2 %
       of the ink, not a step of its own; the seats' `:active` fills are for a seat outside. */
    .glass-dock :is(.dock-icon-button, .dock-tab-button, .dock-trigger):active:not(:disabled):not([aria-disabled="true"]) {
        background-image: linear-gradient(
            color-mix(in oklab, var(--dock-fg-on-aurora, var(--foreground)) 2%, transparent),
            color-mix(in oklab, var(--dock-fg-on-aurora, var(--foreground)) 2%, transparent)
        );
    }
    /* RU-56 end */""", f"""    /* W-I.8 RU-56: (RU-94) inside a dock the current seat's fill, a hovered seat's fill and a
       segmented control's selected mark are the dock's own ink over whatever the plate is, so they
       keep their distance from the plate at any level and in both schemes. The current step is the
       weakest of 10, 12 and 14 % whose current and pressed seats' words read 4.5 and whose marks read
       1.2; the hover step is the scheme's (tokens/glass.css). The `:root` lines (tokens/sizing.css)
       stay for a DockControl outside any dock. */
    .glass-dock {{
        --dock-control-hover-bg: color-mix(in oklab, var(--dock-fg-on-aurora, var(--foreground)) var(--dock-hover-step), transparent);
        --dock-control-active-bg: color-mix(in oklab, var(--dock-fg-on-aurora, var(--foreground)) {C}%, transparent);
        --glass-capsule-fill: var(--dock-control-active-bg);
    }}

    /* R7-6, RU-92: inside a dock a press is the seat's press scale and 2 % of the ink over its own
       fill, and a seat that is not current is pressed over the hover step at every pointer, so a
       press under a finger looks like one under a mouse. */
    .glass-dock :is(.dock-icon-button, .dock-tab-button, .dock-trigger):active:not(:disabled):not([aria-disabled="true"]) {{
        background-image: linear-gradient(
            color-mix(in oklab, var(--dock-fg-on-aurora, var(--foreground)) 2%, transparent),
            color-mix(in oklab, var(--dock-fg-on-aurora, var(--foreground)) 2%, transparent)
        );
    }}
    .glass-dock :is(.dock-icon-button, .dock-tab-button, .dock-trigger):active:not(:disabled):not([aria-disabled="true"]):not(.is-active, .active, [aria-current="page"], [aria-pressed="true"], [aria-expanded="true"], [data-active]) {{
        background-color: var(--dock-control-hover-bg);
    }}

    /* RU-95: inside a dock a segmented control has no channel of its own: the plate is its track
       and each segment a seat, at the seat's height, its selected mark the current step and its
       hover the hover step. Neither the track nor the indicator draws a shadow (its lens goes in
       adaptive-legibility.css). */
    .glass-dock .glass-capsule-track {{
        background: none;
        box-shadow: none;
    }}
    .glass-dock .segmented-tabs:not(.segmented-tabs--underline) .segmented-indicator {{
        box-shadow: none;
    }}
    .glass-dock .segmented-tab {{
        min-block-size: var(--dock-control-size);
    }}
    @media (hover: hover) {{
        .glass-dock .segmented-tabs:not(.segmented-tabs--underline) .segmented-tab:not([data-active]):hover {{
            background-color: var(--dock-control-hover-bg);
        }}
    }}
    /* RU-56 end */"""),
])
edit("src/components/dock/styles/adaptive-legibility.css", [
 ("""    /* The static dock's controls sample no backdrop either. The capsule register (an
       active control's seat, a capsule track) carries its own `--glass-blur-*` lens,
       composed at `:root`, so the root's `--glass-level: 0` never reaches it; over an
       opaque plate that lens is a lit disc in dark. */
    .glass-dock[data-backdrop-mode="static"] :is(.glass-capsule, .glass-capsule-track) {""",
  """    /* No control in a dock samples the backdrop (RU-95 as amended for R8-1: never a blur inside
       a blur). The capsule register (an active control's seat, a segmented control's track and
       indicator) carries its own `--glass-blur-*` lens, composed at `:root`, so the dock's level
       never reaches it. */
    .glass-dock :is(.glass-capsule, .glass-capsule-track) {"""),
])
# R8-9: the catch-light leaves every dock control.
DOCKSEL = ["dock-icon-button", "dock-tab-button", "dock-select-trigger", "dock-dropdown-trigger"]
s = open(W + "/src/styles/glass/material.css").read()
n0 = s.count(".dock-")
import re
lines = s.split("\n"); outl = []; cut = 0; inside = False
for ln in lines:
    t = ln.strip()
    if t.endswith(":is("): inside = True
    if t.startswith(")"): inside = False
    m = re.fullmatch(r"(\.dark )?\.(dock-icon-button|dock-tab-button|dock-select-trigger|dock-dropdown-trigger)(:hover|:active)?::before( \{|,)", t)
    m2 = inside and re.fullmatch(r"\.(dock-icon-button|dock-tab-button|dock-select-trigger|dock-dropdown-trigger),?", t)
    if m:
        cut += 1
        if t.endswith("{"):
            assert outl[-1].rstrip().endswith(","), outl[-1]
            outl[-1] = outl[-1].rstrip()[:-1] + " {"
        continue
    if m2:
        cut += 1
        if not t.endswith(","):
            outl[-1] = outl[-1].rstrip().rstrip(",")
        continue
    outl.append(ln)
s2 = "\n".join(outl)
for old, new in (
    ("""       The five ladder rungs + `.glass-card` + the `.dock-icon-button` CONTROL
       compose the material selector group, so a Switch thumb, a glass Button, a Dialog,""", """       The five ladder rungs + `.glass-card` compose the material selector group, so
       a Switch thumb, a glass Button, a Dialog,"""),
    ("""       The dock's catch-light lives on
       its CONTROLS (`.dock-icon-button` et al., listed below + in the opt-in
       transition block), which ARE in the material group — NOT on the shell plate.
       Adding a shell gleam would re-introduce glass-on-glass over the controls, so
       the shell-without-gleam""", """       Its controls carry none either (W-I.8 RU-94 as amended for R8-9: a dock
       control's hover is one fill); they keep only `position: relative` above. So
       the shell-without-gleam"""),
    ("""       (`.glass-specular-track` — Card emits it conditionally, the dock controls + the
       Slider thumb compose it)""", """       (`.glass-specular-track` — Card emits it conditionally, the Slider thumb
       composes it)"""),
    ("""       "position-tracked → --ease-standard"; only the SELECTOR scope changes). The dock
       controls keep the always-on transition (they are interactive controls; their rest
       intensity is 0 so they paint nothing at rest, but a control legitimately carries
       the transition). */""", """       "position-tracked → --ease-standard"; only the SELECTOR scope changes). */"""),
):
    assert s2.count(old) == 1, old[:60]; s2 = s2.replace(old, new)
open(W + "/src/styles/glass/material.css", "w").write(s2)
print("material.css dock selector lines cut:", cut, "left:", s2.count(".dock-"))
s = open(W + "/src/styles/glass-specular-track.css").read()
for d in DOCKSEL:
    s = s.replace(f"        .{d}::before,\n", "")
open(W + "/src/styles/glass-specular-track.css", "w").write(s)
print("glass-specular-track.css dock lines left:", s.count(".dock-"))
# the sizing block (styles/controls.css:40-71) and its token
s = open(W + "/src/components/dock/styles/controls.css").read()
i = s.index("@layer components {\n    /* Momentum-gated dock-control press spring.")
s = s[:i].rstrip("\n") + "\n"
open(W + "/src/components/dock/styles/controls.css", "w").write(s)
edit("src/styles/tokens/sizing.css", [("""    /* A 40px dock tile is a fraction of a card's plate, so the global 36% specular
       blooms a tile-filling disc on it. 22% wakes as a restrained edge-catch instead;
       the global card/panel size is untouched. */
    --dock-control-specular-size: 22%;

""", "")])
# DockControl and DockTrigger: the two classes and the directive that fed the catch-light
edit("src/components/dock/DockControl.vue", [
 ("""import { vSpecular } from "../../composables/glass";
""", ""),
 ("""// The icon shape composes the full glass-capsule register (hover-lift + press +
// the selected `.glass-capsule` seat); the tab shape reads its own de-red'd glass
// hover register (`.dock-tab-button`, dock-controls/tab-button.css). Both carry
// `glass-specular-track` for the moving `::before` catch-light the directive feeds.
const classes = computed(() =>
    isTab.value
        ? cn("dock-tab-button glass-specular-track", props.class)
        : cn(
              "dock-icon-button glass-specular-track glass-capsule-hover",""", """// The icon shape's selected seat composes `.glass-capsule`; the tab shape reads its own
// hover register (`.dock-tab-button`, controls/tab-button.css). No dock control carries a
// catch-light (W-I.8 RU-94 as amended for R8-9): the hover is one fill.
const classes = computed(() =>
    isTab.value
        ? cn("dock-tab-button", props.class)
        : cn(
              "dock-icon-button","""),
 ("""    <Primitive
        v-specular
        as="button\"""", """    <Primitive
        as="button\""""),
])
s = open(W + "/src/components/dock/DockTrigger.vue").read()
assert s.count("        v-specular\n") == 3
s = s.replace("        v-specular\n", "").replace('import { vSpecular } from "../../composables/glass";\n', "")
open(W + "/src/components/dock/DockTrigger.vue", "w").write(s)
# the icon seat's inset plate: keyed on the seat attribute every DockControl carries, now that the hover class is gone
edit("src/styles/glass/glass-capsule.css", [
 ("""    .glass-dock :is(.glass-capsule, .glass-capsule-hover),
    .glass-dock .dock-icon-button.glass-capsule-hover {""", """    .glass-dock :is(.glass-capsule, .glass-capsule-hover),
    .glass-dock .dock-icon-button[data-glass-dock-seat] {"""),
])
# RU-96 as amended for R8-8: the toggle at full ink, its hover the dock's step
edit("src/components/dark-mode-toggle/dark-mode-toggle.css", [
 ("""        background: transparent;
        opacity: 0.8;
        cursor: pointer;
        transition:
            opacity var(--duration-fast) var(--ease-standard),
            background-color""", """        background: transparent;
        cursor: pointer;
        transition:
            background-color"""),
 ("""            background: var(--surface-tint-10);
            opacity: 1;
        }""", """            background: var(--dock-control-hover-bg);
        }"""),
 ("""        box-shadow: var(--focus-ring-shadow, var(--dock-ring));
        opacity: 1;
    }""", """        box-shadow: var(--focus-ring-shadow, var(--dock-ring));
    }"""),
])
print("s4 edits applied")

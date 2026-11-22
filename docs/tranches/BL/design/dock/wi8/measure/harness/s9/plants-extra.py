# plants-extra.py: exec'd by s9/plant9s.py; each S item's plants after S1's, anchored on that item's tree.
#   s3-nodark     RU-93's plant: the token's dark line removed (the dark cell reads 1)
P["s3-nodark"] = ("RU-93 plant: the token's dark line removed", [("src/styles/tokens/glass.css", ".dark {\n    --glass-level-dock: 0.7;\n}\n", "")])
# S4's plants (RU-92, RU-94, RU-95, RU-96 as amended), anchored on the S4 source text, not on its step values.
_DK = "src/components/dock/styles/dock.css"
P["s4-press2"] = ("RU-92 plant: a press is 2 % over a bare seat (no hover step under a finger)", [(_DK, """    .glass-dock :is(.dock-icon-button, .dock-tab-button, .dock-trigger):active:not(:disabled):not([aria-disabled="true"]):not(.is-active, .active, [aria-current="page"], [aria-pressed="true"], [aria-expanded="true"], [data-active]) {
        background-color: var(--dock-control-hover-bg);
    }
""", "")])
P["s4-hover8"] = ("RU-92 (C8-M16) plant: the hover step at 8 %", [(_DK, "var(--dock-hover-step), transparent);", "8%, transparent);")])
P["s4-cureqhover"] = ("RU-94 plant: the current step equal to the hover", [(_DK, """--dock-control-active-bg: color-mix(in oklab, var(--dock-fg-on-aurora, var(--foreground)) """, """--dock-control-active-bg: color-mix(in oklab, var(--dock-fg-on-aurora, var(--foreground)) var(--dock-hover-step), transparent); --s4-was: color-mix(in oklab, var(--dock-fg-on-aurora, var(--foreground)) """)])
P["s4-channel"] = ("RU-95 plant: the channel restored inside the dock (fill, rim, shadow and lens)", [(_DK, """    .glass-dock .glass-capsule-track {
        background: none;
        box-shadow: none;
    }
    .glass-dock .segmented-tabs:not(.segmented-tabs--underline) .segmented-indicator {
        box-shadow: none;
    }
""", ""), (D + "styles/adaptive-legibility.css", "    .glass-dock :is(.glass-capsule, .glass-capsule-track) {", "    .glass-dock[data-backdrop-mode=\"static\"] :is(.glass-capsule, .glass-capsule-track) {")])
P["s4-toggle08"] = ("RU-96 (R8-8) plant: the toggle's 0.8 restored", [("src/components/dark-mode-toggle/dark-mode-toggle.css", "        background: transparent;\n        cursor: pointer;", "        background: transparent;\n        opacity: 0.8;\n        cursor: pointer;")])
# S5's plants (RU-98, RU-99, RU-100), anchored on the S5 source.
P["s5-tab38"] = ("RU-98 plant: the comfortable tab height back to 38 px", [(D + "styles/density.css", "        --dock-tab-h: var(--dock-control-size);\n", "        --dock-tab-h: calc(38px * var(--dock-scale));\n")])
P["s5-trigrun"] = ("RU-99 plant: the trigger's seat cut back to the run", [(D + "styles/controls/triggers.css", "    .glass-dock :is(.dock-run, .dock-persistent) :is(.dock-trigger, .dock-select-trigger, .dock-dropdown-trigger) {", "    .glass-dock .dock-run :is(.dock-trigger, .dock-select-trigger, .dock-dropdown-trigger) {")])
P["s5-ctlglyph"] = ("RU-100 plant: the controls preset's glyph line removed", [(D + "styles/density.css", "        --dock-icon-glyph-ratio: 0.5;\n", "")])
# S6's plants (RU-101, RU-90's O-262, RU-89), anchored on the S6 source.
_B = D + "composables/useDockBody.ts"; _S = D + "composables/useDockState.ts"
P["s6-words"] = ("RU-101 plant: the grown seat's width glide removed (no cut)", [(_B, "            if (cut > 0) el.style.clipPath =", "            if (cut > 0 && false) el.style.clipPath =")])
P["s6-empty"] = ("RU-90 (O-262) plant: an empty region carried from its empty box", [(_B, "            if (t.w === 0 && t.h === 0 && layout) {", "            if (false) {")])
P["s6-nogate"] = ("RU-89 plant: the press gate removed from the persistent seat's fold", [(_S, "            if (afterSeat && pressHolds()) foldOnPressEnd = true;\n            else if (afterSeat) collapse();", "            if (afterSeat) collapse();")])
P["s6-afterseat"] = ("RU-89 plant: the persistent seat's branch removed (the leave lingers)", [(_S, "            if (afterSeat && pressHolds()) foldOnPressEnd = true;\n            else if (afterSeat) collapse();\n            else scheduleCollapse();", "            scheduleCollapse();")])
# S7's plant (RU-103): the sampler's morphing gate removed.
P["s7-nogate"] = ("RU-103 plant: the sampler's morphing gate removed", [("src/composables/glass/useGlassBackdropLuminance.ts", """        if (el.hasAttribute("data-morphing")) {
            owed = true;
            return null;
        }
""", "")])

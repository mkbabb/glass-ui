# foundations/css-utilities — COMPONENT deep audit (Pass-E)

**Route:** `/foundations/css-utilities` · **Demo file:** `demo/stories/foundations/css-utilities.vue`
**Underlying "component":** there is NO Vue component and NO procedural viz behind this page.
The demoed artefact is a pure CSS recipe:

- **`@utility scale-on-hover`** — `src/styles/utilities/btn.css:14-26`
- **token `--scale-hover`** (default `1.08`) — `src/styles/tokens/scale-paper.css:9`
  - siblings `--scale-hover-btn` (1.05, `:24`), `--scale-hover-dock` (1.1, `:25`)

So this is a **token + 6-line utility** demo. The audit dimensions that assume a JS
component (procedural-viz spec, offscreen-pause, Safari WebGL/WGSL) are N/A here; the
dimensions that DO bind are the motion-canon easing register, compositor-safety, the
four-state contract, the import-path label, and the doc-vs-code freshness.

---

## The REAL code (read in full)

```css
/* src/styles/utilities/btn.css:14-26 */
@utility scale-on-hover {
    scale: 1;
    transition: scale var(--spring-smooth-duration) var(--spring-smooth);
    &:hover { scale: var(--scale-hover); }
}
```

```css
/* src/styles/tokens/scale-paper.css:9 */
--scale-hover: 1.08;
```

---

## Audit dimensions

### (1) ANIMATION — affordance + motion-canon

- **CORRECT and idiomatic.** The `scale` longhand (not the `transform` shorthand) is
  transitioned, so the migrated individual-transform animates (AQ.W3 §W3.2). The leg
  rides `--spring-smooth` + `--spring-smooth-duration` — exactly motion-canon P1
  (spatial→spring) + P4 (per-spring duration clock). A hover-scale on a bezier would
  read mechanical; this is the alive register. **No dead/janky/missing animation.**
- **Scope note (NOT a component defect):** `scale-on-hover` is a HOVER-only recipe — it
  carries NO `:active` press, no entrance/exit, no four-state contract. That is BY
  DESIGN: it is the single-purpose hover-lift utility (the four-state contract lives in
  the sibling `btn-interactive`, `btn.css:197-214`, and in the Button primitive). The
  page demos exactly what the utility is. No augmentation owed on the utility itself.

### (2) PROCEDURAL VIZ — N/A. No aurora/blob/fourier; no GL/WGSL surface on this route.

### (3) PERFORMANCE — compositor-only

- **Clean.** `scale` is a compositor-safe property (`proof:no-layout-animation` corpus).
  No layout property animates; no `width`/`height`/`padding` thrash. The page mounts no
  rAF, no observer, no GL context (foundations one-GL-per-route budget is honoured —
  zero GL).

### (4) SAFARI — `scale:` individual-transform longhand is Safari 14.1+/16-baseline; the
  `@property`-free token read is universal. No `backdrop-filter`/`mask-composite`/
  `contrast-color()` engine-gap surface on this recipe. **Fully Safari-compatible.**

### (5) IDIOMATIC / no-legacy — ONE real finding

- **STALE DOCSTRING (doc-vs-code drift) — the load-bearing finding.** Two comments claim
  the transition binds to the BEZIER pair, contradicting the actual SPRING rule:
  - `src/styles/utilities/btn.css:12-13`: *"transition + easing bind to the canonical
    `--duration-fast` + `--ease-standard` tokens"* — but the rule (`:21`) uses
    `--spring-smooth-duration` + `--spring-smooth`.
  - `demo/stories/foundations/css-utilities.vue:7` (page header comment) +
    `:18` (live `blurb` PROSE shown to the user): *"with `--duration-fast` +
    `--ease-standard`"* and *"plus a transition-transform shorthand"*. Both wrong on two
    counts: (a) the easing is the spring register, not the bezier pair; (b) the rule
    transitions the `scale` LONGHAND, explicitly NOT the `transform` shorthand (the
    docstring at `:15-16` even says so). This is a USER-FACING inaccuracy in the blurb.
  The body inline `<li>` at `css-utilities.vue:89-90` repeats the same wrong claim
  ("Transition: `--duration-fast` + `--ease-standard`").
- **No dual-path, no dead code, no workaround** in the recipe. The token is the single
  source; consumers retune at any ancestor scope (the page's `.scope-*` blocks prove it).

### (6) GLASS SIX-LAYER COMPOSITE — absent, and correctly so on the UTILITY, but the
  PAGE is the gap. `scale-on-hover` is a motion utility, not a surface — it carries none
  of the six optical layers, which is right. But the DEMO CHIPS
  (`css-utilities.vue:26-37`) are `rounded-full bg-card border border-border
  shadow-cartoon` opaque slabs over the (invisible) paper substrate — the dated-plate +
  no-glass + no-aurora gestalt the BD Band-4 modernization targets. The user's asks
  ("each sub-section in its own glassy card", "bigger main card", "glass demos over
  COLORFUL aurora", "standardize the import-path label", "tighten superfluous language")
  are all PAGE-level, inherited from the chassis + the demo-plate idiom — none are
  src-component bugs.

---

## FOLD / MODIFY / AUGMENT / PRUNE — mapped to BD waves

| # | Finding | Disposition | Wave |
|---|---|---|---|
| F1 | Stale docstring in `btn.css:12-13` (claims bezier `--duration-fast`/`--ease-standard`; rule uses `--spring-smooth`) | **MODIFY** (src CSS comment — 2-line freshness fix) | **NEW micro-wave or fold into `BD.W-HOMEMAP-RESYNC` / a doc-freshen wave.** Not covered by any Band-4 wave (those are demo-page zero-src). The btn.css comment is `src/`. Smallest home: a doc-only freshness amendment. |
| F2 | Page blurb (`css-utilities.vue:18`) + header comment (`:7`) + body `<li>` (`:89-90`) repeat the wrong easing/shorthand claim — USER-FACING | **MODIFY** + **tighten language** (the user's "tighten superfluous language" ask) | **FOLD into `BD.W-PAGE-HEADER-FOLD` adjacency** (demo-page Band-4, zero src) OR a Band-4/5 page-copy pass. Re-word to "rides `--spring-smooth` on the `scale` longhand". |
| F3 | Demo chips are opaque `bg-card … shadow-cartoon` slabs; no glass, no aurora; sub-sections not in glassy cards; main card not bigger; import-path label not standardized | **AUGMENT** (the page-level modernization: glassy per-section cards + bigger main + aurora field via `ShowcaseFrame tier="field"` + standardized import label) | **Chassis waves cover the structural defects FOR FREE** per `page-audit/foundations.md:160-162` (header-scale / paper-substrate-visible inherited from the chassis). The per-page glass-band + import-label + bigger-card asks are the BD Band-4 demo modernization surface — closest owner is the `BD.W-TOKEN-TOUR-GLASS` Arm-B pattern (BC glass band DEMONSTRATED on a foundations token-tour page over `tier="field"`), applied to css-utilities. **AUGMENT that wave's enrolled set, or mint a sibling `BD.W-FOUNDATIONS-UTILS-GLASS`.** |
| — | `scale-on-hover` utility itself (animation/perf/Safari/idiom) | **KEEP — no change** | clean; motion-canon-compliant, compositor-only, Safari-safe |

**No PRUNE.** Nothing dead. The utility is a live single-source recipe (consumed
library-wide; this page is its specimen).

---

## Notes for the orchestrator

- The ONLY `src/` edit this page surfaces is the F1 2-line docstring freshness in
  `btn.css` — the RULE is correct, the COMMENT lies. This is the cardinal doc-vs-code
  drift class; it does NOT need a gate, just the amendment.
- Everything else (F2 blurb wording, F3 glass/aurora/card/import-label modernization) is
  DEMO-PRIVATE Band-4 page work — zero src paint — and most of the structural muddiness
  is fixed by the chassis waves the audit already cites.
- `css-utilities` is currently enrolled in `BD.W-PAGE-OFFTOKEN-SWEEP` +
  `BD.W-DATA-RAW-BUTTONS` reference lists but NOT in `BD.W-TOKEN-TOUR-GLASS`'s glass-band
  arm — that is the enrollment gap to close for the user's glass/aurora asks.

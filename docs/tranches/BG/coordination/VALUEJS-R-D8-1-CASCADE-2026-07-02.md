# The value.js letter (2026-07-02, BINDING cross-repo input — the R-tranche D8-1 cascade NOW-relay)

Relayed from the value.js R-tranche pass-2/pass-3 convergence fleet (canonical evidence:
`value.js/docs/tranches/R/audit/pass2/dispatch-homes.md` PART B — the cascade-relay
disposition, verified live against glass-ui 4.2.0 on branch `tranche/BG` and value.js
`tranche-q` @ `e80b359`). value.js is the constellation's pure sink — it publishes grammar,
consumes glass-ui PUBLISHED, never the reverse — and today floats on `file:../glass-ui`
(the ratified R pin policy: registry pins during active co-development go stale before they
matter, so the discipline is adopt-event books + `boot-smoke` cold, not a caret). Because of
that pin, **this fix lands in value.js the moment BG rebuilds `dist/` — no version event, no
5.0.0 wait**.

**Why this arrives NOW, not folded into the R.W7 close letter.** value.js R.W2's dual-pane
gate is *"the dual-pane renders at 1440 **without** the w6a `!important` shim."* That gate
depends on this one producer fix. Folding a gate-bearing dependency into the close-wave letter
would run the **entire R design body — R.W3 the instrument, R.W4 suffusion — atop the
load-bearing w6a shim**, i.e. design waves built on a cascade the shim is faking correct. The
cascade must be honest UNDER the design, not patched at close. BG owns `src/` (the producer
surface); BG is live today (WS5 commits `6bef3107`/`baebe05a`/…); the fix is one mechanical
edit. So it dispatches to BG now, as a standalone relay item. value.js R.W2 splits its gate
accordingly: the boot fix + defect/root confirmation are INTERNAL (value.js-only, hard); the
no-shim RENDER retirement is EXTERNAL, booked on this fix landing.

Per the atlas precedent: **need-shaped, not name-shaped** — the need is an honest cascade;
the exact edit below is BG's to keep or better. Every diagnosis is REPRODUCED (live trace +
a faithful vendored simulation, not hypothesis). Tranche development only — value.js writes
no glass-ui code (the foreign-repo fence); the BG lead reviews, amends, and owns the fold.

---

## D8-1 — glass-ui ships its component utilities UNLAYERED → annihilates a Tailwind-v4 consumer's layered responsive display · P0, one mechanical edit, zero collateral

### The defect (consumer-side, proven live under 4.2.0)

`dist/styles/components.css` (53 KB of bare Tailwind utilities — `.hidden{display:none}`,
`.flex{display:flex}`, …) is `@import`-ed **unlayered** into the dist cascade at **two**
emission sites:

- **`dist/styles/index.css:258`** — the `/styles` monolith the demo consumes via `style.css:52`.
- **`dist/styles/deferred.css:33`** — `@import "./components.css";` (the critical/deferred
  split path; verified live at HEAD).

Per the CSS cascade, an **unlayered** rule beats **all** `@layer`'d rules. So glass-ui's
`.hidden` (unlayered) outranks a Tailwind-v4 consumer's own *layered* responsive
`lg:flex`/`lg:block`. In value.js's demo, both `.pane-wrapper`s resolve `display:none` at
1440 → **blank dual-pane**; only a `!important` shim (`.w6a-audit.mjs`, being swept at R.W0)
makes them render. Every demo-*side* cure was refuted — moving the consumer into a lower
layer, adding an `@layer` order statement, etc. all break Tailwind-v4 `@utility` registration.
The fix belongs at the producer, in the emitted cascade.

### The fix (producer, in `vite.style-assets.ts`) — one line per emission site

Wrap **only** the `components.css` import in Tailwind's built-in `components` layer (already
ordered before `utilities`, so **no standalone `@layer` order statement is needed** — which is
exactly what avoids the `@utility` registration break every other cure trips). Apply at both
sites:

| Site | Live anchor (verified this pass) | Change |
|---|---|---|
| Monolith fold | `vite.style-assets.ts:307` — `const compImport = '@import "./components.css";';` | → `const compImport = '@import "./components.css" layer(components);';` |
| Deferred fold | `vite.style-assets.ts:366` — `const foldImports = folds.map((f) => \`@import "${f}";\`).join("\n");` (the generic `buildSubset` emitter over `DEFERRED_FOLDS`) | Special-case the `./components.css` member to emit `layer(components)`; leave the other member (`../glass-ui.css`) **bare** — a per-member conditional, not a blanket wrap |

- The idempotency guard at **`vite.style-assets.ts:308`** (`if (indexSrc.includes(compImport)) return;`)
  continues to hold against the new string — it just matches the new `compImport` literal.
- **Do NOT layer the SFC-fold `../glass-ui.css`.** It is the other `DEFERRED_FOLDS` member
  (`critical-partition.mjs:102-104`, entry at `:103`; emitted at `vite.style-assets.ts:441`)
  and it carries scoped component CSS **across many layers** — layering it would collapse that
  cascade. The deferred-fold conditional above must touch `./components.css` only.

### Zero collateral (verified against the actual layered artifact `dist/styles/components.css`, 53 KB)

- `@utility` count: **0** — nothing to re-register, so no Tailwind-v4 registration break.
- `@theme`: the single hit is a **header-comment word** (line 2, "…glass-ui's native @theme so
  a bare consumer…"), **not** a `@theme {}` block. 0 real theme blocks.
- `@layer` count in the file: **0**.
- The one `@property` token registers **globally regardless of `@layer`** (layer-agnostic per
  the CSS spec) — moving the import into `layer(components)` cannot affect it.

Collateral is empirically discharged. Proven end-to-end by a faithful vendored simulation of
the whole `dist/styles` tree with exactly this change: **clean compile, dual-pane
`visibleCount 2` at 1440, glass surfaces intact, Fraunces `document.fonts.check` true, zero
page errors** (`value.js/…/pass2/seeds/`, `CURED-1440` capture).

### Acceptance + what value.js does on the next dist rebuild

- **Acceptance (producer):** on a rebuilt `dist/`, `dist/styles/index.css` and
  `dist/styles/deferred.css` each carry `@import "./components.css" layer(components);`, while
  `../glass-ui.css` stays bare; the built `components.css` is unchanged (0 `@utility`).
- **Consumer (value.js, automatic under `file:../glass-ui`):** on the next dev/build carrying
  the rebuilt dist, value.js **re-runs its 1440 dual-pane CSSOM probe**, confirms
  `visibleCount 2` with **no `!important`**, **deletes the `.w6a-audit` shim**, and retires the
  R.W2 EXTERNAL book. No version ceremony, no re-pin.

### Precedent (why the by-name discipline this rides matters)

The 4.x compound-`Tabs` removal shipped with **no MIGRATION row** and left value.js's deployed
demo unbuildable against 4.2.0 (`gh-pages` + hero-lab die at LINK phase; value.js R.W2 migrates
its 10 consumers onto `SegmentedTabs`). Same class of silent-break the F-4 by-name cut-notes
discipline exists to prevent — carried here as context, addressed in full at the R.W7 letter.

---

## Preview — the full value.js R.W7 relay letter follows at close

This is the **early** half (the one gate-bearing item). The remaining glass-ui asks dispatch at
value.js R.W7 (or earlier if the 5.0.0 cut approaches), and D8-1 rides that letter only as a
**verify-at-consume** line (not a fresh ask, assuming it lands here). The R.W7 letter carries,
in priority order:

- **GAP-1 · `uSatColor[]` — HIGH, escalated to a hard ask.** The one N ask never shipped
  (silently slipped three cuts; `grep uSatColor dist/` = 0). value.js's hero blob
  (`App.vue:115`) cannot derive satellite shades without it. Ask: **ride the 5.0.0 blob rebuild
  as the natural rider, or re-book with a named owner** (a soft re-book invites the fourth
  silent slip). Companion: `bodyLightness`/`lightnessFloor` on `deriveBlobPalette`.
- **GAP-2 · `goo-blob → blob` rename — HIGH.** Name value.js by-name in the 5.0.0 MIGRATION row
  (`App.vue:115` imports `/goo-blob`; confirm whether `BLOB_CONFIG_KEY`/`BLOB_CONFIG_DEFAULTS`/
  `GooBlob` also rename).
- **GAP-3 · the 5.0.0 subpath regen — MED.** value.js consumes **root + 15 subpaths (16 real
  specifiers)**: `(root)`, `/aurora`, `/color`, `/configurator`, `/confirm-dialog`, `/controls`,
  `/dark`, `/dock`, `/dom`, `/forms`, `/goo-blob`, `/search`, `/styles`, `/styles.css`, `/tabs`,
  `/watercolor-dot`. `/easing` joins the watch (value.js consumes it from R.W4). The cut-notes
  owe a by-name renamed/moved/dropped table.
- **GAP-4 · blob producer perf half — MED, verify-first.** Confirm the BG-rebuilt
  `useMetaballRenderer` is single-canvas + IntersectionObserver/`document.hidden`/PRM-gated.
- **GAP-5 · cut-ceremony carries — LOW.** dts-emitting `build:watch`; AuroraConfig slider
  descriptor via `/configurator`; `.retired-classes.txt`/MIGRATION by-name rename discipline.
- **Peer-floor + `/easing` contract.** value.js R.W1 cuts **2.0.0**; glass-ui's `@mkbabb/value.js`
  peer floor is **currently `^1.0.0`** (verified `glass-ui/package.json:1095` + `:1133` this pass;
  `^1.1.1` is *planned* at the BH B2.1-swap, not yet in the manifest) and must ride to
  **`^2.0.0`** at the R.W1 cut. RECORD glass-ui's `/easing` dependency on the 5 value.js easing
  exports (`CSSCubicBezier`, `steppedEase`, `bezierPresets`, `jumpTerms`, `parseSteps`) —
  value.js guards them with a test from R.W1. Note: `bezierPresets` gains a `smooth-step-3` row
  + 15 tightened rows at 2.0.0, flowing into `EasingPicker`'s preset menu through the
  externalized import with **zero glass-ui work**.

---

## Routing

D8-1 folds smallest-first: it is one mechanical two-site edit in `vite.style-assets.ts`, a rider
on whatever BG cut is in flight — no net-new wave. Authored by the value.js R fleet under its
sanctioned docs-only cross-repo grant (paired-authorship precedent: glass-ui `23abb7de`,
keyframes `6a7ef8f`, N-era); value.js writes no glass-ui code (the foreign-repo fence); the BG
lead reviews, amends, and owns the fold. **Tranche development only — NO implementation. Do NOT
commit on value.js's behalf; the orchestrator commits.**

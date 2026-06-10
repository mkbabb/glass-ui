# AZ.W-CARVE — the central-CSS carve: dock-controls.css + theme.css drain the god-module ratchet

**Track:** Z (hygiene) · **Type:** structure (style carve, behavior-isomorphic) · **Repo:** glass-ui
**Depends on:** Batch 0 (AZ.W-GATES — the manifest repair lands first so the re-pointed gates run on a sound runner) · coordinates with AZ.W-REGISTER-IOS (the ONE other AZ wave that edits `dock-controls.css` content — it re-points the rail accent + adds the press darken, Batch 1; re-grep at HEAD to confirm no other dock wave landed a `dock-controls.css` edit — W-DOCK-RAIL/W-DOCK-FLICKER/W-ADAPTIVE-AUTO touch `layer-group.css`/`morph.css`/`shell.css`/`tokens/*`, NOT `dock-controls.css`). This wave moves ONLY file boundaries; sequence AFTER W-REGISTER-IOS's batch lands (Batch 1 < Batch 5) or run in a sibling worktree with a structure-only diff.
**STATUS: SPEC**

The two surviving over-bound CENTRAL stylesheets drain their `RATCHET_BASELINES` rows
(`scripts/proof-no-god-module.mjs:48-57`): `styles/dock-controls.css` frozen at **636** (raised
621→636 at the AY close for the user-audit dock-chrome growth — the re-freeze note in the baseline
says "the carve target is unchanged") and `styles/theme.css` frozen at **530**. The carve is the
booked successor those BOOK(AY.W-CSS1) rows name. The precedent is shipped twice over: `dock.css` is
a thin `@import` root over `dock/{shell,morph,density,layers,layer-group,overflow}.css` (AX.W06) and
`glass.css` over its carved partials (AY.W-CSS1) — cascade-order-safe partials, each < 500 lines,
the root keeping ONLY the `@import` lines + the cascade-order header.

## §0 — RE-GROUND (step-0, mandatory)

Re-grep before any edit — the Batch-1 W-REGISTER-IOS edit will have changed dock-controls.css content (it is the ONE dock-band wave that touches this file; the other dock waves edit layer-group/morph/shell/tokens, NOT dock-controls.css), so carve against the post-W-REGISTER-IOS bytes:

```
wc -l src/styles/dock-controls.css src/styles/theme.css
grep -n "RATCHET_BASELINES" -A 14 scripts/proof-no-god-module.mjs
grep -ln "dock-controls" scripts/proof-*.mjs        # the composed-read re-point set
grep -ln "theme.css\|theme\.css" scripts/proof-*.mjs # the theme.css composed-read re-point set
grep -n "@theme\|@variant" src/styles/theme.css     # CONFIRM the 4-construct divisibility (3 @theme + @variant dark)
grep -n "@import" src/styles/index.css               # the cascade order the carve must preserve
```

The theme.css `@theme` grep MUST return the leading plain `@theme` (radius), the `@theme inline`
(bridges), the trailing plain `@theme` (literals), and the `@variant dark` — four constructs, the
proof the sheet is divisible (NOT one indivisible block; §3). If it returns a SINGLE `@theme` block
spanning the whole file, THAT is a real scope-reveal — STOP and report; but at authoring HEAD it is
four, so the carve proceeds.

The gate list reading `dock-controls.css` at authoring HEAD (re-confirm; each needs the
composed-read re-point — the same carve-aware pattern as `proof:blob-config`'s
`RENDERER_FILES = [...]` joined read):

| gate script | why it reads the file |
|---|---|
| `proof-dock-controls-split.mjs` | LANDED clause — each control family's base rule lives in dock-controls.css |
| `proof-dock-css-carve.mjs` | the dock.css carve contract names it |
| `proof-dock-perfection.mjs` | hover-register witnesses |
| `proof-dock-region-model.mjs` | region rules |
| `proof-adaptive-glass.mjs` | the W55 tint-seam witnesses |
| `proof-animation-coherence.mjs` | easing-register witnesses |
| `proof-glass-material-unified.mjs` / `proof-liquid-glass-material.mjs` | material witnesses |
| `proof-no-god-module.mjs` | the ratchet rows themselves |
| `proof-gate-script-parity.mjs` | indirect (manifest bijection — no re-point needed) |

The gate list reading `theme.css` at authoring HEAD (re-grep `grep -ln "theme.css\|theme\.css\|styles/theme" scripts/proof-*.mjs` — it was FIFTEEN scripts, NOT a tail of the dock set; every one that asserts a token-bridge/shadow/radius/`@theme`-idiom witness against the `theme.css` body needs the SAME composed `[root, ...partials].map(read).join("\n")` re-point, or it mis-asserts against the thin `@import`-only root):

| gate script | why it reads the file |
|---|---|
| `proof-shadow-contract.mjs` | the `--shadow-cartoon-*` `@theme inline` bridge alias lives in theme.css (moves to `theme/bridges.css`) |
| `proof-theme-style.mjs` | the `@theme`/`@theme inline` idiom witnesses themselves |
| `proof-tailwind-v4-idiom.mjs` | the v4 `@theme inline` vs plain discipline witnesses |
| `proof-design-idiom-localization.mjs` | theme bridge witnesses |
| `proof-dropdown-type-scale.mjs` / `proof-font-cascade-live.mjs` | the typography bridge aliases |
| `proof-animation-coherence.mjs` | the `--animate-*` trailing-literal witnesses (also a dock-controls reader above) |
| `proof-motion-suite.mjs` | the duration/ease bridge witnesses |
| `proof-reka-binding-idiom.mjs` / `proof-primitive-affordance.mjs` / `proof-components-css.mjs` | radius/color bridge witnesses |
| `proof-single-color-core.mjs` | the color bridge `@theme inline` witnesses |
| `proof-squircle-language.mjs` | the radius primitive/alias witnesses (leading plain `@theme`) |
| `proof-no-god-module.mjs` / `proof-ay-final.mjs` | the ratchet row + the inherited close aggregate |

Both reader sets re-point to the composed read; the §0 step-0 grep is the binding enumeration (re-confirm BOTH lists at HEAD — a band-1/2 wave or a sibling carve may have added or dropped a reader).

## §1 — The defect

D1 — `src/styles/dock-controls.css` is 636 lines (> the 500 hard bound), grandfathered. Five
control families share one monolith: `.dock-icon-button`, `.dark-mode-toggle-button`,
`.dock-tab-button` (+ tiers), `.dock-select-trigger`/`.dock-dropdown-trigger`, + the coarse-pointer
touch floor.
D2 — `src/styles/theme.css` is 530 lines (> 500), grandfathered: the `@theme` bridge block + the
dark-variant arm + the bridge aliases accreted into one sheet.

## §2 — Goal criterion

Both ratchet rows DELETED from `RATCHET_BASELINES` (the monotonic drain — empty is the close
state); every carved partial < 500 lines; the rendered CSS byte-isomorphic (the carve moves rules
across files in the SAME cascade position, never reorders within a layer).

## §3 — The carve

- `dock-controls.css` → a thin `@import` root over `dock-controls/{icon-button,dark-mode-toggle,tab-button,triggers,touch-floor}.css`
  (five families → five partials, the shared cross-control comma-groups staying at the root exactly
  as the dock.css carve kept the shared `:where()` four-state contract at ITS root).
- `theme.css` → a thin `@import` root over `theme/{radius,bridges,literals,dark}.css` partials,
  split at the existing block seams. **The "@theme cannot span files" / "one indivisible block"
  premise is FALSE and is NOT a valid BOOK escape** (re-verified at authoring HEAD): `theme.css`
  already holds FOUR distinct constructs — a LEADING plain `@theme` (radius primitives + aliases,
  `:28-108`), a `@theme inline` (the tokens.css bridges, `:110-435`), a TRAILING plain `@theme`
  (the `--animate-*`/opacity literals, `:444-526`), and the `@variant dark` line (`:529`) — so the
  sheet is manifestly divisible block-by-block. And Tailwind v4 registers `@theme` variables across
  `@import`ed files BY DESIGN (the v4 docs' "Sharing across projects" pattern is a standalone
  `theme.css` with an `@theme` block pulled in via `@import "../brand/theme.css"`; the repo's own
  `tokens.css`/`glass.css`/`utilities.css` already carve `@theme`-bearing partials this way). The
  ONE real constraint is CASCADE ORDER, not file-spanning: the partials MUST `@import` in the order
  leading-plain-`@theme` (radius) → `@theme inline` (bridges) → trailing-plain-`@theme` (literals)
  → `@variant dark`, because `@theme inline` substitutes values and the radius header note (`:7-25`)
  records why the radius aliases are plain-not-inline and must precede the inline bridges. Each
  partial is one whole construct (never split a single `@theme {}` mid-block); the byte-isomorphism
  witness (§4) is the arbiter. There is NO indivisibility BOOK escape — the theme.css row DRAINS.
- BOTH §0 gate sets re-point to a COMPOSED read (`[root, ...partials].map(read).join("\n")`): the
  ~8 dock-controls.css readers AND the ~15 theme.css readers (the theme arm is NOT exempt — it has a
  LARGER reader set than the dock arm, and `proof-shadow-contract`'s `--shadow-cartoon-*` bridge
  assertion REDs the instant the alias moves to `theme/bridges.css` without the re-point).
- `src/styles/index.css` cascade order unchanged (the root keeps its one import line).

## §4 — Completion criterion + the hard gate

`proof:no-god-module` GREEN with ZERO `styles/` ratchet rows — BOTH `dock-controls.css` AND
`theme.css` rows DELETED from `RATCHET_BASELINES` (no indivisibility BOOK escape; the close state is
`violations == [] && RATCHET_BASELINES == {}` for the styles arm); the full re-pointed gate set
GREEN; `npm run build` emits byte-identical `dist/glass-ui.css` (the isomorphism witness — diff the
built CSS before/after — AND, the load-bearing theme-specific witness: `vue-tsc`/`vite build` emits
the SAME generated `rounded-*`/`text-shadow-*`/color utility set, since a re-ordered `@theme inline`
vs plain split would drop a utility — the radius header `:7-25` names the exact collision); the
visual fleet (`proof:dock-perfection`, `proof:adaptive-glass`) green.

**Gate (extension, not new):** `proof:no-god-module`'s existing ratchet IS the gate — the carve
drains it. Bite: re-grow any partial past 500 → RED; re-add a ratchet row → the BOOK-marker assert
fires.

## §5 — Scope fence

File boundaries ONLY — zero rule edits, zero selector changes, zero token changes. The register
changes live in W-REGISTER-IOS/W-DOCK-RAIL; running this wave after theirs avoids cross-wave
conflicts on the same lines.

## §6 — Named successor

None — this wave closes the chronic; BOTH ratchet rows drain (the theme.css indivisibility escape is
withdrawn — the §3 re-ground proved the sheet divisible and Tailwind v4 `@theme`-across-`@import`
supported). The ONLY admissible miss is a byte-isomorphism failure on the generated-utility set (a
re-ordered `@theme inline`/plain split dropping a `rounded-*` utility per the radius header) — that
is a CARVE-INTERNAL fix-in-place (re-order the partials), NOT a BOOK deferral; if it cannot be made
byte-identical within this wave it fires the scope-reveal trigger back into this wave, never a
silent indivisibility BOOK.

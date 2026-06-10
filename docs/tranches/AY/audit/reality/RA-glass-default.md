# RA-glass-default — is glass ACTUALLY the default? (RealityB)

Lane: RA-glass-default · 2026-06-09 · live demo at `http://localhost:5199` (vite, serving HEAD `src/` directly — the demo imports `../../../src`, so this audits the real W54 code).

Method: drove every component family route headless (playwright, Metal-backed chromium), read computed `background-color` alpha + `backdrop-filter` off the live DOM for each default register, then put the surfaces over a synthetic busy backdrop (vivid stripes) to see whether the glass is REAL or just a token claim. Escape paths tested behaviorally (element class, ancestor var, `:root` var, CDP `prefers-reduced-transparency` emulation). Captures: `RA-glass-default-*.png` in this directory.

## Verdict: MIXED

The glass DEFAULT is real — a bare `<Button>` genuinely paints liquid glass, Card/Input/every overlay surface ride the rung ladder, and over a busy backdrop it looks legitimately good. But the W54 single-knob story is half broken in the live render: the shipped opaque escape (`.glass-opaque`, `<Card tier="opaque">`, ancestor `--glass-level`) is a NO-OP off `:root` — the substitution-vs-inheritance trap CLAUDE.md itself documents for the dock tint. And "EVERY band" has off-allowlist opaque stragglers the source-grep gates can't see.

---

## 1. The headline claim: a bare `<Button>` paints glass — TRUE

Live computed readback, `/display/buttons`, the `default` variant button:

```
bg: oklab(0.9858 … / 0.3)            ← 0.3 alpha translucent plate
backdrop-filter: blur(10px) saturate(1.05) brightness(1.02)
```

Identical recipe to the explicit `glass` variant (the W54 re-point is real, and the AX.W52 `btn-glass` 10px blur fix landed — this is NOT the old 1px wash). Dark mode flips correctly: `color(srgb 0.108 0.098 0.092 / 0.72)` + the same 10px blur (`RA-glass-default-buttons-dark.png`).

**The proof that it READS as glass:** `RA-glass-default-buttons-busy-backdrop.png` — real rendered `default` and `glass` buttons cloned over vivid stripes. Both frost the stripes visibly; `destructive`/`outline`/`secondary` sit beside them as the explicit opaque registers. This is the money shot for the claim being true, and it looks genuinely good — calibrated frost, not a smear.

## 2. The rung ladder + every overlay surface — TRUE, and consistent

Computed readback across the families (light mode):

| Surface | Default register | Readback | Verdict |
|---|---|---|---|
| Button (bare) | glass-wash + btn-glass | 0.3α + 10px | GLASS |
| Card (tier=resting default) | glass-resting | 0.65α + 12px | GLASS |
| Input | glass quiet-mix | 0.5α + 10px | GLASS |
| Dialog content | glass-floating | 0.8α + 16px | GLASS (`-dialog-busy-backdrop.png` — frosts stripes through the panel) |
| Sheet content | glass-floating | 0.8α + 16px | GLASS |
| Popover content | glass-floating | 0.8α + 16px | GLASS |
| Dropdown menu | glass-floating | 0.8α + 16px | GLASS |
| Select content | glass-floating | 0.8α + 16px | GLASS |
| Tooltip (inner div) | glass-floating | 0.8α + 16px | GLASS |
| Toast | glass-floating | 0.8α + 16px | GLASS |
| Command palette | glass | 0.7α + 8px | GLASS |
| Notification | glass-floating | (source + screenshot) | GLASS |

The five-rung ladder is visually a real ladder: `RA-glass-default-card-tiers-busy-backdrop.png` shows wash→quiet→resting→floating→overlay as progressively firmer plates over the stripes, each step perceptible. The overlay-tier popouts (dialog/sheet/menu/tooltip/toast) all converging on glass-floating is exactly the cohesion the canon claims.

## 3. The allowlist — HOLDS

avatar (`bg-secondary`, opaque), separator (opaque hairline), skeleton (opaque shimmer), table rows (muted/50, table allowlisted), badge loud pills (solid `--primary`/viz colors) — all opaque, all licensed. Checkbox/radio are border-only transparent at rest with a solid state-fill when checked; Switch unchecked rides a `--glass-bg-quiet` mix and checked is the `bg-primary` state color. Reasonable; not drift.

## 4. THE BROKEN PIECE: the opaque escape is dead off `:root`

The W54 canon: "`.glass-opaque { --glass-level: 0 }`, the `opaque` CardTier rung, and the a11y brackets all ride the ONE level path… `inherits: true` so a host sets `--glass-level` on any ancestor to retune every descendant."

Live behavioral readback of `.glass-resting` (all four cases, same session):

| Case | bg | backdrop-filter | Works? |
|---|---|---|---|
| baseline (level 1) | `oklab(… / 0.65)` | `blur(12px)` | — |
| element `.glass-opaque` | `oklab(… / 0.65)` | `blur(12px)` | **NO — byte-identical to baseline** |
| ancestor `--glass-level: 0` | `oklab(… / 0.65)` | `blur(12px)` | **NO** |
| `:root --glass-level: 0` | `oklab(…)` solid | `blur(0px)` | YES |
| `prefers-reduced-transparency: reduce` (CDP) | solid | `blur(0px)` | YES (bracket is `:root`-scoped) |

Capture pair: `RA-glass-default-opaque-escape-BROKEN.png` — three plates over stripes, `tier="resting"` vs `tier="opaque"` (`.glass-resting.glass-opaque`, exactly what `Card.vue` emits for the public `tier="opaque"` prop) vs an ancestor-level:0 plate — **all three identically translucent, stripes showing through the "opaque" plate**. `RA-glass-default-opaque-escape-root-works.png` — the same fixture after a `:root` write: all three solid.

Root cause: the substitution-vs-inheritance trap. The `--glass-bg-*` / `--glass-blur-*` recipes consume `var(--glass-level)` INSIDE the token definitions at `:root` (tokens.css §806–817, §736–764), so the level multiplies in at `:root` (level=1) and every descendant inherits the ALREADY-RESOLVED value. An element- or ancestor-level `--glass-level: 0` never reaches the recipe. CLAUDE.md documents this exact trap for the dock's `--glass-bg-dock` tint ("resolves its tint at the `:root` 0% strength before the `@container` bucket can re-point it") — W54 then shipped the level knob through the same trap. The a11y brackets and a whole-app consumer override survive only because they happen to write at `:root`.

Blast radius:
- `<Card tier="opaque">` — a shipped, documented public API — is a silent no-op (paints resting glass).
- `.glass-opaque` as the "explicit opt-out from the MAXIMAL default" — no-op everywhere.
- The "scoped retune" story (dense data region firms its glass via an ancestor set) — fiction. Only all-or-nothing `:root` works.
- "animates smoothly rather than snapping" (the @property motivation) — moot off-root.

And the gate: `proof:glass-level` is `readFileSync` + regex — it asserts the RECIPE TEXT exists (`.glass-opaque { --glass-level: 0 }` present? yes). Gate-green, behaviorally dead. This is the AX cardinal lesson (headless-green/visually-broken) recurring inside the very wave that was supposed to close it.

## 5. "Glass is the default register for EVERY band" — OVERSTATED at the edges

Off-allowlist surfaces whose default is opaque or sub-glass, found live:

- **Progress track** — opaque `bg-secondary` (`rgb(232,231,227)`, 0px blur). Not on the legibility allowlist. It passes `proof:glass-cohesion` only because that gate inventories files that ALREADY carry a glass marker — a component that never adopted glass is "out of scope" and invisible. The gate measures cohesion of the converted, not coverage of the canon.
- **ToggleGroup active item** — opaque `bg-accent` fill (`rgb(213,211,205)`).
- **Reka Tabs** — track is `muted/50` translucent with NO blur; the pill-variant active is a solid near-black pill (`RA-glass-default-tabs-sweep.png`). Visually fine, but it is an opaque interactive default off the allowlist.
- **Select TRIGGER** — `glass-wash` at **1px** blur (0.3α). The AX.W52 `btn-glass` 10px re-point reached Button but not the select trigger; the trigger is an interactive control stuck on the wash-TILE blur. Same for the SegmentedTabs root/track (1px).
- **Alert** — `glass-wash` 1px: on the page it reads as a flat bordered card (`RA-glass-default-alert-sweep.png`). Wash-tier-by-design, but perceptually zero glass.

None of these are scandals — they are exactly the kind of stragglers a MAXIMAL canon accumulates — but "EVERY band" + "machine-locked" is stronger language than the render supports.

## 6. The W60 flat-backdrop question — CONFIRMED, the demo undersells its own default

On the demo's own flat-cream story pages the glass default is imperceptible: in `RA-glass-default-buttons-sweep.png` / `-button-flat-closeup.png` the `default`, `glass`, `glass-wash`, and `outline` buttons are near-indistinguishable faint white pills — nothing behind to blur, so the register collapses to "subtle". The canon admits this ("the glass blur is imperceptible over a flat substrate… W60 consumes it"), and the busy-backdrop captures prove the glass is really there — but TODAY, a visitor driving the demo would not say "this library is glass-first" on most routes. Only the few stories with rich backgrounds (intro aurora, paper-glass, hero constellation) plus the nav rail/dock let the material speak. W60 is load-bearing for the claim being EXPERIENCED, not just measured.

## Files

- Captures: `RA-glass-default-*.png` (23 files, this directory). Key: `buttons-busy-backdrop`, `opaque-escape-BROKEN`, `opaque-escape-root-works`, `card-tiers-busy-backdrop`, `dialog-busy-backdrop`, `buttons-sweep` (flat), `buttons-dark`.
- Probe data: computed-style readbacks quoted inline above (scripts were throwaway under /tmp, removed).

## Disposition

- FIX (real defect): the `--glass-level` element/ancestor path — either re-declare the level-bearing recipe at the rung classes (element-level substitution) or re-spec the escape honestly as `:root`-only and fix `<Card tier="opaque">` to paint a solid plate directly. The current state ships a public prop that does nothing.
- FIX (gate honesty): behavioral arm for `proof:glass-level` (a π readback like adaptive-glass.spec.ts has — the pattern already exists in tests-visual) + a coverage arm for the cohesion gate (off-allowlist components with NO glass marker should be enumerated, not skipped).
- TUNE: select trigger / segmented-tabs track onto the 10px control blur; decide Progress + ToggleGroup-active on or onto the allowlist.
- KEEP: the default register itself — it is real, calibrated, and over a busy backdrop it is the best version of this material I've seen the repo ship.

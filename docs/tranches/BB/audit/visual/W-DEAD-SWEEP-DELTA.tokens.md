# W-DEAD-SWEEP — the dead-CSS-token sweep + proof:no-dead-token (BB.W-DEAD-SWEEP.1, the styles arm)

**No π re-shoot.** This is a DEAD-CODE wave — it changes ZERO paint by construction: every deleted
token had ZERO consumer in ALL four+two forms (`var()` / Tailwind `prefix-(--x)` shorthand /
`@container style()` / typed `@property` / JS `setProperty`-or-quoted-ref / Tailwind theme-namespace),
so nothing un-styles. The binding truth is the born-RED→GREEN `proof:no-dead-token` log + the dist
before/after grep. (The gate-fleet reconcile + the ExpandableContainer π are ARM .2's half, captured in
`W-DEAD-SWEEP-DELTA.gate-fleet.md`.)

**Freshness:** captured against branch `tranche/BB` at the post-sweep working tree (the 15 named tokens
deleted from source; the four sibling Batch-2 arms — W-SCROLL-FADE-RETIRE, W-SURFACE-AXIS-COMPLETE,
W-DOCK-RAIL-SEAT-FINAL, ARM .2 — present in the same tree, file-bound-disjoint). The gate's W2 dist arm
reds against the STALE dist (the un-rebuilt partials still ship the deleted tokens) and flips GREEN once
the orchestrator's unified battery runs `npm run build` (re-emits `dist/styles/**` from the now-clean
source). The dist-absent skip path PASSES on the clean source (W2 producer-gated, the `proof:emission`
precedent).

## §0 RE-GROUND — the per-token disposition (each candidate re-verified at HEAD)

The §0 traps drilled (all three confirmed at HEAD before any delete):

1. **`--glass-grain-opacity-disco` ALREADY DELETED** (BA.W-GLASS-CAL) — `glass.css:191` is the deletion
   NOTE, not a token. No action.
2. **`--timeline-segment-gradient-{ping,download,upload,jitter}` — KEEP** (presets-in-consumer). The
   speedtest consumer wires `gradient: "var(--timeline-segment-gradient-ping)"`; the LIVE in-library
   fallback is `--timeline-segment-default-gradient` (consumed at `timeline/geometry.ts:36,174`). On the
   keep-allowlist with rationale.
3. **The non-`var()` false-deads — LIVE.** `--glass-backdrop` is a `@container style()` query value
   (`ladder.css:134`); `--glass-backdrop-luma` is JS-written by `useGlassBackdropLuminance.ts:311,316`
   (`setProperty`). Both LIVE by a non-`var()` mechanism — the gate's consumer forms 3+5 catch them.

### RETIRE — 11 deleted (each ZERO consumer in ALL forms AND no gate/test asserter)

| token | site (HEAD) | zero-consumer proof |
|---|---|---|
| `--motion-duration-badge-disc` | `tokens/scheme-motion.css:106` | no `CompleteBadge` component (grep ∅); 0 `var()`/JS/shorthand consumer; no asserter |
| `--motion-duration-badge-ring` | `tokens/scheme-motion.css:107` | dead twin |
| `--motion-duration-badge-check` | `tokens/scheme-motion.css:108` | dead twin |
| `--motion-delay-badge-disc` | `tokens/scheme-motion.css:109` | dead twin |
| `--motion-delay-badge-ring` | `tokens/scheme-motion.css:110` | dead twin |
| `--motion-delay-badge-check` | `tokens/scheme-motion.css:111` | dead twin |
| `--glass-border-strong` | `tokens/glass.css:166` | alias `= var(--glass-border-floating)`; 0 `var()` consumer; no asserter |
| `--glass-shadow-lg` | `tokens/glass.css:432` | alias `= var(--glass-shadow-floating)`; 0 consumer; no asserter |
| `--border-opacity-light` | `tokens/offsets-sizing.css:89` | 0 consumer (border family rides `--glass-border-*`/`--border-soft`/`color-mix` α); no asserter |
| `--border-opacity-medium` | `tokens/offsets-sizing.css:90` | dead twin |
| `--border-opacity-strong` | `tokens/offsets-sizing.css:91` | dead twin |

### THE §0 SCOPE-REVEAL — 4 named-dead tokens PINNED by a live gate/test asserter (NOT deleted)

The wave's RETIRE set named the spine pair + the corner-k pair as "ZERO consumer." The §0 per-token
re-ground (the trap class the wave warned about) found a LIVE GATE/TEST ASSERTER pinning each — a
gate/test asserting a token EXISTS is a consumer in the gate-fleet sense; deleting it reds CI. The
asserter files are OUT of this arm's bounds, so per the Triumvirate Dispatch ("do NOT delete a token
with a live reader") the 4 are KEPT on the allowlist (ASSERTER-PINNED class) with the asserter cited;
their clean-break delete is a coordination follow-up once the asserter waves re-anchor in lockstep.

| token | site | live asserter (out of this arm's bounds) |
|---|---|---|
| `--glass-spine-opacity` | `tokens/glass.css:449` | `tests/components/custom/instrument-chassis/InstrumentChassis.spine-variant.test.ts:80` asserts the 4-token spine publish (`/--glass-spine-opacity\s*:\s*0\s*;/`) |
| `--glass-spine-blur` | `tokens/glass.css:450` | same 4-token-publish assert (`:81`) |
| `--corner-k-soft` | `theme/radius.css:69` | `proof:squircle-language` TOKEN-AXIS-EXISTS (`proof-squircle-language.mjs:151-152` — `--corner-k-soft is not minted` reds) |
| `--corner-k-sharp` | `theme/radius.css:70` | same TOKEN-AXIS-EXISTS assert (`:153-154`) |

The CompleteBadge comment block was deleted + the stale "Six duration tokens" header count re-anchored;
the spine + corner-k comments re-anchored to record the ASSERTER-PINNED keep (not the delete). The LIVE
adjacent tokens are UNTOUCHED: `--glass-border` / `--glass-shadow` (bare-name register aliases),
`--glass-spine-border` / `--glass-spine-vignette` (live at `instrument-chassis.css:135,137`),
`--corner-k-squircle` (the ONE k vocab), the `--corner-shape-*` block.

### KEEP-ALLOWLIST (36 entries, each a non-empty rationale — the W1 anti-evasion bite)

Three rationale classes, all honest (EXTENSION-POINT 21 + ASSERTER-PINNED 4 + DEFERRED-DEAD 11):

- **EXTENSION-POINT (21)** — documented presets-in-consumer override surfaces + external-JS consumers
  the in-library scan cannot see: the 4 `--timeline-segment-gradient-*` (speedtest phase taxonomy); the
  bare `--glass-border` / `--glass-shadow` register aliases; `--blob-shadow` (GooBlob ambient override);
  `--meter-track-stroke` (speedtest `rings.ts` `useTokenColor`); `--veil-feather-radial` (slides
  text-plate bleed opt-in); `--phase-color-label` (instrument-chassis WCAG companion); the two `round`
  members of `--corner-shape-*`; the 3 `--motion-stagger-*` (`getComputedStyle`/inline-calc canon); the
  3 `--motion-duration-staged`/`-complete-shimmer`/`--motion-delay-complete-shimmer` (speedtest reveal
  canon); `--progress-sectioned-track`; `--dock-margin` / `--dock-menubar-reserve` / `--select-font`
  (documented "consumer overrides locally").
- **DEFERRED-DEAD (11)** — genuinely dead, but OUT of this arm's NAMED-RETIRE charge (they live in
  `scale-paper.css` / `offsets-sizing.css` non-border regions / a redundant alias, not the four bounded
  files' named set), booked to a named follow-up sweep (BB.W-DEAD-SWEEP successor / Batch-6 residuals) —
  the recorded-conditional discipline, NOT a silent park: `--focus-ring` (redundant alias of the LIVE
  `--focus-ring-shadow`, 15 consumers), `--spring-gentle-duration`, `--z-debug`, `--chassis-max-block-size`,
  `--panel-padding-roomy`, `--celebration-row-rhythm`, `--complete-headline-size`, `--progress-stack-gap`,
  `--timeline-scrubber-height`, `--meter-progress-inset`.

  > **Named successor — the deferred-dead cull + the asserter-pinned re-anchor.** Two follow-up sweeps,
  > both recorded (not silently re-booked):
  > 1. The 11 DEFERRED-DEAD tokens are genuinely unconsumed but outside this arm's four-file NAMED
  >    charge (the no-bulk-delete rule). A follow-up sweep (Batch-6 chronic residuals) deletes them at
  >    their declaration sites + drops their KEEP_ALLOWLIST entries.
  > 2. The 4 ASSERTER-PINNED tokens (`--glass-spine-opacity`/`--glass-spine-blur`,
  >    `--corner-k-soft`/`--corner-k-sharp`) are clean-break-deletable ONLY in lockstep with their
  >    asserter (re-anchor `InstrumentChassis.spine-variant.test.ts` to a 2-token spine publish;
  >    re-anchor `proof:squircle-language` TOKEN-AXIS-EXISTS off the soft/sharp rungs). That coordinated
  >    delete + the asserter re-anchor is a follow-up — deleting the token without the asserter edit
  >    reds CI (the §0 trap), so it cannot be a unilateral styles-arm edit.

## proof:no-dead-token — born-RED → GREEN

**Born-RED (pre-sweep HEAD, the NAMED_DEAD_SET = the 11 truly-swept):** dead tokens = 11, W1 + W2 red.
```
  declared tokens      : 850
  dead tokens          : 11 (must be 0)   ← the 11 deleted (the 4 asserter-pinned allowlisted)
  named dead in source : 11 (must be 0)
  dist mirror          : SHIPS 11 dead
  status: FAIL
```

**GREEN (post-sweep, dist absent / pre-rebuild — the true close state):**
```
  declared tokens      : 839   (850 − 11)
  live readers         : 835
  keep-allowlist       : 36
  dead tokens          : 0 (must be 0)
  named dead in source : 0 (must be 0)
  dist mirror          : skipped (dist absent)
  status: PASS
```

**W2 dist mirror (producer-gated):** against the STALE working-tree dist it reds (`SHIPS 11 dead`); it
flips GREEN once the orchestrator's `npm run build` re-emits `dist/styles/**` from the clean source. The
11 are verified absent from `dist/glass-ui.css` already (the SFC bundle never carried them) — the carry
is only the `dist/styles/tokens/*.css` + `dist/styles/theme/radius.css` partials the build copies from
source verbatim.

## The self-test bite (anti-evasion, both demonstrated GREEN→RED)

- **BITE 1 — re-add a dead token reds W1.** Injecting `--bb-dead-bite-test: 420ms` (no consumer) into a
  `:root` block flips W1 red (the token surfaces in `deadTokens`). ✓
- **BITE 2 — a bare-name allowlist entry reds the rationale bite.** Injecting `["--bb-bare-name-bite", ""]`
  into `KEEP_ALLOWLIST` flips the rationale assert red (`bareAllowlistEntries` non-empty). ✓ A future
  agent cannot silence the gate by parking a bare token name.
- The "drain by aliasing" evasion (re-pointing a dead token to a live alias) is caught by W1's consumer
  requirement — the alias has no consumer either; a true clean-break delete is the only green path.

## Coordination

- **`offsets-sizing.css` shared with W-SCROLL-FADE-RETIRE** — DISJOINT token regions: this arm deleted
  `--border-opacity-{light,medium,strong}` (hunk `@@ -91`); the sibling deleted `--mask-fade-width`
  (hunk `@@ -13`). No collision; both regions clean at HEAD.
- **The dead-spine pair vs W-DOCK-RAIL-SEAT-FINAL** — re-confirmed at HEAD: the rail re-seat introduced
  NO `--glass-spine-*` consumer (the seat rides `--dock-rail-*`/`--dock-layer-rail-*`), so the
  `--glass-spine-opacity`/`--glass-spine-blur` pair is safe to delete (the named coordination read).

## Orchestrator-owned registration (sharedFileRequests)

`proof:no-dead-token` needs registration the orchestrator merges (this arm does NOT touch
`package.json`/`scripts/gates.mjs`): a `proof:no-dead-token` package.json script key + a `gatesFor()`
row tagged `ci` (a device-free source gate) + inclusion in the parity/manifest aggregates.

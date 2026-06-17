# W-DARK-INK-WARM — DELTA

The dark `--surface-tint-*` arm de-hardcoded onto a `--foreground`-derived `oklch(from …)` relative-color recipe + the dark `--foreground` ink warmed off the H95° yellow-green it was condemned for. The `css-relative-color` chronic gets its first live consumer.

## The defect (RE-GROUND confirmed at HEAD)

BA.W-DARK-MATERIAL scope 5 minted the dark `--surface-tint-*` override (a BRIGHTER ink than the dark `--foreground` so a chip lifts off the L16 card — the correct INTENT) but executed it as a hardcoded `hsl(48 12% 96%)` literal ×12 — the EXACT OKLab H95° yellow-green the SAME tranche's W-NO-GRAY ruled "a cast, not warm material" — AND a per-rung literal a `--foreground` re-point can never reach (the architectural asymmetry with the light arm, which is `var(--foreground)`-derived). The dark `--foreground` ink itself (`hsl(48 10% 90%)`) was the same yellow-green, inherited by the WHOLE dark register. The `css-relative-color` recipe (AX item #33) carried AX→AZ→BA as a prose-only book ("browsers don't gamut-map yet", 0 consumers).

### The OKLab arithmetic (the gate's hsl→sRGB→OKLab port, re-computed this wave)

| token | HEAD value | HEAD OKLab | after value | after OKLab |
|---|---|---|---|---|
| dark `--foreground` | `hsl(48 10% 90%)` | L0.9276 C0.0055 **H95.1°** | `hsl(30 14% 90%)` | L0.9262 C0.0063 **H75.4°** |
| dark `--surface-tint-*` ink | `hsl(48 12% 96%)` ×12 literals | L0.9726 C0.0026 **H106.4°** (full-strength), H95.1° at the chip-rung mix | `oklch(from var(--foreground) 0.975 c h)` | L0.9743 C0.0062 **H75.4°** |
| light `--foreground` (untouched) | `hsl(24 10% 10%)` | L0.2161 C0.0061 H56.0° | — | — (already warm) |

The L is held (dark fg ±0.0014; dark tint ink +0.0017 ≈ HEAD's 0.9726 — the chip lift off the L16 card preserved), the hue swings from the yellow-green register (H95-106°) into the warm-amber register (H75.4°, the `--foreground` 56° family), chroma-only at constant L.

## The recipe (the architectural-symmetry fix)

The light arm at `color-radius.css:139-154` is `color-mix(in srgb, var(--foreground) N%, transparent)` — `--foreground`-derived, auto-dark by design. The dark override BROKE the derivation with a hardcoded paste. BB re-expresses each of the 12 dark rungs as:

```css
--surface-tint-N: color-mix(in srgb, oklch(from var(--foreground) 0.975 c h) N%, transparent);
```

- The `oklch(from var(--foreground) 0.975 c h)` extracts the (now-warmed) dark `--foreground`'s warm hue (`h`) + chroma (`c`) and lifts the lightness to `0.975` — the brighter-warm-off-white the override needs, BY DERIVATION. Re-point the dark `--foreground` → all 12 rungs re-resolve warm (the symmetry the light arm has had since L.W5).
- The OUTER `color-mix(in srgb, … N%, transparent)` is unchanged — the SAME 12-rung α ladder + the SAME in-srgb interpolation space the light arm uses. **The AW.W26 fence holds**: the `oklch(from …)` is the INK SOURCE, not the tint mix space (`surface-tint-stays-srgb` stays GREEN; the new positive note `dark-tint-relative-color-is-ink-source-not-mix-space` records this for future readers).
- The `0.975` lift sits well under the sRGB gamut edge — the AX book's "browsers don't gamut-map yet" caveat does NOT bite (at 0.975 the small high-L chroma resolves clean; lift→1.0 drifts the hue toward H106, so 0.975 is the calibrated pin). No visible cast on any rung. The tolerant α-mix is exactly the first consumer the AX book was waiting for.

The dark `--foreground` warm lands in BOTH arms in LOCKSTEP (the §2c discipline): `dark-arm.css:60` (the `.dark` fallback floor) + `light-dark.css:92` (the dark arg of the `light-dark()` enhancement). Every dark `var(--foreground)` consumer (body copy, the lifted muted register, `--glass-tint-ink`, the cartoon shadow, the configurator divider, the dock-selected-accent, the `--surface-tint-*` relative-color recipe) re-resolves warm, zero per-site edit.

## css-relative-color chronic — first live consumer

The two `oklch(from …)` prose-only books (`glass/ladder.css:35` + `tokens/glass.css:236`, "browsers don't gamut-map yet", 0 use) are re-pointed to record the live site: the dark `--surface-tint-*` arm is the chronic's FIRST live consumer. The disposition register row (`css-relative-color`, stamped `book` + `pendingResolvedBy: "BB.W-DARK-INK-WARM"` at W-DISPOSITION-RESTAMP) flips `resolved` at the BB close.

## proof:no-gray — born-RED → GREEN

`proof:no-gray` EXTENDED in place (NO new gate KEY — gate-script-parity stays PASS, 238 keys, 0 new orphan/dangling). 5 new witnesses + 1 positive fence note.

### Born-RED at HEAD (pre-edit; 3 of the new witnesses fail)

```
✗ warm-hue-dark-foreground — the dark --foreground reads OKLab H = 95.1° (in [45,85]° warm register …) at C 0.0055
✓ dark-foreground-arms-lockstep — both arms "hsl(48 10% 90%)" == "hsl(48 10% 90%)" (regression guard, GREEN at HEAD)
✗ dark-surface-tint-foreground-derived — relativeColor=false AND hsl48=true (the 12-literal workaround present)
✗ warm-hue-dark-surface-tint — H = ?° (no oklch(from …) recipe to resolve at HEAD)
✓ aa-dark-foreground-over-page — 15.99:1 (≥ 4.5:1 — yellow-green clears AA at HEAD; must STAY GREEN)
✓ dark-tint-relative-color-is-ink-source-not-mix-space — passes vacuously (no relative-color present yet)
[proof:no-gray] 3 check(s) FAILED
```

### GREEN at close (post-edit; 33/33 pass)

```
33/33 pass
✓ warm-hue-dark-foreground — OKLab H = 75.4° at C 0.0063
✓ dark-foreground-arms-lockstep — "hsl(30 14% 90%)" == "hsl(30 14% 90%)"
✓ dark-surface-tint-foreground-derived — relativeColor=true AND hsl48=false (workaround deleted)
✓ warm-hue-dark-surface-tint — oklch(from var(--foreground) 0.975 c h) resolves OKLab H = 75.4°
✓ aa-dark-foreground-over-page — 15.90:1 (≥ 4.5:1 — the chroma-only warm holds the contrast contract)
✓ dark-tint-relative-color-is-ink-source-not-mix-space — the ink source inside color-mix(in srgb, …); AW.W26 fence holds
✓ surface-tint-stays-srgb — the family stays in-srgb (the existing fence, GREEN)
✓ aa-muted-fg-over-page-dark — 7.72:1 (the warmed dark muted register inherits the warm ink)
[every existing --neutral-*/AA/KEEP-NEUTRAL/srgb-fence/plate check stays GREEN]
```

### gate facts at close

```json
"darkForeground":        {"floor":"hsl(30 14% 90%)","enhancementDarkArg":"hsl(30 14% 90%)","L":0.9262,"C":0.0063,"H":75.4}
"darkSurfaceTint":       {"liftL":0.975,"L":0.9743,"C":0.0062,"H":75.4}
"darkSurfaceTintDerived":{"relativeColor":true,"hsl48Literal":false}
"aaDarkForegroundOverPage":15.9
```

## The anti-evasion bite (the false-witness discipline)

- A "warm the literal to `hsl(30 …)` but KEEP the hardcoded paste" evasion (which would warm the hue but leave the architectural asymmetry alive) reds `dark-surface-tint-foreground-derived` (relativeColor=false) — confirmed by direct test.
- A re-derive-but-wrong-hue evasion reds the `warm-hue-dark-surface-tint` / `warm-hue-dark-foreground` hue arms.
- A warm-in-only-one-arm evasion reds `dark-foreground-arms-lockstep`.
- A switch of the tint mix to `in oklab` to carry the relative-color reds the existing `surface-tint-stays-srgb` fence.
- The π reads the COMPILED color, so a renamed-literal source evasion still reds on the rendered hue.

## The π readback (BB.W-REFLECT3 binding capture; spec extended)

`tests-visual/no-gray.spec.ts` extended with the `(e)` arm: under `.dark`, the live `getComputedStyle` resolves the dark `--foreground` + the dark `--surface-tint-15` chip composited over the dark `--card` (L16) plate, asserting OKLab H in `[45,88]°` (the π's live-engine-drift register). The painted-truth modeling (the gate's own port over the recipe + the dark card):

- dark `--foreground` resolves OKLab H75.4° — warm.
- dark `--surface-tint-15` chip over the L16 card composites OKLab L0.401 C0.0063 **H48.6°** — warm (shifts toward the card's own warm-amber 24-family hue, still in register, NOT the H95° yellow-green).

The binding browser capture rides W-REFLECT3 (Batch 7) per BA inv-4; this wave's close floor is `proof:no-gray` GREEN (33/33) + typecheck GREEN on this wave's files.

## Verification cadence

- `node scripts/proof-no-gray.mjs` — born-RED (3 fail) at HEAD → GREEN (33/33) at close.
- `node scripts/proof-gate-script-parity.mjs` — PASS (no new KEY, 238 keys, 0 new orphan/dangling).
- `npm run typecheck` — the `tests-visual/no-gray.spec.ts` edit compiles clean (the only repo errors are in `useCanvas2D.ts`, sibling W-CANVAS-UNIFY's bound, not this wave's files).
- `git diff --check` — clean.

## Coordination

- No `--destructive` change. `--destructive: hsl(0 80% 60%)` (dark-arm.css:88) and `--destructive` light-dark are UNTOUCHED — W-INVALID-RING (which reads `var(--destructive)`) is unaffected. The `--destructive-foreground: hsl(48 10% 90%)` (dark-arm.css:89) is NOT `--foreground` and is out of this wave's bounds — left untouched.
- The slides deck's COOL `--glass-frost` re-fork (W-SLIDES-HANDOFF concern, Batch 5) converges onto this corrected warm dark ink as the library identity — coordination only, no slides edit here.

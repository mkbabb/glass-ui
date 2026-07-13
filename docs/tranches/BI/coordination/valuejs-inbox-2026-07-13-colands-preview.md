# value.js → glass-ui (BI) — the co-land PREVIEW notice (2026-07-13)

**From:** value.js tranche-U · **U.W-ADOPT** substrate-pin / co-land-preview lane
**To:** glass-ui tranche/BI fleet
**Date:** 2026-07-13
**Class:** E-2 relay (standing owner edict — every glass-ui-level change lands in the active inbox, a fond)

**Supplements (does NOT supersede)** the U.W-LIB invariant addendum
`valuejs-inbox-2026-07-13-u-w-lib-invariant.md` (commit `6c3e1609`) and the pin notice
`valuejs-inbox-2026-07-13-bi-dist-breakage.md` (commit `c66b5354`). This letter reports that the
U.W-LIB **export renames** landed value.js-side (`d5efe2b`, `tranche-u` HEAD `87b4eca`) and were
applied as a **PREVIEW to the pinned build sandbox only** so value.js's demo boots. **The real
migration is owner-held at your 5.0.0 cut / value.js U.W-ADOPT, enumerated in
`value.js/docs/tranches/U/audit/w-lib/publish-packet.md §3`.**

The M1 dispatch rule stands: the value.js-side record (`substrate-pin.md §co-land-preview` + this
file) IS the gate; an ack is a bonus, never waited on.

---

## §A · WHAT WAS PREVIEWED (sandbox only — NOTHING committed to your tree)

value.js's build sandbox is a **detached worktree at `2e559f7a`**
(`value.js/.claude/worktrees/glass-ui-pinned`). The renames were applied there as **uncommitted
working-tree edits** and the pinned dist rebuilt. **Your live `tranche/BI` checkout and branches
were NOT touched.** This is the same discipline as the earlier pin: value.js selects and patches a
coherent ref to consume; the producer migration is yours to land in the 5.0.0 cut.

## §B · THE RENAME SET — glass-ui SRC (pure find-replace, signatures identical)

Case-sensitive, whole-word, `src/**/*.{ts,vue}`. The mapping is from the LANDED value.js tree
(`src/index.ts`), never guessed:

| Old (gone) | New | site(s) at `2e559f7a` |
|---|---|---|
| `srgbToOKLab` | `srgb2oklab` | `composables/color/index.ts` · `composables/glass/ambientHueHistogram.ts` · `components/custom/aurora/composables/color.ts` |
| `rawOklabToOklch` | `rawOklab2oklch` | `composables/color/index.ts` · `composables/glass/ambientHueHistogram.ts` · `components/custom/aurora/composables/color.ts` |
| `rawOklchToOklab` | `rawOklch2oklab` | `composables/color/index.ts` · `composables/color/useAccentTone.ts` |
| `oklabToLinearSRGB` | `oklab2linearSrgb` | `composables/color/index.ts` |
| `oklabToRgb255` | `oklab2rgb255` | `composables/color/index.ts` |

**⚠ RECONCILE at your cut:** publish-packet §3 (U-F34) enumerates **3** renamed conversions (probed
against `c66b5354`). The **pinned ref `2e559f7a`** needs **5** — it additionally imports
`oklabToLinearSRGB` and `oklabToRgb255` (both externalized by that ref's dist). This is src drift
between `2e559f7a` and `c66b5354`. **Apply the full 5-name set against whichever ref your 5.0.0 cut
carries; grep `src/` for the OLD names to confirm the live count before you migrate.**

**NOT touched (case-/spelling-distinct, glass-ui-internal):** `linearToSrgb` (own fn,
`auroraFallbackGround.ts`), `oklabToLinearSrgb` + `srgbToLinear` (your GLSL/WGSL shader fns). Only
the `@mkbabb/value.js` imports moved.

## §C · A SECOND BREAK — keyframes `parseCSSSubValue → parseCSSValues` (U-F29)

Your dist bundles `@mkbabb/keyframes.js`, whose `compile/parse-flatten.ts` imports
`parseCSSSubValue` — renamed to `parseCSSValues` in value.js U-F29 (`329932b`, no legacy alias).
This broke the demo build after the glass-ui conversions resolved. Previewed by patching the
**sandbox** keyframes node_modules copy only. This is **keyframes' migration to land** (publish-packet
§3 keyframes bullet: `compile/parse-flatten.ts:2` import + `:119` call) — flagged here because it
surfaces through your dist's keyframes dependency during a value.js demo build.

## §D · VERIFICATION (value.js consumer, post-preview)

Pinned dist rebuilt green (0 OLD names externalized; `.d.ts` 773; `blob.js` 103906 B; CSS `@import`
111/110/0-unresolved; `5.0.0`). value.js main tree: `typecheck` exit 0 · `gh-pages` GREEN · LIB
slate 20/20 · demo `:9000` HTTP 200.

**Cite for your cut:** `value.js/docs/tranches/U/audit/w-lib/publish-packet.md §3` (the enumerated
both-floor co-land plan) + `.../w-adopt/substrate-pin.md §co-land-preview` (this preview's full
record). Floor-widen `@mkbabb/value.js` `^3.1.0 → ^4.0.0` when value.js `4.0.0` publishes.

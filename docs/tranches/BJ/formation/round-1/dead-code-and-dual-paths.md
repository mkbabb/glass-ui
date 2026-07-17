# Round 1 — dead code and dual paths (?)

## Summary

The close is not clean: the BI chip-fold (commit 490cc46e) deleted icon-chip/styles.css and orphaned glass-chip.css + glass-atom.css from the CSS cascade, so shipped `<Chip>`/`<Badge glass>` emit classes whose entire styling (selectable flood, interactive scale, removable button, glass-atom register) is dead in dist, and the chip contract test is vacuously green (asserts class strings only) with no gate guarding partial-import completeness. A second dead artifact — fourier-field/presets.ts — is an unreachable, obsolete config-schema duplicate that also violates presets-in-consumers. The rest is low-severity: five dead aggregation barrels bypassed by direct-leaf imports, and one public export (useStagger) with an unbacked external-consumer claim.

## Findings (4)

### [major] css-partial-orphaned-by-component-fold

**Claim:** The BI chip-fold deleted src/components/icon-chip/styles.css (which carried `@import "../../styles/glass/glass-chip.css"`), but the folded `<Chip>` and `<Badge variant=glass>` still emit `.glass-chip`/`.glass-atom`; neither glass-chip.css nor glass-atom.css is @imported by any file, so their entire styling (selectable-ON accent flood, `--chip-flood-t` interactive scale punch, removable `::after`, disabled dim, and the glass-atom tinted register) is dead in the shipped `dist/styles/index.css`.

**Evidence:** src/styles/glass.css @imports 18 glass/* partials but NOT glass-atom.css/glass-chip.css; src/styles/index.css doesn't either; `grep @import ... glass-(atom|chip)` across all CSS = 0 hits, `<style src>`/JS import = 0 hits (vs rim.css imported at glass.css:64). Sole definers: `--chip-flood-t`, `.glass-chip--interactive`, `.glass-chip[data-mode="selectable"]::after` exist ONLY in src/styles/glass/glass-chip.css:1-137; `.glass-atom{...}` only in glass-atom.css:50. Appliers: src/components/chip/chipVariants.ts:4-6, src/components/chip/Chip.vue:122-125, src/components/badge/index.ts:27. Removal: `git log -S '../../styles/glass/glass-chip.css'` → commit 490cc46e deletes icon-chip/styles.css holding `-@import "../../styles/glass/glass-chip.css"`. Vacuous green: tests/components/chip.contract.test.ts asserts only wrapper.classes() strings (lines 22/37), never that CSS bundles/paints; no gate script checks CSS-partial import completeness (scripts/ has no orphan-import gate).

**Proposed:** build — a fix-wave that re-homes `@import "./glass/glass-atom.css"`+`"./glass/glass-chip.css"` into the cascade (glass.css or a Chip/Badge `<style src>`), plus a `proof:no-orphan-css-partial` gate asserting every src/styles/**/*.css sits in the index.css @import closure (born-RED via these two).

### [major] dead-obsolete-config-duplicate

**Claim:** src/components/fourier-field/presets.ts is unreachable dead code AND an obsolete parallel config schema: its `VariantPreset`/`PRESETS` (hero/final) shape (harmonics/harmonicScale/epicycles/trailLength/epicycleHueShift/peakAlpha...) diverges from the live `FourierFieldConfig`/`DEFAULT_FOURIER_CONFIG` in constants.ts (source/showEpicycles/epicycleArms/rainbowChain/trailArc...), and shipping named themed presets in the library violates the presets-in-consumers edict.

**Evidence:** reach.py: unreachable from every lib entry, demo, and test. `git log --all -S 'from "./presets"' -- src/components/fourier-field/` = empty (never imported). presets.ts:6-58 defines VariantPreset, :60 `export const PRESETS: Record<"hero"|"final",VariantPreset>`; constants.ts:5-31 is the LIVE `FourierFieldConfig` with a different field set, and demo/stories/substrates/fourier-field.vue:109-148 already defines its own per-variant bundles (proper presets-in-consumers). ~130 lines of dead source.

**Proposed:** retire — delete src/components/fourier-field/presets.ts (no-legacy/presets-in-consumers); demo already owns the live variant bundles.

### [minor] dead-aggregation-barrel

**Claim:** Five barrel index.ts files have zero importers because consumers import their leaves directly, so the barrels are dead; src/composables/index.ts additionally carries a false header claiming the root barrel selects leaves through it.

**Evidence:** reach.py unreachable: src/composables/index.ts, src/composables/glass/wave/index.ts, src/composables/glass/webgpu/index.ts, src/components/sortable-list/composables/index.ts, src/components/typewriter/composables/index.ts. Direct-leaf imports bypass them: SortableList.vue:3 imports `./composables/useSortable`, TypewriterText.vue:47 imports `./composables/useTypewriter`, liquid-grid shaders import `../wave/waveField.glsl`, aurora/blob/fourier import `webgpu/rendererStatus` directly. src/index.ts imports `./composables/reactive|dom|glass` directly, never `./composables` — contradicting composables/index.ts:1-6 header ('so the root barrel can pick the vueuse-free leaves').

**Proposed:** retire — delete the five orphaned barrels (overfitting-audit ≥2-site rule) or wire real consumers; at minimum correct the false composables/index.ts header.

### [note] unverified-external-consumer-claim

**Claim:** useStagger is exported on the public /motion-core subpath with zero in-repo usage sites (only a unit test), while the barrel comment asserts it 'has external consumers' with no consumer-evidence doc to back the claim the overfitting gate requires.

**Evidence:** grep useStagger across src/demo/tests: only src/composables/motion/core/index.ts:18 (re-export) + tests/composables/motion/useStagger.test.ts; core/index.ts:16 comment 'useStagger is distinct from useStaggerReveal and has external consumers'; no docs/consumer-evidence/*stagger* file exists. Per docs/audits/overfitting-audit.md this is a library-orphan absent an evidence doc.

**Proposed:** fold-into-overfitting-close — either add docs/consumer-evidence/useStagger.md with a live external grep or reclassify/retire; do not certify on an unbacked 'external consumers' comment.


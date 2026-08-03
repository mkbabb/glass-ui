# MATERIAL W7 post-landing critic — CSS closure / package reach

**Verdict:** **SOURCE PASS · CASCADE PASS · PACKAGE REACH PASS · GATE-INSTRUMENT DEFECT · ACCEPTANCE HOLD**  
**Critic seat:** independent Sol x-high, formation/audit only  
**Source landing:** `4442b45106f9c83796219aefdab2b5cb2352dbc8`  
**Close stamp:** `2ad97ca1b0621882486cabe7363c6ba364b03aa0`  
**Audit date:** 2026-07-22 EDT

The two-import repair is the smallest correct repair and should be kept. It restores both partials to
the published `./styles` graph, preserves the capsule-before-composer cascade, survives an isolated
package build and downstream Vite consumption, and its standing assertion reds when either import is
removed. W7 is therefore genuinely source/build-green.

The cross-tranche gate is weaker than its title and comments claim. `componentReferences()` treats a
CSS reference from **any** source SFC/JS file as published reach without first proving that the source
module is reachable from a public JS entry. A disposable dead SFC plus adjacent CSS consequently left
the gate 4/4 green while the package build omitted the CSS. That defect belongs to the existing
`BAND-GATES` W3 instrument owner, not to a new material wave and not to a revert of the W7 imports.
W7 also still owes the already-recorded pinned Safari/Chromium evidence and governance close before it
may be called DONE.

## Exact byte pin

- Born-RED parent: `562db5c7429373220a4f1ec4e67470d65fcdbd91`, tree
  `33a31a1fad0342c3bd31a8535d4ab7c095034095`.
- Source landing: `4442b45106f9c83796219aefdab2b5cb2352dbc8`, tree
  `e3fc42f6c630369775909555d13a43aa95b6af21`.
- Close stamp: `2ad97ca1b0621882486cabe7363c6ba364b03aa0`, tree
  `496ba08fc6a2e79b8518ef2c494b4666a1902bb4`; its parent is the exact source landing.
- Audit cursor moved during this read-only seat to `f0d32d6915790ea97df383a4a486e3296f2b43d5`.
  `git diff 4442b451..HEAD` is empty for the W7 source/test, package manifest and style-build topology,
  so the relevant bytes remain exact despite unrelated later W8 work and a dirty shared tree.
- Pre-report shared-tree digests at that cursor: status
  `f2bd95f4991df3463a42e29b73733407d95544d6e743b5e9d6a984f932526b79`, tracked patch
  `b22c8ae3e043d06db22c87a4f3ca5324f751177442df726b66d0a66507cde927`, untracked path set
  `5e15bd39ba4f4898f1812671949e8b398575dae7631f788da79de2e81f911e98`. No clean-tree claim is made.

| Exact artifact | Git blob | SHA-256 |
| --- | --- | --- |
| `4442b451:src/styles/glass.css` | `362a53eacf032d6358ea8f2c6c4fc3165c4fea21` | `418967a1996166cd77826b9ac9469c2cceebf1891356c03c1bfd7e4535258942` |
| `4442b451:tests/gates/orphan-css-partial.test.ts` | `622ecce34974b34b6b18f3516a050b896b544919` | `05a698bddb16253820369384201bdfad9cfb6a43b621a2b865bc8075916493f6` |
| `2ad97ca1:docs/tranches/BJ/waves/BAND-MATERIAL.md` | `141f994a01c26bdbbea7d1975d8bc8bf2f86d8c8` | `1ec27127753733d0dafd45a391ebc1017f3718e813872c612b789f454e4defae` |

## Independent probes

All mutations and package builds ran in a disposable `git archive` of `4442b451`; no product,
test, evidence, commit or Claude-receipt byte was edited.

1. **Standing test:** `npx vitest run tests/gates/orphan-css-partial.test.ts --reporter=verbose` —
   **4/4 PASS** on exact restored bytes, and again on the unchanged repository slice.
2. **Exact package build:** `npm run build` — **PASS**, 725 modules transformed, declarations emitted
   for 67 projected public entries. The emitted `dist/styles/glass.css` import order is
   `glass-capsule.css → glass-chip.css → glass-atom.css → liquid-fill.css`.
3. **Emitted/package reach:** the built root, chip and atom files have SHA-256
   `5b4b1fc5…5073a`, `7a4239bc…1de2`, and `23788c1a…4a4c`. `npm pack --dry-run --ignore-scripts`
   includes `dist/styles/index.css`, `dist/styles/glass.css`, `dist/styles/glass/glass-chip.css`, and
   `dist/styles/glass/glass-atom.css` in the 7.0.0 package.
4. **Downstream consumer:** a minimal Vite application imported `@mkbabb/glass-ui/styles` plus the
   `/chip` JS entry. Its 314,840-byte emitted CSS (SHA-256
   `0a493e147816a40cdebdedc4831622dca590b0b125298fff3cc7971f44c8b837`) contains
   `.glass-chip`, `--chip-flood-t`, `.glass-atom`, and `.cartoon-cast`. Explicit style-subpath
   consumption survives bundling/tree-shaking. A component-only JS import is intentionally not a
   style installer; the public contract documents the one `./styles` import.
5. **Original-defect bite, one import at a time:** deleting only `glass-chip.css` makes the test exit
   1 with exactly that orphan; deleting only `glass-atom.css` does the same for exactly that orphan.
   Each mutation yields one failed / three passed tests. Deleting both yields the original two-file
   RED set.
6. **Gate-scope falsifier:** adding an unexported `src/__w7_dead_probe__/DeadProbe.vue` whose only
   operation is `<style src="./dead-probe.css">` plus the adjacent CSS leaves the gate **4/4 PASS**.
   A full package build then succeeds while `rg 'w7-dead-probe|dead-probe.css' dist` is empty. This is
   a deterministic false-green for the gate's stated “reachable from a published entry” invariant.

## Adjudication

| ID | Status | Finding | Smallest existing-owner redress |
| --- | --- | --- | --- |
| W7-CSS-01 | **PASS** | The source diff adds only the two central imports and removes the expected-red latch. No selector body, token, file home, alias or component changes. This is KISS closure restoration. | Keep `4442b451`; do not relocate or fork the mixed atom register. |
| W7-CSS-02 | **PASS** | Both composers follow `glass-capsule.css` in the same `components` layer. `glass-chip`/`glass-atom` are unique defining files; the later `background-image` composers therefore layer over the capsule `background` shorthand as intended. `accent-tone.css` remains earlier at its already-adjudicated exact-rung fallback. | Keep the present order. A mutation moving either composer before the capsule or after a conflicting consumer must fail a computed-style/cascade-order assertion. |
| W7-CSS-03 | **PASS** | `./styles → dist/styles/index.css → glass.css → both partials` exists in exact build and pack output. The source gate, exact build, package census and minimal consumer agree. | Retain an exact-candidate build/pack receipt at release cut; no new subpath or JS side effect is needed. |
| W7-CSS-04 | **PASS** | `sideEffects:["*.css"]` does not create an implicit component-style contract, but it also does not prune the explicit CSS subpath. The downstream bundle retained both partials. `./styles.css` remains the deliberately documented SFC-only export; it is not evidence against the complete `./styles` entry. | Keep one explicit global styles contract. Do not add per-component style installers or duplicate CSS in JS entries. |
| W7-CSS-05 | **PASS** | The standing W7 assertion bites both omission mutations independently and reports the exact missing partial. Dropping `it.fails` after the repair was correct. | Keep the binding assertion and the two direct import relationships. |
| W7-CSS-06 | **DEFECT** | The gate equates “referenced by any source module” with “reachable from a published entry.” `componentReferences(files)` scans the whole source tree without a public-JS reachability graph, so an unreachable SFC rescues adjacent dead CSS. Its comment and test title overclaim package closure. | `BAND-GATES` W3 must either (a) traverse JS/SFC reach from declared package/library entry roots before accepting channel-2 CSS, or (b) narrow this gate to the CSS-root graph and add a build/package-output gate for component-local CSS. Mutation: the dead SFC + CSS pair above must RED while a reachable exported SFC with the same `<style src>` stays GREEN. |
| W7-CSS-07 | **HOLD** | The current string-valued CSS exports are derived correctly, but `declaredCssRoots()` ignores conditional-object export values. This is not a current W7 failure; it is a future export-shape blind spot in an instrument claiming manifest derivation. | In the same gate-owner redress, recursively collect string leaves under export conditions and test one conditional CSS export fixture. Do not hard-list roots. |
| W7-CSS-08 | **HOLD** | The W7 close's Chrome/Chromium paint discovery is not retained as pinned tranche evidence, and its required Safari arm was replaced by “covered-by-argument” after the WebGPU-heavy shell crashed. Engine-neutral primitives reduce risk but do not satisfy the named dual-engine paint obligation. | Retain one minimal WebGPU-free real Chip/Badge fixture in current Safari + Chromium, with OFF/ON state, `--chip-flood-t`, remove geometry, engine/build, commit/tree/dirty digest, command and frame hashes. |
| W7-CSS-09 | **HOLD** | This report supplies one fresh post-landing Sol x-high critic. W7 still requires the second independent post-landing critic, current Claude implementation receipt, and prospective-model-law reconciliation before tranche acceptance. | Complete the sibling critic and receipt/evidence close on unchanged candidate bytes; any source/test amendment restarts exact-byte criticism. |

## Born-RED closure set

The existing owners must retain these bites:

1. Remove `@import "./glass/glass-chip.css"` alone → exact chip orphan RED.
2. Remove `@import "./glass/glass-atom.css"` alone → exact atom orphan RED.
3. Move either composer before `glass-capsule.css` or introduce an equal-specificity later collision →
   computed selected-chip/glass-badge material parity RED.
4. Remove either built partial or its root import from a packed candidate → package census and minimal
   downstream `@mkbabb/glass-ui/styles` bundle RED.
5. Add a CSS partial referenced only by an unreachable SFC/JS leaf → the repaired global reach gate
   REDs; the current gate falsely passes this mutation.
6. Convert a CSS export to a conditional object → the recursive manifest-root fixture stays GREEN;
   deleting all of its string leaves REDs.

## Candidate-2 freeze ruling

**Do not freeze W7 as DONE.** Candidate 2 may retain these exact W7 source bytes as
**SOURCE-GREEN / CASCADE-GREEN / PACKAGE-GREEN**, with the gate-scope defect explicitly routed to
`BAND-GATES` W3 and W7 itself still **ACCEPTANCE-RED** for the unbanked Safari/Chromium evidence,
second critic and current receipt. The correct imports must not be reverted while those closures are
performed.

A W7 DONE stamp requires: the dead-SFC gate falsifier fixed or the gate claim truthfully split, the
minimal dual-engine fixture retained at a pinned candidate, two post-redress Sol critics if any
normative/source/test byte changes, and the implementation receipt reconciled. No new CSS subpath,
component-local side effect, duplicate register, consumer shim or material retune is warranted.

# MATERIAL W7 candidate-2 paint critic

**Seat:** formation-only independent Sol x-high critic, 2026-07-22 EDT.  No product, test, existing
evidence, commit, or Claude receipt bytes were changed.  Probes were read-only: exact Git-object
inspection, source/cascade tracing, consumer tracing, and retained-artifact census.

## Exact audited bytes

- source landing `4442b45106f9c83796219aefdab2b5cb2352dbc8`, parent
  `562db5c7429373220a4f1ec4e67470d65fcdbd91`, tree
  `e3fc42f6c630369775909555d13a43aa95b6af21`;
- close landing `2ad97ca1b0621882486cabe7363c6ba364b03aa0`, parent `4442b451…`, tree
  `496ba08fc6a2e79b8518ef2c494b4666a1902bb4`;
- source blobs: `src/styles/glass.css` `362a53eacf032d6358ea8f2c6c4fc3165c4fea21` and
  `tests/gates/orphan-css-partial.test.ts` `622ecce34974b34b6b18f3516a050b896b544919`;
- close-record blob: `docs/tranches/BJ/waves/BAND-MATERIAL.md`
  `141f994a01c26bdbbea7d1975d8bc8bf2f86d8c8`.

The current worktree was intentionally **not** treated as acceptance evidence.  The two landed source
blobs still match the audited objects, but the shared tree is dirty and the current band file has moved
past its close blob.  This report judges the immutable landing and its declared evidence, not a later
HMR state.

## Verdict

**SOURCE/CLOSURE GREEN · PAINT/CONSUMER/PROCESS DEFECT · WAVE ACCEPTANCE RED.**

Keep both imports and the standing reachability gate.  The source repair is the smallest coherent cure:
`glass-chip.css` and the mixed `glass-atom.css` register are imported centrally immediately after
`glass-capsule.css`; neither file is forked, moved, or privately shimmed.  The published CSS export does
trace `package.json["exports"]["./styles"] → dist/styles/index.css → glass.css →` both partials, and the
gate derives its roots from that export rather than hand-listing W7.  The source diff is therefore not a
piecemeal visual patch and should not be reverted.

The §CLOSE label nevertheless overclaims the state.  It proves reachability and records one live
Chromium-family observation; it does not satisfy its own dual-engine, consumer, retention, or challenge
contract.

## Findings

### W7-P1 — BLOCKER: the required Safari paint arm was waived by argument

W7 gate (c) explicitly requires screenshot plus computed style on **Safari + Chrome**.  The close instead
records Chrome and Chromium, says headless WebKit crashed in the WebGPU-heavy demo shell, and declares
the Safari floor “covered-by-argument” because the revived declarations look engine-neutral.

That is not the gate.  Parse/support reasoning cannot establish the composed raster of
`color-mix(in oklab, …)`, `mix-blend-mode: plus-lighter`, animated registered custom properties, the
capsule underpaint, and the consuming cascade.  The crash invalidates the fixture, not the engine arm.
A minimal fixture without the shell's WebGPU visualizations was available as the bounded escape and was
not used.

### W7-P2 — BLOCKER: routed amendment K4 was silently dropped

`formation/refable/LEAD-AMENDMENT-LEDGER.md` K4 had already widened W7 gate (c), before execution, with
a `/data/tags-input` delete-paint arm.  It records the exact reason: TagsInput renders `.glass-chip` but
its deletion control is `.tags-input__delete`, not `.glass-chip__remove`, so importing the partial does
not by itself prove the real consumer's delete affordance.

The W7 body never received that arm and §CLOSE tests only `/forms/chip`.  This is precisely the ledger's
defined “destination band closes without carrying its annotation” failure.  It is also a research →
harden → addendum-discipline failure: the prior research changed acceptance, but implementation and close
proceeded against the older shape.

### W7-P3 — MAJOR: even the original removable-control arm has no retained proof

The original gate asks for selectable-ON paint, `--chip-flood-t` registration, **and remove-button
geometry**.  §CLOSE enumerates computed OFF/ON values for the selectable chip but gives no removable
button rectangle, hit ownership, focus/pressed state, or paired image.  The `/forms/chip` story does
mount a production removable `Chip`, so the omission is evidentiary rather than a missing fixture.

K4 is a second, distinct receiver: satisfying `.glass-chip__remove` does not satisfy
`.tags-input__delete`, and vice versa.

### W7-P4 — MAJOR: the claimed paint artifacts are not retained or reproducible

The close cites scratchpad `chip-selected-ON/OFF.png`, but neither image, a manifest, a probe script, nor
an engine log exists in the W7 commits or under `docs/tranches/BJ/evidence/`; a filename census across
the repository and the relevant `/tmp`, `.claude`, `.codex`, and visualization roots found no cited
pair.  There is no screenshot/video digest, viewport/color-mode matrix, browser build, selector/state
script, server input pin, or clean/dirty-tree digest.

Consequently another reviewer cannot reproduce the selected state or tell whether the observed frame
came from the exact commit.  A prose readback is useful discovery evidence, not release evidence.

### W7-P5 — MAJOR: the live fixture does not prove the published consumer draw

The `/forms/chip` development route imports `demo/demo.css`, which explicitly imports
`../src/styles/index.css` for HMR, and imports `Chip` from the source alias.  That is a valid source
integration probe.  It is not an installed-package probe of the built `dist/styles/index.css` export
whose closure gate (b) declares GREEN.  No retained build log, packed artifact, isolated consumer, or
dist-backed screenshot joins the static reachability claim to the live raster.

The exact source graph makes the publish result likely, but W7 was created because a file that looked
alive failed to reach the shipped consumer.  Its close should not repeat the same epistemic shortcut.

The `glass-atom.css` half is statically reached, as W7 requires, but its live Badge/`.cartoon-cast`
consumers receive no smoke frame.  Adding one production glass Badge to the isolated fixture is a
small, proportionate check that the selected atom rung composes rather than merely parses.

### W7-P6 — MAJOR: the governance receipt and model law do not close

The Claude-owned receipt still stops at HEAD `562db5c7` and contains neither W7 commit nor the promised
post-landing dirty-tree digest/conflict note.  The close identifies `model claude-opus-4-8` after the
owner's prospective Opus → Luna x-high and Fable → Sol x-high replacement.  History should not be
rewritten, but the exception also cannot be silently accepted.  The bounded mechanical redress needs a
Luna x-high receipt/revalidation, and acceptance needs two fresh Sol x-high post-redress critics.  A
self-authored source commit plus self-authored §CLOSE is not the required triumvirate.

## Smallest redress

Do **not** alter or revert `4442b451` merely to make new evidence.  The bounded implementation/evidence
owner should:

1. build or pack the exact candidate and serve one isolated, WebGPU-free fixture that imports the
   published `@mkbabb/glass-ui/styles` draw and mounts production `Chip`, `TagsInput`, and one glass
   `Badge`;
2. run the same deterministic state script on current Chromium and real current Safari (or a clearly
   pinned current WebKit only if the tranche authority expressly accepts that substitution): static,
   selectable OFF/ON, removable rest/focus/press/click, TagsInput delete rest/focus/press/click, and
   atom rest; use the same viewport, scheme, substrate, and settle rule in both engines;
3. record computed `--chip-flood-t`, selectable pseudo opacity and actual color/rim delta; record
   removable and TagsInput delete painted rectangles, `elementFromPoint`/trusted-click ownership,
   focus visibility, and resulting removal; adjudicate rather than assume any K4 paint failure;
4. retain before/after PNGs (and Safari video-path capture if its screenshot path is blind), a JSON
   manifest, probe source, browser/OS versions, exact commits, packed-artifact digest, worktree
   clean/dirty status and digest, and mutation results.  At minimum, removing either revived import must
   turn its corresponding detector red;
5. update the Claude receipt with W7/W8-era commits and conflict truth, then obtain two independent Sol
   x-high critics over the post-redress exact bytes.  Luna x-high owns any bounded mechanical change the
   K4 paint adjudication actually demonstrates.

This is one fixture and one script, not a new material system, an engine skin, a component-private
import, or a second glass path.

## Freeze ruling

**W7 release/tranche closure: BLOCKED.**  Source-green is not acceptance-green.

**Candidate-2 normative freeze: BLOCKED until this critic is adjudicated into the candidate's canonical
bytes.**  Candidate 2 need not pretend the implementation is already repaired: after it records W7 as
source-green/acceptance-red and binds the exact redress above, it may freeze that truthful RED plan.
It may not freeze the present §CLOSE claim or count W7 as DONE.  Any later evidence or source redress
changes the implementation pin and requires the named post-redress challenges; it must not be
back-applied to the `4442b451`/`2ad97ca1` evidence record.

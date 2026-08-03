# W1 paint closer `b0f2818a` — independent Sol x-high exact-byte critic C2

Date: 2026-07-22 EDT  
Seat: independent Sol x-high third-pass critic  
Scope: formation only; no source, test, evidence, package, receipt, stage or commit edit  
Target commit: `b0f2818ac85034c121f9db983822ce207c54c26a`  
Target tree: `7f96f562adcf8e105f19430ce858e849808da054`  
Parent: `da7415b58cb3591d75092bbcf1e2d20d53deab12`  
Verdict: **BANK GENUINE SOURCE/DEV PROGRESS / REJECT TERMINAL W1, REAL-ACTION, PACKAGE,
SAFARI/VOICEOVER AND FREEZE CREDIT**

All relevant files matched the target commit exactly during review.

## What is genuinely repaired

1. `src/styles/theme/radius.css` now uses Tailwind's supported `@theme static` option. In the
   source-served Chromium lane, `--radius-field` resolves to `1rem`; TagsInput and Textarea compute
   16px instead of falling through to 0px.
2. The TagsInput container detector now asserts the ruled 16px value and never-0 instead of accepting
   mere difference from the 9999px chip.
3. The dead `::before` probe is gone. The coarse cell reads chip height, `min-block-size` and the real
   `::after` touch spacer at 44px.
4. Sortable's pseudo-element radius has a CSS-cascade detector; fixed waits were removed; the WebKit
   spec and JSON now disclose that they are bundled-WebKit static-cascade discovery rather than
   Safari or mounted receiver proof.
5. Baseline `12/0` plus two failing reports are retained: removing static emission REDs the field
   readers, and changing the Sortable pill token reads 6px rather than 9999px.
6. The closer itself correctly returned terminal W1 RED and retained immutable 8.0, installed
   consumers, mounted states, actual Safari/VoiceOver and fresh critics as remainder.

These are useful corrections. They do not discharge the findings below.

## Material findings

### F1 — HIGH — evidence is neither fail-closed nor byte-bound

- `docs/tranches/BJ/evidence/W1-RADIUS-REDRESS/w1-radius.config.ts:105-111` permits
  `reuseExistingServer: !CI`; the banked `run-report.json:121` records `true`.
- The final report argv selects Chromium, coarse Chromium and WebKit only. It does not run
  `chromium-capture`, regenerate `compiled-demo.css`, or verify that file's input identity.
- `tests-visual/_capture_css.spec.ts:47-55` accepts one repeated rule-count one frame apart and exits
  its 40-frame loop without throwing when stability is never achieved.
- The WebKit module reads the pre-existing captured CSS at module load.
- No report binds commit/tree, server process, source file hashes, input CSS hash or served identity.
  Mutation reports likewise omit exact patch and pre/mutated/restored hashes.

A stale or foreign port and stale route-unioned CSS can therefore earn `12/0`. GREEN requires a fresh
server or exact served-identity handshake, fail-closed capture exhaustion, mandatory capture in the
same run, and full source→input→report identity.

### F2 — HIGH — Sortable is class injection, not a real drag receiver

The fine cell at `tests-visual/w1-radius-redress.spec.ts:607-621` directly toggles
`is-sortable-drop-*` and creates a clone with `sortable-drag-ghost`. It removes those states before
the screenshot. The keyboard arm focuses a row, sends `ArrowDown` without lifting it and swallows
errors. Bundled WebKit pre-authors the drop class. None of `SortableItem` binding,
`dragController.beginPointer`, real pointer/keyboard reorder, announcement, cross-list target or
`ghostRenderer.createGhost` is exercised. `MUT-2` proves only the pseudo-element's token.

### F3 — HIGH — TagsInput does not prove the removal action or constrained geometry

The coarse cell selects the first chip only, measures its body/spacer and deliberately skips the
right-side delete action. Generic chip-or-descendant ownership cannot prove the delete target. “No
overlap” is chip-versus-root rectangular inset; the ledger's `insetRight:214.73` and
`insetBottom:100.5` show the sample is far from a constraining edge. There is no trusted delete and
removal, delete-versus-neighbor/input isolation, curved/focus-ring containment, wrap, disabled, long
content, focus/active state, or keyboard deletion. A missing/no-op/1px delete target can remain GREEN.
The title's “owns its corners” is also false; only centre, edge-mids and left cap are sampled.

### F4 — HIGH — the dialog-nested reader is synthetic

`tests-visual/w1-radius-redress.spec.ts:555-569` creates a `div[data-slot=dialog-content]`, clones an
input into it, reads CSS, and removes it. No Dialog mounts or opens, and the screenshot is only the
Inputs page. This is a useful selector-cascade fixture, not a real F7 receiver. The receipt phrase
“real scope” must not become mounted-receiver credit.

### F5 — MEDIUM — `@theme static` is valid, but its package/API budget is unproved

The fix makes the entire block static: 30 variables, not only `--radius-field`. An isolated Tailwind
4.3.3 compile with no candidates emitted 30 variables / 1,138 bytes for the static block versus zero
variables / 66 bytes for plain `@theme`. It does not manufacture unused utility rules, but it does
publish every radius and corner-shape variable unconditionally. Accept the current change as a
source/dev forward fix only. Decide the all-token public policy and prove fresh build, package-size
delta, unique 8.0 pack, isolated install and installed readers before release credit.

### F6 — MEDIUM — WebKit truth-up is incomplete

The WebKit spec/header/JSON are now honest. The runner still calls the target “current Chromium +
Safari/WebKit”, “Desktop Safari” and “Safari cascade truth” at `w1-radius.config.ts:3-17,94-100`.
The fixture remains hand-authored, manually stamps a Vue scope hash, and clones Search recipes. Its
header says seven captured routes while the helper now unions nine. Strike the residual Safari
labels; keep this arm static-cascade discovery only.

### F7 — MEDIUM — mutation reports are credible detector outputs, not exact-byte receipts

`MUT-1` records the expected two failures; `MUT-2` records 6px instead of 9999px. Neither contains
base commit/tree, mutated file hash, exact patch, server/input identity or restored hash, and both
reuse the existing server. Retain them as useful symptom bites, not cryptographically attributable
born-RED closure.

### F8 — LOW/MEDIUM — receipt and commit history need truthful boundaries

The receipt headline says both engines GREEN and every cure applied even though action/receiver gaps
remain; its terminal-RED paragraph is accurate. The `test(w1-paint)` commit also changes production
source across 37 files/9,489 additions including generated binaries. Its body is substantial but does
not name the complete routed remainder. A `fix(radius)` source slice plus `test(w1-paint)` evidence
slice, or one broad history-bearing body with every RED remainder, would state the history more
accurately. Do not rewrite the commit while W2 is active; correct its disposition in the ledger.

## Required born-RED arms

1. Remove `SortableItem` class publication, disable pointer begin, or remove ghost creation; natural
   pointer and keyboard drag/reorder/announcement tests must fail.
2. Shrink/remove/no-op the TagsInput delete action, overlap it with a neighbour/input, remove active
   focus paint, and introduce wrapped/long/disabled chips; action-specific hit and actual removal must
   fail.
3. Prevent a real Dialog opening or remove its mounted field; the natural F7 receiver must fail.
4. Delay one route stylesheet, keep CSS rule count changing, or point the configured port to foreign
   bytes; capture must fail before assertions.
5. Mutate the unique packed 8.0 field writer, installed receiver, lazy-route CSS, mounted Search
   binding, Tabs activation/glide/PRM, and actual Safari/VoiceOver paths independently.

## Binding disposition

W1 stays OPEN. Bank `b0f2818a` as a source/dev detector advance. It is not a real-action close, a
mounted WebKit receiver, Safari/VoiceOver proof, immutable package proof, installed consumer proof,
or Candidate-2 freeze input. The next bounded redress must cure F1-F4/F6-F8 or explicitly narrow the
claimed scope, then complete the unique 8.0/package/consumer/Safari/VoiceOver matrix and receive two
fresh independent Sol x-high critics over unchanged bytes.

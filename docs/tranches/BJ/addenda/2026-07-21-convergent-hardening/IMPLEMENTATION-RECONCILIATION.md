# Claude implementation-lane reconciliation

This ledger is read-only with respect to product source and the Claude-owned receipt file. It records
what the Sol audit can independently reproduce and what still cannot count as tranche acceptance.

## Pin observed 2026-07-22 00:45 EDT

- HEAD `626540adbe10fd84f47b8365977925a7fbd2e17a` on `master`.
- Source landing `4442b45106f9c83796219aefdab2b5cb2352dbc8`.
- Close-stamp landing `2ad97ca1b0621882486cabe7363c6ba364b03aa0`.
- W8 source landing `44621bb4af3a142dbdebb6a7ba6bbefa4dcbcbf7`; close stamp
  `bb33810cb26debe77436c59df231814693b6fe65`.
- W8 component-auto-arm redress `f0d32d6915790ea97df383a4a486e3296f2b43d5` is committed but
  acceptance-RED; it is not a new close.
- Claude receipt `CLAUDE-SOL-IMPL-RECEIPTS.md` still stops at HEAD `562db5c7`; its promised
  commit/digest relay is stale by the six phase-2 commits through `626540ad`.
- The shared tree remains dirty with the Claude A11Y remainder plus the Sol normative files. No shared
  clean-state claim is valid.

`CLAUDE-WORKFLOW-RECONCILIATION-C2.md` (SHA-256
`72cee2add212ac831f77f31a6fccf2ebddb2a003abc987b672234494a5b80a28`) pins the intended workflow
`wf_689ca3dc-541` to session `e79fce3f-d24e-4654-8b27-d029653fedbe`. Its inspected EOF records
`pendingWorkflowCount: 1`; therefore no mid-run terminal injection, restart, or receipt mutation is
authorized. Deliver the bounded Candidate-2 steer only at the workflow completion callback, before it
pipelines another band.

## MATERIAL W7 judgment

### Reproduced GREEN

The source mechanism is correct and parsimonious. `4442b451` adds only the two missing central imports
after `glass-capsule.css`; it does not move or fork the mixed atom register. The standing closure gate
is live: `npx vitest run tests/gates/orphan-css-partial.test.ts` passes 4/4 at current HEAD. The
follow-up close commit corrects the false landing SHA rather than leaving a self-inconsistent record.

### Acceptance still RED

1. **Model law:** the W7 close identifies `claude-opus-4-8` after the 2026-07-21 prospective
   supersession. New bounded mechanical seats require Luna x-high; design/judgment/challenge seats
   require Sol x-high. Prior work keeps historical labels, but a post-order launch cannot use the
   discharged outage rule silently.
2. **Fresh critics:** PLAN requires two fresh challenge critics after every wave before it counts as
   done. The W7 close records no post-landing two-critic receipt. A source gate plus self-authored close
   is not the triumvirate.
3. **Safari evidence:** gate (c) required Safari + Chromium paint. The close records a WebKit crash and
   substitutes “covered-by-argument.” Engine-neutral CSS makes the risk lower, but it does not satisfy
   a requested paint arm. A minimal component fixture that avoids the WebGPU shell can prove the same
   published closure without waiving Safari.
4. **Evidence retention:** the claimed ON/OFF screenshots remain under scratchpad and are not pinned in
   the tranche evidence set with commit, clean/dirty status and digest. They are discovery receipts,
   not reproducible release evidence.

### Two fresh W7 critics — completed

- CSS/cascade/package critic `W7-CRIT-CSS-C2.md`, SHA-256
  `8d820e00809de071620b05d180a82f869d4e8c628258235882fd5eb04645c399`;
- paint/consumer/process critic `W7-CRIT-PAINT-C2.md`, SHA-256
  `5d8f6f3d570ae8d7179043a29ee303e7a8c075262110c66dc7563ddbaf7ddbbe`.

The first independently builds and packs the exact archive and bundles a downstream Vite consumer;
both partials survive the published `./styles` path, and deleting either import independently reds the
gate. W7's source/cascade/package mechanism is therefore genuinely GREEN. It also proves the broader
gate claim false: an unreachable SFC with a local `<style src>` rescues dead CSS in the source
predicate even though the exact package omits it. Existing GATES W3 owns public-JS reach or a truthful
source/package split plus conditional-object CSS exports.

The second proves the close silently dropped routed amendment K4. `/data/tags-input` uses
`.tags-input__delete`, not `.glass-chip__remove`, so neither import reach nor `/forms/chip` proves that
consumer. The original removable-control geometry is also unbanked; scratch frames are absent; the
demo route consumes HMR source rather than the packed artifact; and real Safari paint remains waived
by argument. One WebGPU-free packed fixture mounting production Chip, TagsInput and a glass Badge must
carry the complete Chromium/Safari state, hit, focus, removal and retained-evidence matrix.

Therefore W7 is **SOURCE/CASCADE/PACKAGE-GREEN / GATE-INSTRUMENT + PAINT + CONSUMER + PROCESS-RED**.
Continue implementation; do not revert the correct imports. Before promotion, restore K4 and removal
proof, fix the gate instrument in GATES W3, bank the published-artifact Safari + Chromium evidence,
update the Claude receipt/digest, and run two fresh Sol x-high critics on any amended exact bytes.
Luna x-high owns bounded mechanical redress.

## MATERIAL W8 landed — SOURCE/BUILD-GREEN, INTEGRATION/ACCEPTANCE-RED

At the pin above the implementation lane has committed `supportsBackdropRefract.ts`, export,
root-latched CSS, explicit demo arm, visual gate and evidence. The proposed functional proxy is within
the wave's permitted candidate shape: it first requires honest `CSS.supports`, rejects an always-true
shim, then uses a private 4×4 Canvas2D SVG-filter readback only to decide the root latch. Its bounded
canvas body fails OFF and it does not call `getContext()` on a consumer/live visualization canvas.
However, the whole installer is not total: either outer `CSS.supports` call can throw after `armed` is
set, and a stale pre-existing root `on` is never removed on a negative. The unlatched CSS blur base is
safe; the current installer does not yet establish its documented iff.

The landed state remains **RED** for acceptance closure:

1. `tests-visual/refract-lens-never-sharper.spec.ts` currently proves only the harness's **unarmed
   latch-OFF blur floor**. It does not prove Chromium latch-ON refraction/garnish, WebKit latch-OFF video
   paint, or automatic future enablement when an engine begins painting the real backdrop path.
2. No direct detector/arm lifecycle test presently proves SSR, DOM-ready deferral, idempotence,
   positive functional arm, negative/throw arm, or stale-attribute behavior.
3. The landing and close are now real, but both still declare `claude-opus-4-8` after the prospective
   Sol/Luna supersession; the Claude receipt has not recorded either SHA or a post-landing tree digest.
4. The governing wave says both “root-level latch” and “no demo edits,” yet a side-effect-pruned,
   explicitly armed export needs a bootstrap consumer. The implementation's demo call is coherent,
   but the plan must explicitly adjudicate the contract: either one supported bootstrap installer is
   part of the cut, or the latch obtains an honest side-effect-safe library installation path. Do not
   hide this specification contradiction in a comment.
5. The committed evidence now proves WebKit/Chromium latch discrimination and unarmed OFF-floor video,
   but not a quantified Chromium ON-garnish/refraction DELTA or a false-positive-ON invariant.
6. The proxy uses a fixed document-global SVG id and a same-document Canvas2D fragment filter, while
   production uses a data-URI SVG in the backdrop-compositing pipeline. It is a currently correlated
   proxy, not direct proof of “the same capability”; collision-proof identity and the armed real-paint
   gate must carry that uncertainty.

Smallest clean close: keep the bounded proxy but make the whole installer total if direct tests and
live-π validate it; adjudicate the installer surface in the addendum; prove ON/OFF arms separately; retain the standing “never sharper
than blur base” invariant; record exact commit/worktree digest and two fresh critics. No engine-specific
material skin or consumer refraction shim follows. `IMPLEMENTATION-ASKS-C2.md` carries the exact
receiver matrix, including the false-positive-ON mutation and the anti-favorable-recapture instrument
arm, without editing the Claude-owned receipt.

### Fresh W8 evidence observed 2026-07-22 00:1x EDT

The implementation lane subsequently committed `evidence/W-REFRACT-LATCH/` receipts. This is a
material improvement, not an acceptance close:

- `latch-discrimination.json` records the shipped detector as Chromium `armed:true`, attr `on`,
  computed blur+saturate+url; WebKit `armed:false`, attr absent, computed blur+saturate. That supports
  the intended capability split.
- both machine reports record 2/2 passed with zero retry at the Playwright level; the gate's harness
  remains explicitly unarmed and therefore proves the OFF blur floor on both engines.
- the README honestly identifies WebKit's screenshot as backdrop-filter-blind and grounds its blur
  truth in computed style plus the video-path gate.

The same evidence leaves the acceptance gaps named above: Chromium's retained PNG shows two broadly
similar frosted chips and provides no quantified ON-garnish/refraction DELTA; WebKit never needs ON,
but a future false-positive detector is not bitten because the standing gate stays unarmed. There is
still no direct detector/installer lifecycle suite, no delayed-filter mutation for the blind-capture
recapture policy, and no updated Claude receipt/tree digest. The two pre-redress critics below expose
defects rather than close them; amended bytes will owe a new two-critic close. Treat the files as a
strong source landing with incomplete acceptance, not a release-green wave.

### Two fresh W8 critics — completed, exact source landing remains RED

The required post-landing challenge has now occurred on the exact `44621bb4` source landing at
`bb33810c`:

- mechanism/lifecycle critic `W8-CRIT-MECHANISM-C2.md`, SHA-256
  `500ec6560636f181dbe37d2c9f8a2b89d324434593b7ecd44555713b25371845`;
- integration/public-contract critic `W8-CRIT-INTEGRATION-C2.md`, SHA-256
  `fd15fd948d4966141bf79c489334c058e67581fae0c548bda062a3a6e6038bfb`.

Independent checks bank real progress: source typecheck passes; the dual-engine standing gate reruns
4/4 GREEN for the **unarmed floor**; an isolated archive build emits the root functions and passes
package verification across 205 targets, 483 declarations, 111 CSS files and 67 strict consumer
imports. The CSS repair and public root export therefore remain SOURCE/BUILD-GREEN.

The critics also convert previously inferred risks into exact defects:

1. the standing gate never calls the detector/installer, so omitted export/bootstrap, forced detector
   false, deleted latched selector and false-positive WebKit ON mutations all leave it GREEN;
2. a real-module trace proves SSR safety and one effective probe/mount/removal across two pre-body
   calls, but also proves stale `on` survives honest rejection and a throwing `CSS.supports` escapes,
   locks the module armed, and suppresses recovery;
3. the fixed `#gl-refract-probe` id is collisionable and the Canvas2D fragment proxy is not the same
   URL form or rendering pipeline as production backdrop refraction;
4. recovery currently discards a painted sharp blur-twin capture and may retry until a favorable
   product render; only a recording whose bare scene never painted may be recaptured;
5. explicit bootstrap is a genuine consumer migration. Only `demo/main.ts` calls it. `/tabs` contains
   no arm, and current SCI/Atlas/keyframes roots call neither export. SCI's two real pill
   `SegmentedTabs` receivers would therefore silently receive blur-only Chromium glass after repin;
6. the discrimination JSON is conclusion-only, Chromium ON has no quantified garnish delta, WebKit's
   PNG is explicitly non-probative, and Playwright WebKit must not be described as an actual Safari
   browser capture.

All six findings are accepted in `IMPLEMENTATION-ASKS-C2.md` I-2 through I-6. The smallest redress is
one total, collision-safe installer; three armed/unarmed paint arms; first-painted-sharp capture
failure; a documented once-per-root public bootstrap adopted by every first-party application; and
replayable evidence. No revert, component-local side effect, engine skin, second refraction path or
consumer shim is authorized. Because these critics precede redress, amended bytes owe two fresh Sol
x-high critics. Candidate 2 may carry the source landing only as
**SOURCE-GREEN + BUILD-GREEN / INTEGRATION-RED + ACCEPTANCE-RED**, never W8 DONE.

### W8 redress `f0d32d69` — committed, rejected for acceptance

At 2026-07-22 00:27 EDT, the four-file attempt whose pre-commit ordered binary diff digest was
`64bae00ae1d12e7542b562da19863b1d7227fc61b73855cc54d50ad494ee940e` landed as
`f0d32d6915790ea97df383a4a486e3296f2b43d5`. It:

- adds `onMounted(armGlassRefract)` to `SegmentedTabs.vue`;
- tells MIGRATION that shipped components need no action because that component arms the root;
- weakens the standing-gate claim to a one-time live-π instead of adding armed and false-positive-ON
  proof;
- edits wave close prose to bless the component side effect.

This does not answer the critics and is rejected for acceptance. One component must not silently
mutate document-global capability state or make unrelated/custom lenses depend on its mount order.
It would also mask the missing SCI/Atlas/keyframes application-root adoption that the integration
critic and live-Q independently reproduced. The attempt leaves stale attr removal, thrown-supports
totality, collision-proof identity, first-painted-sharp capture failure, quantified Chromium ON
garnish, replayable evidence and the three armed/unarmed proof arms untouched. Its commit body
explicitly defers armed-path gate coverage to one-time live-π, which the accepted critics already
ruled non-standing and non-replayable. Preserve the package root export; remove the component mount
arm in a subsequent commit; implement the explicit once-per-application bootstrap contract and the
full I-2…I-6 matrix. The historical commit remains intact but receives no acceptance credit.

Two independent exact-commit Sol critics now close the adjudication, not the wave:

- contract/integration `W8-F0D-CRIT-CONTRACT-C2.md`, SHA-256
  `53fc5bda08a14d43c85d46a6fdd6f43ee0d5035ee1096421776e2bb7985fc13d`;
- mechanism/falsifiability `W8-F0D-CRIT-MECHANISM-C2.md`, SHA-256
  `f844f3e04bd9ae501e46cbe6e7a9b8107c1942b619944d32e30a552456b19543`.

Both are RED. Exact archive build shows `/tabs` now statically imports a 1.57 kB raw / 0.74 kB gzip
probe chunk for pill, underline and Select-only shapes; its 13/13 component tests assert none of the
latch ownership. A fresh Chromium trace turns clean support `true` into `false` simply by pre-seeding
an identity filter with the fixed `gl-refract-probe` id. The same trace reproduces stale root `on` and
the thrown-`CSS.supports` irrecoverable lockout; the 4/4 dual-engine gate remains intentionally OFF
only. The Chromium witness's aligned chip difference is uncausal because the chips sit at different
backdrop phases, so a matched rim/interior mask and no-garnish mutation remain required.

These reports satisfy the challenge of `f0d32d69` and ratify its rejection. They cannot approve a
future redress: removing the component arm, restoring a probe-free `/tabs`, fixing lifecycle/id,
adding application-root adoption and completing the three paint arms changes the exact bytes and owes
a new critic pair.

## Current implementation-lane judgment

The lane is productive: opener commits are small, concretely scoped, and usually carry why/what/evidence
bodies; the W7 source/doc split is especially auditable. The friction is governance lag rather than
random coding—model supersession, receipt freshness, dual-engine evidence and post-landing critics are
not keeping pace with commits. That is precisely where piecemeal completion can masquerade as
triumvirate completion. The audit will retain each sound landing while refusing the DONE label until
research/contract, hardening challenge, and evidence/addendum close all converge on the same bytes.

### MATERIAL W2 `626540ad` — useful source subset, unified contract still RED

At 2026-07-22 00:44 EDT, the five-file patch whose ordered pre-commit diff digest was
`1f00437a77eaf047eef349d97aa95c176ebf94d9ec4bba2c633a0df0568d8e63` landed as
`626540adbe10fd84f47b8365977925a7fbd2e17a`. It replaces the animated
loop's hardcoded-white arithmetic with a pure `compositeOver` helper and resolves one page color from
the static stack. Its narrow test is 3/3 GREEN. That directly addresses one G3 symptom and should be
retained if the complete contract validates it.

It does not yet satisfy `R-COMPOSITED-SIGNAL`. The resolver chooses the first backgroundColor with
alpha ≥0.5, drops its alpha, ignores background-image/placeholder gradients, and cannot composite an
ordered translucent stack. `GlassDock.vue` is byte-unchanged: the absent prop still becomes a
configured null getter, so live intent bypasses discovery/static sampling and Atlas still supplies no
real source. The test's fixed-white case compares a value to itself and cannot fail, while its actual
dark/light mutation covers only one field over one opaque triple. The band amendment then declares
GREEN and explicitly defers the configured-null half, despite the accepted unified contract and
candidate 2 not yet being frozen. The commit body explicitly routes the null-getter half as deferred
and out of scope, so the implementation lane has split a unified accepted contract without authority.
`IMPLEMENTATION-ASKS-C2.md` I-7 binds the smallest completion and rejects that scope split. This
commit receives
only narrow literal-white source credit, not W2/G3 acceptance, until tested against analytical
stacked-alpha mutations, completed at the source-intent seam, exercised through a real Atlas witness,
and challenged on the exact commit.

Two exact Sol x-high critics now reject the same bytes: mechanism
`dd4ba2a4292033f1bc290bbeb3070cfa575fff3337b0d4ff7da7bff84d63c1b0` and receiver/package
`323008f5061a0f41eb7b769e53aaf92d3c88ace48fc0dcc17bfc788a6d6488bd`. The latter's isolated archive
build and package verification pass, but it adds four independent integration failures. GlassDock
strips a public selector and collapses omitted/null/getter-null intent; Atlas's visible default is a
CSS placeholder while its canvas is transparent; the public package has no provider/ordered-layer
seam capable of carrying that composition; and Atlas locks the already-published `7.0.0` white-loop
artifact while `626540ad` builds different bytes under the same version. Completion therefore also
requires a unique immutable artifact identity, an emitted-package fixture, and a real Atlas lock/
receiver co-landing. Neither pre-redress critic can close amended bytes.

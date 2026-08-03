# W6 moving critic — TYPE-CODEMOD ⇄ GATES W4, Candidate 2

Date: 2026-07-22 ET  
Seat: read-only moving-tree critic; no product, test, band, receipt, or evidence edits  
Verdict: **USEFUL MOVING CANDIDATE; ACCEPTANCE RED**

## 1. Pin and moving-tree qualification

The audit began at `626540adbe10fd84f47b8365977925a7fbd2e17a`. While the audit was running,
the type gate grew from five to seven tests, the Card direct-var defect was found and repaired, a Card
evidence pair appeared, and HEAD advanced to `8786d2c8c91f289abd3dc7290a4e0b869416b4f0` via
`fix(card): repoint stranded .card-description off the cleared --text-sm rung`. The final observation pin
is recorded in §12. This is therefore a moving-candidate review, not an exact frozen acceptance review.

Commit `8786d2c8` usefully lands the independent Card precursor and honestly routes the type gate and main
codemod as uncommitted remainder in its commit body. But the same commit also lands `BAND-MATERIAL` prose
that says `W6 §CLOSE — LANDED`, says GATES W4 flipped in the same cut, and cites the uncommitted gate's
results. Both cannot be true. Either `8786d2c8` is only a safe precursor, in which case the committed
`LANDED` close is false, or it is the W6 landing, in which case the reset + codemod + gate same-cut law was
not met. The source precursor is useful; the status claim is not acceptance evidence.

## 2. Acceptance blockers

### C0 — six mechanical replacements change the intended font register

`demo/stories/containers/expandable-container.vue:33,47,83,114,131,139` now pair `fira-code` with
`text-small`. The full semantic `text-small` recipe sets `font-family: var(--font-text)`. In the freshly
built demo CSS, `.fira-code` begins at byte 168113 and the full `.text-small` rule at byte 171134. Equal
specificity plus later source order means `text-small` wins: all six `<code>` labels change from Fira Code
to Plus Jakarta Sans. The close already understood this failure mode for `font-mono text-sm` in
`progress.vue`, where it chose `text-mono-small`, but missed the equivalent `fira-code` form.

This is a real paint/semantic regression, not a theoretical gate concern. A declared Sol seat must decide
whether the intended cure is `text-mono-small`, `font-mono text-small`, or a deliberately reworked code
label. A bounded declared Luna seat may then make the six mechanical edits.

### C0 — the written W4 contract and the implemented gate are different contracts

`BAND-GATES` W4 §Design requires all of the following:

- tokenize or explicitly exempt the residual canonical literals;
- clear the built-in text/leading/tracking namespaces;
- ban built-in `text-(xs|sm|base|lg|xl|…)`, arbitrary `leading-[…]` and `tracking-[…]`;
- ban raw `font-size`, `line-height`, and `letter-spacing` literals across `src/` and `demo/`.

The current untracked gate intentionally implements a narrower rule: only `text-sm`, `text-xs`, simple
numeric `text-[Npx|rem|em]`, numeric `font-size` and exactly `letter-spacing: 0.1em` in
`src/components/**/*.css`, plus cleared `--text-sm/xs` var references in `src/**/*.css`. Its own clean
self-test explicitly blesses `text-base`, `text-lg`, `text-xl`, and `leading-[1.1]`.

The W4 residual-canon prerequisite is also still open. For example,
`src/styles/typography/utilities.css:59,65,66,93` retains raw `0.02em`, `1.25`, `0.025em`, and `1` recipes;
`src/styles/typography/semantic.css:235,241` retains raw `1.25` and `1`. No tokenization or named exemption
record accompanies the candidate. The scoped reset may be a better product decision than the wildcard,
but that is a Sol contract ruling, not a mechanical implementation detail. Amend the normative W4 design
and acceptance clauses or implement them; do not close against a third, undocumented contract.

### C0 — required paint evidence is absent, and the one available pair proves a different repair

The committed Card pair is distinct and useful. It proves that `var(--text-sm)` became invalid after the
planned clear and that `var(--type-small)` repairs CardDescription at 1440px. It does not prove the
234-replacement utility cut. The committed close now admits this at its `OPEN` paragraph.

The explicit W6 paint contract still names springs, slider, and `/substrates/glass-material`, Safari and
Chrome. It also needs both the narrow clamp floor and wide fluid arm. The evidence directory contains only
the Card pair, both 2880×1800 captures of a 1440×900 dark desktop surface. There is no retained 390px
arm, no slider/glass-material arm, no usable springs pair, and no Safari/Chrome pairing.

Theme and PRM do not directly change these typography token values, so they are logically orthogonal to
the class substitution itself. Responsive width is not orthogonal: the replacement rungs are fluid.
Browser coverage is not discharged merely because the CSS syntax is engine-agnostic; font metrics,
wrapping, fallback timing, and rasterization remain browser-observed paint. A concise argument can waive
duplicating every theme/PRM combination, but it cannot replace the named width and browser proof.

### C0 — current model and receipt law is not discharged

The active Candidate-2 law assigns design, judgment, audit, critique, paint, and acceptance to declared
Sol x-high; bounded mechanical work belongs to declared Luna x-high. The W6 close and the landed Card
precursor truthfully record `claude-opus-4-8`; those historical labels must not be rewritten. They are also
post-supersession execution and therefore cannot satisfy the current declared-seat law.

`coordination/CLAUDE-SOL-IMPL-RECEIPTS.md` still stops at the pre-split `562db5c7` row. It does not carry
the phase-2 commits, `8786d2c8`, the moving W6 digests, or a contract-conflict receipt. This matches
`CLAUDE-WORKFLOW-RECONCILIATION-C2.md`: source candidates remain candidates until declared Luna redress,
declared Sol judgment, and fresh exact-byte critics close them.

### C1 — the census is reproducible, but “234 utility edits” is semantically false

Against the original W6 base, the strict occurrence census is correct:

| channel | count |
|---|---:|
| `text-sm` | 128 |
| `text-xs` | 97 |
| numeric raw-size arbitrary | 9 |
| total replaced occurrences | 234 |
| current residuals under the implemented regexes | 0 |

The broader word-boundary count is 227 lines: 16 `src` + 211 `demo`. Two `src` hits are legitimate
`--control-text-sm` token references, leaving 225 strict sm/xs occurrences. However, six of those 225 are
not rendered utility readers:

- `demo/chassis/code/Code.vue:13` — source comment;
- `demo/stories/display/badge.vue:109,110,160` — user-visible specimen copy / metadata;
- `src/components/_shared/class-names.ts:23,67` — source comments.

Thus the patch performs 234 textual substitutions but only 228 reader substitutions. Rewriting comments
and specimen prose proves the raw-text scanner cannot distinguish utilities from prose. The false edits
are mostly harmless, but they invalidate “mechanical utility sites” as the semantic census unit.

The Badge copy also becomes false: `size="sm"` still reads
`text-[length:var(--control-text-sm)]`, whose default source is fluid `--type-caption` (about 12.18px at
390 and 14.38px at 1440 before any coarse-pointer scale), not fixed 11px `text-micro`. Labeling it
`sm · text-micro` is a product-documentation regression.

### C1 — several “parity-first” claims conceal real geometry changes

- `text-sm` 14px/20px → `text-small`: 14px/19.6px at the clamp floor, about 14.4px/20.16px at
  640px, and 16.4px/22.96px at 1440px. Wide wrapping and vertical rhythm change materially.
- `text-xs` 12px/16px → `text-micro` 11px/13.75px. The font shrinks 1px and the line box shrinks
  2.25px. `text-micro` also hard-codes `1.25` rather than reading the existing
  `--type-leading-micro: 1.2` token.
- Four `text-[0.7em]` sites are relative to their inherited font size. “All ≤11px” is not proven;
  replacing them with fixed 11px changes inheritance semantics.
- `segmented.css` 13px → fluid caption is about 12.18px at 390 and 14.38px at 1440; its desktop
  14px → fluid small becomes 16.4px at 1440. `layer-group.css` 12px → caption is likewise only
  identical at the clamp floor, not at ordinary desktop widths.

These changes may be the desired fluid-ramp adoption. They are not byte parity and require the missing
responsive paint judgment.

### C1 — nested typography remains mechanically green but conceptually muddy

`NucleiOverlay.vue:73` now contains both `text-mono-small` and `text-micro`, plus `leading-none`. Current
emission makes the effective result mono family from `text-mono-small`, micro size from the later
`text-micro`, and line-height 1 from the later `leading-none`. It paints deterministically, but expresses
two competing type-size recipes. A semantic gate does not detect this class of replacement.

The two caps declaration repoints to `--type-tracking-caps` are exact. Existing `tracking-wider` /
`tracking-widest` utilities also emit after the semantic recipes, so their explicit caps tracking survives.
That narrow fact is green; it does not close the broader W4 tracking contract.

### C1 — gate path and regex blind spots are acceptance-relevant

The current scanner passes seven tests and catches its exact planted forms. It also has these deliberate
or accidental holes:

- utility arm reads raw `.vue`/`.ts` text, so comments and user-facing strings false-red;
- declaration arm ignores demo CSS, `src/styles/**/*.css`, Vue `<style>` blocks, and all raw
  `line-height` declarations;
- `text-[calc(10px)]`, `text-base`, `leading-[1.1]`, `tracking-[0.02em]`,
  `line-height:13px`, and `letter-spacing:.1em` stay clean;
- any numeric `font-size` value containing `var(` is exempt as a whole, even if it also contains a raw
  literal;
- no standing test proves packaged/consumer emission of the semantic recipes.

The first Card miss demonstrates why channel completeness matters: a reset consumer outside the original
census survived every earlier net.

## 3. Green evidence retained

The candidate is useful rather than discardable:

- exact sm/xs/arbitrary residuals under the implemented patterns are zero;
- `tests/gates/type-hygiene.test.ts` passes 7/7;
- `npm run build` passes (726 modules; type emission projected 67 public entries);
- `npm run demo:dist:build` passes (3514 modules);
- `npm run verify:package` passes (205 targets, 483 declarations, 111 CSS files, 67 strict consumer
  imports);
- fresh demo CSS contains the full `text-small`, `text-micro`, and `text-mono-small` recipes; its selector
  counts are 2, 2, and 1 respectively;
- package `dist/styles/components.css` self-emits `text-small` and `text-micro` size selectors, while the
  canonical Tailwind-processed `./styles` path retains the full `@utility` definitions. The documented
  consumer wiring is plausible and the package verifier is green.

This build proof establishes syntax, generation, and package reach. It does not negate the `fira-code`
cascade regression or substitute for a packed consumer paint fixture.

Observed ignored build-artifact SHA-256 values (diagnostic only):

```text
89bf3a92fb50808fad57308fc4ad556eba6b4acf119a6d299a01a0e43f24dc63  dist/styles/components.css
99c66fcddd69ee7e095eb0f1fae9cc232924d5de660b839dbfa13ef2ce2eac40  dist/styles/typography/semantic.css
6efb35b53224c2b12e9ded57b43ec60f92559d78b7b004728fc7283e6bbe5093  dist/styles/typography/utilities.css
a09594ef0c4c9d588605dfdc185a66577e629617716349beefac56e2a852952f  dist-demo/assets/index-CryeQ65Q.css
```

## 4. Exact born-RED mutations required after landing

The existing gate must be demonstrated one mutation at a time on the landed cut, restoring exact bytes
after every run:

1. `src/components/dialog/DialogDescription.vue`: `text-small` → `text-sm`.
2. `demo/stories/motion/springs.vue`: one `text-micro` → `text-[13px]`.
3. `src/components/tabs/styles/segmented.css`: `font-size: var(--type-caption)` →
   `font-size: 13px`.
4. `src/components/command/styles.css`: `letter-spacing: var(--type-tracking-caps)` →
   `letter-spacing: 0.1em`.
5. `src/components/card/styles.css`: `var(--type-small)` → `var(--text-sm)`.

Those five should red today. If the written W4 contract is retained, add mutations that must become red:

6. plant `text-base` in a reader;
7. plant `leading-[1.1]` and `tracking-[0.02em]`;
8. plant `line-height: 13px` and `letter-spacing: .1em` in every promised stylesheet channel;
9. plant `text-[calc(10px)]`;
10. suppress `text-small`/`text-micro` from the packaged consumer fixture and require the package-reach
    check to fail.

If Sol deliberately chooses the narrow two-rung contract, mutations 6–10 must instead be removed from the
normative W4 promise via an explicit contract amendment. A green test against an unamended broader spec is
not acceptance.

## 5. Post-landing obligations

### Declared Luna x-high, bounded mechanical redress

1. Apply the Sol-chosen repair to the six `fira-code text-small` sites.
2. Correct the Badge specimen copy so it names the token/role actually emitted.
3. Implement the Sol-ratified gate scope, including path/channel completeness and the chosen parser or
   prose-safe matching discipline.
4. Tokenize the residual canon or implement the exact named exemptions chosen by Sol.
5. Add the package-consumer emission mutation/check if retained by the contract.
6. Run and record the exact born-RED mutations, gate, build, demo build, and package verifier.
7. Append the exact commit, model identifiers, status/patch/untracked digests, evidence hashes, and
   contract conflicts to the Claude-owned receipt. Do not relabel the historical Opus work.

### Declared Sol x-high, judgment and acceptance

1. Rule the actual contract: wildcard reset/broad W4 lint versus the scoped two-rung reset/narrow gate.
2. Judge all role-sensitive mappings, especially fixed 11px micro, relative `0.7em`, the six code labels,
   Badge size semantics, and nested `text-mono-small text-micro`.
3. Capture retained before/after paint on representative dense `text-small` and `text-micro` readers at
   390 and 1440 in Safari and Chrome, including the named springs/slider/glass-material obligation or an
   explicit evidence-contract amendment. Inspect wrapping, truncation, baseline, overflow, and font family.
4. Re-pin the landed exact bytes and obtain two fresh independent Sol x-high critics after every
   byte-changing redress. Only then may W6/GATES W4 become acceptance-green.

## 6. Final status ruling

Do not revert the useful Card precursor or the broad mechanical migration. Do not accept or freeze the
current moving cut. The next safe state is: correct the font-register and specimen-copy defects; reconcile
the W4 contract; finish retained responsive/browser paint; land reset + codemod + gate atomically; update
the receipt; then run two exact post-redress Sol critics. Until those conditions hold, `LANDED` may describe
only the Card precursor commit, never W6 or the GATES W4 flip.

## 12. Final observation pin and per-file hashes

Placeholders below are replaced after this report is written so the status digest excludes only this
critic file and captures the final shared-tree observation.

```text
FINAL_HEAD=8786d2c8c91f289abd3dc7290a4e0b869416b4f0
FINAL_STATUS_ENTRIES_EXCLUDING_REPORT=130
FINAL_STATUS_EXCLUDING_REPORT_SHA256=806e104e5081bde41622fd3809a6f402152164f3be95b328181502853d305466
FINAL_TRACKED_PATCH_EXCLUDING_REPORT_SHA256=ff609e0b846f9eb863178f86be98d47c4065fd339fdebe6ddcceb3cd997578ef
FINAL_UNTRACKED_PATHS_EXCLUDING_REPORT_SHA256=a3bd4ff5225c50d205e2dc773551f9237cbbbd092a95564dee03b834ca14cb46
FINAL_RELEVANT_FILE_MANIFEST_SHA256=fa91a6d2563d1bfcac11318537040243bc611bcf9a34b7b26a97acf6d53e12fb
```

Per-file manifest:

```text
b1ff721d561accdd9e5f8d517cc38698a24a83ff0f130d8c85b052a4ac3f5225  demo/chassis/code/Code.vue
13910e0927a6b7ec350928216f15fdfdd30551a477ab66792df36baccde7bc96  demo/demo.css
55db00b0fe5ef344e4bec20e1a67f999fa9b32f912026d63e5c5f9628eb74a3f  demo/shell/AppShell.vue
6cbaefc97b9dadacfa115dfc2388c858ddc0944b326f93d7a837891545df8eaf  demo/shell/BottomDock.vue
229225429fdbb9e6eda4e7a37405456abdf823264a45328928e18f395b5152af  demo/shell/configurator/PresetEditor.vue
3035cc859125056bce7968d05ef166911a9b3c8eb837e1b9672a2adf7cc2994c  demo/stories/compositions/auth-shell.vue
1cc4643ed2b3b1bbd8de2f13a95588075041d69d62bff700f6ffb4c7271f4060  demo/stories/compositions/form-validation.vue
1c6364fc3579366d40c8e9a8f7be45b4eec3e3d4979637f6cbb865c32036939d  demo/stories/compositions/gate-pattern.vue
f570f2bfc8ee8e1f87a3bc9a1732a87d993d04eb1b86b91b071deaae58a0be0e  demo/stories/containers/collapsible.vue
06351f3aa2e37a2e37471111c4d500f014adde3d28b7f049bfa0b7ebe345f3ca  demo/stories/containers/command.vue
44d820764446ac593e560e85d608307fbfafd64095fd43c503ebd1ef86928bcb  demo/stories/containers/context-menu.vue
41fafb6dff4d85d0a798018ac152d1c460eb948bf9a6fcfcafda82496b4010cd  demo/stories/containers/dialog.vue
3c4d625373819b04d6514345bc9901ca8124a3c1e0550039b34c68e48479515e  demo/stories/containers/drawer.vue
72ef8e9e54c9226251d7a69008f4622c48b1c1bdabb79fd8743fffb6d4b4e285  demo/stories/containers/dropdown-menu.vue
f13668ef531ddea6755febbccbfd9674b01c938cb4adbe2c6e4e364198caf56a  demo/stories/containers/expandable-container.vue
547b336f4351fc5c7d3c296a27780dd56debe60869127a0e69aaa7dc9964258c  demo/stories/containers/hover-card.vue
4b13ec2703a7d86fb4dee51c4f388d9ec87b2d57da4a484e7096cddadd93c7d4  demo/stories/containers/popover.vue
8c6c7f6ed198a2ab8bb154482fc7c1543b2a5c8bea0824824d4c30ba88aad1a5  demo/stories/containers/sheet.vue
28f241c1cb578997758449f04b88d13a09c8f75bbcd7902726d8f7608d156334  demo/stories/containers/tooltip.vue
44c46ac992ebac0fd4e092d4988013d6bb4d306ed3c1946e13b99460dad28459  demo/stories/data/infinite-scroll.vue
d5fbd5631d579bdf307fd3e743a87a96dae2f62c778f3e6a7ecab8e58c79ae2f  demo/stories/data/timeline.vue
d5b2f5f6ac54dbb5e28d1bb77b4568270e89c5dd3c3b2c396db31ca8d19bc62a  demo/stories/display/badge.vue
138de66a2241c044dc9ead828d8208c3c57aa43a43fa4e26ea39f1e18e3d0539  demo/stories/display/dark-mode-toggle.vue
b3ffd0b98d2cd330a7599b6a4abca920e72ac9d32fbdcaa217c05382affd7cfe  demo/stories/dock/cta-receive.vue
7051d51d9a296b7f2e440e9c657a6dd98f8d50e94f6463e4a4ec095145b2e52a  demo/stories/dock/dock-search.vue
cfec43c5584b4b94f8c85f4ce164482cf80347433eb105f757ae12ed3fb61aa1  demo/stories/dock/layers.vue
52c13785af6c55cd61251b27eab541619faaac2d83a2ef211a90013c4c397852  demo/stories/dock/overview.vue
877c5581e968006f0922cffa56f07bebc5f1da9bd8cc6d0652c7f5f9146532d2  demo/stories/dock/sections.vue
cccb3b49154774e912d2f0907db287e8a68f59199f4dfcf09b8c666adc9e1640  demo/stories/feedback/confirm-dialog.vue
cf56c6d416c93f6d9b8b6e0615f155aaa7b4f9150c8c431211f94e9dc546f028  demo/stories/feedback/progress.vue
922c8f373ed8c09080c78f81c53da884d5355e500d2c0f94b10f079198cf5427  demo/stories/feedback/toast.vue
66636225256c1f6e482b9a465dcba36d03499f6abfa854286628cd34ed250056  demo/stories/foundations/icons.vue
4d7c7a115c2bdcd831940ac2f24035604fa3a2c714932576495608ec3016be07  demo/stories/foundations/motion.vue
cb2a058694de477103b7c8258e86b73b08fa2f3c7693ceca895d9f8798264028  demo/stories/motion/scroll/ScrollNativeBody.vue
e4247b0db8f98783b17645641f2a8f2c792ad3804e296bce37ba3cd7709eb8c8  demo/stories/motion/springs.vue
9752782c485602b8a8788e8dac14da01f8375800029b4c937b88d2d701cafdd8  demo/stories/navigation/carousel.vue
c199ee7f6348239a1337c6dffcaf6df10ad259b03338e7048baac85d0fa00596  demo/stories/navigation/tabs.vue
df2c8ac6b15d398c4f310b8e2f7de8a4e31f56a1c4a1e6825ad123e14661ed84  demo/stories/navigation/toc-tracking.vue
1b361b5dd51b99c7dc807f4532197b669dff02ad3cde931560bfc54c54f6a99f  demo/stories/substrates/aurora/NucleiOverlay.vue
2ef1242d5a753d43c1cb114a5ff99bfa28a40de66ef4b9d81d1581be4b545568  demo/stories/substrates/aurora/sections/AuroraColorSection.vue
8a4e6fe75e5bcb8fffdd257d5b14443101c83db42e680f7a637d5327c09bb9f4  demo/stories/substrates/blob.vue
c64ca26ce6efeb02cd7ea735e38689944cba3da9975a0b22d567dc58c1a0c049  demo/stories/substrates/constellation.vue
0aca6709b6733c701c015b10636411bf9163208016737ee3e36914e35ea52567  demo/stories/substrates/glass-material.vue
91e4698979b4166165da49b22a4cdc744be1f5473850285c8d5d465b01e5428f  docs/tranches/BJ/EXECUTION-PROGRESS.md
5f2a308d6145c3a2219a47261c885f855a2e9abaf0800498229c325f241effd4  docs/tranches/BJ/PLAN.md
72cee2add212ac831f77f31a6fccf2ebddb2a003abc987b672234494a5b80a28  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/CLAUDE-WORKFLOW-RECONCILIATION-C2.md
27a472e07ecb606a559d9c6d0a951b812efd2aff6690f3fb26a0bc17d58e3555  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GOAL.md
c41d135e185340d2571bc1d646e8116c99f545b9a74a229e36f8327decca50c1  docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/REGISTRY.md
86a988072fda1bac6612e95b4da801ee5a1caa7c28ffdaa20068fc6e6f4de352  docs/tranches/BJ/coordination/CLAUDE-SOL-IMPL-RECEIPTS.md
02931a4879d4ee3269f1c3172312e30f2eb94deb2438602f155a352ae3b0c7ff  docs/tranches/BJ/evidence/W-TYPE-CODEMOD/card-after-typesmall-1440.png
9dcb8ba50b6b2e0f436dde39321b9342d2fea9f9651f329373c3d14b8d2f2093  docs/tranches/BJ/evidence/W-TYPE-CODEMOD/card-before-strandedtextsm-1440.png
a124d21c43c9722163193d86ffc0d105a0919bd2577a221f380b28737530f41e  docs/tranches/BJ/waves/BAND-GATES.md
0349add539d7ccfb430a5381a03efbbda4661eb825330f4868e2a1a6d24c8e84  docs/tranches/BJ/waves/BAND-MATERIAL.md
39a2b340277f7fe8829fa26eb72891c5d60d2eafa00550a2e85575e131f063fb  package.json
9eb4aa1a28c9ed7e7024e27201be15df7c6b8b3a5a9ecb3e6ae73ab699aef5e2  src/components/_shared/class-names.ts
8c3f6f99ed6c005dfd36047a1ea821bb1fcdbb552aba11d8091a4e8993df4c3c  src/components/_shared/control-size.ts
78f99ec8ef7a19e56df1db5f5d5d944bc61e2133d1d34b0e700edbb01e871bbc  src/components/alert/AlertDescription.vue
ed49842e2582a6599eb3b8d8c82c0d3cb9ca65df0eb3b663b9898a2194cd8765  src/components/badge/index.ts
ffd3280f901f39ad4487bbdfb6f8218aed204ca697229cd2d2e2ef638940e617  src/components/card/styles.css
816c5c8863dffa11d8218185eeaa4dcf3455c0da5a706242656b78b21f177445  src/components/command/styles.css
7d2450de5ef0f85cfe6fc8d43a4f42ff32ab9080721e8059c76d8d12162fc8ef  src/components/configurator/Configurator.vue
332da8a459f55492f25a08e31083886345cfb6b7d8331d88d3d15ed6b4b3389b  src/components/dialog/DialogDescription.vue
8df3fc179ef5f7f9f0375db30b3009d66ee60032f21e6dc2b5ecb91012bc0bf6  src/components/dock/styles/layer-group.css
1d324d95a824737423894f4aa7ed72409a82ced276c512fd036c2d0b1061205d  src/components/drawer/DrawerDescription.vue
b64974e0bcc854bb4623e06f70ccbcd8f7c7994626e529aad9510664f6a88fc7  src/components/dropdown-menu/styles.css
7a2a03ecf74cdcdf4300aa2bf26eb2a254cf05afcd6bf5dd065fe164241598a0  src/components/easing/EasingPicker.vue
0711b15a69f5754503580dba949aaf89fdd0c9006a49a7e33b158655cc969891  src/components/infinite-scroll/InfiniteScroll.vue
268c7f8075dd314b1cdcd1a43f23b214567e6d7f0aa01a447da866e0d9fcbcad  src/components/table/Table.vue
95b4b4e7963ea79bcced29d56066441063877f0a0c5417cce0a1feb1f0741051  src/components/table/TableCaption.vue
524e3f41a74820c326461d6e5c14f4d54e6a08882b9b5f5b979d5c4c832091f0  src/components/table/TableEmpty.vue
9c8894616884165605fd5aef3191fc603152e22e21b57f1d3ea0b8d164715559  src/components/tabs/styles/segmented.css
48e10a51babf83126edd9e47e0a667253975f3179af20719a4e4f4d0d107189c  src/components/toast/ToastAction.vue
e5e43f84a8b5d3e43bcab7ea633ca0712c40896cb4f003695a668bf8cd22898c  src/components/toast/ToastDescription.vue
745281f55bdb5684c14e4b43ba435366461c39d281eeb1125ece8fe7d78d8494  src/components/toast/ToastTitle.vue
03b1befc29f0454152315ad85f83d04e7d64e24f5f4baeffce418be4fd1fe3e1  src/styles/index.css
d07368f5f12ade1acde3dab3e15427e82ee0a88cc4b3411b3dcf9a15eb6b7c4f  src/styles/theme/bridges.css
e62d48ddc0a8b4a7714ba3d9bb1b806d552e1576a610536a7c0ee00b8641b6b4  src/styles/tokens/scheme-motion.css
3c2c1c7302d267eda21768f06405900188c9bcd8452f195c4bd57ed9b85a1910  src/styles/tokens/sizing.css
95818c638ed84cf6955345bec9e2d9c86a13b65836e2fdf3e34b6459647cd995  src/styles/typography/scale.css
f93a7c8a4f7f54ad52acd9c7199d23000c0920e7941a6d047096a3d92104b871  src/styles/typography/semantic.css
b2e6cf2444dd46cdb356ca089ab7d437be77e337b5be705e46b4f0358f0747bc  src/styles/typography/utilities.css
b83a430ad69e926005031deb2bbc12626da67192c0be3eaeed27aa8a14e9d5f2  tests/gates/type-hygiene.test.ts
```

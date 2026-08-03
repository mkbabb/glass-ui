# Dock Dual Browser Assay B — C32

**Date:** 2026-07-22  
**Phase:** formation / live Browser evidence only  
**Parents:** `DOCK-STRUCTURAL-SIMPLIFICATION-WORKFLOW-C30.md`,
`DOCK-STRUCTURAL-ANATOMY-C31.md`  
**Disposition:** detector GREEN / Dock visual, structural and story-contract RED

This packet is the independent B run for the Dock cohort. It used a fresh
in-app-Browser tab and a distinct evidence directory from Assay A. It did not
reuse Assay-A frames, route state, detector state, or interaction episodes.
Nothing here is product or tranche-execution acceptance.

## Candidate and Browser identity

- repository HEAD: `0371836dfeeb3b7982250d612f93b5347a1d29d4`
- repository tree: `97b386172a899ef43b686ffbe43263395b3a7744`
- the targeted `src/components/dock` source set was clean relative to HEAD during
  this assay; unrelated owner/agent work remained dirty and is not credited;
- desktop B: Chromium in-app Browser, 1280×720 CSS px, DPR 2, fine pointer,
  hover-capable;
- mobile B: the same fresh B tab in a separately established true 390×844 CSS
  px, DPR 3, `pointer: coarse`, no fine pointer, `hover: none`, five-touch posture;
- evidence root:
  `evidence/browser-assay-b`.

Exact targeted source identities:

- `GlassDock.vue` — `5c9be8abf9aaa06ddb70b3e564d6962416c56aa9af08f0ecedd7915a06121a5a`
- `DockCrossfade.vue` — `8492640cde5f970a974bdb6f8d3bd8625e1f06714827f46449791039cd56f2eb`
- `useDockState.ts` — `a1784c945279075f14a7eefc7b7b01f3262d720501a9517ecca1fd7d614d662e`
- `useDockMorph.ts` — `e50b67d42635778a179f4ffaa2f4506bb7b6a5a2730c2d0a4ba8deda118fe099`
- `useDockClickIntegrity.ts` — `a7254ec249d491746f22fb884eee03ea13fd2ebeedd9bc2a34753aae5a9f3edf`
- `useDockTouchGate.ts` — `ce44243fcb64dbd30ae1bd91b34a44daa172769ab434ad8e462f8ee803427323`
- `dockMorphMeasure.ts` — `cd729a8bb276749f5ecc707c60358f59aa6369f2200e6fc1856f68a071a5d3a7`
- `useDockOverflowFit.ts` — `ef65f2e2a272b52c44780354ba8ff884f4d5820e619ea84c7478788e4d2d79d2`
- `styles/dock.css` — `84f5d7bba9405da56262e90bcbce0c485e6c82a4fbe7088825b35761f7d996af`
- `styles/shell.css` — `6d62d2b2408548e54d562fb4a13663aea846e609adf317870ac4bb1688153280`
- `styles/layers.css` — `b38ad95acced92ffe614dd6c8eacbdaa9800f77a6ea28b5eb729d9379810de4d`
- `styles/morph.css` — `d6196bb4dd2c11408d30f22a094f901b68880dc1306168a2aefea8e282099b4c`

## Manually traversed Dock denominator

Both desktop B and mobile B visited the category screen and every visible Dock
story exposed by the live gallery:

1. Overview
2. Dock Layers
3. Vertical Dock
4. Dock Sections
5. Dock Controls
6. Dock Overflow
7. CTA → Dock Morph
8. Dock Search

This denominator came from the visible live gallery and story navigation. No
filesystem or generated script census is used as inventory authority.

## Frame ledger — desktop B

- category rest — `4500579d3745fc97101a23b7ebb401bb0b24b1ad854bead736f015c52112932b`
- Overview rest — `59762a7973808c1dae3e002fd26cbc53587b561efce373178f9aa43e88156ee6`
- Overview compact press: first observed / +40 / +100 / +220 ms —
  `1f308302dd813588276f3326216386feb07da6347f32577b96502f58dbe23006`,
  `07aa8042d07d8741a6f2b1e04a05c0e207152fca7a9a2e8c8c33e3a5cd598b52`,
  `b681b746d856708550c026ec91e93b879c66b33945b1c0989b9f79d5acfdc5c2`,
  `eec61a8a4ca839a5bf68c5d2989482123452a2129c6a51e552500d5e68506341`
- Dock Layers rest — `3a4b89a4925db2bb3eb3733c7e2dac6ae61a3abdd39318f93232d45dd066959b`
- first face switch first observed / +100 / +220 ms —
  `37f54014edaaf33d1282283fc6cf8f230637c663183c08d242d3ad02114ac6d6`,
  `1a13b7d5c020280500d076388d380089c1847910c88145942d42c52748055d25`,
  `16ffeb8981579670b2c5f36fc38ee5188da5779be6f288ad031e98262a0f2f31`
- Vertical — `6f6e1aa18f3cb49d6bc9b7225626599da72f6711059439af8c55280ffa5c0e86`
- Sections — `7143f5f5fa8c443c3f7a83d7115e71647600e0a8242e9f859ccac727e9a73d2e`
- Controls — `d59431151ace9b37221986a5233eec0290b0407754d12b6aefedf31ab56b7f30`
- Overflow — `9ada36d25c893a80d5f825dcac9b69b9758fb9de50c761ac66a2894ee898d9d6`
- CTA rest — `963a1e20bab624e32c8f38abae330f9e066a12b4bb19a25e8b8890923e776a5d`
- CTA +300 / +900 / +1800 / +2300 ms —
  `f2982574e7136ef64c8e89b402ef7c1f0eb775f3b83f05b0a4aa13a05daf5d2b`,
  `62cfcd3a8e5de6c7a7abb4cbd729b22de171f69d48180babebf582a9380a3cd3`,
  `c24733e33084dcdc91cb2c52fa507acccb3ac20e3e0712b2f7329233ef7a8f5d`,
  `129968743f8b4f813ea6705695e42c8abc437595ef8513948bb332f5eb02b637`
- Search — `1a8825544f0aa55ea03082fb1ad64c51d2c6f1d31dd785055d0662d86d9e44a9`

## Frame ledger — true-mobile B

- category — `93cbb00cb7739d93a2e1e19b3b06f4ef92773d9360e640297a615d630c7a3a63`
- Overview rest — `d552894f862a5ba708545a0fceec455ecaa22c5c3a6379facbc65aac7a2f28bc`
- Overview first trusted compact press first observed / +100 / +250 / +900 ms —
  `443cbe83d43fc8a8e6af0981c9d1eafc7cd262a8735b09f8d2b21d15f7f0828e`,
  `4209f22f30e31b5eb3e5a5d070aa80bef54a52886152cd2e23b24665f71cebc3`,
  `19b58b54d8e89f6947696ad056d47ec47d5dcb687e0083397deb08bee5a25d3c`,
  `6c73a18fab5508bcda11f02e02e674af2242897a468d6e87320741c23c088143`
- Layers — `fdc935049dd19a9b7f161bcdba7cd59dc6c6257bf3221d7f61043e34ea542cfb`
- Vertical — `f786261244021121ad4deb4a112fc153cbe6cf959b91ed655b88c2a603ba2244`
- Sections — `1eb3e51e673d13e75dcdb40511d41f8f620684c4956d36286e59ea9f6fa1c9b7`
- Controls — `e3b42745c7cd8a0dc83dc9fa3dc0a2b8c3c6e22d871ca40535ee9aa1bcc1ab3c`
- Overflow rest / End-key receiver —
  `de06d7619f8dff33b53199373b9a65274d893557c7d2a0a543ab7f4dc3c1c507`,
  `6db74323514e16a20834a28c807e741be1b8469796d88274c30397e109dc0a69`
- CTA rest — `ecb72423ccaa30df8a03e47517737b29ca56c8ad39dc2226c8471e0a8b214cb2`
- CTA +300 / +900 / +1500 / +2300 ms —
  `effe1459c3ba31d865f20509967777773ca4c967826e123ec72d2ebc6ba88e98`,
  `0a98cda00327d1484a6fbea5c510d2df310b464cdd8b8572c40f456fc1b4bbb6`,
  `eabf39a3bb04646a956e255a13f9f64f36cf1539cba6d81215c66641c91ed785`,
  `af05ea69517174ffbedde99c3e7230c377cb02cc21111ff18cfbccbb12d3da38`
- Search rest / reached field —
  `9830dc624e188083637089f8913dbc10f04b3eafd88da3e20fe758ba04fa41c8`,
  `779a1fcf2e4d58358faf5be54fec38efb9a82be154550eaae6e2c7a7b858fea5`

The offsets above begin after the trusted Browser action returned. They are not
claimed as pointerdown-relative timestamps. The state receipts remain useful
because geometry and attributes were read in the same observed frames.

## Binding findings

### B1 — the outer morph has a discrete settle rebase

On desktop, the first observed trusted compact press already carried
`data-morphing`, `--dock-morph-t≈1.0016`, and an 118×56 root. At +220 ms the
morph attribute cleared and the root snapped to 221×56. On true mobile, the
same sequence held 138×65.52 through +100 ms, then snapped to 252×65.52 at
+250 ms when the morph flag cleared.

The scalar can be analytically settled while the visible box still owns only a
fraction of the terminal extent. Removing the morph attribute transfers geometry
to another authority. This is a direct falsifier of one continuous spatial owner
and explains the visible end-jitter/teleport.

### B2 — the face-crossfade flag outlives any observable dissolve

On the first Dock Layers face switch, the entering face was already opacity 1
and the leaving face opacity 0 at the first observed frame, while
`data-crossfading` remained true through +100 ms and cleared around +220 ms.
The entering face host, not the activating control, held focus. The board must
decide whether the residual crossfade episode protects a real invariant or is
state machinery without an observable Breath-of-Life result.

### B3 — CTA handoff completes geometry, then waits in an ownership void

Desktop and mobile agree:

- the travelling CTA reaches 100% geometry almost immediately and becomes
  opacity 0;
- the target Favorites control remains opacity 0.35 throughout the long
  `receiving` state;
- completion reports roughly 1.95–1.96 seconds before the target becomes the
  fully owned action.

Thus most of the advertised animation is not movement. It is an extended
low-information ownership wait after motion has ended. The handoff must become
one continuous visible timeline or be shortened to an immediate transactional
transfer; a blank/ghost interval is RED.

### B4 — persistent global Dock occludes its own assay corpus

The story-navigation Dock is 951×56 at y=652 in a 1280×720 desktop viewport and
374×65.52 at y=766.48 in a 390×844 mobile viewport. It overlays live content in
both postures. On mobile it repeatedly covers the next story section and makes
the component under test compete with unrelated icon-only navigation.

This remains an existing GF-DOCK safe-frame/ownership problem. It does not imply
an owner choice of bottom versus side posture.

### B5 — mobile Dock pages clip internally without document overflow

Every mobile Dock story keeps document width at 390px, yet headings, prose,
cards, rails, or controls are visibly clipped within fixed/hidden descendants.
Zero document overflow is therefore non-probative. The Sections full pane, for
example, is a 224px client scrollport with 563px scroll width inside a 252px
root. The structure is reachable only through its nested native scroll owner;
the page shell still presents it as a partially visible strip.

### B6 — one useful overflow invariant is GREEN

In the true-mobile Overflow story, trusted focus on Home followed by End selected
and focused Settings, moved the native full-layer scrollport to `scrollLeft=321.5`
with `clientWidth=290` / `scrollWidth=612`, and placed Settings visibly at
x=287.30. Any simplification must preserve this keyboard/recenter behavior.

### B7 — Dock Search does not test the contract it describes

The live Dock Search story says a collapsed pill morphs continuously into a
field. Its only search Dock renders
`expanded pinned always-expanded`, both desktop and mobile. On mobile the Dock is
238px wide and the actual input only about 160px; its visible label is clipped.
There is no collapsed search invocation in this story, so the claimed morph,
first action, reversal and passive-scroll non-morph law receive zero browser
credit.

### B8 — the default coarse Home target passes here, but G-6 remains separate

The mobile Overview compact Home control paints 46.80×46.80, above the default
44px coarse floor. That does not close the separate compact `DockControl`
receiver case already proven at roughly 32px in Atlas. The simplification must
keep ordinary controls honest without pretending all compact receivers share
this default geometry.

## Dock simplification gates produced by Assay B

The prototypes and three critics must now bite at least these mutations:

1. restore the settle-time 118→221 / 138→252 geometry rebase;
2. keep `data-crossfading` after both faces have reached terminal opacity;
3. restore root-level own-pixel blur during morph;
4. restore the two-second CTA ownership void;
5. remove native nested scrolling or End-key recentering;
6. let the persistent navigation Dock overlap an active/focusable content region;
7. keep Search `always-expanded` while claiming collapsed-pill coverage;
8. make one fixed mobile strip or fine-pointer-only affordance impersonate the
   coarse and orientation-flexible product contract.

No new tranche row is created. These findings agglomerate into existing
GF-DOCK, motion, accessibility, story-reach, colocation and package/consumer
owners.


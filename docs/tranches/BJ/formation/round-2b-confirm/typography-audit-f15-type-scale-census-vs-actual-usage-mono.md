# Round 2B (confirmation pass) — Typography audit (F15): √φ type-scale census vs actual usage, mono ALL-CAPS caption idiom inventory, font-family role usage, story-page hierarchy, and scale enforceability/lintability

## Summary

The √φ ladder (src/styles/typography/scale.css: --type-admin-label 0.625rem → --type-display-audacious clamp) is well-formed but UNENFORCED and UNENFORCEABLE as-is. Primary hole: Tailwind's built-in fixed-size text-* utilities coexist with the semantic scale and are the DOMINANT demo vocabulary — 236 uses (demo text-sm×118, text-xs×100, +src 19) fully bypass the fluid clamp() body ladder, and nothing bans them (no stylelint/eslint config exists; the only typography test asserts one √φ constant). Raw font-size literals persist in component CSS including a genuinely off-ladder 13px rung (segmented.css:171 0.8125rem, no matching token). line-height/letter-spacing literals duplicate tokens (0.1em=tracking-caps ×2, 1.4=leading-small, 1.5=leading-body) — and critically the CANONICAL typography files themselves carry off-token literals (utilities.css line-height:1.25, letter-spacing:0.02em/0.025em), so a naive no-literal lint would false-positive on the source of truth: tokenizing those residuals is a prerequisite to any allowlist rule. The mono ALL-CAPS caption idiom the user ordered killed is NOT a single class — no 'meta-caption' class exists; it is three composed utilities (text-mono-caption 133 uses / section-label 34 direct + StorySection eyebrow funnel of 283 instances / text-admin-label 57) totaling ~224 direct refs across 74 files. Removing the utility defs silently strands those refs; a clean kill requires a full sweep plus reworking StorySection's label slot. F10 corroborated: StorySection hardcodes headings to the smallest rung (text-subheading), so 283 sections collapse to two levels — mono eyebrow then subheading (text-heading used only 8×, text-title 2×). font-family roles are clean by mechanism (all var(--font-*), zero raw literals) but display/body/serif/sans all alias Plus Jakarta — only Fira Code is distinct, and the mono-caps idiom is where nearly all its UI-chrome contrast lives. VERDICT: not lintable as-is; enforceable only after tokenizing residual canonical literals + adding a value-allowlist stylelint rule + a class-ban for Tailwind's default/arbitrary text-*/leading-*/tracking-* utilities.

## Findings (8)

### [major] default-scale-bypass

**Claim:** Tailwind's built-in fixed-size text-* utilities (text-xs/text-sm/text-base/text-lg/text-2xl/text-3xl/text-4xl) coexist with the √φ semantic scale and are the dominant sizing vocabulary in demo, fully bypassing the fluid clamp() body ladder — 236 uses, unbanned.

**Evidence:** grep counts: demo/ text-sm×118, text-xs×100, text-base×6, text-lg×2, text-4xl×2, text-2xl×2, text-xl×1, text-3xl×1 (=232); src/ text-sm×14, text-xs×2, text-lg×2, text-base×1 (=19). text-sm=0.875rem FIXED vs --type-small=clamp(0.875rem,0.8rem+0.25vw,1.25rem) fluid; text-xs=0.75rem FIXED vs --type-caption=clamp(0.75rem,…,1rem). @theme (src/styles/theme/bridges.css) never redefines --text-xs/-sm/etc, so these resolve to Tailwind defaults, not the scale. No lint bans them.

**Proposed:** The scale is NOT enforceable while these exist unbanned. Either (a) redefine Tailwind's --text-* @theme keys onto the --type-* clamps so text-sm inherits the ladder, or (b) add a stylelint/eslint class-ban rule for text-(xs|sm|base|lg|xl|2xl|…|9xl) + arbitrary text-[..], and migrate the 236 sites to text-small/text-caption/text-body.

### [major] mono-caps-caption-idiom

**Claim:** There is no class literally named 'meta-caption'; the mono ALL-CAPS caption idiom the user ordered killed is three composed utilities — text-mono-caption, section-label, text-admin-label — spanning ~224 direct class occurrences across 74 files plus the StorySection eyebrow funnel. Killing it is not a single edit.

**Evidence:** grep totals: text-mono-caption 133 uses (src: EasingPicker.vue:418/439/452/489/510, CarouselPager.vue:83, FuzzySearch.vue:223; def at typography/utilities.css:47), section-label 34 direct (src: configurator/ConfiguratorLayer.vue, ConfiguratorRow.vue; def+composition at utilities.css:150 `.section-label{@apply text-mono-caption}`), text-admin-label 57 (def semantic.css:238, mono+uppercase+tracking-caps). StorySection.vue:29 funnels `label` prop → `<p class="section-label">`; 283 <StorySection> instances (92 files). All three utilities are mono·caption·uppercase·tracking-caps = the same eyebrow register.

**Proposed:** Removing the 3 @utility/@layer defs silently strands 224 class refs (per the glass-ui stale-class no-op lesson — vue-tsc won't catch them). A clean kill requires: retire text-mono-caption/section-label/text-admin-label defs AND sweep all 224 direct refs AND rework StorySection's label slot to a non-mono register (e.g. text-small/weight). Fira Code then survives only in code blocks + metric__value/unit, which is intended.

### [major] story-hierarchy-flattening

**Claim:** Within a story page the type hierarchy collapses to two levels — mono eyebrow (.section-label) then .text-subheading — because StorySection hardcodes its heading to the SMALLEST heading rung; larger heading rungs are almost never used. This corroborates the F10 section-hierarchy complaint.

**Evidence:** StorySection.vue:32 renders `heading` as `<h2 class="text-subheading">` (=--type-subheading 1.272rem/√φ, weight 600 — the smallest heading rung) for all 283 instances. Rung usage across demo: text-subheading 23 explicit + 179 StorySection heading= props all land on subheading; text-heading only 8, text-title only 2, text-pane-title 0. No depth-aware heading scale exists in the story chassis.

**Proposed:** Give StorySection a level/size axis (page-title → section → subsection mapping to text-title/text-heading/text-subheading) so nested sections read as hierarchy, not 283 identical subheadings under mono eyebrows.

### [major] self-inconsistent-canonical-scale

**Claim:** The canonical typography source files themselves declare off-token line-height and letter-spacing literals, so a naive 'no literal' lint rule would false-positive on the source of truth — this is the structural blocker to lintability.

**Evidence:** typography/utilities.css:59 letter-spacing:0.02em (text-mono-prose — no tracking rung equals 0.02em), :66 letter-spacing:0.025em (text-mono-micro — DUPLICATES --type-tracking-wide 0.025em), :65/:93 line-height:1.25 & 1 (no --type-leading rung equals 1.25; leading rungs are 1.2/1.3). typography/semantic.css:235/241 line-height:1.25 & 1 (text-micro, text-admin-label). Leading tokens (scheme-motion.css:54-63) are micro1.2/caption1.3/small1.4/body1.5/prose1.618/heading1.2/display1.05 — 1.25 and 1 are unrung.

**Proposed:** Before any allowlist lint can pass, tokenize the residual leading (add a --type-leading-none:1 and --type-leading-tight:1.25 rung or explicitly exempt them) and route text-mono-prose/-micro tracking through --type-tracking-* (0.025em→--type-tracking-wide; drop the orphan 0.02em).

### [major] raw-font-size-literal

**Claim:** Component and demo CSS carry hardcoded font-size literals outside the scale, including a fully off-ladder 13px rung with no matching --type-* token.

**Evidence:** src: components/tabs/styles/segmented.css:171 font-size:0.8125rem (13px — NO rung between caption-floor 0.75rem/12px and small-floor 0.875rem/14px; confirmed absent from scale.css) and :184 0.875rem; components/dock/styles/layer-group.css:205 font-size:0.75rem; typography/utilities.css:92 fourier-f 1.35em (relative, ornamental). demo: chassis/code/Code.vue:71 0.92em; landing/SectionPreviewCard.vue:116 clamp(1rem,13cqmin,1.6rem); stories/dock/overview.tile.vue:31 clamp(0.7rem,7cqmin,1rem); arbitrary Tailwind text-[10px]×3 (carousel.vue:165, NucleiOverlay.vue:73, overview.vue:332/364), text-[0.7em]×4 (BottomDock.vue), text-[0.7rem] (springs.vue:444).

**Proposed:** segmented.css:171 0.8125rem is a genuine off-scale rung — either add a rung or snap to --type-caption/--type-small. Route the rest through var(--type-*); text-[10px] duplicates --type-admin-label (0.625rem=10px) and should use it.

### [minor] off-token-leading-tracking-literal

**Claim:** line-height and letter-spacing literals in components duplicate existing tokens or fall between rungs, none referencing the --type-leading-*/--type-tracking-* namespace.

**Evidence:** letter-spacing 0.1em DUPLICATES --type-tracking-caps at dropdown-menu/styles.css:94 and command/styles.css:123; timeline/ContinuousTimeline.vue:323 0.04em & :345 0.06em are off-scale (rungs are wide0.025/wider0.05/caps0.1). line-height literals: metric/styles.css:35 1.35 (off-token), button/styles.css:18 1.1 (off-token), ContinuousTimeline.vue:339 1.4 (=--type-leading-small), utilities/base.css:59 1.5 (=--type-leading-body), plus badge/index.ts:21-23 leading-[1.1] ×3 + demo badge.vue:173. Adjacent: 16 raw 3-digit font-weight literals in src/components (e.g. metric__value font-weight:650) bypass the --type-weight-* axis.

**Proposed:** Replace 0.1em→var(--type-tracking-caps), 1.4→var(--type-leading-small), 1.5→var(--type-leading-body); decide whether 1.1/1.35/0.04em/0.06em warrant new rungs or are exempted display cases.

### [note] font-family-role-collapse

**Claim:** font-family role usage is clean at the mechanism level (every family is a var(--font-*) token, zero raw family literals in components/demo) but the display/body/serif/sans roles are all aliases of one face, so only two real faces exist — Plus Jakarta and Fira Code.

**Evidence:** No raw font-family literals found in src/ or demo/ outside @font-face defs (grep clean). But bridges.css:69-73 maps --font-text/-display/-serif/-sans ALL to --font-stack-text (Plus Jakarta); scheme-motion.css:50-51 --font-stack-display/-sans:var(--font-stack-text). scale.css comment: 'There is no display-serif voice.' Only --font-mono (Fira Code) is distinct. Thus the ~40 text-display utilities render in the same face as body; the sole meaningful family contrast in the UI is the mono-caps caption idiom (Family 2) plus code/metric mono.

**Proposed:** Fine as an intentional one-register system, but note the corollary: killing the mono-caps idiom removes nearly all Fira Code contrast from the UI chrome, leaving only code blocks and metric readouts on the mono face.

### [major] no-enforcement-infrastructure

**Claim:** No lint infrastructure enforces the scale today, so every violation above is silent — the verdict is that the scale is NOT enforceable/lintable as-is.

**Evidence:** No .stylelintrc*/stylelint.config.*/eslint config for CSS present (ls found none); package.json has no lint/stylelint script. The only typography gate, tests/styles/typography.test.ts, asserts one constant (the 1/√φ proportional-ratio 0.7861513777574233) — it does not scan for literals or default text-* classes. Nothing prevents the 236 default-scale uses or the raw literals from shipping.

**Proposed:** Enforceable path (3 gates): (1) stylelint declaration-property-value-allowed-list restricting font-size/line-height/letter-spacing to var(--type-*)/relative-em-in-canon-only; (2) an eslint/regex gate banning Tailwind built-in text-(xs..9xl)/leading-[/tracking-[/text-[ in .vue; (3) tokenize the residual canonical literals (Family 4) FIRST or the allowlist rule fails on the source of truth. Until all three land, the √φ ladder is a convention, not an invariant.


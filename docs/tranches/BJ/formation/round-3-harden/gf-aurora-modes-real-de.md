# Greenfield pass 1 — AURORA MODES — real dedicated painterly modes across both backends (kill the WGSL 4-way Kuwahara collapse), a proper oil-pastel + crayon/hand-drawn body, and the 17→~10 preset reduction

Spec: /Users/mkbabb/Programming/glass-ui/docs/tranches/BJ/formation/greenfields/GF-AURORA-PASS1.md
Convergence: 48%

## Summary

PASS 1 census + portfolio + leading-spec for GREENFIELD: AURORA MODES. The problem is two fused defects plus one rider: (P1) 17 presets carry ~11 distinct configs — three clusters differ only by palette (oil-pastel trio, setting-sun A/B/C candidates, watercolor pair); (P2) the WGSL primary (WebGPU-preferred, useAurora.ts:25) collapses oil/vangogh/oil-pastel/kuwahara ALL to one mediumKuwahara body (aurora-mediums.wgsl.ts:399-400), so a "van-Gogh" config is a Kuwahara palette-skin on the backend most users run; oil-pastel is additionally a StrokeProfile constant-skin of oil even on WebGL2 (mediums.glsl.ts:493-496) — the user's "awful"; (V-A95) a reverse-drag black-slab whose isolation:isolate cure is self-described unconfirmed (Aurora.vue:283-294). The keystone census fact: the WGSL FOUNDATION is already ported (sampleBase/structureTensor/flowField/brokenColor/peer-mediums/Kuwahara/metal) — only the STROKE CASCADE is un-ported, and its cost is stratified: vangoghDab is derivative-free (cheap 1:1 WGSL port), a new cheap oil-pastel body ports cheap, crayon is already dual-ported, but oil's 4-layer best-of-9 bristle cascade (fwidth/dFdx, ~38KB) is the one expensive perf-gated arm. Three orthogonal routes minted (α port-what-exists / β author-dedicated-bodies / γ reduce-to-primary-truth). Leading route β: every claimed mode = a dual-ported dedicated body under a parity-ΔE contract; skins demoted to presets. 8 born-RED gates + 7 OWED π obligations across an 8-wave tranche. Convergence 48% — the two new bodies are spec-only and bound to a subjective "not-awful" aesthetic bar un-paintable this seat, and the oil-WGSL-perf branch is unmeasured.

## Portfolio

- α BACKEND-PARITY PORT (charter 'full WGSL stroke-body port') — center=mechanical 1:1 transliteration of the extant GLSL cascade to WGSL, killing the applyMedium:399-400 collapse. Satisfies P2a only; faithfully ports the 'awful' oil-pastel, adds no hand-drawn, inherits the oil-perf risk. Its port mechanism + parity-ΔE gate are consumed by β. — BANKED-ALIVE (the fallback if β's new-body authorship stalls)
- β DEDICATED-BODY-PER-MODE + parity (unifies charter 'new unified painterly pipeline' intent) — center=mode-authorship honesty: every claimed mode = a dual-ported dedicated body under a parity-ΔE contract, skins demoted; van-Gogh ports its derivative-free dab, oil-pastel gets a real burnish body, crayon reworked to drawn scribble, oil cost-stratified (port-if-perf-clears else honest-relabel). Subsumes α's parity + γ's cull but its center is authorship. — LEADING (full spec §4, 48%)
- γ HONEST-TO-PRIMARY REDUCTION (charter 'mode-count reduction') — center=subtractive taxonomy: accept the WGSL collapse as truth, ship only bodies that render distinctly on the primary (smooth/pastel/watercolor/crayon/kuwahara/metal + palettes), author no bodies, port nothing. Contradicts P2c (user wants MORE real modes) so cannot lead; but its 17→~10 preset cull is adopted by β unconditionally and its cost logic feeds β's oil arm. — BANKED-ALIVE (reopens as primary only if β's bodies prove unachievable/perf-blocked)

## Open gaps

- The oil-pastel burnish + crayon/hand-drawn bodies are SPEC-ONLY; the user's 'awful' verdict is aesthetic and cannot be proven not-awful without a paint (sharpest gap, un-closeable this seat)
- Zero paint verification — doc-only seat, every π obligation OWED, no RED baseline captured
- Oil bristle-cascade WGSL perf is the block risk: porting bestOil×4-layers×per-cell-tensor may hit the wall that motivated the collapse; W4's port-vs-relabel branch is UNMEASURED and decides whether oil stays a distinct primary mode or becomes a kuwahara preset
- 'Real van-Gogh' quality is assumed, not audited — vangoghDab is dedicated but heavily band-fought (vangogh:129-215); whether the WebGL2 result is 'proper' before porting is unverified
- crayon/hand-drawn scope ambiguity: one reworked crayon or crayon PLUS a new ink/graphite mode? one user clarification would pin W3
- The parity-ΔE ε threshold is unset — the two backends use different noise/hash (PCG2D vs WGSL fbm) so ε must be perceptual not byte; W0 must fix ε against a captured cross-backend baseline or G-PARITY-BODY is not a hard scalar
- V-A95 root cause is a hypothesis — the GPU-present-race + isolation:isolate cure are both unconfirmed (Aurora.vue:288-292); W6 may need a double-buffer/explicit-composite fix

# Pass-2 critique — /Users/mkbabb/Programming/glass-ui/docs/tranches/BJ/formation/greenfields/GF-AURORA-PASS1.md

Crit: /Users/mkbabb/Programming/glass-ui/docs/tranches/BJ/formation/greenfields/GF-AURORA-CRIT2.md
Convergence re-score: 40%

## Summary

Diagnosis (P1/P2a/P2b/P2c/V-A95) is correct on disk and the WGSL 3/5/6/7→Kuwahara collapse is verified at aurora-mediums.wgsl.ts:398-400. But the route fails the honest-costing test: it labels van-Gogh the "derivative-free cheap 1:1 pilot" (W1) when mediumVangogh calls relightImpasto (vangogh:226) which uses dFdx/dFdy (brush.glsl:273) — and neither paintOver nor relightImpasto is ported to WGSL (zero dpdx/dpdy in any wgsl file today). The cheap-pilot premise that the wave ordering rests on is falsified on disk. W4's relabel arm ("shrinks to {3,7}") is itself the masking fallback it claims to kill, and β recruits round-2b against round-2b's own merge remedy. β stays the correct leader; the cost model and two wave specs need surgery.

## Verdicts

### [AMEND] β DEDICATED-BODY-PER-MODE (leading route)

Right destination, wrong map scale. The mode⊥palette⊥backend decomposition, the skins-vs-modes invariant, and the born-RED gate suite are sound and repo-grounded — β stays leader (γ contradicts P2c, α under-serves 'proper'). But the cost-stratification that makes β look tractable rests on a mis-attributed dependency graph (F1), its W4 escape arm violates its own cardinal no-masking law as worded (F2), and it cites round-2b against round-2b's own remedy (F3). Repairable in pass 3 without touching the thesis.

### [AMEND] W1 VAN-GOGH-ON-PRIMARY / the 'cheap derivative-free pilot' cost claim

FALSE for the port target. §2:99 and W1:221 call van-Gogh 'derivative-free → 1:1, no fwidth/dFdx, CHEAP', but W1 ports mediumVangogh, which composes paintOver x3 (vangogh:165,174,189) and relightImpasto (vangogh:226); relightImpasto uses dFdx/dFdy (brush.glsl:273). paintOver+relightImpasto are absent from every .wgsl.ts and the WGSL pipeline uses zero dpdx/dpdy today — so W1 introduces the FIRST WGSL derivative use, the exact unknown a cheap pilot must not have. The doc even lists relightImpasto's derivatives as an oil-only cost (§2:104), blind to van-Gogh's call of it. Re-cost as 'port the shared paint substrate first, then the dab.'

### [AMEND] W4 OIL COST-STRATIFICATION — the relabel arm

As worded ('collapse SHRINKS to at most {3,7}', §3:158) the relabel arm leaves medium==3 routing to mediumKuwahara in applyMedium while 'oil' stays selectable — a mode silently becoming a different operator, which is precisely the masking fallback β's cardinal law forbids and §6:317-320 claims to kill. A code-comment relabel does not cure a user-facing lie. The law admits only {7}: DELETE enum 3 and re-express oil presets as kuwahara+palette, OR commit to the port arm. Remove the {3,7} wording.

### [AMEND] oil-pastel disposition vs round-2b

β authors a NEW oil-pastel burnish body (W2) but cites round-2b as 'names the exact skin to replace' (§3:160). round-2b finding 3's actual proposed remedy is MERGE into oil-as-a-strokeMode (a γ-flavored demote); round-2 finding 4 concurs. The new-body path is defensible on A13/P2c grounds (which outrank a preset audit) but the doc must OWN the override, not launder round-2b's γ recommendation into β endorsement.

### [ADVANCE] α BACKEND-PARITY PORT (banked)

Correct disposition — banked-alive as the honest floor and source of the parity-ΔE gate; any port strictly beats the collapse. Caveat only: its '1:1 fwidth→fwidth' mechanism (§3:128-131) is naive about WGSL's uniform-control-flow constraint on derivative builtins (curvedStroke fwidth at brush.glsl:122,139-140 inside data-dependent branches may not compile verbatim). Note it in the mechanism; disposition holds.

### [ADVANCE] γ HONEST-TO-PRIMARY REDUCTION (banked)

Correct — cull adopted unconditionally, cost logic feeds W4, cannot lead (P2c). One amendment to β's framing: on oil-pastel specifically, round-2b's own remedy IS γ (merge/demote), so γ is the incumbent recommendation β must argue past, not merely a banked cull.

### [ADVANCE] V-A95 reverse-drag / W6 (rider)

Correctly parked as W6 confirm-or-replace with no premature position; consistent with REGISTRY:146 and CHRONIC-ADJUDICATION:55-56 ('GF-AURORA carries it; reported plainly as a shipping defect'). Orthogonal compositing race, bounded, no over-reach. The isolation:isolate cure being self-described unconfirmed (Aurora.vue:283-294) is verified.


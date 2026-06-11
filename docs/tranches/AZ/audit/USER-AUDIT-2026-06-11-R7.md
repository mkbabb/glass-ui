# USER-AUDIT 2026-06-11 — ROUND 7 (the curve gallery, BINDING)

The user, live on :5199/motion/curve-gallery: "this page sucks, the curves and pane is too dark and
muted? the curves are not thick enough, the curve picker UI is awful. And it's not at all
comprehensive and isomorphic to keyframes.js's easing items."

The orchestrator capture (`ground/R7-curve-gallery-before.png`) confirms every read:

| id | defect |
|---|---|
| R7-1 | THE REGISTER: grey muted cards on a grey page — the whole pane reads dark/washed; the plots have no presence (the motion-purple accent barely registers at the thin stroke). |
| R7-2 | THE STROKE: the curve plots are ~1.5px hairlines — the curves ARE the content and must read THICK (the keyframes demo's plots are bold strokes with presence). |
| R7-3 | THE PICKER: the 10-family selector is a cramped row of tiny chips — "awful." It needs the house register at a proper scale (and the families are the IA, not an afterthought). |
| R7-4 | THE ISOMORPHISM: the canon is NOT comprehensive/isomorphic to keyframes.js's easing items — the binding source is ~/Programming/keyframes.js/src/animation/easing.ts + springTimingFunction.ts (+ its demo's presentation idiom). Enumerate THAT inventory; the gallery carries it 1:1 (named, grouped, plotted as keyframes presents them), re-expressed in the glass idiom (tailwind-first). |

Routing: the TRIUMVIRATE (the motion surface FAILs reflection by construction): RESEARCH (the full
keyframes.js easing inventory + its demo presentation idiom + the W-MOTION-SUITE gap census) →
PLAN (the ad-hoc AZ.W-MOTION2 spec) → REDRESS.

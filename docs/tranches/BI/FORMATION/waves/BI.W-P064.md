# BI.W-P064 — Section privatization

Status: **done**.

The public `Section` component and standalone story identity are absent from source,
entry policy, package exports, and root barrels. The demo-private `StorySection` owns only
semantic `<section>` structure, optional heading/label copy, and spacing. Material remains
with the content composition (`Surface`, `Card`, or ordinary DOM), never this helper.

Owner coverage: `tests/components/custom/section/section-privatization.test.ts`.

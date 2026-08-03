# Breadth cohort: Tabs, Slider, Alert, and Card — C35

Date: 2026-07-22  
Phase: formation/browser assay only  
Authority: the 12-hour convergence burn-down in `TWELVE-HOUR-CONVERGENCE-BURNDOWN-C34.md`  
Product, test, package, lock, repin, and acceptance credit: none

## Candidate and independence

This packet records Browser Assay B. It is independent of the already-retained
Assay A traversal: it uses a separate in-app Browser tab and a new natural
interaction sequence. The live demo is `http://localhost:5200`; viewport truth
was queried from the page after emulation rather than inferred from screenshot
dimensions.

True-mobile state was:

- CSS viewport `390×844`;
- DPR `3`;
- `visualViewport` `390×844`, scale `1`;
- touch enabled with five points;
- viewport meta `width=device-width, initial-scale=1.0`.

This is evidence input, not immutable-package acceptance. The served/source
identity and dirty envelope still owe cohort closure.

## Tabs

Retained Browser Assay B frames:

- mobile rest: `evidence/browser-assay-b/navigation-tabs-mobile-rest-b.png`,
  SHA-256 `98aaebf9c360ac79e3146d55030eb5704e026e608274d3eb1b6541736222d3ce`;
- mobile selection onset / 80 ms / 400 ms:
  `bbf05ff5d09e095d4f3474b8fbe8a06ed9a906e356bc9b54ab0a013338e9edd2`,
  `d7630ba6d16ba03d815120195c5626953f66e76d022bc6f95a21ce95906e3faf`,
  `c2f7cf49979e620f5128be6c835704c48c3646b2b89ce1ea63a34f102b8a15fa`;
- desktop rest: `evidence/browser-assay-b/navigation-tabs-desktop-rest-b.png`,
  SHA-256 `b81c51c8f0e6ef60488ddf45ab38c72e31e43325027d83c86598b54ab9202a61`;
- desktop selection onset / 80 ms / 400 ms:
  `50bb7b3c555ea0732fda0c9d7b37ced2a304cf36d1cc653d85b8f99472306c39`,
  `1afc7b15738fca5ed722c8fff23a86c893034c7c8cc6b631c661c95074e5671b`,
  `0a4716a680bc28dca038f9894d77ccbc7d0f7bb20105ed3ead1c71b63888a054`.

Desktop is visually coherent at rest. On true mobile the specimen is materially
compressed and the control labels and targets become too small; a lack of
document overflow would not prove usable responsive behavior. The existing
one-engine, constrained-width, drag, underline, interruption, RTL, DPR, focus,
and responsive-Select contracts remain RED pending the independent cohort
critics and adjudication.

## Slider

Retained Browser Assay B frames:

- desktop rest: `evidence/browser-assay-b/forms-slider-desktop-rest-b.png`,
  SHA-256 `28b391751ad59fbb834e884b3c0f8189397a552bec5e473eda60ff4f797ecc42`;
- mobile rest: `evidence/browser-assay-b/forms-slider-mobile-rest-b.png`,
  SHA-256 `9cbda075d1bfa836a3f4480903c9c026500d1853df8bb7d5c22d77ef77943c7b`;
- mobile keyboard focus/action:
  `evidence/browser-assay-b/forms-slider-mobile-keyboard-focus-b.png`,
  SHA-256 `3f7a83541e543fe306148b80e859535e1576344137d19849a1402e0e8d93e8cd`.

At 390×844 the first visible Slider track is `358×20px`, but its named
`span[role=slider][aria-label=Volume]` is `0×20px`. Programmatic focus followed
by a real Browser ArrowRight action is functionally GREEN (`aria-valuenow`
`42→43`), proving that this is not an inert-handler defect. It is a geometry,
focus-paint, and coarse ownership defect.

A centered proposed `44×44px` floor was probed at its center, four corners, and
four edge midpoints. None resolved to the `role=slider` lineage. The center and
horizontal midpoints resolve to the visual range/track; the top resolves to the
non-interactive `.glass-slider` wrapper; the bottom resolves to the surrounding
story section. Therefore the current receiver cannot claim a producer-backed
44px interactive floor from its semantic owner. A full event-path mutation is
still owed; this packet does not prescribe whether the public repair is a
painted thumb, an explicit hit owner, or another idiomatic composition.

## Alert compared with Card

Retained mobile frames:

- Alert: `evidence/browser-assay-b/feedback-alert-mobile-rest-b.png`, SHA-256
  `68d0a329e6218e1f31c483136ffcc06398216dd18a43f93683831a05ab9b37ae`;
- Card: `evidence/browser-assay-b/display-card-mobile-rest-b.png`, SHA-256
  `1e87a79944230246ab0f42e63e613bd2b9d88172d6a6ae9071e6d8b593e28e1e`.

Retained desktop cross-checks:

- Alert: `evidence/browser-assay-b/feedback-alert-desktop-rest-b.png`, SHA-256
  `66e15729fb50b451152d42eb1ae9a9de85622a8f638a6434333114bcb300a869`;
- Card: `evidence/browser-assay-b/display-card-desktop-rest-b.png`, SHA-256
  `d811e08a579611731c87b86e2ed8e302c4495cfff9aa226308b76dba810b17fd`.

Every inspected Alert specimen computes `border-radius: 10px`. The actual
`[data-slot=card]` specimens compute `16px`. This is a direct live witness for
the owner's correction: Alert is visibly sharper than the Card family and must
be at least card-equivalent, or slightly more rounded if the later proportional
adjudication proves that exception. The implementation spelling is deliberately
not selected here; the cohort critics must reconcile semantic radius roles,
existing W1 authority, theme tokens, and package output before adjudication.

## Disposition and remaining proof

The detector is GREEN and the component contracts are RED. No source edit is
authorized. This cohort still requires:

1. completion of the remaining independent desktop/mobile screen cells;
2. exact source, colocated composable/style/test/export/story/consumer
   reconciliation;
3. three failure-assuming Sol x-high challenges over unchanged packet bytes;
4. separate adjudication into existing owner rows;
5. immutable source→pack→install→serve and actual browser/AT evidence only in a
   later execution phase authorized by the owner.

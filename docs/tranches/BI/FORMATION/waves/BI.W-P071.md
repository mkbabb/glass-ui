# BI.W-P071 — Avatar apotheosis

Status: **done**.

`Avatar` owns one identity through `label`, `labelledBy`, or `decorative`; competing outer
role/ARIA attrs are ignored. The Reka image is decorative and reports load state while the
fallback stays hidden from AT, preventing duplicate names. Typed size/shape attributes and
colocated CSS replace the CVA. The status slot positions the existing semantic status
owner without duplicating its vocabulary.

Owner coverage: `tests/components/avatar.contract.test.ts`.

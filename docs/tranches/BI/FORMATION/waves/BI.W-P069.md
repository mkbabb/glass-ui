# BI.W-P069 — Separator apotheosis

Status: **done**.

`Separator` retains one owned hairline grammar for horizontal, vertical, labelled, and
decorative states. Semantic rules delegate to Reka or publish an explicitly named
separator; decorative rules remove role and ARIA orientation. Colocated CSS owns the
split-rule label without making Separator a container.

Owner coverage: `tests/components/separator.contract.test.ts`.

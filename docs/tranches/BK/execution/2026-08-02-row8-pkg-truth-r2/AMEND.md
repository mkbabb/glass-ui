# Row #8 W-PKG-TRUTH — AMEND chronology

2026-08-03: this dir (R2) is the one row-8 evidence dir. Two predecessors were deleted
as one-source-of-record duplicates — `2026-08-01-row8-pkg-truth/CONTRACT.md` (SHA256
`f2c67d14a41615faaaff512a375672dec7095fc441d6cead52d7e41a31fba5bd`, untracked, the
pre-execution contract superseded by TR#8 and by this receipt) and
`2026-08-02-row8-pkg-truth/PACKAGE-RECEIPT.json` (SHA256
`7132892634e40b07e594c7f0978be2b14388d18d788db97845246352f39ed468`, the R1 receipt
adjudicated `AMEND_RECEIPT_IDENTITY_FALSE`, which also carried a malformed 65-character
string at `/frozenPreservation/componentStyles/sha256` where a SHA-256 belongs — struck
with its file, not recomputed). This receipt's own SHA256 is
`16dea3da732f0a5b988573ff7ffcb152a1e2a811efba2f7e915f9d41b56b9148`; its `predecessor`
block preserves the R1 identity. The row's seal is VOID (pass-1 cure, APOTHEOSIS §8);
the code holds as landed-candidate pending pass-2 re-adjudication.

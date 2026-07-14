# FINAL and release preconditions

FINAL and RELEASE-ATTESTATION are continuously generated projections installed by BI.W-P002 and refreshed by the orchestrator inside every later wave's serialized integration envelope; they are not tail-wave documents or builder leases. Intermediate commits intentionally carry `NONTERMINAL_PROJECTION` and `releaseEligible: false` with exact blockers. `--write` may emit that honest state, `--check` requires byte parity, and only `--require-terminal` authorizes tag/publish. The acyclic order is payload → receipt → attestation → FINAL → commit: attestation's stage-0 index digest excludes exactly attestation and FINAL while naming the receipt digest, FINAL names the attestation digest, and Git plus the artifact-digest trailers resolves the containing commit/tree externally. No tracked artifact embeds its own literal commit or tree hash. A release tag is forbidden until all of the following are true at the exact candidate tree:

- All 134 cursor rows are terminal DONE or evidence-backed DEAD; no other status exists.
- Each DONE or evidence-backed DEAD row resolves exactly one orchestrator-owned first-parent commit from its unique receipt and four required core trailers; every subject, repair, receipt, and applicable projection is in that commit or an explicitly read-only check. DEAD never unlocks a dependent, and a successful release lineage contains no DEAD row.
- Every applicable semantic property passes on current bytes through the single verifier, and each retained realistic mutation has a fresh nonzero RED receipt followed by restored PASS.
- Every browser wave has source-bound Safari-current and Chrome-current receipts for wide/fine, narrow/coarse, and PRM modes; required native Safari/Metal rows cannot use Playwright WebKit.
- All constellation packets bind the exact tarball and owner commit; foreign dirty state is unchanged and never counted as adoption.
- The package, declarations, CSS/assets, version, changelog, migration facts, tarball, SBOM/provenance, tag target, and registry bytes agree.
- An independent non-author audit is clean, followed by two consecutive clean full passes over frozen content.
- release.sh is the only tag/publish path and performs no source repair.

Any post-evidence source mutation invalidates FINAL and every downstream receipt.

// @glass-invariant integrity.dag integrity.lineage

import { describe, expect, it } from "vitest";

import {
    INTEGRATION_ADJUNCTS,
    SubjectDispositionError,
    canonicalStage0Payload,
    deriveSubjectOutcomes,
    validateBootstrapReceipt,
    validateFormationTreeClosure,
    validateSubjectDeltaClosure,
} from "../../scripts/tranche/bootstrap-receipt.mjs";
import { validateRecoveryTuple } from "../../scripts/verify.mjs";

const OID = {
    before: "1".repeat(40),
    after: "2".repeat(40),
    verify: "3".repeat(40),
    parent: "4".repeat(40),
    containing: "5".repeat(40),
};

function receiptFixture() {
    const formationDigest = "a".repeat(64);
    const subjectOutcomes = [{
        path: "package.json",
        plannedAction: "modify",
        disposition: "MODIFIED",
        preimage: OID.before,
        postimage: OID.after,
    }];
    const payloadDigest = {
        algorithm: "sha256(canonical-git-stage0-index-v1)",
        sha256: "b".repeat(64),
        entryCount: 1,
        excludes: [...INTEGRATION_ADJUNCTS],
    };
    const receipt = {
        schemaVersion: "1.0.0",
        authority: "GIT_FIRST_PARENT_PLUS_COMMITTED_RECEIPTS",
        formationDigest,
        formationAnchorParent: OID.before,
        sourceBase: OID.before,
        waveId: "BI.W-P000",
        status: "DONE",
        integrationParent: OID.parent,
        preCommandSet: [{ surface: "package.json", key: "test", argv: "vitest run" }],
        postCommandSet: [{ surface: "package.json", key: "test", argv: "vitest run" }],
        subjectOutcomes: structuredClone(subjectOutcomes),
        evidenceDigest: "c".repeat(64),
        routedCurrentReds: [],
        intendedTrailers: {
            names: ["BI-Wave", "BI-Status", "BI-Receipt-SHA256", "BI-Formation-SHA256"],
            values: {
                "BI-Wave": "BI.W-P000",
                "BI-Status": "DONE",
                "BI-Formation-SHA256": formationDigest,
            },
            externallyDerived: ["BI-Receipt-SHA256"],
        },
        payloadDigestExcludingIntegrationAdjuncts: payloadDigest,
    };
    const expected = {
        formationDigest,
        formationAnchorParent: OID.before,
        sourceBase: OID.before,
        integrationParent: OID.parent,
        evidenceDigest: receipt.evidenceDigest,
        preCommandSet: receipt.preCommandSet,
        postCommandSet: receipt.postCommandSet,
        subjectOutcomes,
        payloadDigest: structuredClone(payloadDigest),
        routedCurrentReds: [],
    };
    return { receipt, expected };
}

describe("bootstrap receipt schema and exact authority bindings", () => {
    it("accepts the canonical acyclic receipt", () => {
        const { receipt, expected } = receiptFixture();
        expect(validateBootstrapReceipt(receipt, expected)).toMatchObject({ ok: true, errors: [] });
    });

    it("rejects nested additional properties and passes after exact restoration", () => {
        const mutations: Array<(receipt: any) => void> = [
            (receipt) => { receipt.preCommandSet[0].extra = true; },
            (receipt) => { receipt.subjectOutcomes[0].extra = true; },
            (receipt) => { receipt.intendedTrailers.extra = true; },
            (receipt) => { receipt.intendedTrailers.values.extra = true; },
            (receipt) => { receipt.payloadDigestExcludingIntegrationAdjuncts.extra = true; },
        ];
        for (const mutate of mutations) {
            const { receipt, expected } = receiptFixture();
            mutate(receipt as any);
            const result = validateBootstrapReceipt(receipt, expected);
            expect(result.ok).toBe(false);
            expect(result.errors).toEqual(expect.arrayContaining([expect.stringMatching(/unexpected property|only acyclic embedded values/)]));
            const restored = receiptFixture();
            expect(validateBootstrapReceipt(restored.receipt, restored.expected).ok).toBe(true);
        }
    });

    it.each(["commitSha", "treeSha", "containingCommit", "containingTree", "receiptSha256"])(
        "rejects recursively nested forbidden self-reference field %s",
        (field) => {
            const { receipt, expected } = receiptFixture();
            (receipt.subjectOutcomes[0] as any).metadata = { [field]: "d".repeat(64) };
            const result = validateBootstrapReceipt(receipt, expected);
            expect(result.ok).toBe(false);
            expect(result.errors.join("\n")).toContain("forbidden self-reference field");
        },
    );

    it("forbids derived receipt/attestation/final digest values inside the receipt", () => {
        for (const field of ["BI-Receipt-SHA256", "BI-Attestation-SHA256", "BI-FINAL-SHA256"]) {
            const { receipt, expected } = receiptFixture();
            (receipt.payloadDigestExcludingIntegrationAdjuncts as any).derived = { [field]: "e".repeat(64) };
            expect(validateBootstrapReceipt(receipt, expected).errors.join("\n")).toContain("derived R/A/F digest values are forbidden");
        }
    });

    it("requires subject outcomes to equal the Git-derived dispositions", () => {
        const { receipt, expected } = receiptFixture();
        receipt.subjectOutcomes[0].disposition = "VERIFIED_UNCHANGED";
        const result = validateBootstrapReceipt(receipt, expected);
        expect(result.ok).toBe(false);
        expect(result.errors.join("\n")).toContain("do not match the terminal Git view");
        const restored = receiptFixture();
        expect(validateBootstrapReceipt(restored.receipt, restored.expected).ok).toBe(true);
    });
});

describe("Git-derived subject dispositions", () => {
    const subjects = [
        { path: "create.ts", action: "create", before: null },
        { path: "delete.ts", action: "delete", before: OID.before },
        { path: "modify.ts", action: "modify", before: OID.before },
        { path: "repair-same.ts", action: "repair", before: OID.before },
        { path: "repair-changed.ts", action: "repair", before: OID.before },
        { path: "verify.ts", action: "verify", before: null },
        { path: "rename.ts", action: "rename", before: OID.before },
    ];
    const entries = [
        { path: "create.ts", oid: OID.after, mode: "100644" },
        { path: "modify.ts", oid: OID.after, mode: "100644" },
        { path: "repair-same.ts", oid: OID.before, mode: "100644" },
        { path: "repair-changed.ts", oid: OID.after, mode: "100644" },
        { path: "verify.ts", oid: OID.verify, mode: "100644" },
        { path: "rename.ts", oid: OID.after, mode: "100644" },
    ];
    const anchorEntries = [{ path: "verify.ts", oid: OID.verify, mode: "100644" }];

    it("derives every planned action's exact terminal disposition", () => {
        expect(deriveSubjectOutcomes(subjects, entries, anchorEntries).map((row: any) => [row.path, row.disposition])).toEqual([
            ["create.ts", "CREATED"],
            ["delete.ts", "DELETED"],
            ["modify.ts", "MODIFIED"],
            ["repair-same.ts", "VERIFIED_UNCHANGED"],
            ["repair-changed.ts", "MODIFIED"],
            ["verify.ts", "VERIFIED_UNCHANGED"],
            ["rename.ts", "RENAMED"],
        ]);
    });

    it("rejects VERIFY content or Git-mode changes", () => {
        expect(() => deriveSubjectOutcomes(
            [{ path: "verify.ts", action: "verify", before: null }],
            [{ path: "verify.ts", oid: OID.after, mode: "100644" }],
            anchorEntries,
        )).toThrow(SubjectDispositionError);
        expect(() => deriveSubjectOutcomes(
            [{ path: "verify.ts", action: "verify", before: null }],
            [{ path: "verify.ts", oid: OID.verify, mode: "100755" }],
            anchorEntries,
        )).toThrow(/Git mode changed/);
        expect(deriveSubjectOutcomes(subjects, entries, anchorEntries).find((row: any) => row.path === "verify.ts")?.disposition).toBe("VERIFIED_UNCHANGED");
    });
});

describe("payload, formation, and delta closure", () => {
    it("excludes only integration adjuncts from the canonical stage-0 payload", () => {
        const base = [{ path: "package.json", mode: "100644", oid: OID.after }];
        const adjuncts = INTEGRATION_ADJUNCTS.map((path, index) => ({
            path,
            mode: "100644",
            oid: String(index + 6).repeat(40),
        }));
        const withoutAdjuncts = canonicalStage0Payload(base);
        const withAdjuncts = canonicalStage0Payload([...base, ...adjuncts]);
        expect(withAdjuncts).toEqual(withoutAdjuncts);
        expect(withAdjuncts).toMatchObject({ entryCount: 1, excludes: INTEGRATION_ADJUNCTS });
    });

    it("rejects foreign terminal deltas, VERIFY changes, and inactive projection paths", () => {
        const wave = { subjects: [
            { path: "owned.ts", action: "modify" },
            { path: "formation-authority.json", action: "verify" },
        ] };
        const receiptPath = "docs/tranches/BI/BOOTSTRAP.json";
        expect(validateSubjectDeltaClosure(wave, ["owned.ts", receiptPath])).toMatchObject({ ok: true, errors: [] });
        for (const path of [
            "foreign.ts",
            "formation-authority.json",
            "docs/tranches/BI/RELEASE-ATTESTATION.json",
            "docs/tranches/BI/FINAL.md",
        ]) {
            const result = validateSubjectDeltaClosure(wave, ["owned.ts", receiptPath, path]);
            expect(result.ok).toBe(false);
            expect(validateSubjectDeltaClosure(wave, ["owned.ts", receiptPath]).ok).toBe(true);
        }
    });

    it("requires the formation manifest to equal the anchored formation tree", () => {
        expect(validateFormationTreeClosure(["a.json", "b.json"], ["b.json", "a.json"])).toMatchObject({ ok: true });
        expect(validateFormationTreeClosure(["a.json"], ["a.json", "foreign.json"]).ok).toBe(false);
        expect(validateFormationTreeClosure(["a.json", "a.json"], ["a.json"]).errors.join("\n")).toContain("duplicate authority paths");
    });
});

describe("first-parent recovery tuple", () => {
    function recoveryFixture() {
        return {
            expectedIntegrationParent: OID.parent,
            actualIntegrationParent: OID.parent,
            expectedPayloadDigest: { algorithm: "fixture", sha256: "f".repeat(64), entryCount: 7 },
            actualPayloadDigest: { algorithm: "fixture", sha256: "f".repeat(64), entryCount: 7 },
            expectedTrailers: { "BI-Wave": "BI.W-P000", "BI-Receipt-SHA256": "9".repeat(64) },
            actualTrailers: { "BI-Wave": "BI.W-P000", "BI-Receipt-SHA256": "9".repeat(64) },
            candidateCommits: [OID.containing],
            containingCommit: OID.containing,
            requireUniqueCommit: true,
        };
    }

    it("binds parent, payload, trailers, and exactly one containing child", () => {
        expect(validateRecoveryTuple(recoveryFixture())).toMatchObject({ ok: true, errors: [] });
        const mutations: Array<(tuple: any) => void> = [
            (tuple) => { tuple.actualIntegrationParent = OID.before; },
            (tuple) => { tuple.actualPayloadDigest.sha256 = "0".repeat(64); },
            (tuple) => { tuple.actualTrailers["BI-Wave"] = "BI.W-P001"; },
            (tuple) => { tuple.candidateCommits = []; },
            (tuple) => { tuple.candidateCommits = [OID.containing, OID.after]; },
            (tuple) => { tuple.candidateCommits = [OID.after]; },
        ];
        for (const mutate of mutations) {
            const changed = recoveryFixture();
            mutate(changed);
            expect(validateRecoveryTuple(changed).ok).toBe(false);
            expect(validateRecoveryTuple(recoveryFixture()).ok).toBe(true);
        }
    });
});

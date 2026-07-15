// @glass-invariant integrity.cursor integrity.lineage

import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import {
    mkdirSync,
    mkdtempSync,
    readFileSync,
    rmSync,
    unlinkSync,
    writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { readRepositoryEntries } from "../../scripts/tranche/bootstrap-receipt.mjs";
import {
    CONTINUOUS_PROJECTION_PATHS,
    buildWaveReceipt,
    canonicalWaveEvidence,
    canonicalWavePayload,
    deriveWaveSubjectOutcomes,
    intendedTrailersForWave,
    renderWaveReceipt,
    serializeWaveReceipt,
    validateWaveReceipt,
    validateWaveEvidenceBindings,
    validateWaveSubjectDelta,
    verifyWaveReceipt,
    waveReceiptDigest,
} from "../../scripts/tranche/transaction-envelope.mjs";

const temporaryRepositories: string[] = [];
const RECEIPT = "docs/tranches/BI/evidence/BI.W-P001/receipt.json";

function sha256(value: string | Buffer) {
    return createHash("sha256").update(value).digest("hex");
}

function git(root: string, args: string[], encoding: BufferEncoding | null = "utf8") {
    const result = spawnSync("git", ["-C", root, ...args], {
        encoding: encoding as any,
        stdio: ["ignore", "pipe", "pipe"],
    });
    if (result.error || result.status !== 0) {
        throw new Error(`git ${args.join(" ")} failed: ${result.error?.message ?? result.stderr.toString()}`);
    }
    return result.stdout as any;
}

function write(root: string, path: string, value: string) {
    const absolute = join(root, path);
    mkdirSync(dirname(absolute), { recursive: true });
    writeFileSync(absolute, value);
}

function createRepository() {
    const root = mkdtempSync(join(tmpdir(), "glass-bi-envelope-"));
    temporaryRepositories.push(root);
    git(root, ["init", "--quiet"]);
    git(root, ["config", "user.name", "Glass BI fixture"]);
    git(root, ["config", "user.email", "glass-bi@example.invalid"]);
    return root;
}

function commit(root: string, message: string) {
    git(root, ["add", "-A"]);
    git(root, ["commit", "--quiet", "-m", message]);
    return git(root, ["rev-parse", "HEAD"]).trim();
}

function gitObject(root: string, ref: string, path: string) {
    const row = git(root, ["ls-tree", ref, "--", path]).trim();
    const match = /^(\d{6}) blob ([0-9a-f]{40})\t/.exec(row);
    if (!match) throw new Error(`missing fixture object ${ref}:${path}`);
    return { mode: match[1], oid: match[2] };
}

function evidence(status: "PASS" | "RED" = "PASS", root?: string, path = "verify.txt", kind = "device-free-test-report") {
    const bytes = root ? readFileSync(join(root, path)) : Buffer.from(`P001 ${status}\n`);
    return [{
        path,
        kind,
        status,
        sha256: sha256(bytes),
        bytes: bytes.length,
    }];
}

function waveFixture() {
    return {
        id: "BI.W-P001",
        receiptPath: RECEIPT,
        dependsOn: ["BI.W-P000"],
        integrationRequires: [],
        projectionMode: "NONE",
        subjects: [
            { path: "tracked.txt", action: "modify", before: "f".repeat(40) },
            { path: "new.txt", action: "create", before: null },
            { path: "delete.txt", action: "delete", before: "0".repeat(40) },
            { path: "old.txt", targetPath: "moved.txt", action: "rename", before: "1".repeat(40) },
            { path: "same.txt", action: "repair", before: "2".repeat(40) },
            { path: "verify.txt", action: "verify", before: "3".repeat(40) },
        ],
    };
}

function stageP001LikeTransaction() {
    const root = createRepository();
    write(root, "docs/tranches/BI/BOOTSTRAP.json", "{\"waveId\":\"BI.W-P000\"}\n");
    write(root, "tracked.txt", "parent tracked\n");
    write(root, "delete.txt", "delete me\n");
    write(root, "old.txt", "move me\n");
    write(root, "same.txt", "same repair\n");
    write(root, "verify.txt", "immutable authority\n");
    const parent = commit(root, "fixture parent");

    write(root, "tracked.txt", "terminal tracked\n");
    write(root, "new.txt", "created\n");
    unlinkSync(join(root, "delete.txt"));
    unlinkSync(join(root, "old.txt"));
    write(root, "moved.txt", "move me\n");
    git(root, ["add", "-A"]);
    const wave = waveFixture();
    const formationDigest = "a".repeat(64);
    return { root, parent, wave, formationDigest, sourceBase: parent };
}

function stageWithdrawnCreateTransaction() {
    const root = createRepository();
    write(root, "docs/tranches/BI/BOOTSTRAP.json", "{\"waveId\":\"BI.W-P000\"}\n");
    write(root, "preserved.txt", "integration-parent product\n");
    const parent = commit(root, "withdrawal fixture parent");
    const wave = {
        id: "BI.W-P001",
        receiptPath: RECEIPT,
        dependsOn: ["BI.W-P000"],
        integrationRequires: [],
        projectionMode: "NONE",
        subjects: [{ path: "not-created.txt", action: "create" }],
    };
    return { root, parent, wave, formationDigest: "a".repeat(64), sourceBase: parent };
}

function stageWithdrawnRenameTransaction() {
    const root = createRepository();
    write(root, "docs/tranches/BI/BOOTSTRAP.json", "{\"waveId\":\"BI.W-P000\"}\n");
    write(root, "source.txt", "parent-preserved source\n");
    const parent = commit(root, "withdrawn rename fixture parent");
    const wave = {
        id: "BI.W-P001",
        receiptPath: RECEIPT,
        dependsOn: ["BI.W-P000"],
        integrationRequires: [],
        projectionMode: "NONE",
        subjects: [{ path: "source.txt", targetPath: "target.txt", action: "rename" }],
    };
    return { root, parent, wave, formationDigest: "a".repeat(64), sourceBase: parent };
}

function reverseObjectKeys(value: any): any {
    if (Array.isArray(value)) return value.map(reverseObjectKeys);
    if (!value || typeof value !== "object") return value;
    return Object.fromEntries(Object.keys(value).reverse().map((key) => [key, reverseObjectKeys(value[key])]));
}

afterEach(() => {
    while (temporaryRepositories.length > 0) rmSync(temporaryRepositories.pop()!, { recursive: true, force: true });
});

describe("parent-relative subject envelope", () => {
    it("derives every action from the live integration parent, including modes and rename targets", () => {
        const fixture = stageP001LikeTransaction();
        const rendered = renderWaveReceipt({
            ...fixture,
            integrationParent: fixture.parent,
            evidenceEntries: evidence("PASS", fixture.root),
            terminalRationale: "All P001 transaction properties are current.",
        });
        const outcomes = new Map<string, any>(rendered.subjectOutcomes.map((row: any) => [row.path, row]));

        expect(outcomes.get("tracked.txt")).toMatchObject({
            disposition: "MODIFIED",
            preimage: gitObject(fixture.root, fixture.parent, "tracked.txt"),
        });
        expect(outcomes.get("tracked.txt")?.preimage.oid).not.toBe("f".repeat(40));
        expect(outcomes.get("new.txt")).toMatchObject({ disposition: "CREATED", preimage: null });
        expect(outcomes.get("delete.txt")).toMatchObject({ disposition: "DELETED", postimage: null });
        expect(outcomes.get("old.txt")).toMatchObject({ disposition: "RENAMED", targetPath: "moved.txt" });
        expect(outcomes.get("same.txt")).toMatchObject({ disposition: "VERIFIED_UNCHANGED" });
        expect(outcomes.get("verify.txt")).toMatchObject({ disposition: "VERIFIED_UNCHANGED" });
        expect(rendered.deltaPaths).toEqual([
            "delete.txt",
            "moved.txt",
            "new.txt",
            "tracked.txt",
        ]);
    });

    it("permits only the generic CREATE-primary plus RENAME-target composite", () => {
        const parent = [{ path: "source.ts", mode: "100644", oid: "1".repeat(40) }];
        const current = [{ path: "target.ts", mode: "100644", oid: "1".repeat(40) }];
        const subjects = [
            { path: "target.ts", action: "create" },
            { path: "source.ts", targetPath: "target.ts", action: "rename" },
        ];
        const outcomes = deriveWaveSubjectOutcomes(subjects, parent, current);
        expect(outcomes).toMatchObject([
            { path: "target.ts", disposition: "CREATED" },
            { path: "source.ts", targetPath: "target.ts", disposition: "RENAMED" },
        ]);

        const compositeWave = {
            id: "BI.W-P007",
            receiptPath: "docs/tranches/BI/evidence/BI.W-P007/receipt.json",
            dependsOn: ["BI.W-P001"],
            integrationRequires: ["BI.W-P002"],
            projectionMode: "REFRESH",
            subjects,
        };
        const receipt = buildWaveReceipt({
            wave: compositeWave,
            formationDigest: "a".repeat(64),
            sourceBase: "b".repeat(40),
            status: "DONE",
            integrationParent: "c".repeat(40),
            subjectOutcomes: outcomes,
            evidenceEntries: evidence("PASS", undefined, "absent-report.json"),
            terminalRationale: "Composite move is exact.",
            payloadDigest: canonicalWavePayload([
                { path: "docs/tranches/BI/BOOTSTRAP.json", mode: "100644", oid: "d".repeat(40) },
                ...current,
            ], compositeWave.receiptPath),
        });
        const divergent = structuredClone(receipt);
        divergent.subjectOutcomes[1].postimage = { ...divergent.subjectOutcomes[1].postimage!, oid: "e".repeat(40) };
        expect(validateWaveReceipt(divergent).errors.join("\n")).toContain("divergent postimages");

        expect(() => deriveWaveSubjectOutcomes([
            { path: "target.ts", action: "create" },
            { path: "target.ts", action: "repair" },
        ], parent, current)).toThrow(/conflicting path lease/);
        expect(() => deriveWaveSubjectOutcomes([
            { path: "one.ts", targetPath: "target.ts", action: "rename" },
            { path: "two.ts", targetPath: "target.ts", action: "rename" },
        ], [
            { path: "one.ts", mode: "100644", oid: "1".repeat(40) },
            { path: "two.ts", mode: "100644", oid: "2".repeat(40) },
        ], current)).toThrow(/conflicting path lease/);
    });

    it("treats a mode-only change as MODIFIED and rejects changed VERIFY content or mode", () => {
        const parent = [{ path: "file.sh", mode: "100644", oid: "1".repeat(40) }];
        const executable = [{ path: "file.sh", mode: "100755", oid: "1".repeat(40) }];
        expect(deriveWaveSubjectOutcomes([{ path: "file.sh", action: "modify" }], parent, executable)[0]).toMatchObject({ disposition: "MODIFIED" });
        expect(() => deriveWaveSubjectOutcomes([{ path: "file.sh", action: "verify" }], parent, executable)).toThrow(/VERIFY/);
        expect(() => deriveWaveSubjectOutcomes(
            [{ path: "file.sh", action: "verify" }],
            parent,
            [{ path: "file.sh", mode: "100644", oid: "2".repeat(40) }],
        )).toThrow(/VERIFY/);
    });

    it("rejects an identical MODIFY rather than accepting a frozen source-base preimage", () => {
        const entries = [{ path: "same.txt", mode: "100644", oid: "1".repeat(40) }];
        expect(() => deriveWaveSubjectOutcomes(
            [{ path: "same.txt", action: "modify", before: "2".repeat(40) }],
            entries,
            entries,
        )).toThrow(/MODIFY/);
    });

    it("rejects foreign deltas, VERIFY deltas, and inactive P001 projections", () => {
        const wave = waveFixture();
        expect(validateWaveSubjectDelta({ wave, deltaPaths: ["tracked.txt", RECEIPT], requireReceipt: true })).toMatchObject({ ok: true });
        for (const path of ["foreign.txt", "verify.txt", ...CONTINUOUS_PROJECTION_PATHS]) {
            const result = validateWaveSubjectDelta({ wave, deltaPaths: ["tracked.txt", RECEIPT, path], requireReceipt: true });
            expect(result.ok).toBe(false);
        }
        expect(validateWaveSubjectDelta({ wave, deltaPaths: ["tracked.txt"], requireReceipt: true }).errors.join("\n")).toContain("omits its unique receipt");
    });
});

describe("acyclic payload, evidence, and trailer contracts", () => {
    it("excludes the current receipt plus A/F while retaining BOOTSTRAP in the payload", () => {
        const base = [{ path: "package.json", mode: "100644", oid: "1".repeat(40) }];
        const bootstrap = [{ path: "docs/tranches/BI/BOOTSTRAP.json", mode: "100644", oid: "2".repeat(40) }];
        const adjuncts = [RECEIPT, ...CONTINUOUS_PROJECTION_PATHS].map((path, index) => ({
            path,
            mode: "100644",
            oid: String(index + 3).repeat(40),
        }));
        const complete = canonicalWavePayload([...base, ...bootstrap, ...adjuncts], RECEIPT);
        expect(complete).toEqual(canonicalWavePayload([...base, ...bootstrap], RECEIPT));
        expect(complete.entryCount).toBe(2);
        expect(complete.excludes).toEqual([RECEIPT, ...CONTINUOUS_PROJECTION_PATHS]);
        expect(complete.sha256).not.toBe(canonicalWavePayload(base, RECEIPT).sha256);
    });

    it("uses four names for P001, six from P002, and embeds only acyclic values", () => {
        const formationDigest = "a".repeat(64);
        const p001 = intendedTrailersForWave({ waveId: "BI.W-P001", status: "DONE", formationDigest });
        const p002 = intendedTrailersForWave({ waveId: "BI.W-P002", status: "DONE", formationDigest });
        const p1000 = intendedTrailersForWave({ waveId: "BI.W-P1000", status: "DONE", formationDigest });
        expect(p001.names).toHaveLength(4);
        expect(p001.externallyDerived).toEqual(["BI-Receipt-SHA256"]);
        expect(p002.names).toHaveLength(6);
        expect(p002.externallyDerived).toEqual(["BI-Receipt-SHA256", "BI-Attestation-SHA256", "BI-FINAL-SHA256"]);
        expect(p1000).toEqual({
            ...p002,
            values: { ...p002.values, "BI-Wave": "BI.W-P1000" },
        });
        expect(Object.keys(p002.values).sort()).toEqual(["BI-Formation-SHA256", "BI-Status", "BI-Wave"]);
    });

    it("canonicalizes evidence and catches byte/count/digest tampering", () => {
        const canonical = canonicalWaveEvidence([
            { ...evidence()[0], path: "z/report.json" },
            { ...evidence()[0], path: "a/report.json" },
        ]);
        expect(canonical.entries.map((row) => row.path)).toEqual(["a/report.json", "z/report.json"]);
        const fixture = stageP001LikeTransaction();
        const rendered = renderWaveReceipt({
            ...fixture,
            integrationParent: fixture.parent,
            evidenceEntries: evidence("PASS", fixture.root),
            terminalRationale: "Evidence is current.",
        });
        const tampered = structuredClone(rendered.receipt);
        tampered.evidence.entries[0].bytes += 1;
        expect(validateWaveReceipt(tampered).errors.join("\n")).toContain("canonical digest/index does not reproduce");

        expect(validateWaveEvidenceBindings({
            root: fixture.root,
            wave: fixture.wave,
            evidenceEntries: evidence("PASS", fixture.root),
            view: "index",
        })).toMatchObject({ ok: true, errors: [] });
        expect(validateWaveEvidenceBindings({
            root: fixture.root,
            wave: fixture.wave,
            evidenceEntries: [{ ...evidence("PASS", fixture.root)[0], sha256: "0".repeat(64) }],
            view: "index",
        }).errors.join("\n")).toContain("does not bind");
        expect(validateWaveEvidenceBindings({
            root: fixture.root,
            wave: fixture.wave,
            evidenceEntries: evidence("PASS", undefined, "absent-report.json"),
            view: "index",
        }).errors.join("\n")).toContain("absent from the selected index view");
        expect(validateWaveEvidenceBindings({
            root: fixture.root,
            wave: fixture.wave,
            evidenceEntries: [{ ...evidence()[0], path: RECEIPT }],
            view: "index",
        }).errors.join("\n")).toContain("cannot evidence itself");
    });

    it("requires PASS-only DONE evidence and explicit RED WITHDRAWN evidence for DEAD", () => {
        const fixture = stageP001LikeTransaction();
        const envelope = renderWaveReceipt({
            ...fixture,
            integrationParent: fixture.parent,
            evidenceEntries: evidence("PASS", fixture.root),
            terminalRationale: "Current transaction passes.",
        });
        expect(() => buildWaveReceipt({
            wave: fixture.wave,
            formationDigest: fixture.formationDigest,
            sourceBase: fixture.sourceBase,
            status: "DONE",
            integrationParent: fixture.parent,
            subjectOutcomes: envelope.subjectOutcomes,
            evidenceEntries: evidence("RED", fixture.root),
            terminalRationale: "DONE cannot retain RED evidence.",
            payloadDigest: envelope.payloadDigest,
        })).toThrow(/DONE cannot/);

        const withdrawn = stageWithdrawnCreateTransaction();
        const dead = renderWaveReceipt({
            ...withdrawn,
            status: "DEAD",
            integrationParent: withdrawn.parent,
            evidenceEntries: evidence("RED", withdrawn.root, "preserved.txt", "owner-withdrawal-authority"),
            terminalRationale: "The complete subject is permanently withdrawn without product mutation.",
        });
        expect(dead.receipt.status).toBe("DEAD");
        expect(dead.subjectOutcomes).toEqual([{
            path: "not-created.txt",
            targetPath: null,
            plannedAction: "create",
            disposition: "WITHDRAWN",
            preimage: null,
            postimage: null,
        }]);
        expect(() => buildWaveReceipt({
            wave: withdrawn.wave,
            formationDigest: withdrawn.formationDigest,
            sourceBase: withdrawn.sourceBase,
            status: "DEAD",
            integrationParent: withdrawn.parent,
            subjectOutcomes: dead.subjectOutcomes,
            evidenceEntries: evidence("PASS", withdrawn.root, "preserved.txt", "owner-withdrawal-authority"),
            terminalRationale: "Invalid unproved withdrawal.",
            payloadDigest: dead.payloadDigest,
        })).toThrow(/DEAD requires/);
    });

    it("accepts an unimplemented CREATE as DEAD only when every product path remains parent-identical", () => {
        const fixture = stageWithdrawnCreateTransaction();
        const dead = renderWaveReceipt({
            ...fixture,
            status: "DEAD",
            integrationParent: fixture.parent,
            evidenceEntries: evidence("RED", fixture.root, "preserved.txt", "owner-withdrawal-authority"),
            terminalRationale: "Product owner permanently declines the complete create subject.",
        });
        write(fixture.root, RECEIPT, dead.bytes);
        git(fixture.root, ["add", RECEIPT]);
        expect(verifyWaveReceipt({
            ...fixture,
            integrationParent: fixture.parent,
            view: "index",
        })).toMatchObject({ ok: true, errors: [] });

        write(fixture.root, "not-created.txt", "an implementation cannot masquerade as withdrawal\n");
        git(fixture.root, ["add", "not-created.txt"]);
        expect(() => renderWaveReceipt({
            ...fixture,
            status: "DEAD",
            integrationParent: fixture.parent,
            evidenceEntries: evidence("RED", fixture.root, "preserved.txt", "owner-withdrawal-authority"),
            terminalRationale: "Must remain RED.",
        })).toThrow(/DEAD withdrawal cannot change|DEAD withdrawal must preserve/);
    });

    it("binds both the source and target of a withdrawn RENAME to the integration parent", () => {
        const fixture = stageWithdrawnRenameTransaction();
        const render = () => renderWaveReceipt({
            ...fixture,
            status: "DEAD",
            integrationParent: fixture.parent,
            evidenceEntries: evidence("RED", fixture.root, "source.txt", "owner-withdrawal-authority"),
            terminalRationale: "The product owner permanently withdrew the complete rename subject.",
        });
        expect(render().subjectOutcomes[0]).toMatchObject({
            disposition: "WITHDRAWN",
            targetPath: "target.txt",
            preimage: gitObject(fixture.root, fixture.parent, "source.txt"),
            postimage: gitObject(fixture.root, fixture.parent, "source.txt"),
        });

        write(fixture.root, "target.txt", "shadow target\n");
        git(fixture.root, ["add", "target.txt"]);
        expect(render).toThrow(/target\.txt: DEAD withdrawal/);
        git(fixture.root, ["reset", "--quiet", fixture.parent, "--", "target.txt"]);
        rmSync(join(fixture.root, "target.txt"), { force: true });

        write(fixture.root, "source.txt", "changed source\n");
        git(fixture.root, ["add", "source.txt"]);
        expect(render).toThrow(/source\.txt: DEAD withdrawal/);
    });
});

describe("deterministic render and repository validation", () => {
    it("binds the selected repository/index despite ambient Git redirection variables", () => {
        const fixture = stageP001LikeTransaction();
        const render = () => renderWaveReceipt({
            ...fixture,
            integrationParent: fixture.parent,
            evidenceEntries: evidence("PASS", fixture.root),
            terminalRationale: "The selected index remains authoritative.",
        });
        const baseline = render().bytes;
        const poison = createRepository();
        const keys = [
            "GIT_DIR",
            "GIT_WORK_TREE",
            "GIT_INDEX_FILE",
            "GIT_OBJECT_DIRECTORY",
            "GIT_ALTERNATE_OBJECT_DIRECTORIES",
            "GIT_COMMON_DIR",
            "GIT_CONFIG_PARAMETERS",
            "GIT_REPLACE_REF_BASE",
            "GIT_SHALLOW_FILE",
        ];
        const saved = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
        process.env.GIT_DIR = join(poison, ".git");
        process.env.GIT_WORK_TREE = poison;
        process.env.GIT_INDEX_FILE = join(poison, "poison.index");
        process.env.GIT_OBJECT_DIRECTORY = join(poison, ".git", "objects");
        process.env.GIT_ALTERNATE_OBJECT_DIRECTORIES = join(poison, ".git", "objects");
        process.env.GIT_COMMON_DIR = join(poison, ".git");
        process.env.GIT_CONFIG_PARAMETERS = "'core.bare=true'";
        process.env.GIT_REPLACE_REF_BASE = "refs/replace-poison/";
        process.env.GIT_SHALLOW_FILE = join(poison, "shallow");
        try {
            expect(render().bytes).toBe(baseline);
        } finally {
            for (const [key, value] of Object.entries(saved)) {
                if (value === undefined) delete process.env[key];
                else process.env[key] = value;
            }
        }
    });

    it("renders byte-identically, validates staged bytes, commits, then validates the committed tree", () => {
        const fixture = stageP001LikeTransaction();
        const rendered = renderWaveReceipt({
            ...fixture,
            integrationParent: fixture.parent,
            evidenceEntries: evidence("PASS", fixture.root),
            terminalRationale: "The bounded transaction and evidence are terminal.",
        });
        expect(serializeWaveReceipt(reverseObjectKeys(rendered.receipt))).toBe(rendered.bytes);
        expect(waveReceiptDigest(rendered.bytes)).toBe(rendered.receiptSha256);

        write(fixture.root, RECEIPT, rendered.bytes);
        git(fixture.root, ["add", RECEIPT]);
        expect(verifyWaveReceipt({
            ...fixture,
            integrationParent: fixture.parent,
            view: "index",
        })).toMatchObject({ ok: true, errors: [] });

        const fabricatedEvidence = structuredClone(rendered.receipt);
        fabricatedEvidence.evidence = canonicalWaveEvidence([{
            ...fabricatedEvidence.evidence.entries[0],
            sha256: "0".repeat(64),
        }]);
        expect(verifyWaveReceipt({
            ...fixture,
            integrationParent: fixture.parent,
            view: "index",
            receiptBytes: Buffer.from(serializeWaveReceipt(fabricatedEvidence)),
        }).errors.join("\n")).toContain("evidence SHA-256 does not bind");

        const committed = commit(fixture.root, "P001 fixture transaction");
        expect(verifyWaveReceipt({
            ...fixture,
            integrationParent: fixture.parent,
            view: "commit",
            ref: committed,
        })).toMatchObject({ ok: true, errors: [] });
    });

    it("rejects changed receipt payload bytes and noncanonical raw serialization", () => {
        const fixture = stageP001LikeTransaction();
        const rendered = renderWaveReceipt({
            ...fixture,
            integrationParent: fixture.parent,
            evidenceEntries: evidence("PASS", fixture.root),
            terminalRationale: "The bounded transaction and evidence are terminal.",
        });
        write(fixture.root, RECEIPT, rendered.bytes);
        git(fixture.root, ["add", RECEIPT]);

        const changed = structuredClone(rendered.receipt);
        changed.payloadDigestExcludingCurrentIntegrationAdjuncts.sha256 = "0".repeat(64);
        expect(verifyWaveReceipt({
            ...fixture,
            integrationParent: fixture.parent,
            view: "index",
            receiptBytes: Buffer.from(serializeWaveReceipt(changed)),
        }).ok).toBe(false);
        expect(verifyWaveReceipt({
            ...fixture,
            integrationParent: fixture.parent,
            view: "index",
            receiptBytes: Buffer.from(`${rendered.bytes}\n`),
        }).errors.join("\n")).toContain("deterministic canonical newline");
    });

    it("rejects stale parent leases and foreign staged work", () => {
        const stale = stageP001LikeTransaction();
        commit(stale.root, "intervening integrated commit");
        expect(() => renderWaveReceipt({
            ...stale,
            integrationParent: stale.parent,
            evidenceEntries: evidence("PASS", stale.root),
            terminalRationale: "Must not render.",
        })).toThrow(/stale integration parent/);

        const foreign = stageP001LikeTransaction();
        write(foreign.root, "foreign.txt", "unleased\n");
        git(foreign.root, ["add", "foreign.txt"]);
        expect(() => renderWaveReceipt({
            ...foreign,
            integrationParent: foreign.parent,
            evidenceEntries: evidence("PASS", foreign.root),
            terminalRationale: "Must not render.",
        })).toThrow(/foreign path escapes/);
    });

    it("rejects internally impossible outcomes, wrong dispositions, and recursive self-reference", () => {
        const fixture = stageP001LikeTransaction();
        const rendered = renderWaveReceipt({
            ...fixture,
            integrationParent: fixture.parent,
            evidenceEntries: evidence("PASS", fixture.root),
            terminalRationale: "Current evidence.",
        });

        const identicalModify = structuredClone(rendered.receipt);
        identicalModify.subjectOutcomes[0].postimage = identicalModify.subjectOutcomes[0].preimage;
        expect(validateWaveReceipt(identicalModify).errors.join("\n")).toContain("MODIFY images are identical");

        const changedVerify = structuredClone(rendered.receipt);
        const verify = changedVerify.subjectOutcomes.find((row: any) => row.plannedAction === "verify")!;
        verify.postimage = { ...verify.postimage, mode: "100755" };
        expect(validateWaveReceipt(changedVerify).errors.join("\n")).toContain("VERIFY images or modes differ");

        const wrongDisposition = structuredClone(rendered.receipt);
        wrongDisposition.subjectOutcomes[0].disposition = "VERIFIED_UNCHANGED";
        expect(validateWaveReceipt(wrongDisposition).errors.join("\n")).toContain("action/disposition mismatch");

        const recursive = structuredClone(rendered.receipt) as any;
        recursive.subjectOutcomes[0].metadata = { receiptSha256: "0".repeat(64) };
        expect(validateWaveReceipt(recursive).errors.join("\n")).toContain("forbidden receipt/commit/projection self-reference");
    });

    it("binds payload exclusion to the current receipt even when adjunct blobs are already staged", () => {
        const fixture = stageP001LikeTransaction();
        const entries = readRepositoryEntries(fixture.root, "index", "HEAD");
        const basePayload = canonicalWavePayload(entries, RECEIPT);
        write(fixture.root, RECEIPT, "temporary receipt bytes\n");
        git(fixture.root, ["add", RECEIPT]);
        const withReceipt = canonicalWavePayload(readRepositoryEntries(fixture.root, "index", "HEAD"), RECEIPT);
        expect(withReceipt).toEqual(basePayload);
        expect(readFileSync(join(fixture.root, "docs/tranches/BI/BOOTSTRAP.json"), "utf8")).toContain("BI.W-P000");
    });
});

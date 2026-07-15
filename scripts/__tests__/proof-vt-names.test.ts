import { describe, expect, it } from "vitest";

import {
    parseCommitTrailers,
    parseVerifierArgs,
    validateCommitTrailers,
} from "../verify.mjs";

describe("transaction locator contracts", () => {
    it("reports duplicate transaction trailers", () => {
        const parsed = parseCommitTrailers([
            "test(verifier): duplicate transaction trailer fixture",
            "",
            "BI-Wave: BI.W-P000",
            "BI-Wave: BI.W-P001",
            "",
        ].join("\n"));
        expect(parsed.duplicates).toEqual(["BI-Wave"]);
    });

    it("rejects transaction trailers that do not bind the receipt", () => {
        const receiptBytes = Buffer.from("fixture receipt\n");
        const receipt = {
            waveId: "BI.W-P000",
            status: "PASS",
            formationDigest: "f".repeat(64),
        };
        const errors = validateCommitTrailers([
            "BI-Wave: BI.W-P001",
            "BI-Status: PASS",
            `BI-Receipt-SHA256: ${"0".repeat(64)}`,
            `BI-Formation-SHA256: ${receipt.formationDigest}`,
        ].join("\n"), receipt, receiptBytes);
        expect(errors).toEqual(expect.arrayContaining([
            expect.stringMatching(/^BI-Wave:/),
            expect.stringMatching(/^BI-Receipt-SHA256:/),
        ]));
    });

    it("restricts immutable bootstrap arguments to P000", () => {
        expect(() => parseVerifierArgs([
            "--bootstrap-plan", "formation.json",
            "--receipt", "receipt.json",
            "--wave", "BI.W-P001",
        ])).toThrow(/restricted/);
    });

    it("requires exactly one recovered-state wave locator", () => {
        expect(() => parseVerifierArgs([
            "--state", "auto",
            "--wave", "BI.W-P001",
            "--wave-from-commit", "HEAD",
        ])).toThrow(/exactly one wave locator/);
    });
});

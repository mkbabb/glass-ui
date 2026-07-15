// @glass-invariant architecture.clean-break integrity.lineage

import { describe, expect, it } from "vitest";

import {
    evaluateBrowserReceipt,
    runMutationContract,
} from "../../scripts/verification/mutation-fixtures.mjs";
import { validateExternalScenario } from "../../scripts/verification/discover.mjs";

const FAMILY = "architecture.clean-break";

function scenarioFixture() {
    return {
        schemaVersion: "1.0.0",
        scenarioId: "consumer.glass-dock",
        ownerWave: "BI.W-P001",
        title: "A packaged consumer retains dock keyboard and touch behavior",
        candidate: {
            repository: "glass-ui",
            testedSourceSha: "1".repeat(40),
            packageName: "@mkbabb/glass-ui",
            tarballSha256: "2".repeat(64),
        },
        invariantFamilies: [FAMILY],
        environments: [{
            browser: "webkit",
            viewport: { width: 1280, height: 800 },
            colorScheme: "dark",
            input: "keyboard",
            reducedMotion: false,
            forcedColors: false,
            reducedTransparency: false,
        }],
        steps: [
            { action: "navigate", target: "/dock" },
            { action: "keyboard", target: "[data-dock-item]", value: "ArrowRight" },
            { action: "wait-for-state", state: "second dock item focused" },
        ],
        assertions: [{
            kind: "accessibility",
            subject: "dock focus order",
            expected: { focusedIndex: 1, wrap: false },
        }],
        receiptContract: {
            testedSourceSha: true,
            browserIdentity: true,
            assertionOutcomes: true,
            artifactDigests: true,
        },
    };
}

function browserReceiptFixture() {
    return {
        schemaVersion: "1.0.0",
        kind: "browser-receipt",
        fixtureOnly: true,
        waveId: "BI.W-P000",
        scenarioId: "bootstrap.browser-adapter",
        testedSourceSha: "3".repeat(40),
        browser: { name: "chromium", version: "fixture-1" },
        assertionOutcomes: [{ subject: "semantic adapter binds source", status: "PASS" }],
        artifactDigests: [{ path: "fixtures/browser.json", sha256: "4".repeat(64) }],
    };
}

describe("external scenario schema", () => {
    it("accepts a typed, source-bound consumer scenario", () => {
        expect(validateExternalScenario(scenarioFixture(), new Set([FAMILY]))).toMatchObject({ ok: true, errors: [] });
    });

    it("rejects additional properties at every nested contract boundary and passes after restoration", () => {
        const mutations: Array<(scenario: any) => void> = [
            (scenario) => { scenario.extra = true; },
            (scenario) => { scenario.candidate.extra = true; },
            (scenario) => { scenario.environments[0].extra = true; },
            (scenario) => { scenario.environments[0].viewport.extra = true; },
            (scenario) => { scenario.steps[0].extra = true; },
            (scenario) => { scenario.assertions[0].extra = true; },
            (scenario) => { scenario.receiptContract.extra = true; },
        ];
        for (const mutate of mutations) {
            const changed = scenarioFixture() as any;
            mutate(changed);
            const result = validateExternalScenario(changed, new Set([FAMILY]));
            expect(result.ok).toBe(false);
            expect(result.errors).toEqual(expect.arrayContaining([expect.stringMatching(/unexpected property/)]));
            expect(validateExternalScenario(scenarioFixture(), new Set([FAMILY])).ok).toBe(true);
        }
    });

    it("rejects unknown families and empty behavioral expectations", () => {
        const unknown = scenarioFixture();
        unknown.invariantFamilies = ["integrity.unknown"];
        expect(validateExternalScenario(unknown, new Set([FAMILY])).errors.join("\n")).toContain("unknown family");

        const empty = scenarioFixture();
        empty.assertions[0].expected = {} as any;
        expect(validateExternalScenario(empty, new Set([FAMILY])).errors.join("\n")).toContain("substantive expected behavior");
        expect(validateExternalScenario(scenarioFixture(), new Set([FAMILY])).ok).toBe(true);
    });
});

describe("fixture-only browser receipt adapter", () => {
    it("binds exact tested source and rejects a stale source", () => {
        const receipt = browserReceiptFixture();
        const expected = { expectedTestedSourceSha: receipt.testedSourceSha, expectedWaveId: receipt.waveId };
        expect(evaluateBrowserReceipt(receipt, expected)).toMatchObject({ ok: true, status: "PASS", exitCode: 0 });
        const stale = structuredClone(receipt);
        stale.testedSourceSha = "5".repeat(40);
        expect(evaluateBrowserReceipt(stale, expected)).toMatchObject({ ok: false, status: "RED", exitCode: 1 });
        expect(evaluateBrowserReceipt(stale, expected).errors.join("\n")).toMatch(/stale|another source/);
        expect(evaluateBrowserReceipt(receipt, expected).ok).toBe(true);
    });

    it("cannot claim current-product credit or omit fixture-only identity", () => {
        const receipt = browserReceiptFixture();
        const liveClaim = structuredClone(receipt);
        liveClaim.fixtureOnly = false;
        expect(evaluateBrowserReceipt(liveClaim, {
            expectedTestedSourceSha: receipt.testedSourceSha,
            expectedWaveId: receipt.waveId,
        }).errors.join("\n")).toContain("fixtureOnly");

        const adapterContract = runMutationContract({ waveId: "BI.W-P000", adapterOnly: true });
        expect(adapterContract).toMatchObject({ ok: true, status: "PASS", currentProductBrowserCredit: false });
        expect(adapterContract.cases.every((item: any) => item.mutatedStatus === "RED" && item.restoredStatus === "PASS")).toBe(true);
    });

    it("does not let adapter-only cases satisfy the production mutation contract by default", () => {
        const result = runMutationContract({ waveId: "BI.W-P000" });
        expect(result).toMatchObject({ ok: false, status: "RED", currentProductBrowserCredit: false });
        expect(result.missingProductionRequirements.length).toBeGreaterThan(0);
        expect(runMutationContract({ waveId: "BI.W-P000", adapterOnly: true }).ok).toBe(true);
    });
});

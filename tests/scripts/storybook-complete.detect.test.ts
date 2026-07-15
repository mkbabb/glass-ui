import { describe, expect, it } from "vitest";

import { validateEvidencePlan } from "../../scripts/verification/discover.mjs";

const family = "integrity.lineage";
const sourceSha = "a".repeat(64);

function routedPlan() {
    return {
        schemaVersion: "1.0.0",
        waveId: "BI.W-P000",
        profile: "bootstrap",
        authority: "IMMUTABLE_FORMATION_P000_PLAN_ONLY",
        invariantFamilies: [family],
        sources: [
            {
                kind: "normal-test",
                path: "tests/fixture.test.ts",
                sha256: sourceSha,
                assertions: [{ callee: "expect.toBe", line: 1, column: 1 }],
                invariantFamilies: [family],
            },
        ],
        currentReds: [
            {
                findingId: "fixture-red",
                invariantFamily: family,
                summary: "synthetic routed finding",
                status: "ROUTED_RED",
                ownerWave: "BI.W-P001",
                evidencePath: "docs/tranches/BI/BOOTSTRAP.json",
            },
        ],
        summary: {
            normalTestFiles: 1,
            browserScenarioFiles: 0,
            assertionSites: 1,
            externalScenarios: 0,
        },
    };
}

describe("honest routed findings", () => {
    it("accepts one future owner while retaining RED status", () => {
        expect(validateEvidencePlan(routedPlan(), new Set([family]))).toMatchObject({ ok: true, errors: [] });
    });

    it("rejects PASS laundering and non-singular ownership", () => {
        const passed = routedPlan();
        passed.currentReds[0].status = "PASS";
        expect(validateEvidencePlan(passed, new Set([family])).ok).toBe(false);

        const ambiguous = routedPlan();
        ambiguous.currentReds[0].ownerWave = ["BI.W-P001", "BI.W-P002"] as any;
        expect(validateEvidencePlan(ambiguous, new Set([family])).ok).toBe(false);
    });
});

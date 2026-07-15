import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { validateBootstrapPlan } from "../../scripts/verify.mjs";

const root = resolve(import.meta.dirname, "../..");
const authorityPlan = JSON.parse(
    readFileSync(
        resolve(root, "docs/tranches/BI/FORMATION/execution-bootstrap-plan.seed.json"),
        "utf8",
    ),
);

describe("immutable bootstrap authority", () => {
    it("accepts the formation-owned plan as data", () => {
        expect(validateBootstrapPlan(authorityPlan)).toMatchObject({ ok: true, errors: [] });
    });

    it("rejects authority escape and browser-credit mutations", () => {
        const mutations = [
            (plan: any) => { plan.waveId = "BI.W-P001"; },
            (plan: any) => { plan.mode = "RECOVERED_STATE"; },
            (plan: any) => { plan.mutationContract.currentProductBrowserCredit = true; },
        ];
        for (const mutate of mutations) {
            const changed = structuredClone(authorityPlan);
            mutate(changed);
            expect(validateBootstrapPlan(changed).ok).toBe(false);
        }
    });
});

import { readFileSync } from "node:fs";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { StatusDot, STATUS_DOT_STATES } from "@glass/components/status-dot";
import StatusDotSfc from "@glass/components/status-dot/StatusDot.vue?raw";

// REWRITTEN at BK #87 W-MARKS (S11). What this file used to be: six assertions
// that mirrored the template back at itself — "the state prop I passed appears on
// the `data-state` attribute" ×7, "the motion prop I passed appears on
// `data-motion`" ×7. A pure template mirror. It could not have caught D9 (the
// `active` state had no CSS rule at all for two majors) because it never looked at
// a rule, and it could not have caught D1 (a breaking prop cut that shipped with
// ZERO migration rows) because it never looked at the record.
//
// It now asserts the two things this component's history says actually break: that
// every state in the union reaches an EXPLICIT rule, and that the relay it owes its
// consumers exists. The identity/ARIA rows survive — those were real.

const MIGRATION = readFileSync("MIGRATION.md", "utf8");
const SFC = StatusDotSfc as unknown as string;

describe("StatusDot", () => {
    it("is explicitly decorative when adjacent text owns the status", () => {
        const wrapper = mount(StatusDot, { props: { state: "online" } });

        expect(wrapper.attributes("data-identity")).toBe("decorative");
        expect(wrapper.attributes("aria-hidden")).toBe("true");
        expect(wrapper.attributes("role")).toBeUndefined();
        expect(wrapper.attributes("aria-live")).toBeUndefined();
    });

    it("uses an image identity when named without creating a live region", () => {
        const wrapper = mount(StatusDot, {
            props: { state: "error", label: "Service unavailable" },
        });

        expect(wrapper.attributes("data-identity")).toBe("labelled");
        expect(wrapper.attributes("role")).toBe("img");
        expect(wrapper.attributes("aria-label")).toBe("Service unavailable");
        expect(wrapper.attributes("aria-hidden")).toBeUndefined();
        expect(wrapper.attributes("aria-live")).toBeUndefined();
    });

    it("gates the breathing pulse to the live active state under the default motion", () => {
        for (const state of STATUS_DOT_STATES) {
            const mark = mount(StatusDot, { props: { state } }).get(".feedback-mark");
            expect(mark.attributes("data-motion")).toBe(
                state === "active" ? "" : undefined,
            );
        }
        expect(
            mount(StatusDot, { props: { state: "active", motion: "off" } })
                .get(".feedback-mark")
                .attributes("data-motion"),
        ).toBeUndefined();
    });

    // BORN-RED at HEAD (D9) — and this is the row no gate in forty-four tranches
    // could have written, because every prior one mirrored the template instead of
    // reading the sheet. The rendered `data-state` set is checked against the
    // exported union AND every member is checked against an explicit rule in the
    // SFC. HEAD reading: `.feedback-mark[data-state="active"]` occurred ZERO times
    // in a component whose own README headlines that state.
    it("gives every rendered state an explicit rule — no state falls to the default", () => {
        const rendered = STATUS_DOT_STATES.map((state) =>
            mount(StatusDot, { props: { state } })
                .get(".feedback-mark")
                .attributes("data-state"),
        );
        expect(rendered).toEqual([...STATUS_DOT_STATES]);

        const unruled = STATUS_DOT_STATES.filter(
            (state) => !SFC.includes(`.feedback-mark[data-state="${state}"]`),
        );
        expect(unruled).toEqual([]);
    });

    // BORN-RED at HEAD (S3(iii), the breath-of-life inversion). The orbit existed
    // ONLY under `[data-motion]`, so at `motion="off"` the LIVE state rendered as
    // a bare disc — the most inert-looking mark in a set of seven, for the one
    // state whose entire meaning is liveness. The silhouette is unconditional now
    // and the pulse is that same silhouette animated, which is also what makes D10
    // curable: one painting layer, not two competing ones.
    it("draws the active silhouette at every motion value, and animates that same one", () => {
        const resting =
            /\.feedback-mark\[data-state="active"\]::after\s*\{[^}]*\}/.exec(SFC)?.[0];
        const animated =
            /\.feedback-mark\[data-state="active"\]\[data-motion\]::after\s*\{[^}]*\}/.exec(
                SFC,
            )?.[0];

        expect(resting).toBeDefined();
        expect(resting).toContain("opacity: 0.28");
        expect(resting).toContain("inset: -30%");
        expect(animated).toBeDefined();
        expect(animated).toContain("feedback-mark-pulse");
        // The animated arm adds ONLY the animation — it does not redeclare the
        // geometry, which is what "the pulse IS the silhouette" has to mean.
        expect(animated).not.toContain("inset:");
    });

    // BORN-RED at HEAD (D1) — the wave's headline deliverable, and the one thing a
    // consumer cannot recover on their own. `490cc46e` replaced
    // `variant`/`color`/`pulse`/`size="xs"` and a VISIBLE-TEXT `label` with
    // `state`/`motion` and an `aria-label`-only `label`, and MIGRATION.md carried
    // ZERO rows about it for two majors while Avatar's and Skeleton's smaller cuts
    // sat at `:118,120,121`. `v-bind="$attrs"` made every dead prop a silent
    // no-op, and the `label` row is a silent VISUAL regression no type error
    // catches. HEAD reading: `grep -c StatusDot MIGRATION.md` → 0.
    //
    // This row REDS if any of the four rows is deleted from the record.
    it("carries the 7.0.0 relay rows it owes its consumers", () => {
        const statusDotSection = /##\s*8\.0\.0[\s\S]*?(?=\n##\s|\Z)/.exec(MIGRATION)?.[0];
        expect(statusDotSection).toBeDefined();

        for (const row of [
            "variant",
            "color",
            "pulse",
            "--feedback-state-color",
            'size="xs"',
            "aria-label",
            "status-dot__",
        ]) {
            expect(statusDotSection).toContain(row);
        }
        expect(statusDotSection).toContain("StatusDot");
    });

    it("carries the three ordinal sizes onto the mark, in em", () => {
        expect(mount(StatusDot).attributes("data-size")).toBe("sm");
        expect(
            mount(StatusDot, { props: { size: "md" } }).attributes("data-size"),
        ).toBe("md");
        expect(
            mount(StatusDot, { props: { size: "lg" } }).attributes("data-size"),
        ).toBe("lg");
        // BORN-RED at HEAD (K17 / S15). The rungs were `rem` — byte-identical at
        // root 16, but frozen against the line they sit in, and unable to derive
        // avatar/4 from the status slot's one `font-size` declaration.
        expect(SFC).toContain("--feedback-mark-size: 0.5em");
        expect(SFC).toContain("--feedback-mark-size: 0.625em");
        expect(SFC).toContain("--feedback-mark-size: 0.875em");
        expect(SFC).not.toMatch(/--feedback-mark-size:\s*[\d.]+rem/);
    });
});

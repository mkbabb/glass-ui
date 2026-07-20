// BA.W-SHELL-HOLD — the binding π hold-the-page readback (FD-FS-4).
//
// THE DEFECT. The demo shell auto-navigates within ~1s of EVERY load with NO user
// input: the shell docks bind `<DockRail v-model:context="railContext">` to a
// writable-computed whose `get` falls back to `contextLayers.value[0]?.id`, and the
// two-way `defineModel` writes that fallback BACK through the `set` on the first
// reconcile — and the `set` UNCONDITIONALLY fires `router.push(...)`. The
// fd-foundations lane could capture NO page without injecting a `history.pushState`
// route-freeze (its Tooling note) — that workaround is the proof the defect is real,
// not a probe artefact. THIS spec injects NO freeze: it lands on a route, waits, and
// asserts the route HELD.
//
// P1 — the page HOLDS (the binding truth). Navigate to 3 previously-drifting routes
//   (the lane's own drift list), and for EACH: record `location.pathname` after the
//   route settles, wait 3000ms with NO user input, then assert `location.pathname` is
//   UNCHANGED. RED at HEAD (each route drifts within ~1s).
//
// NEGATIVE CONTROL (anti-false-green) — a SCRIPTED chip click on a faceted route DOES
//   navigate (the `@advance` path still works). So the guard suppresses the echo
//   WITHOUT breaking real navigation — a guard that silenced all navigation would
//   green P1 while breaking the shell.
//
// Local-only (the runner-truth disposition the dock-animation-live gates carry).
// proof:shell-hold is the device-free CI half; THIS is the binding live truth. The
// before (HEAD drift) / after (held) traces are captured to W-SHELL-HOLD-DELTA.md.

import { fileURLToPath } from "node:url";
import { writeFileSync, mkdirSync } from "node:fs";
import { test, expect } from "@playwright/test";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = `${ROOT}docs/tranches/BA/audit/visual/shell-hold`;
const BASE = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";

type Page = import("@playwright/test").Page;

mkdirSync(OUT, { recursive: true });

// The lane's own drift list — the routes whose CURRENT story sits OUTSIDE any
// multi-facet contextual set (the common case), so the `get` fallback resolves to
// `contextLayers.value[0]` and the echo fires the unconditional push at HEAD.
const HOLD_ROUTES = ["/dock/overview", "/motion/curve-gallery", "/navigation/tabs"];

// A faceted route — Forms carries 3 facets (Text/Selection/Toggles), so the carousel
// strip mounts and a chip click is a genuine user activation that MUST navigate.
const FACETED_ROUTE = "/forms/inputs";

const HOLD_MS = 3000;

async function settle(page: Page, route: string) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    // Let the SPA router + the shell docks' reactive reconcile run (the echo, if
    // unguarded, fires within ~1s — well inside this settle window).
    await page.waitForTimeout(600);
}

test("BA.W-SHELL-HOLD — P1: the demo shell HOLDS the page (no echo self-nav)", async ({
    page,
}) => {
    const trace: Array<{
        route: string;
        landed: string;
        afterHold: string;
        held: boolean;
    }> = [];

    for (const route of HOLD_ROUTES) {
        await settle(page, route);
        const landed = await page.evaluate(() => location.pathname);

        // Wait the full hold window with NO user input — no click, no key, no nav.
        await page.waitForTimeout(HOLD_MS);

        const afterHold = await page.evaluate(() => location.pathname);
        trace.push({ route, landed, afterHold, held: landed === afterHold });
    }

    writeFileSync(
        `${OUT}/p1-hold-trace.json`,
        JSON.stringify({ wave: "BA.W-SHELL-HOLD", base: BASE, holdMs: HOLD_MS, trace }, null, 2) +
            "\n",
    );

    for (const t of trace) {
        expect(
            t.afterHold,
            `route ${t.route} HELD after ${HOLD_MS}ms with no input (landed ${t.landed}, ended ${t.afterHold}) — the railContext echo must not self-navigate`,
        ).toBe(t.landed);
    }
});

test("BA.W-SHELL-HOLD — negative control: a scripted chip click DOES navigate (@advance path live)", async ({
    page,
}) => {
    await settle(page, FACETED_ROUTE);
    const before = await page.evaluate(() => location.pathname);

    // The faceted route mounts the rail carousel — locate a NON-active facet chip in
    // either shell dock (the sidebar or bottom strip) and click it. The chip click is
    // the genuine `select()` → `@advance` user activation that MUST navigate.
    const clicked = await page.evaluate(() => {
        const chips = Array.from(
            document.querySelectorAll<HTMLElement>(".dock-hairline-extend-chip"),
        );
        // Prefer a chip NOT currently active (clicking the active one would be a no-op
        // navigation to the same first story).
        const target =
            chips.find((c) => !c.classList.contains("is-active")) ?? chips[0];
        if (!target) return { found: false, label: null as string | null };
        const label = (target.textContent ?? "").trim();
        target.click();
        return { found: true, label };
    });

    expect(clicked.found, "a facet chip is present on the faceted route").toBe(true);

    // Give the router.push a tick to land.
    await page.waitForTimeout(700);
    const after = await page.evaluate(() => location.pathname);

    writeFileSync(
        `${OUT}/p1-negative-control.json`,
        JSON.stringify(
            {
                wave: "BA.W-SHELL-HOLD",
                route: FACETED_ROUTE,
                before,
                after,
                clickedChip: clicked.label,
                navigated: before !== after,
            },
            null,
            2,
        ) + "\n",
    );

    expect(
        after,
        `a scripted facet-chip click navigated away from ${before} (the @advance user-activation path still works — the guard did not break real navigation)`,
    ).not.toBe(before);
});

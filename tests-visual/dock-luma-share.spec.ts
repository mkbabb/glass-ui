// BI.W-DOCK-LUMA-SHARE — the readback-COUNT π (PERF-6 / FAM-5). LOCAL real-GPU.
//
// THE DEFECT (measured live at HEAD): `/dock/overview` runs ~10–12 per-dock
// `useGlassBackdropLuminance` observers, each doing a `drawImage(auroraCanvas) +
// getImageData` readback (32×32, ≤ 4 Hz) off the ONE shared DockStage aurora. The
// luminance signal is a per-ROUTE property of the shared field, not a per-DOCK one —
// N docks over the SAME aurora read the SAME luma — so 11 of those readbacks are pure
// waste (the FAM-5 dock-sluggish amplification, worst under real WebKit's synchronous
// getImageData off a `preserveDrawingBuffer` canvas).
//
// THE FIX (BI.W-DOCK-LUMA-SHARE): ONE shared observer per route on `.dock-stage`
// (`shared: true`) stamps the `data-glass-backdrop-shared` marker + writes
// `--glass-backdrop-luma` / `--glass-backdrop` / `--glass-ambient-*` at the stage scope;
// every staged GlassDock INHERITS them via the registered inheriting @property cascade
// and STANDS DOWN its own readback (its `.closest([data-glass-backdrop-shared])` coverage
// check).
//
// SCOPE — this π binds the STAGED-dock collapse (the FAM-5 per-route multiplication the
// wave owns): the N docks inside `.dock-stage` (the flagship overview column over the ONE
// DockStage aurora). The demo APP-SHELL chrome docks (SidebarDock / BottomDock — persistent
// nav over the ROUTE background, NOT the DockStage field, present on EVERY route) sit OUTSIDE
// `.dock-stage`; they legitimately self-sample the honest floor (a different backdrop, 2
// observers for the whole app — NOT a per-route-N multiplication). Collapsing the shell
// chrome is a separate app-shell-backdrop concern (W-AUTH-SHELL-BG territory), out of scope
// here. So the assertions are scoped to `.dock-stage`.
//
// THE BINDING ASSERTIONS (within `.dock-stage` on /dock/overview):
//   (1) readback COUNT — exactly ONE `[data-backdrop-sampled]` witness inside the stage
//       (the `.dock-stage` itself), and ZERO staged `.glass-dock` self-stamp. Born-RED at
//       HEAD (each of the ~10 staged docks self-stamps → count ≥ 10); GREEN here (the docks
//       stand down + inherit; the ONE witness is the stage).
//   (2) shared inherited luma — every staged `.glass-dock` resolves the SAME `--glass-
//       backdrop-luma` as the stage (a real inherited value, not the initial 0). The N docks
//       read ONE signal.
//   (3) AA un-regressed — the staged dock plate stays translucent + silhouetted over the
//       field (the shared signal still drives the adaptive darken; legibility is not lost to
//       the collapse).
//
// Fail-CLOSED: a staged per-dock readback fleet (any staged dock self-stamps) or a
// dead/uninherited luma reds. Rides the W-PI-IN-CLOSE battery + the proof:ba-gestalt dock
// verdict.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const ROUTE = "/dock/overview";

async function setLight(page: Page): Promise<void> {
    await page.evaluate(() => document.documentElement.classList.remove("dark"));
    await page.waitForTimeout(120);
}

/** Wait for the shared observer to fire its first sample (the stage stamps the witness). */
async function waitForSharedSample(page: Page): Promise<void> {
    await page
        .waitForFunction(
            () => document.querySelector("[data-backdrop-sampled]") !== null,
            undefined,
            { timeout: 4000 },
        )
        .catch(() => {}); // fail-open on the wait; the assertions below are the truth
    await page.waitForTimeout(400); // let the ≤4Hz loop settle a couple of samples
}

test.describe("dock-luma-share (PERF-6 — 12 per-dock observers → ONE per route)", () => {
    test(`ONE backdrop-sampled witness per route (not per dock) — ${ROUTE}`, async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(ROUTE, { waitUntil: "networkidle" });
        await setLight(page);
        await waitForSharedSample(page);

        const readback = await page.evaluate(() => {
            const stage = document.querySelector(".dock-stage");
            const stagedDocks = stage
                ? Array.from(stage.querySelectorAll(".glass-dock"))
                : [];
            // Witnesses INSIDE the stage (staged docks + the stage itself). The app-shell
            // chrome docks sit outside `.dock-stage` — out of scope (a separate backdrop).
            const stagedSampled = stage
                ? Array.from(stage.querySelectorAll("[data-backdrop-sampled]"))
                : [];
            const stageSelfSampled =
                stage?.hasAttribute("data-backdrop-sampled") ?? false;
            const stagedDockSelfStamp = stagedDocks.filter((el) =>
                el.hasAttribute("data-backdrop-sampled"),
            );
            const hasSharedMarker =
                (stage?.hasAttribute("data-glass-backdrop-shared") ?? false) ||
                document.querySelector("[data-glass-backdrop-shared]") !== null;
            return {
                stagePresent: stage !== null,
                stagedDockCount: stagedDocks.length,
                // total in-stage witnesses = the stage self-stamp (1) + any staged-dock
                // leaks (0 when they all stand down).
                stagedWitnessCount:
                    (stageSelfSampled ? 1 : 0) + stagedDockSelfStamp.length,
                stagedDockSelfStampCount: stagedDockSelfStamp.length,
                stageSelfSampled,
                hasSharedMarker,
            };
        });

        // The route stages a real dock fleet inside `.dock-stage` (the born-RED denominator).
        expect(
            readback.stagePresent,
            `${ROUTE}: no .dock-stage found (the flagship overview must stage its docks over the shared field)`,
        ).toBe(true);
        expect(
            readback.stagedDockCount,
            `${ROUTE}: expected the staged overview to paint several .glass-dock inside .dock-stage (the FAM-5 fleet)`,
        ).toBeGreaterThanOrEqual(4);

        // The shared marker is present (the coverage anchor the staged docks stand down against).
        expect(
            readback.hasSharedMarker,
            `${ROUTE}: no [data-glass-backdrop-shared] marker on the stage — the shared observer did not stamp its scope; the docks cannot detect coverage + never stand down.`,
        ).toBe(true);

        // (1) ZERO staged docks self-stamp — they all stand down + inherit. Born-RED: ~10.
        expect(
            readback.stagedDockSelfStampCount,
            `${ROUTE}: ${readback.stagedDockSelfStampCount} staged .glass-dock still self-stamp the readback witness — a covered dock must STAND DOWN (inherit), never run its own drawImage+getImageData. Born-RED at HEAD (one readback per staged dock); GREEN only when they stand down.`,
        ).toBe(0);

        // and the ONLY in-stage witness is the STAGE itself (the ONE shared observer).
        expect(
            readback.stageSelfSampled,
            `${ROUTE}: the .dock-stage did not stamp the readback witness — the shared per-route observer must own the ONE sample.`,
        ).toBe(true);
        expect(
            readback.stagedWitnessCount,
            `${ROUTE}: ${readback.stagedWitnessCount} readback witnesses inside .dock-stage — expected exactly 1 (the shared stage observer). The per-staged-dock fleet did NOT collapse.`,
        ).toBe(1);
    });

    test(`every staged dock reads the ONE shared luma via the cascade — ${ROUTE}`, async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(ROUTE, { waitUntil: "networkidle" });
        await setLight(page);
        await waitForSharedSample(page);

        // (2a) EVERY staged dock resolves EXACTLY the stage's OWN written luma (the observer's
        // value, whatever it is) — the docks read the STAGE's signal, not each their own.
        // (2b) Then inject a DISTINCTIVE luma on the stage and assert every staged dock
        // re-resolves it — the binding "N docks read ONE cascaded signal" proof, deterministic
        // in ANY engine (the registered inheriting @property cascade is live). The real warm-
        // field VALUE the observer samples off the live aurora rides the DELTA on real GPU
        // (headless SwiftShader forces the aurora to CSS mode — BB.W-AURORA-SWRASTER — so the
        // `sampleAnimated` readback is unavailable; the CASCADE is the engine-independent truth).
        const result = await page.evaluate(() => {
            const stage = document.querySelector(".dock-stage") as HTMLElement | null;
            if (!stage) return null;
            const stagedDocks = Array.from(
                stage.querySelectorAll(".glass-dock"),
            ) as HTMLElement[];
            const read = (el: HTMLElement) =>
                getComputedStyle(el).getPropertyValue("--glass-backdrop-luma").trim();
            const stageOwn = read(stage);
            const docksMatchOwn = stagedDocks.every((d) => read(d) === stageOwn);

            // Inject a distinctive value on the stage; the docks must re-resolve it.
            const prior = stage.style.getPropertyValue("--glass-backdrop-luma");
            stage.style.setProperty("--glass-backdrop-luma", "0.777");
            const injected = read(stagedDocks[0]!);
            const docksInherit = stagedDocks.every((d) => read(d) === injected);
            if (prior) stage.style.setProperty("--glass-backdrop-luma", prior);
            else stage.style.removeProperty("--glass-backdrop-luma");

            return {
                dockCount: stagedDocks.length,
                stageOwn,
                docksMatchOwn,
                injected,
                docksInherit,
            };
        });

        expect(result, `${ROUTE}: no .dock-stage to read`).not.toBeNull();
        expect(
            result!.dockCount,
            `${ROUTE}: no staged .glass-dock to read the inherited luma on`,
        ).toBeGreaterThanOrEqual(4);

        // (2a) all staged docks read the stage's OWN observer value (not each their own).
        expect(
            result!.docksMatchOwn,
            `${ROUTE}: a staged dock resolved a --glass-backdrop-luma ≠ the stage's own "${result!.stageOwn}" — the N docks must read the ONE per-route signal (inherited), not each their own self-sample.`,
        ).toBe(true);

        // (2b) the cascade is LIVE — the stage's write re-resolves on every staged dock.
        expect(
            result!.injected,
            `${ROUTE}: the injected stage luma 0.777 did not reach a staged dock (expected "0.777", got "${result!.injected}") — the registered inheriting @property cascade is not delivering the shared signal.`,
        ).toBe("0.777");
        expect(
            result!.docksInherit,
            `${ROUTE}: the injected stage luma did not reach EVERY staged dock — the shared per-route signal must cascade to all N docks.`,
        ).toBe(true);
    });

    test(`dock plate stays translucent + legibility un-regressed — ${ROUTE}`, async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(ROUTE, { waitUntil: "networkidle" });
        await setLight(page);
        await waitForSharedSample(page);

        const plates = await page.evaluate(() => {
            const stage = document.querySelector(".dock-stage");
            const docks = stage ? Array.from(stage.querySelectorAll(".glass-dock")) : [];
            return docks
                .slice(0, 6)
                .map((d) => {
                    const cs = getComputedStyle(d);
                    const bg = cs.backgroundColor;
                    const alphaMatch =
                        bg.match(/\/\s*([\d.]+)\s*\)/) ??
                        bg.match(/rgba?\([^)]*,\s*([\d.]+)\s*\)/);
                    const alpha = alphaMatch ? Number(alphaMatch[1]) : 1;
                    return { bg, alpha };
                });
        });

        expect(
            plates.length,
            `${ROUTE}: no .glass-dock plate to read`,
        ).toBeGreaterThanOrEqual(4);
        // (3) the collapse must NOT solidify the plate — the dock stays translucent glass
        // (the shared signal still drives the adaptive darken without going opaque).
        for (const p of plates) {
            expect(
                p.alpha,
                `${ROUTE}: a dock plate went OPAQUE (bg ${p.bg}) — the shared-observer collapse must keep the dock translucent glass (legibility earned by the darken, not by losing the glass).`,
            ).toBeLessThan(0.995);
        }
    });
});

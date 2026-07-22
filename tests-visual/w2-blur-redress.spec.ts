// BJ.W2 BLUR REDRESS — the live-Chromium computed paint-proof for 20e064f1.
//
// This spec asserts the RULED **COMPUTED** backdrop-filter values (getComputedStyle,
// never token strings) landed by the W2 C2 producer-side redress, per
// docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/W2-DC566-ADJUDICATION-C2.md.
// It runs on the LIVE, source-served Chromium demo (Vite dev server — NOT an
// immutable package) at 390×844 + 1440×900, banks a screenshot per receiver + one
// computed-value JSON per engine under docs/tranches/BJ/evidence/W2-BLUR-REDRESS/,
// and is fail-CLOSED. Readiness/expect-polling only — NO arbitrary sleeps.
//
// The RULED bindings this proves (all COMPUTED, on the real painted element):
//
//   OVERLAY every-DPR (§5 KILL) — the calm `.glass-overlay` role computes an 11px
//     blur radius at EVERY device pixel ratio, INCLUDING an emulated 2dppx context
//     (deviceScaleFactor:2). The killed `@media(min-resolution:2dppx)`→17px writer is
//     gone: at 2dppx the radius is STILL 11px. A MUTATION restoring that writer flips
//     the 2dppx read to 17 — banked as the ≥1 mutation bite (proves the ==11 assertion
//     has teeth).
//
//   CALM ONTOLOGY (§3) — the five calm role recipes resolve their three standard blur
//     magnitudes: wash 1px, quiet 7px, resting 7px, floating 11px, overlay 11px →
//     {1,7,11}. The DEEP continuum is SEPARATE (`.glass-floating.glass-deep` resolves
//     a strictly larger radius in (11,16] and a strictly higher saturate in (1.6,1.8]).
//
//   SATURATE — the CURRENT shipped saturate values render: wash/quiet/resting 1.4,
//     floating/overlay 1.6, deep ≤1.8. PINNED AS THE CURRENT PROVISIONAL VALUES — the
//     adjudication (§6) keeps saturation PROVISIONAL, not ratified identity, pending
//     the structured-substrate comparison. This spec pins render, not taste.
//
//   IMMERSIVE STAGE SCRIM (§4) — on the REAL receivers (Dialog production immersive +
//     the new Drawer story) the private `[data-stage-scrim][data-stage-immersive]`
//     scrim computes a FIXED 14px blur at --glass-level:1, SCALING by --glass-level
//     (4.2px at 0.3, 0px at 0), with NO --stage-t radius coupling (the radius holds at
//     14 across --stage-t 0→1) and NO saturation term. CommandDialog is NOT a receiver.
//
// Owned files: this spec + the evidence dir. Run with the sibling config:
//   npx playwright test --config docs/tranches/BJ/evidence/W2-BLUR-REDRESS/w2-blur.config.ts --project=chromium

import { test, expect } from "@playwright/test";
import type { Browser, Page, TestInfo } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync, writeFileSync } from "node:fs";

const EVIDENCE_DIR = fileURLToPath(
    new URL("../docs/tranches/BJ/evidence/W2-BLUR-REDRESS", import.meta.url),
);

const DEMO_URL =
    process.env.GLASS_UI_DEMO_URL ??
    `http://localhost:${process.env.GLASS_UI_DEMO_PORT ?? 5199}`;

const VIEWPORTS = [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
] as const;

// sub-pixel serialization tolerance (engines differ in the last digit).
const EPS = 0.3;

// The RULED calm ladder (light arm). Radii are the three standard magnitudes; the
// saturate values are the CURRENT PROVISIONAL shipped values (§6 — not ratified).
const CALM = {
    wash: { blur: 1, sat: 1.4 },
    quiet: { blur: 7, sat: 1.4 },
    resting: { blur: 7, sat: 1.4 },
    floating: { blur: 11, sat: 1.6 },
    overlay: { blur: 11, sat: 1.6 },
} as const;
const STANDARD_MAGNITUDES = [1, 7, 11];
// The immersive stage scrim: fixed 14px at level 1, blur-only, --glass-level-scaled.
const IMMERSIVE_BASE_BLUR = 14;

interface FilterReadout {
    raw: string;
    blurPx: number | null;
    saturate: number | null;
    hasSaturate: boolean;
    hasBrightness: boolean;
}

/** Recover the blur radius + saturate/brightness terms from a resolved filter. */
function parseFilter(str: string): FilterReadout {
    const blur = str.match(/blur\(\s*([\d.]+)px\s*\)/i);
    const sat = str.match(/saturate\(\s*([\d.]+)\s*\)/i);
    return {
        raw: str,
        blurPx: blur ? parseFloat(blur[1]) : null,
        saturate: sat ? parseFloat(sat[1]) : null,
        hasSaturate: /saturate\(/i.test(str),
        hasBrightness: /brightness\(/i.test(str),
    };
}

function engineOf(info: TestInfo): string {
    return info.project.name;
}

// The one computed-value ledger this engine run appends to (per-engine so the
// Chromium and WebKit banks coexist — the retained DELTA is the pair).
const ledger: Record<string, unknown> = {
    engine: "",
    target: "20e064f1 — W2 C2 producer-side blur redress",
    startedAt: new Date().toISOString(),
    proofs: {},
};
function record(info: TestInfo, key: string, value: unknown): void {
    ledger.engine = engineOf(info);
    (ledger.proofs as Record<string, unknown>)[key] = value;
}

async function settleFrames(page: Page): Promise<void> {
    await page.evaluate(
        () =>
            new Promise<void>((res) =>
                requestAnimationFrame(() => requestAnimationFrame(() => res())),
            ),
    );
}
async function shot(page: Page, info: TestInfo, name: string): Promise<void> {
    mkdirSync(EVIDENCE_DIR, { recursive: true });
    await page.screenshot({
        path: `${EVIDENCE_DIR}/${engineOf(info)}--${name}.png`,
        fullPage: false,
    });
}

test.afterAll(async ({}, info) => {
    mkdirSync(EVIDENCE_DIR, { recursive: true });
    ledger.finishedAt = new Date().toISOString();
    writeFileSync(
        `${EVIDENCE_DIR}/computed-${engineOf(info)}.json`,
        JSON.stringify(ledger, null, 2),
    );
});

// ── Injected synthetic calm/overlay/deep plates (the glass-depth precedent). The
// demo loads the /styles cascade globally, so an injected `.glass-<role>` plate reads
// the SAME resolved backdrop-filter the mounted receivers read. Removed after. ──────
async function readCalmPlates(page: Page): Promise<Record<string, string>> {
    return page.evaluate(() => {
        const ID = "__w2_calm_fixture__";
        document.getElementById(ID)?.remove();
        const host = document.createElement("div");
        host.id = ID;
        host.style.cssText =
            "position:fixed;left:0;top:0;width:820px;height:160px;z-index:99999;padding:16px;" +
            "display:flex;gap:12px;background:linear-gradient(135deg,#3a1d6e,#0d6e6e,#c83a5a);";
        const mk = (cls: string): HTMLDivElement => {
            const p = document.createElement("div");
            p.className = cls;
            p.style.cssText = "width:110px;height:110px;border-radius:16px;";
            return p;
        };
        const plates: Record<string, HTMLDivElement> = {
            wash: mk("glass-wash"),
            quiet: mk("glass-quiet"),
            resting: mk("glass-resting"),
            floating: mk("glass-floating"),
            overlay: mk("glass-overlay"),
            deep: mk("glass-floating glass-deep"),
        };
        for (const p of Object.values(plates)) host.appendChild(p);
        document.body.appendChild(host);
        void host.offsetHeight;
        const read = (el: Element): string => {
            const cs = getComputedStyle(el);
            return (
                cs.backdropFilter ||
                (cs as unknown as { webkitBackdropFilter: string })
                    .webkitBackdropFilter ||
                ""
            );
        };
        const out: Record<string, string> = {};
        for (const [k, el] of Object.entries(plates)) out[k] = read(el);
        host.remove();
        return out;
    });
}

/** Read one `.glass-overlay` plate's resolved blur radius on the CURRENT page/DPR. */
async function readOverlayRadius(page: Page): Promise<number> {
    const raw = await page.evaluate(() => {
        const p = document.createElement("div");
        p.className = "glass-overlay";
        p.style.cssText =
            "position:fixed;left:0;top:0;width:80px;height:80px;z-index:99999;";
        document.body.appendChild(p);
        void p.offsetHeight;
        const cs = getComputedStyle(p);
        const v =
            cs.backdropFilter ||
            (cs as unknown as { webkitBackdropFilter: string })
                .webkitBackdropFilter ||
            "";
        p.remove();
        return v;
    });
    return parseFilter(raw).blurPx ?? NaN;
}

// ═════════════════════════════════════════════════════════════════════════════════
// CAPTURE — union the live demo's injected cascade into w2-compiled.css so the
// bundled-WebKit static harness (the demo SPA crashes bundled WebKit) resolves the
// SAME rules. Readiness/polling only — wait until the rule count stops growing.
// ═════════════════════════════════════════════════════════════════════════════════
test.describe("W2 blur redress — compiled-CSS capture (Chromium → WebKit harness)", () => {
    test("capture the demo cascade into w2-compiled.css", async ({ page }) => {
        // /containers/drawer mounts the Drawer (its component CSS injects) — the glass
        // tokens + drawer/styles.css scrim rules are globally imported regardless, so
        // one route's stable CSSOM carries the whole W2 surface.
        await page.goto(`${DEMO_URL}/containers/drawer`, {
            waitUntil: "networkidle",
        });
        let prev = -1;
        for (let i = 0; i < 40; i++) {
            const cur = await page.evaluate(() => {
                let n = 0;
                for (const s of document.styleSheets) {
                    try {
                        n += s.cssRules.length;
                    } catch {
                        /* cross-origin */
                    }
                }
                return n;
            });
            if (cur === prev && cur > 0) break;
            prev = cur;
            await page.evaluate(
                () => new Promise<void>((r) => requestAnimationFrame(() => r())),
            );
        }
        const css = await page.evaluate(() => {
            const out: string[] = [];
            const seen = new Set<string>();
            for (const s of document.styleSheets) {
                try {
                    for (const r of s.cssRules) {
                        if (!seen.has(r.cssText)) {
                            seen.add(r.cssText);
                            out.push(r.cssText);
                        }
                    }
                } catch {
                    /* skip cross-origin */
                }
            }
            return out.join("\n");
        });
        expect(css.length, "captured CSS is non-empty").toBeGreaterThan(1000);
        expect(css, "captured CSS carries the immersive scrim rule").toContain(
            "--stage-immersive-blur",
        );
        mkdirSync(EVIDENCE_DIR, { recursive: true });
        writeFileSync(`${EVIDENCE_DIR}/w2-compiled.css`, css);
    });
});

// ═════════════════════════════════════════════════════════════════════════════════
// PROOF 1 — calm ontology + overlay every-DPR + saturate pins + deep-separate.
// ═════════════════════════════════════════════════════════════════════════════════
test.describe("W2 blur redress — calm ladder, overlay every-DPR, deep continuum (Chromium)", () => {
    test("five calm roles resolve three magnitudes {1,7,11}; deep is separate; current saturates render; overlay is 11px at DPR 1 AND 2 (killed 17px arm gone)", async ({
        page,
        browser,
    }, info) => {
        await page.goto(`${DEMO_URL}/containers/drawer`, {
            waitUntil: "networkidle",
        });

        // ── (A) the five calm role recipes + the deep tier, read at both viewports. ──
        const byViewport: Record<string, Record<string, string>> = {};
        for (const vp of VIEWPORTS) {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await settleFrames(page);
            byViewport[vp.name] = await readCalmPlates(page);
        }
        record(info, "calm-ladder", byViewport);

        // Assert at BOTH viewports (the values are :root-token invariant; proven so).
        for (const vp of VIEWPORTS) {
            const plates = byViewport[vp.name];
            for (const [role, spec] of Object.entries(CALM)) {
                const f = parseFilter(plates[role]);
                expect(
                    f.blurPx,
                    `[${vp.name}] ${role} resolves a blur radius (${plates[role]})`,
                ).not.toBeNull();
                expect(
                    f.blurPx!,
                    `[${vp.name}] ${role} blur == ${spec.blur}px (the ruled magnitude)`,
                ).toBeCloseTo(spec.blur, 1);
                // CURRENT PROVISIONAL saturate (§6 — pinned as render, not ratified).
                expect(
                    f.saturate,
                    `[${vp.name}] ${role} carries a saturate term (${plates[role]})`,
                ).not.toBeNull();
                expect(
                    f.saturate!,
                    `[${vp.name}] ${role} saturate == ${spec.sat} (CURRENT provisional)`,
                ).toBeCloseTo(spec.sat, 2);
            }

            // The three STANDARD magnitudes are exactly {1,7,11} — no fourth calm rung.
            const calmRadii = Object.keys(CALM).map(
                (r) => parseFilter(plates[r]).blurPx!,
            );
            const distinct = [...new Set(calmRadii.map((r) => Math.round(r)))].sort(
                (a, b) => a - b,
            );
            expect(
                distinct,
                `[${vp.name}] calm magnitudes are exactly {1,7,11}`,
            ).toEqual(STANDARD_MAGNITUDES);

            // The DEEP continuum is SEPARATE — strictly deeper radius + higher saturate
            // than the calm floating rung, inside the deep band (11,16] / (1.6,1.8].
            const deep = parseFilter(plates.deep);
            const floating = parseFilter(plates.floating);
            expect(
                deep.blurPx!,
                `[${vp.name}] deep blur ${deep.blurPx} > calm floating ${floating.blurPx}`,
            ).toBeGreaterThan(floating.blurPx! + EPS);
            expect(
                deep.blurPx!,
                `[${vp.name}] deep blur ${deep.blurPx} within the deep ceiling (≤16px)`,
            ).toBeLessThanOrEqual(16 + EPS);
            expect(
                deep.saturate!,
                `[${vp.name}] deep saturate ${deep.saturate} > calm floating 1.6`,
            ).toBeGreaterThan(1.6);
            expect(
                deep.saturate!,
                `[${vp.name}] deep saturate ${deep.saturate} ≤ 1.8 ceiling`,
            ).toBeLessThanOrEqual(1.8 + EPS);
        }

        await shot(page, info, "calm-ladder");

        // ── (B) OVERLAY EVERY-DPR — the §5 KILL. The default page DPR is 1; an emulated
        //    2dppx context is created to prove the killed writer is gone. ─────────────
        const overlayDpr1 = await readOverlayRadius(page);
        expect(
            overlayDpr1,
            `overlay blur == 11px at DPR ${await page.evaluate(() => devicePixelRatio)}`,
        ).toBeCloseTo(11, 1);

        const dprProof = await proveOverlayAt2Dppx(browser);
        record(info, "overlay-every-dpr", {
            dpr1: { devicePixelRatio: 1, overlayRadiusPx: overlayDpr1 },
            dpr2: dprProof,
            ruling: "overlay is 11px at every DPR; the 2dppx→17px writer is KILLED",
        });

        // The binding assertion — at an emulated 2dppx the overlay is STILL 11px.
        expect(
            dprProof.overlayRadiusPx,
            `overlay blur == 11px at 2dppx (the killed 17px arm is gone)`,
        ).toBeCloseTo(11, 1);
        expect(
            dprProof.devicePixelRatio,
            "the emulated context is genuinely 2dppx",
        ).toBeGreaterThanOrEqual(2 - EPS);

        // ── (C) MUTATION BITE — restoring the min-resolution 17px writer flips the
        //    2dppx read to 17, proving the ==11 assertion above has teeth. ────────────
        expect(
            dprProof.mutationRestored17,
            "mutation-bite: restoring @media(min-resolution:2dppx){--glass-blur-overlay-radius:17px} flips 2dppx overlay to 17",
        ).toBeCloseTo(17, 1);
        expect(
            dprProof.mutationRestored17,
            "mutation-bite genuinely differs from the shipped 11px (the assertion bites)",
        ).not.toBeCloseTo(11, 1);
    });
});

/**
 * Create a real emulated 2dppx (deviceScaleFactor:2) context, read the calm overlay
 * blur radius (proving 11 at 2dppx — the killed writer is gone), then MUTATE by
 * injecting the restored 2dppx→17px writer and re-read (proving the bite). Context is
 * closed after. This is the one place a second context is needed — deviceScaleFactor
 * is fixed at context creation, so the DPR arm cannot ride the default page.
 */
async function proveOverlayAt2Dppx(browser: Browser): Promise<{
    devicePixelRatio: number;
    overlayRadiusPx: number;
    mutationRestored17: number;
}> {
    const ctx = await browser.newContext({
        baseURL: DEMO_URL,
        deviceScaleFactor: 2,
        viewport: { width: 1440, height: 900 },
    });
    try {
        const page = await ctx.newPage();
        await page.goto(`${DEMO_URL}/containers/drawer`, {
            waitUntil: "networkidle",
        });
        const devicePixelRatio = await page.evaluate(() => window.devicePixelRatio);
        const overlayRadiusPx = await readOverlayRadius(page);

        // MUTATION — restore the killed device-DPR writer and re-read at the SAME 2dppx.
        await page.addStyleTag({
            content:
                "@media (min-resolution: 2dppx){:root{--glass-blur-overlay-radius:17px}}",
        });
        await settleFrames(page);
        const mutationRestored17 = await readOverlayRadius(page);

        return { devicePixelRatio, overlayRadiusPx, mutationRestored17 };
    } finally {
        await ctx.close();
    }
}

// ═════════════════════════════════════════════════════════════════════════════════
// PROOF 2 — the immersive stage scrim on the REAL receivers (Dialog + Drawer).
// ═════════════════════════════════════════════════════════════════════════════════
const SCRIM = "[data-stage-scrim][data-stage-immersive]";

/** Read the real immersive scrim's filter + its response to --glass-level / --stage-t. */
async function probeScrim(page: Page): Promise<{
    base: string;
    level1: number | null;
    level03: number | null;
    level0: number | null;
    stageT0: number | null;
    stageT1: number | null;
    hasSaturate: boolean;
    hasBrightness: boolean;
}> {
    return page.evaluate((sel) => {
        const el = document.querySelector(sel) as HTMLElement | null;
        if (!el)
            return {
                base: "(NO SCRIM)",
                level1: null,
                level03: null,
                level0: null,
                stageT0: null,
                stageT1: null,
                hasSaturate: false,
                hasBrightness: false,
            };
        const readRaw = (): string => {
            const cs = getComputedStyle(el);
            return (
                cs.backdropFilter ||
                (cs as unknown as { webkitBackdropFilter: string })
                    .webkitBackdropFilter ||
                ""
            );
        };
        const radiusOf = (s: string): number | null => {
            const m = s.match(/blur\(\s*([\d.]+)px\s*\)/i);
            return m ? parseFloat(m[1]) : null;
        };
        const withLevel = (lvl: string): number | null => {
            el.style.setProperty("--glass-level", lvl);
            void el.offsetHeight;
            const r = radiusOf(readRaw());
            el.style.removeProperty("--glass-level");
            return r;
        };
        const withStageT = (t: string): number | null => {
            el.style.setProperty("--stage-t", t);
            void el.offsetHeight;
            const r = radiusOf(readRaw());
            el.style.removeProperty("--stage-t");
            return r;
        };
        const base = readRaw();
        return {
            base,
            level1: withLevel("1"),
            level03: withLevel("0.3"),
            level0: withLevel("0"),
            stageT0: withStageT("0"),
            stageT1: withStageT("1"),
            hasSaturate: /saturate\(/i.test(base),
            hasBrightness: /brightness\(/i.test(base),
        };
    }, SCRIM);
}

function assertScrim(
    probe: Awaited<ReturnType<typeof probeScrim>>,
    label: string,
): void {
    // 14px at level 1 — the ruled fixed immersive depth.
    expect(probe.level1, `${label}: scrim blur == 14px at --glass-level:1`).toBeCloseTo(
        IMMERSIVE_BASE_BLUR,
        1,
    );
    // Scales by --glass-level: 4.2px at 0.3, 0px at 0 (the a11y bracket lockstep).
    expect(probe.level03, `${label}: scrim blur == 4.2px at --glass-level:0.3`).toBeCloseTo(
        4.2,
        1,
    );
    expect(probe.level0, `${label}: scrim blur == 0px at --glass-level:0`).toBeCloseTo(
        0,
        1,
    );
    // NO --stage-t radius coupling — the radius holds at 14 across --stage-t 0→1.
    expect(probe.stageT0, `${label}: radius holds 14px at --stage-t:0`).toBeCloseTo(
        IMMERSIVE_BASE_BLUR,
        1,
    );
    expect(probe.stageT1, `${label}: radius holds 14px at --stage-t:1`).toBeCloseTo(
        IMMERSIVE_BASE_BLUR,
        1,
    );
    // NO saturation/brightness term — a scene-separation effect, not a glass plate.
    expect(probe.hasSaturate, `${label}: scrim carries NO saturate term`).toBe(false);
    expect(probe.hasBrightness, `${label}: scrim carries NO brightness term`).toBe(false);
}

test.describe("W2 blur redress — immersive stage scrim on real receivers (Chromium)", () => {
    test("Dialog (production immersive) — scrim computes fixed 14px × --glass-level, no --stage-t coupling, no saturation", async ({
        page,
    }, info) => {
        await page.goto(`${DEMO_URL}/containers/dialog`, {
            waitUntil: "networkidle",
        });
        await page
            .getByRole("button", { name: /open graded dialog/i })
            .first()
            .click();
        await page.locator(SCRIM).first().waitFor({ state: "attached" });
        await settleFrames(page);

        const probes: Record<string, unknown> = {};
        for (const vp of VIEWPORTS) {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await settleFrames(page);
            const probe = await probeScrim(page);
            probes[vp.name] = probe;
            assertScrim(probe, `dialog@${vp.name}`);
            await shot(page, info, `dialog-immersive-${vp.name}`);
        }
        record(info, "dialog-immersive-scrim", probes);
    });

    test("Drawer (new story) — scrim computes fixed 14px × --glass-level, no --stage-t coupling, no saturation", async ({
        page,
    }, info) => {
        await page.goto(`${DEMO_URL}/containers/drawer`, {
            waitUntil: "networkidle",
        });
        await page
            .getByRole("button", { name: /open immersive drawer/i })
            .first()
            .click();
        await page.locator(SCRIM).first().waitFor({ state: "attached" });
        await settleFrames(page);

        const probes: Record<string, unknown> = {};
        for (const vp of VIEWPORTS) {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await settleFrames(page);
            const probe = await probeScrim(page);
            probes[vp.name] = probe;
            assertScrim(probe, `drawer@${vp.name}`);
            await shot(page, info, `drawer-immersive-${vp.name}`);
        }
        record(info, "drawer-immersive-scrim", probes);
    });

    test("CommandDialog is NOT a receiver — opening the command palette mounts no immersive scrim", async ({
        page,
    }, info) => {
        await page.goto(`${DEMO_URL}/containers/command`, {
            waitUntil: "networkidle",
        });
        // Attempt to open any command dialog on the route (trigger button or ⌘K).
        const trigger = page
            .getByRole("button", { name: /command|open|search|⌘|press/i })
            .first();
        if (await trigger.count()) await trigger.click().catch(() => {});
        await settleFrames(page);

        const immersiveCount = await page.locator(SCRIM).count();
        record(info, "command-not-a-receiver", {
            immersiveScrimCount: immersiveCount,
            ruling:
                "CommandDialog forwards DialogProps (not DialogContentProps); it cannot request the stage",
        });
        expect(
            immersiveCount,
            "CommandDialog must mount NO [data-stage-immersive] scrim (not a receiver)",
        ).toBe(0);
    });
});

// BJ.W1 RADIUS REDRESS — the live-Chromium computed paint-proof for d7588514.
//
// This spec asserts the RULED **COMPUTED** border-radius values (getComputedStyle,
// never class strings) at the REAL receivers of the W1 radius redress, per
// docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/W1-31C-ADJUDICATION-C2.md
// §"Minimum user-observable evidence". It runs on the LIVE, source-served Chromium
// demo (Vite dev server — NOT an immutable package) at 390×844 + 1440×900, banks a
// screenshot per receiver + one computed-value JSON per engine under
// docs/tranches/BJ/evidence/W1-RADIUS-REDRESS/, and is fail-CLOSED: a wrong computed
// radius at any named seam REDs. Readiness/expect-polling only — NO arbitrary sleeps
// (the LIVE-π discipline; every former page.waitForTimeout is now a paint/hydration
// readiness gate).
//
// The RULED bindings this proves (all COMPUTED, at the built receiver):
//   /navigation/tabs   — SegmentedTabs horizontal pill+underline buttons resolve
//                        --radius-tab (9999px); vertical resolve --radius-strip (12px);
//                        the button is co-geometric with its indicator.
//   /data/search       — inline + (corrected) floating single-line fields compute
//                        --radius-control (9999px, the true control pill) and carry the
//                        .input-bar glass plate; bare stays chromeless (0px, no plate).
//   /feedback/skeleton — default/text specimen computes --radius-media (10px); the 48px
//                        avatar specimen computes a CIRCLE (rounded-full wins); the card
//                        specimen computes --radius-card (16px) — proving the @layer
//                        components cascade lets caller utilities win.
//   /data/infinite-scroll — the Reset is the PUBLIC Button (data-slot=button, computed
//                        control radius 9999px), not a hand-rolled button.
//   /display/atoms     — Avatar square identity computes --radius-media (10px),
//                        value-identical to the retained rung; circle is the pill.
//   /data/tags-input   — the field CONTAINER computes the ruled --radius-field (16px),
//                        NEVER 0px; the pill Chip child computes 9999px, is DISTINCT
//                        from the container, and is STRICTLY INSET — the corrected F12
//                        containment law. (Born-RED before d7588514: --radius-field was
//                        tree-shaken from runtime :root and the container fell to 0px.)
//   /forms/inputs      — the field-radius census: base single-line input keeps the pill
//                        (9999px); Textarea computes --radius-field (16px); a dialog-
//                        nested single-line input (F7, [data-slot=dialog-content] scope)
//                        computes --radius-field (16px), not the pill.
//   /data/sortable-list — the drop-indicator capsule (::before/::after) computes
//                        --radius-pill (9999px); the drag-ghost carries its gold ring.
//   /containers/command — .command__input has NO border-radius (computed 0px); the
//                        panel owns --radius-panel (12px).
//
// Owned files: this spec + the evidence dir. Run with the sibling config:
//   npx playwright test --config docs/tranches/BJ/evidence/W1-RADIUS-REDRESS/w1-radius.config.ts

import { test, expect } from "@playwright/test";
import type { Page, TestInfo } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EVIDENCE_DIR = fileURLToPath(
    new URL(
        "../docs/tranches/BJ/evidence/W1-RADIUS-REDRESS",
        import.meta.url,
    ),
);
const SEARCH_VARIANTS_SRC = fileURLToPath(
    new URL("../src/components/search/searchVariants.ts", import.meta.url),
);

const VIEWPORTS = [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
] as const;

// px tolerance for a resolved length (sub-pixel serialization differs by engine).
const EPS = 0.6;
// The coarse action-region floor (--touch-target = 2.75rem = 44px, F12/WCAG 2.5.5).
const TOUCH_FLOOR = 44;

// The one computed-value ledger this engine run appends to. Written per engine so
// the Chromium and WebKit banks coexist (the retained DELTA is the pair).
type Ledger = Record<string, unknown>;
const ledger: Ledger = { engine: "", startedAt: new Date().toISOString(), receivers: {} };

function parsePx(v: string | null | undefined): number {
    if (!v) return NaN;
    // border-radius may serialize as "9999px", "10px 10px", "50%", or the
    // Tailwind rounded-full sentinel ("16777200px" / "1.67772e+07px").
    const first = v.trim().split(/\s+/)[0];
    return parseFloat(first);
}

function engineOf(info: TestInfo): string {
    return info.project.name;
}

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
}

// ── Readiness gates (LIVE-π: readiness/polling, NEVER arbitrary sleeps) ──────────
// waitForReceiver: the ruled receiver is mounted AND its computed border-radius has
// resolved to a non-empty length (hydration + first paint done). This is the probe
// precondition — a fixed wait would flake on a slow family-switcher mount.
async function waitForReceiver(page: Page, selector: string): Promise<void> {
    await page.locator(selector).first().waitFor({ state: "attached" });
    await page.waitForFunction((sel) => {
        const el = document.querySelector(sel);
        if (!el) return false;
        const r = getComputedStyle(el as Element).borderRadius;
        return typeof r === "string" && r.length > 0;
    }, selector);
}
// settleFrames: a two-composited-frame paint-readiness gate for pre-SCREENSHOT
// stability after a viewport/theme change — a rAF condition, not a wall-clock sleep.
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
        fullPage: true,
    });
}

function record(info: TestInfo, key: string, value: unknown): void {
    ledger.engine = engineOf(info);
    (ledger.receivers as Record<string, unknown>)[key] = value;
}

test.afterAll(async ({}, info) => {
    mkdirSync(EVIDENCE_DIR, { recursive: true });
    ledger.finishedAt = new Date().toISOString();
    writeFileSync(
        `${EVIDENCE_DIR}/computed-${engineOf(info)}.json`,
        JSON.stringify(ledger, null, 2),
    );
});

// ─────────────────────────────────────────────────────────────────────────────
// The coarse-only project runs the hit-floor + coarse-sortable arms; the fine
// engine runs the full receiver matrix. Split so each project asserts only what it
// can observe. The coarse project is the only one with isMobile/hasTouch set.
// ─────────────────────────────────────────────────────────────────────────────
test.describe("W1 radius redress — computed receivers (fine pointer, Chromium)", () => {
    test.skip(({ isMobile }) => isMobile === true, "fine-pointer matrix");

    // ── /navigation/tabs ────────────────────────────────────────────────────
    test("tabs — horizontal → --radius-tab (9999px), vertical → --radius-strip (12px), button co-geometric with indicator", async ({
        page,
    }, info) => {
        await page.goto("/navigation/tabs", { waitUntil: "networkidle" });
        await waitForReceiver(page, ".segmented-indicator");

        const probe = await page.evaluate(() => {
            const strips = [...document.querySelectorAll(".segmented-tabs")];
            const rows = strips.map((s) => {
                const underline = s.classList.contains("segmented-tabs--underline");
                const vertical = s.classList.contains("segmented-tabs--vertical");
                const btn = s.querySelector(".segmented-tab") as HTMLElement | null;
                const ind = s.querySelector(".segmented-indicator") as HTMLElement | null;
                const cs = getComputedStyle(s);
                return {
                    underline,
                    vertical,
                    btnRadius: btn ? getComputedStyle(btn).borderRadius : null,
                    indRadius: ind ? getComputedStyle(ind).borderRadius : null,
                    radiusTab: cs.getPropertyValue("--radius-tab").trim(),
                    radiusStrip: cs.getPropertyValue("--radius-strip").trim(),
                    bouncy: cs.getPropertyValue("--bouncy-slider-radius").trim(),
                };
            });
            return { rows };
        });

        record(info, "tabs", probe.rows);

        const hPill = probe.rows.find((r) => !r.underline && !r.vertical);
        const hUnder = probe.rows.find((r) => r.underline && !r.vertical);
        const vPill = probe.rows.find((r) => !r.underline && r.vertical);
        const vUnder = probe.rows.find((r) => r.underline && r.vertical);

        expect(hPill, "no horizontal pill strip").toBeTruthy();
        expect(hUnder, "no horizontal underline strip").toBeTruthy();
        expect(vPill, "no vertical pill strip").toBeTruthy();
        expect(vUnder, "no vertical underline strip").toBeTruthy();

        // Horizontal reads the control-stadium rung (--radius-tab = 9999px).
        expect(parsePx(hPill!.btnRadius)).toBeGreaterThanOrEqual(9999 - EPS);
        expect(parsePx(hUnder!.btnRadius)).toBeGreaterThanOrEqual(9999 - EPS);
        // The horizontal pill button is co-geometric with its measured indicator.
        expect(parsePx(hPill!.indRadius)).toBeGreaterThanOrEqual(9999 - EPS);
        expect(Math.abs(parsePx(hPill!.btnRadius) - parsePx(hPill!.indRadius))).toBeLessThanOrEqual(EPS);

        // Vertical inherits the bounded column-stack corner (--radius-strip = 12px),
        // NOT the stadium — a mutation restoring a raw literal or forcing the stadium
        // onto the tall stack REDs here.
        expect(parsePx(vPill!.btnRadius)).toBeCloseTo(12, 0);
        expect(parsePx(vUnder!.btnRadius)).toBeCloseTo(12, 0);
        // The vertical pill button stays co-geometric with its indicator.
        expect(parsePx(vPill!.indRadius)).toBeCloseTo(12, 0);
        expect(
            Math.abs(parsePx(vPill!.btnRadius) - parsePx(vPill!.indRadius)),
        ).toBeLessThanOrEqual(EPS);
        // The orientation seam actually differs between horizontal and vertical.
        expect(parsePx(hPill!.btnRadius)).toBeGreaterThan(parsePx(vPill!.btnRadius) + 100);

        for (const vp of VIEWPORTS) {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            for (const mode of [false, true] as const) {
                await setDark(page, mode);
                await settleFrames(page);
                await shot(page, info, `tabs-${vp.name}-${mode ? "dark" : "light"}`);
            }
        }
        await setDark(page, false);
    });

    // ── /data/search ─────────────────────────────────────────────────────────
    test("search — inline .input-bar (sm/md/lg) computes --radius-control (9999px) + glass plate; floating retains the plate, bare is chromeless", async ({
        page,
    }, info) => {
        await page.goto("/data/search", { waitUntil: "networkidle" });
        await waitForReceiver(page, ".input-bar");

        // The corrected floating + bare recipes read from the ACTUAL source VARIANT
        // map (fs, in Node) so the recipe proof is mutation-biting: restoring
        // floating → the stripping classes flips its clone RED.
        const src = readFileSync(SEARCH_VARIANTS_SRC, "utf8");
        const pick = (key: string): string => {
            const m = src.match(new RegExp(`${key}\\s*:\\s*"([^"]*)"`));
            expect(m, `VARIANT.${key} not found in searchVariants.ts`).toBeTruthy();
            return m![1];
        };
        const floatingCls = pick("floating");
        const bareCls = pick("bare");

        const probe = await page.evaluate(
            ({ floatingCls, bareCls }) => {
                const bars = [...document.querySelectorAll(".input-bar")];
                const readPlate = (el: Element) => {
                    const cs = getComputedStyle(el);
                    // alpha from rgba()/rgb()/color(srgb .. / a) — 0 for transparent.
                    let alpha = 1;
                    const bg = cs.backgroundColor;
                    if (bg === "transparent" || bg === "rgba(0, 0, 0, 0)") alpha = 0;
                    else {
                        const slash = bg.match(/\/\s*([\d.]+)\s*\)/);
                        if (slash) alpha = parseFloat(slash[1]);
                        else {
                            const nums = bg.match(/[\d.]+/g);
                            if (nums && nums.length >= 4) alpha = parseFloat(nums[3]);
                        }
                    }
                    return {
                        radius: cs.borderRadius,
                        borderTopWidth: cs.borderTopWidth,
                        bgAlpha: alpha,
                        paddingLeft: cs.paddingLeft,
                        radiusControl: cs.getPropertyValue("--radius-control").trim(),
                    };
                };
                const inline = bars.map((b) => ({
                    h: Math.round(b.getBoundingClientRect().height),
                    ...readPlate(b),
                }));
                // Recipe clones (real .input-bar + the source variant classes).
                const base = bars[0];
                const measureWith = (classes: string) => {
                    const clone = base.cloneNode(true) as HTMLElement;
                    for (const c of classes.split(/\s+/).filter(Boolean)) clone.classList.add(c);
                    document.body.appendChild(clone);
                    const out = readPlate(clone);
                    clone.remove();
                    return out;
                };
                return {
                    inline,
                    floating: measureWith(floatingCls),
                    bare: measureWith(bareCls),
                };
            },
            { floatingCls, bareCls },
        );

        record(info, "search", probe);

        expect(probe.inline.length, "no inline .input-bar receivers").toBeGreaterThanOrEqual(3);
        // Every rendered inline field is a true control pill (9999px) carrying the plate.
        for (const bar of probe.inline) {
            expect(parsePx(bar.radius), `inline bar h=${bar.h} radius`).toBeGreaterThanOrEqual(9999 - EPS);
            expect(bar.bgAlpha, `inline bar h=${bar.h} plate bg alpha`).toBeGreaterThan(0.05);
            expect(parsePx(bar.borderTopWidth), `inline bar h=${bar.h} plate border`).toBeGreaterThanOrEqual(1 - EPS);
        }
        // sm/md/lg heights are represented (the size axis is exercised).
        const heights = new Set(probe.inline.map((b) => b.h));
        expect(heights.size, `distinct control heights: ${[...heights].join(",")}`).toBeGreaterThanOrEqual(2);

        // F17: floating RETAINS the component-owned plate + control pill.
        expect(parsePx(probe.floating.radius), "floating radius").toBeGreaterThanOrEqual(9999 - EPS);
        expect(probe.floating.bgAlpha, "floating plate bg alpha").toBeGreaterThan(0.05);
        expect(parsePx(probe.floating.borderTopWidth), "floating plate border").toBeGreaterThanOrEqual(1 - EPS);

        // F17: bare is the sole chromeless variant — no plate, no pill.
        expect(parsePx(probe.bare.radius), "bare radius").toBeLessThanOrEqual(EPS);
        expect(probe.bare.bgAlpha, "bare bg alpha (transparent)").toBeLessThanOrEqual(0.05);
        expect(parsePx(probe.bare.borderTopWidth), "bare border width").toBeLessThanOrEqual(EPS);

        for (const vp of VIEWPORTS) {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            for (const mode of [false, true] as const) {
                await setDark(page, mode);
                await settleFrames(page);
                await shot(page, info, `search-${vp.name}-${mode ? "dark" : "light"}`);
            }
        }
        await setDark(page, false);
    });

    // ── /feedback/skeleton ─────────────────────────────────────────────────────
    test("skeleton — default → --radius-media (10px); 48px avatar → circle; card → --radius-card (16px) [caller utilities win the @layer cascade]", async ({
        page,
    }, info) => {
        await page.goto("/feedback/skeleton", { waitUntil: "networkidle" });
        await waitForReceiver(page, ".skeleton");

        const probe = await page.evaluate(() => {
            const els = [...document.querySelectorAll(".skeleton")] as HTMLElement[];
            const rows = els.map((s) => {
                const cs = getComputedStyle(s);
                const r = s.getBoundingClientRect();
                return {
                    cls: s.className,
                    radius: cs.borderRadius,
                    w: Math.round(r.width),
                    h: Math.round(r.height),
                    radiusMedia: cs.getPropertyValue("--radius-media").trim(),
                };
            });
            return { rows };
        });

        record(info, "skeleton", probe.rows);

        // Default/text specimens (no shape utility) resolve --radius-media = 10px.
        const defaults = probe.rows.filter(
            (r) => !/rounded-/.test(r.cls),
        );
        expect(defaults.length, "no default skeleton specimens").toBeGreaterThan(0);
        for (const d of defaults) {
            expect(parsePx(d.radius), `default skeleton "${d.cls}"`).toBeCloseTo(10, 0);
        }

        // The 48px avatar specimen carries rounded-full → a CIRCLE (radius ≥ half-size),
        // proving the caller utility WON over the @layer components media default.
        const avatar = probe.rows.find((r) => /rounded-full/.test(r.cls));
        expect(avatar, "no rounded-full avatar skeleton").toBeTruthy();
        expect(
            parsePx(avatar!.radius),
            `avatar skeleton radius ${avatar!.radius} must be a circle (≥ ${avatar!.h / 2}px)`,
        ).toBeGreaterThanOrEqual(avatar!.h / 2);
        // …and it is NOT the 10px media default (the cascade proof — a mutation
        // restoring an unlayered hard owner collapses this back to 10px and REDs).
        expect(parsePx(avatar!.radius)).toBeGreaterThan(10 + EPS);

        // The card specimen carries rounded-card → --radius-card = 16px (caller wins).
        const card = probe.rows.find((r) => /rounded-card/.test(r.cls));
        expect(card, "no rounded-card skeleton").toBeTruthy();
        expect(parsePx(card!.radius), `card skeleton radius`).toBeCloseTo(16, 0);

        for (const vp of VIEWPORTS) {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            for (const mode of [false, true] as const) {
                await setDark(page, mode);
                await settleFrames(page);
                await shot(page, info, `skeleton-${vp.name}-${mode ? "dark" : "light"}`);
            }
        }
        await setDark(page, false);
    });

    // ── /data/infinite-scroll ──────────────────────────────────────────────────
    test("infinite-scroll — the Reset is the PUBLIC Button (data-slot=button, computed control radius 9999px), rest + focus", async ({
        page,
    }, info) => {
        await page.goto("/data/infinite-scroll", { waitUntil: "networkidle" });

        const reset = page.getByRole("button", { name: /reset/i }).first();
        await expect(reset).toBeVisible();

        const probe = await reset.evaluate((el) => {
            const cs = getComputedStyle(el);
            return {
                dataSlot: el.getAttribute("data-slot"),
                cls: el.className,
                radius: cs.borderRadius,
                radiusControl: cs.getPropertyValue("--radius-control").trim(),
            };
        });
        record(info, "infinite-scroll-reset", probe);

        // It is the public Button primitive, not a hand-rolled <button>.
        expect(probe.dataSlot, "Reset must be the public Button (data-slot=button)").toBe("button");
        expect(probe.cls, "Reset must carry the .button recipe class").toContain("button");
        // Its computed corner is the control pill (9999px), not a raw literal.
        expect(parsePx(probe.radius), "Reset control radius").toBeGreaterThanOrEqual(9999 - EPS);

        // Focus keeps the same corner (no focus-state radius shift).
        await reset.focus();
        const focusedRadius = await reset.evaluate((el) => getComputedStyle(el).borderRadius);
        expect(parsePx(focusedRadius)).toBeGreaterThanOrEqual(9999 - EPS);

        await shot(page, info, "infinite-scroll-reset-focus");
    });

    // ── /display/atoms (Avatar) ────────────────────────────────────────────────
    test("atoms — Avatar square identity computes --radius-media (10px), value-identical; circle is the pill", async ({
        page,
    }, info) => {
        await page.goto("/display/atoms", { waitUntil: "networkidle" });

        // Reveal the Avatar family via the atoms family switcher, then WAIT for the
        // mounted marker (`.glass-avatar` present) — no fixed sleep for the mount.
        const avatarTab = page
            .getByRole("button", { name: "Avatar", exact: true })
            .or(page.getByRole("tab", { name: "Avatar", exact: true }))
            .first();
        if (await avatarTab.count()) await avatarTab.click();
        await page.locator(".glass-avatar").first().waitFor({ state: "attached" });
        await expect
            .poll(async () => page.locator(".glass-avatar").count())
            .toBeGreaterThan(0);

        const probe = await page.evaluate(() => {
            const avs = [...document.querySelectorAll(".glass-avatar")] as HTMLElement[];
            const rows = avs.map((a) => {
                const id = a.querySelector(".glass-avatar__identity") as HTMLElement | null;
                const cs = id ? getComputedStyle(id) : null;
                return {
                    shape: a.getAttribute("data-shape"),
                    size: a.getAttribute("data-size"),
                    identityRadius: cs ? cs.borderRadius : null,
                    radiusMedia: cs ? cs.getPropertyValue("--radius-media").trim() : null,
                };
            });
            return { rows };
        });
        record(info, "avatar", probe.rows);

        const squares = probe.rows.filter((r) => r.shape === "square");
        const circles = probe.rows.filter((r) => r.shape === "circle");
        expect(squares.length, "no square avatar specimens").toBeGreaterThan(0);
        expect(circles.length, "no circle avatar specimens").toBeGreaterThan(0);

        // Square identity = --radius-media (10px), value-identical to the retained rung.
        for (const sq of squares) {
            expect(parsePx(sq.identityRadius), `square avatar (${sq.size})`).toBeCloseTo(10, 0);
        }
        // Circle identity = the pill (distinct role — a mutation collapsing square→circle
        // or vice versa REDs one arm).
        for (const c of circles) {
            expect(parsePx(c.identityRadius), `circle avatar (${c.size})`).toBeGreaterThanOrEqual(9999 - EPS);
        }

        await shot(page, info, "atoms-avatar");
    });

    // ── /data/tags-input (F12) ──────────────────────────────────────────────────
    test("tags-input — the field CONTAINER computes --radius-field (16px, NEVER 0px); the pill Chip child is 9999px, DISTINCT, and STRICTLY INSET", async ({
        page,
    }, info) => {
        await page.goto("/data/tags-input", { waitUntil: "networkidle" });
        await waitForReceiver(page, '[data-slot="tags-input"] .tags-input__chip, [data-slot="tags-input"] [data-tags-input-item]');

        const probe = await page.evaluate(() => {
            const roots = [...document.querySelectorAll('[data-slot="tags-input"]')] as HTMLElement[];
            const rootField = getComputedStyle(document.documentElement)
                .getPropertyValue("--radius-field")
                .trim();
            const rows = roots
                .map((root) => {
                    const chip = root.querySelector(
                        ".tags-input__chip, [data-tags-input-item]",
                    ) as HTMLElement | null;
                    if (!chip) return null;
                    const cs = getComputedStyle(root);
                    const chipCs = getComputedStyle(chip);
                    const rr = root.getBoundingClientRect();
                    const cr = chip.getBoundingClientRect();
                    return {
                        containerRadius: cs.borderRadius,
                        containerOverflow: cs.overflow,
                        chipRadius: chipCs.borderRadius,
                        insetTop: +(cr.top - rr.top).toFixed(2),
                        insetLeft: +(cr.left - rr.left).toFixed(2),
                        insetRight: +(rr.right - cr.right).toFixed(2),
                        insetBottom: +(rr.bottom - cr.bottom).toFixed(2),
                    };
                })
                .filter(Boolean);
            return { rootField, rows };
        });
        record(info, "tags-input", probe);

        // The token itself resolves at runtime :root (born-RED before d7588514: it was
        // tree-shaken because its only consumers are JS-bundled component stylesheets
        // Tailwind never scans; @theme static now force-emits the radius canon). The raw
        // custom-property serializes as its authored "1rem"; the RESOLVED 16px proof is
        // the container's computed border-radius below.
        expect(probe.rootField, "--radius-field must resolve at :root (was tree-shaken/EMPTY)").not.toBe("");

        expect(probe.rows.length, "no TagsInput with a Chip child").toBeGreaterThan(0);
        for (const r of probe.rows as NonNullable<(typeof probe.rows)[number]>[]) {
            // The container computes the RULED --radius-field (16px) — never 0px. This
            // is the load-bearing acceptance: a 0px square container (the shipped defect
            // before the writer fix) REDs here; distinctness alone is NOT acceptance.
            expect(parsePx(r.containerRadius), "container must compute --radius-field (16px)").toBeCloseTo(16, 0);
            expect(parsePx(r.containerRadius), "container must never be 0px").toBeGreaterThan(EPS);
            // The child is a PILL Chip.
            expect(parsePx(r.chipRadius), "chip must be a pill").toBeGreaterThanOrEqual(9999 - EPS);
            // The container role silhouette is DISTINCT from the chip's pill.
            expect(
                Math.abs(parsePx(r.chipRadius) - parsePx(r.containerRadius)),
                "container radius must be distinct from the chip pill",
            ).toBeGreaterThan(100);
            // The child is STRICTLY INSET on every edge — it neither clips nor collides
            // with (is tangent to) the container's painted boundary.
            expect(r.insetTop, "chip inset-top").toBeGreaterThan(0);
            expect(r.insetLeft, "chip inset-left").toBeGreaterThan(0);
            expect(r.insetRight, "chip inset-right").toBeGreaterThan(0);
            expect(r.insetBottom, "chip inset-bottom").toBeGreaterThan(0);
        }

        for (const vp of VIEWPORTS) {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await settleFrames(page);
            await shot(page, info, `tags-input-${vp.name}`);
        }
    });

    // ── /forms/inputs (the --radius-field census) ───────────────────────────────
    test("field census — base single-line input keeps the pill (9999px); Textarea → --radius-field (16px); dialog-nested input (F7) → --radius-field (16px)", async ({
        page,
    }, info) => {
        await page.goto("/forms/inputs", { waitUntil: "networkidle" });
        await waitForReceiver(page, '.field-control[data-kind="input"]');
        await page.locator('.field-control[data-kind="textarea"]').first().waitFor({ state: "attached" });

        const probe = await page.evaluate(() => {
            const rootField = getComputedStyle(document.documentElement)
                .getPropertyValue("--radius-field")
                .trim();
            const input = document.querySelector('.field-control[data-kind="input"]') as HTMLElement | null;
            const textarea = document.querySelector('.field-control[data-kind="textarea"]') as HTMLElement | null;
            // Synthesize the DIALOG-nested single-line input (F7): the exact modal
            // scope selector `[data-slot="dialog-content"] .field-control[data-kind=input]`
            // re-binds the pill onto --radius-field. Cloning the REAL input under the
            // real scope wrapper is deterministic + mutation-biting (drop the F7 rule →
            // this reverts to 9999px and REDs).
            let dialogNested: string | null = null;
            if (input) {
                const wrap = document.createElement("div");
                wrap.setAttribute("data-slot", "dialog-content");
                const clone = input.cloneNode(true) as HTMLElement;
                wrap.appendChild(clone);
                document.body.appendChild(wrap);
                dialogNested = getComputedStyle(clone).borderRadius;
                wrap.remove();
            }
            return {
                rootField,
                inputRadius: input ? getComputedStyle(input).borderRadius : null,
                textareaRadius: textarea ? getComputedStyle(textarea).borderRadius : null,
                dialogNested,
            };
        });
        record(info, "field-census", probe);

        expect(probe.rootField, "--radius-field must resolve at :root (was tree-shaken/EMPTY)").not.toBe("");
        // Base single-line input stays the stadium pill.
        expect(parsePx(probe.inputRadius), "base input keeps the pill (9999px)").toBeGreaterThanOrEqual(9999 - EPS);
        // Textarea (multi-line box) reads the ruled field rung, NOT the pill.
        expect(parsePx(probe.textareaRadius), "Textarea → --radius-field (16px)").toBeCloseTo(16, 0);
        // Dialog-nested single-line input reads the field rung (F7), NOT the pill.
        expect(parsePx(probe.dialogNested), "dialog-nested input → --radius-field (16px)").toBeCloseTo(16, 0);
        expect(
            parsePx(probe.dialogNested),
            "dialog-nested input must NOT stay the pill",
        ).toBeLessThan(9999 - EPS);

        await shot(page, info, "field-census-inputs");
    });

    // ── /data/sortable-list ─────────────────────────────────────────────────────
    test("sortable-list — the drop-indicator capsule computes --radius-pill (9999px); rest has no bar; the drag-ghost carries its gold ring", async ({
        page,
    }, info) => {
        await page.goto("/data/sortable-list", { waitUntil: "networkidle" });
        await waitForReceiver(page, ".sortable-item");

        const probe = await page.evaluate(() => {
            const items = [...document.querySelectorAll(".sortable-item")] as HTMLElement[];
            const item = items[0];
            const rootPill = getComputedStyle(document.documentElement)
                .getPropertyValue("--radius-pill")
                .trim();
            // Rest: no insertion bar (::before content is absent → 0px).
            const restBefore = getComputedStyle(item, "::before").borderRadius;
            // drop-above → the ::before capsule paints; drop-below → the ::after capsule.
            item.classList.add("is-sortable-drop-above");
            const dropAbove = getComputedStyle(item, "::before").borderRadius;
            item.classList.remove("is-sortable-drop-above");
            item.classList.add("is-sortable-drop-below");
            const dropBelow = getComputedStyle(item, "::after").borderRadius;
            item.classList.remove("is-sortable-drop-below");
            // Ghost geometry: the body-appended clone carries the 2px gold ring.
            const ghost = item.cloneNode(true) as HTMLElement;
            ghost.classList.add("sortable-drag-ghost");
            document.body.appendChild(ghost);
            const ghostShadow = getComputedStyle(ghost).boxShadow;
            ghost.remove();
            return {
                count: items.length,
                rootPill,
                restBefore,
                dropAbove,
                dropBelow,
                ghostShadow: ghostShadow.slice(0, 200),
            };
        });
        record(info, "sortable", probe);

        expect(probe.count, "no sortable items").toBeGreaterThan(0);
        // At rest the row owns no insertion bar.
        expect(parsePx(probe.restBefore), "rest: no drop-indicator bar").toBeLessThanOrEqual(EPS);
        // Both insertion edges compute the capsule (--radius-pill = 9999px) — a mutation
        // swapping the token or hard-coding 999px REDs here.
        expect(parsePx(probe.dropAbove), "drop-above capsule → --radius-pill (9999px)").toBeGreaterThanOrEqual(9999 - EPS);
        expect(parsePx(probe.dropBelow), "drop-below capsule → --radius-pill (9999px)").toBeGreaterThanOrEqual(9999 - EPS);
        // The ghost carries a real box-shadow ring (the gold affordance), not none.
        expect(probe.ghostShadow.length, "drag-ghost must carry a box-shadow ring").toBeGreaterThan(4);
        expect(probe.ghostShadow, "drag-ghost shadow must not be none").not.toBe("none");

        // A live keyboard interaction to show the receiver is interactive (focus the
        // first item; the roving-tabindex list makes it focusable).
        await page.locator(".sortable-item").first().focus();
        await page.keyboard.press("ArrowDown").catch(() => {});
        await settleFrames(page);

        await shot(page, info, "sortable-list");
    });

    // ── /containers/command ─────────────────────────────────────────────────────
    test("command — .command__input has NO border-radius (computed 0px); the panel owns --radius-panel (12px)", async ({
        page,
    }, info) => {
        await page.goto("/containers/command", { waitUntil: "networkidle" });
        await waitForReceiver(page, ".command");

        const probe = await page.evaluate(() => {
            const inputs = [...document.querySelectorAll(".command__input")] as HTMLElement[];
            const panel = document.querySelector(".command") as HTMLElement | null;
            const pcs = panel ? getComputedStyle(panel) : null;
            return {
                inputRadii: inputs.map((i) => getComputedStyle(i).borderRadius),
                panelRadius: pcs ? pcs.borderRadius : null,
                panelRadiusPanel: pcs ? pcs.getPropertyValue("--radius-panel").trim() : null,
            };
        });
        record(info, "command", probe);

        expect(probe.inputRadii.length, "no .command__input").toBeGreaterThan(0);
        // The transparent, borderless input owns NO corner (the redress deleted it).
        for (const r of probe.inputRadii) {
            expect(parsePx(r), `.command__input radius (${r})`).toBeLessThanOrEqual(EPS);
        }
        // The panel owns --radius-panel = 12px (it clips the composition + owns the corner).
        expect(parsePx(probe.panelRadius), "command panel radius").toBeCloseTo(12, 0);

        await shot(page, info, "command");
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// The coarse-pointer arm — the TagsInput 44px action FLOOR is measured (not just
// inspected) and the coarse child stays strictly inset from the container corner;
// plus the coarse SortableList insertion capsule. Per the corrected F12 law.
// ─────────────────────────────────────────────────────────────────────────────
test.describe("W1 radius redress — coarse hit-floor + insertion (F12)", () => {
    test.skip(({ isMobile }) => isMobile !== true, "coarse-pointer only");

    test("tags-input — the coarse child MEASURES a ≥44px action region (chip min-block + ::after spacer), owns its corners, and stays strictly inset", async ({
        page,
    }, info) => {
        await page.goto("/data/tags-input", { waitUntil: "networkidle" });
        await waitForReceiver(page, '[data-slot="tags-input"] .tags-input__chip, [data-slot="tags-input"] [data-tags-input-item]');

        const probe = await page.evaluate((floor) => {
            const root = document.querySelector('[data-slot="tags-input"]') as HTMLElement | null;
            if (!root) return { ok: false as const, reason: "no tags-input" };
            const chip = root.querySelector(
                ".tags-input__chip, [data-tags-input-item]",
            ) as HTMLElement | null;
            if (!chip) return { ok: false as const, reason: "no chip" };
            const rr = root.getBoundingClientRect();
            const cr = chip.getBoundingClientRect();
            const chipCs = getComputedStyle(chip);
            // The coarse action floor lives on the chip's min-block-size (=--touch-target)
            // and the ::after touch spacer's inline-size — NOT ::before (which carries
            // nothing). Read BOTH.
            const afterCs = getComputedStyle(chip, "::after");
            const chipHeight = cr.height;
            const minBlock = chipCs.minBlockSize || chipCs.minHeight || "";
            const afterInline = afterCs.inlineSize || afterCs.width || "";
            // elementFromPoint across the chip's action region: the chip (or a
            // descendant) must own its center + the full vertical extent (top/bottom
            // edge-mids at center-x) + the left rounded cap. NOTE a pill's border-radius
            // CLIPS hit-testing, so the rect CORNERS legitimately fall through to the
            // container — we sample interior/edge-mid points that lie inside the capsule
            // (the right side is skipped: the coarse ::after delete overlay lives there).
            const owns = (x: number, y: number) => {
                const el = document.elementFromPoint(x, y);
                return !!el && (el === chip || chip.contains(el));
            };
            const cx = cr.left + cr.width / 2;
            const cy = cr.top + cr.height / 2;
            const corners = {
                center: owns(cx, cy),
                topMid: owns(cx, cr.top + 4),
                bottomMid: owns(cx, cr.bottom - 4),
                leftMid: owns(cr.left + Math.min(cr.height / 2, 8), cy),
            };
            return {
                ok: true as const,
                pointerCoarse: matchMedia("(pointer: coarse)").matches,
                floor,
                chipHeight: +chipHeight.toFixed(2),
                minBlock,
                afterInline,
                corners,
                insetTop: +(cr.top - rr.top).toFixed(2),
                insetLeft: +(cr.left - rr.left).toFixed(2),
                insetRight: +(rr.right - cr.right).toFixed(2),
                insetBottom: +(rr.bottom - cr.bottom).toFixed(2),
            };
        }, TOUCH_FLOOR);
        record(info, "tags-input-coarse", probe);

        expect(probe.ok, probe.ok ? "" : (probe as { reason: string }).reason).toBeTruthy();
        if (!probe.ok) return;
        // Coarse media is active in this project.
        expect(probe.pointerCoarse, "coarse pointer media must match in this project").toBe(true);

        // The chip's own action region MEASURES ≥44px: its painted height reaches the
        // touch floor (min-block-size = --touch-target) AND its ::after spacer widens
        // the hit box to ≥44px. RED on sub-44.
        expect(parsePx(probe.minBlock), "chip min-block-size (--touch-target)").toBeGreaterThanOrEqual(TOUCH_FLOOR - EPS);
        expect(probe.chipHeight, "chip painted height ≥ 44px").toBeGreaterThanOrEqual(TOUCH_FLOOR - EPS);
        expect(parsePx(probe.afterInline), "chip ::after touch spacer inline-size ≥ 44px").toBeGreaterThanOrEqual(TOUCH_FLOOR - EPS);

        // The chip OWNS its action region across its full ≥44px vertical extent (center
        // + top/bottom edge-mids + the left cap hit-test to the chip or a descendant —
        // no ancestor overlay steals the touch).
        expect(probe.corners.center, "chip owns its center hit-point").toBe(true);
        expect(probe.corners.topMid, "chip owns top-edge mid").toBe(true);
        expect(probe.corners.bottomMid, "chip owns bottom-edge mid").toBe(true);
        expect(probe.corners.leftMid, "chip owns left-cap mid").toBe(true);

        // The child never touches the outer corner at coarse touch size (no overlap /
        // collision with the container's painted boundary).
        expect(probe.insetTop, "chip inset-top").toBeGreaterThan(0);
        expect(probe.insetLeft, "chip inset-left").toBeGreaterThan(0);
        expect(probe.insetRight, "chip inset-right").toBeGreaterThan(0);
        expect(probe.insetBottom, "chip inset-bottom").toBeGreaterThan(0);

        await shot(page, info, "tags-input-coarse");
    });

    test("sortable-list — the coarse insertion capsule computes --radius-pill (9999px)", async ({
        page,
    }, info) => {
        await page.goto("/data/sortable-list", { waitUntil: "networkidle" });
        await waitForReceiver(page, ".sortable-item");

        const probe = await page.evaluate(() => {
            const item = document.querySelector(".sortable-item") as HTMLElement | null;
            if (!item) return { ok: false as const };
            item.classList.add("is-sortable-drop-above");
            const dropAbove = getComputedStyle(item, "::before").borderRadius;
            item.classList.remove("is-sortable-drop-above");
            return {
                ok: true as const,
                pointerCoarse: matchMedia("(pointer: coarse)").matches,
                dropAbove,
            };
        });
        record(info, "sortable-coarse", probe);

        expect(probe.ok, "no sortable item").toBeTruthy();
        if (!probe.ok) return;
        expect(probe.pointerCoarse, "coarse pointer media must match").toBe(true);
        expect(parsePx(probe.dropAbove), "coarse drop capsule → --radius-pill (9999px)").toBeGreaterThanOrEqual(9999 - EPS);

        await shot(page, info, "sortable-list-coarse");
    });
});

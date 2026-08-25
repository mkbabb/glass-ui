// BJ.W1 RADIUS REDRESS — the bundled-WebKit STATIC-CASCADE DISCOVERY arm.
//
// WHAT THIS IS (and is NOT). This is NOT Safari, NOT a mounted Vue receiver, NOT
// shipped package CSS, and NOT VoiceOver. It is an ISOLATED bundled-WebKit cascade
// probe: Playwright's bundled WebKit engine resolving getComputedStyle over
//   (a) `compiled-demo.css` — the ROUTE-UNIONED DEVELOPMENT CSS captured from the
//       live Vite demo's CSSOM (`_capture_css.spec.ts` unions seven dev routes'
//       injected rules in first-observed order — NOT one package entry's graph), and
//   (b) hand-authored, CLASS-ONLY static markup (no component mounts, no behavior).
// The actual-Safari + VoiceOver + mounted-receiver matrix remains OWED and
// acceptance-RED (W1-PAINT-WORKFLOW-ADJUDICATION-C2 §3). This arm is discovery only:
// it corroborates that the SAME captured cascade resolves the ruled corner geometry
// on a second (WebKit) engine.
//
// WHY A STATIC HARNESS, NOT THE LIVE ROUTE ON WEBKIT: the Playwright-bundled WebKit
// build crashes its content process ~200ms into the demo's eager shell boot (a native
// compositing crash, reproducible headed AND headless, unaffected by neutering
// WebGL/WebGPU/backdrop). Border-radius is pure CSS and independent of that JS shell,
// so this arm probes the captured cascade over the real receiver CLASSES instead. The
// bare/floating recipes are read from the SOURCE variant map so the arm is mutation-
// biting (not a `rounded-none`→0px tautology).

import { test, expect } from "@playwright/test";
import type { Page, TestInfo } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EVIDENCE_DIR = fileURLToPath(
    new URL("../docs/tranches/BJ/evidence/W1-RADIUS-REDRESS", import.meta.url),
);
const COMPILED_CSS = readFileSync(`${EVIDENCE_DIR}/compiled-demo.css`, "utf8");
// [2026-08-25 · BK #42 W-SEARCH] ~~`SEARCH_VARIANTS_SRC`~~ — `searchVariants.ts` is
// DELETED with `SearchBar` (DELETE-with-relay, Ruling 1). The floating/bare clone half
// of the search arm is struck below; `readFileSync` stays for `COMPILED_CSS`.

const EPS = 0.6;
const parsePx = (v: string | null | undefined) =>
    v ? parseFloat(v.trim().split(/\s+/)[0]) : NaN;

// The real receiver class markup (verbatim classes observed on the live demo). The
// compiled CSS supplies every rule + the @layer theme,base,components,utilities order.
const HARNESS = `
<style>${COMPILED_CSS}</style>
<div style="padding:24px;display:flex;flex-direction:column;gap:16px;background:#f5f0e8">
  <!-- skeleton @layer cascade: default → media; rounded-full → circle; rounded-card → card -->
  <div id="sk-default" class="skeleton" style="width:180px;height:16px"></div>
  <div id="sk-avatar" class="skeleton rounded-full" style="width:48px;height:48px"></div>
  <div id="sk-card" class="skeleton rounded-card" style="width:220px;height:120px"></div>

  <!-- command: input owns NO corner; panel owns --radius-panel -->
  <div id="cmd-panel" class="command" style="width:320px">
    <div class="command__input-wrapper"><input id="cmd-input" class="command__input"></div>
  </div>

  <!-- avatar: square identity → media; circle identity → pill -->
  <div id="av-square" class="avatar" data-shape="square" data-size="md"><div class="avatar__identity"></div></div>
  <div id="av-circle" class="avatar" data-shape="circle" data-size="md"><div class="avatar__identity"></div></div>

  <!-- search: the .input-bar recipe → control pill + plate -->
  <div id="bar-inline" class="input-bar" style="width:280px"><span>inline</span></div>

  <!-- tags-input: the F12 field CONTAINER → --radius-field (16px) with a pill chip child -->
  <div id="tags" class="tags-input" data-slot="tags-input" style="width:280px"><span class="tags-input__chip">tag</span></div>

  <!-- sortable: the drop-indicator capsule → --radius-pill (::before) -->
  <ul style="list-style:none;margin:0;padding:0;width:280px">
    <li id="sortable" class="sortable-item is-sortable-drop-above" style="padding:8px">row</li>
  </ul>

  <!-- segmented orientation seam: horizontal → --radius-tab; vertical → --radius-strip -->
  <div id="seg-hp" class="segmented-tabs segmented-tabs--pill"><button class="segmented-tab">a</button></div>
  <div id="seg-hu" class="segmented-tabs segmented-tabs--underline"><button class="segmented-tab">a</button></div>
  <div id="seg-vp" class="segmented-tabs segmented-tabs--pill segmented-tabs--vertical"><button class="segmented-tab">a</button></div>
  <div id="seg-vu" class="segmented-tabs segmented-tabs--underline segmented-tabs--vertical"><button class="segmented-tab">a</button></div>

  <!-- the public Button (the InfiniteScroll Reset is this) → control pill -->
  <button id="btn" class="button">Reset</button>
</div>`;

function record(info: TestInfo, key: string, value: unknown, ledger: Record<string, unknown>) {
    (ledger.receivers as Record<string, unknown>)[key] = value;
}

async function settleFrames(page: Page): Promise<void> {
    await page.evaluate(
        () =>
            new Promise<void>((res) =>
                requestAnimationFrame(() => requestAnimationFrame(() => res())),
            ),
    );
}

test.describe("W1 radius redress — bundled-WebKit static-cascade discovery (route-unioned dev CSS, class-only markup)", () => {
    test("bundled WebKit resolves the ruled computed radii over the route-unioned cascade (discovery — not Safari, not a mounted receiver)", async ({
        page,
    }, info) => {
        const ledger: Record<string, unknown> = {
            engine: info.project.name,
            note:
                "Bundled-WebKit getComputedStyle over compiled-demo.css (route-unioned DEVELOPMENT CSS) + class-only static markup. NOT Safari, NOT shipped CSS, NO mounted Vue receiver, NO VoiceOver. Isolated cascade discovery only; the actual Safari + VoiceOver mounted-receiver matrix remains owed (acceptance-RED).",
            receivers: {},
        };

        // [2026-08-25 · BK #42 W-SEARCH] ~~the VARIANT-map read + `pick()` +
        // `floatingCls`/`bareCls`~~ — STRUCK WITH THEIR SOURCE. The arm was
        // mutation-biting against `searchVariants.ts`; that file no longer exists, and
        // a `pick()` against a deleted file is not a weaker proof, it is a crash.

        await page.setContent(HARNESS, { waitUntil: "load" });

        // Skeleton's DEFAULT radius rule is Vue-scoped
        // (`.skeleton[data-v-HASH] { border-radius: var(--radius-media) }` in
        // @layer components). Stamp the build's scope-hash attribute onto the
        // skeleton harness nodes so the real scoped rule matches — the caller
        // rounded-full/rounded-card utilities (unscoped, @layer utilities) then still
        // win the cascade, which is exactly the seam under proof.
        const scopeHash = COMPILED_CSS.match(/\.skeleton\[(data-v-[0-9a-f]+)\]/)?.[1];
        expect(scopeHash, "skeleton scope-hash not found in compiled CSS").toBeTruthy();
        await page.evaluate((attr) => {
            for (const el of document.querySelectorAll(".skeleton")) el.setAttribute(attr!, "");
        }, scopeHash);
        // Readiness: wait until the scoped skeleton rule has resolved a computed radius.
        await page.waitForFunction(() => {
            const el = document.getElementById("sk-default");
            const r = el ? getComputedStyle(el).borderRadius : "";
            return r.length > 0 && r !== "0px";
        });

        const probe = await page.evaluate(
            () => {
                const rad = (id: string) => {
                    const el = document.getElementById(id);
                    return el ? getComputedStyle(el).borderRadius : null;
                };
                const radChild = (id: string, sel: string) => {
                    const el = document.getElementById(id)?.querySelector(sel);
                    return el ? getComputedStyle(el).borderRadius : null;
                };
                const radPseudo = (id: string, pseudo: string) => {
                    const el = document.getElementById(id);
                    return el ? getComputedStyle(el, pseudo).borderRadius : null;
                };
                const plateOf = (el: Element | null) => {
                    if (!el) return null;
                    const cs = getComputedStyle(el);
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
                    return { radius: cs.borderRadius, border: cs.borderTopWidth, bgAlpha: alpha };
                };
                // [2026-08-25 · BK #42 W-SEARCH] ~~`cloneWith`~~ deleted with the two
                // variant classes it was built to apply — an unused clone helper is the
                // shim shape `overfit-structure` exists to catch.
                const inlineBar = document.getElementById("bar-inline")!;
                const root = getComputedStyle(document.documentElement);
                return {
                    tokens: {
                        media: root.getPropertyValue("--radius-media").trim(),
                        control: root.getPropertyValue("--radius-control").trim(),
                        panel: root.getPropertyValue("--radius-panel").trim(),
                        tab: root.getPropertyValue("--radius-tab").trim(),
                        strip: root.getPropertyValue("--radius-strip").trim(),
                        field: root.getPropertyValue("--radius-field").trim() || "(EMPTY)",
                        pill: root.getPropertyValue("--radius-pill").trim(),
                    },
                    skeleton: {
                        default: rad("sk-default"),
                        avatar: rad("sk-avatar"),
                        card: rad("sk-card"),
                    },
                    command: { input: rad("cmd-input"), panel: rad("cmd-panel") },
                    avatar: {
                        square: radChild("av-square", ".avatar__identity"),
                        circle: radChild("av-circle", ".avatar__identity"),
                    },
                    search: {
                        inline: plateOf(inlineBar),
                    },
                    tags: { container: rad("tags"), chip: radChild("tags", ".tags-input__chip") },
                    sortable: { dropAbove: radPseudo("sortable", "::before") },
                    segmented: {
                        hpBtn: radChild("seg-hp", ".segmented-tab"),
                        huBtn: radChild("seg-hu", ".segmented-tab"),
                        vpBtn: radChild("seg-vp", ".segmented-tab"),
                        vuBtn: radChild("seg-vu", ".segmented-tab"),
                    },
                    button: rad("btn"),
                };
            },
        );

        record(info, "all", probe, ledger);

        // ── token presence on WebKit. --radius-field now emits at :root (the @theme
        //    static writer fix) — the F12 field-container geometry resolves on this
        //    engine too, no longer the recorded (EMPTY). ──────────────────────────
        expect(probe.tokens.field, "--radius-field must emit at :root (writer fix)").not.toBe("(EMPTY)");

        // ── skeleton @layer components cascade (caller utilities win) ───────────
        expect(parsePx(probe.skeleton.default), "skeleton default → media").toBeCloseTo(10, 0);
        expect(parsePx(probe.skeleton.avatar), "skeleton rounded-full → circle").toBeGreaterThanOrEqual(24);
        expect(parsePx(probe.skeleton.avatar)).toBeGreaterThan(10 + EPS);
        expect(parsePx(probe.skeleton.card), "skeleton rounded-card → card").toBeCloseTo(16, 0);

        // ── command: input NO radius; panel owns --radius-panel ─────────────────
        expect(parsePx(probe.command.input), "command input radius").toBeLessThanOrEqual(EPS);
        expect(parsePx(probe.command.panel), "command panel → --radius-panel").toBeCloseTo(12, 0);

        // ── avatar: square → media; circle → pill ───────────────────────────────
        expect(parsePx(probe.avatar.square), "avatar square → media").toBeCloseTo(10, 0);
        expect(parsePx(probe.avatar.circle), "avatar circle → pill").toBeGreaterThanOrEqual(9999 - EPS);

        // ── search: the .input-bar RECIPE is a control pill carrying the plate ──
        // [2026-08-25 · BK #42 W-SEARCH] The three ~~floating/bare~~ assertions are
        // struck with the CVA. The recipe itself is NOT struck — `.input-bar` outlives
        // `SearchBar` (dock search.css + the dock-search demo + four value.js selector
        // sites read it), so its WebKit-resolved role radius still needs holding.
        expect(parsePx(probe.search.inline!.radius), "inline input-bar → control pill").toBeGreaterThanOrEqual(9999 - EPS);
        expect(probe.search.inline!.bgAlpha, "inline plate bg").toBeGreaterThan(0.05);
        expect(parsePx(probe.search.inline!.border), "inline plate border").toBeGreaterThanOrEqual(1 - EPS);

        // ── tags-input F12: the CONTAINER resolves --radius-field (16px) on WebKit too
        //    — the cross-engine corroboration of the writer fix (was (EMPTY)/0px). The
        //    chip PILL is asserted on the live-mounted Chromium arm (the chip's pill
        //    radius rides the Chip component's `.glass-capsule` utility, not a class this
        //    static harness reproduces); recorded here for reference, not asserted. ────
        expect(parsePx(probe.tags.container), "tags-input container → --radius-field (16px)").toBeCloseTo(16, 0);
        expect(parsePx(probe.tags.container), "tags-input container never 0px").toBeGreaterThan(EPS);

        // ── sortable: the drop-indicator capsule → --radius-pill ────────────────
        expect(parsePx(probe.sortable.dropAbove), "sortable drop capsule → --radius-pill").toBeGreaterThanOrEqual(9999 - EPS);

        // ── segmented orientation seam ──────────────────────────────────────────
        expect(parsePx(probe.segmented.hpBtn), "horizontal pill → --radius-tab").toBeGreaterThanOrEqual(9999 - EPS);
        expect(parsePx(probe.segmented.huBtn), "horizontal underline → --radius-tab").toBeGreaterThanOrEqual(9999 - EPS);
        expect(parsePx(probe.segmented.vpBtn), "vertical pill → --radius-strip").toBeCloseTo(12, 0);
        expect(parsePx(probe.segmented.vuBtn), "vertical underline → --radius-strip").toBeCloseTo(12, 0);

        // ── the public Button (InfiniteScroll Reset) → control pill ─────────────
        expect(parsePx(probe.button), "public Button → control pill").toBeGreaterThanOrEqual(9999 - EPS);

        // Screenshots at both mandated viewports.
        mkdirSync(EVIDENCE_DIR, { recursive: true });
        for (const vp of [
            { name: "desktop", width: 1440, height: 900 },
            { name: "mobile", width: 390, height: 844 },
        ]) {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await settleFrames(page);
            await page.screenshot({
                path: `${EVIDENCE_DIR}/${info.project.name}--cascade-harness-${vp.name}.png`,
                fullPage: true,
            });
        }

        ledger.finishedAt = new Date().toISOString();
        writeFileSync(
            `${EVIDENCE_DIR}/computed-${info.project.name}.json`,
            JSON.stringify(ledger, null, 2),
        );
    });
});

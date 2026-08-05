// BI.W-SPLITCHARS-ARIA — a11y-splitchars.spec.ts, the π ARIA-in-HTML readback over
// the SplitChars family (the binding PAINT truth behind proof:a11y's SC1 device-free
// clause).
//
// THE DEFECT (born-RED at HEAD): SplitChars minted an `aria-label` on a role-LESS
// generic wrapper (the default `<span>`). A bare `<span aria-label>` bears no name
// from author, so the label is invalid-per-spec (axe `aria-prohibited-attr` /
// ARIA-in-HTML) and AT support is undefined. The fix: the labeled wrapper carries
// `role="img"` (the accessible-name-bearing role for a graphic-of-text whose glyph
// children are decorative) — the StatusDot conditional-role idiom, so a consumer that
// overrides `as` to a natively name-bearing element (a heading, a link) KEEPS that
// native role and is not clobbered.
//
// THE BINDING ASSERTION is the RENDERED accessibility tree — the browser's OWN
// accessible-name computation (honoring aria-label / the native heading role, exactly
// as axe does), NOT a source grep. The SplitChars family page /motion/text-motion bears
// SplitChars wrappers on load (every StorySection HEADING is itself a `<SplitChars
// :stagger=false>` → a default-span, so role="img" host). The FLOOR — zero role-less
// labeled wrappers survive + every glyph `.char` stays aria-hidden + a role="img" host
// resolves its aria-label name — is viewport-invariant and runs on every project. The
// BOTH-BRANCH matrix (the `as="h1"`/`as="h2"` demo words stay `heading`s, role NOT
// force-added, yet resolve their aria-label name) lives under the "Split chars" tab; the
// family switcher `responsive`-collapses to a <Select> on a narrow viewport, so the tab
// branch runs where the tab strip is present (desktop) — the a11y contract it exercises
// is viewport-invariant and the floor already proves it on the coarse-touch project.
//
// LOCAL-only — rides the B-close gestalt ceremony (W-GESTALT-LEDGER-FILE oracle + the
// close battery). The WebKit/Safari arm rides the π batch (#92): this spec is engine-
// agnostic (pure a11y tree), runs on the default projects (chromium-headless-new +
// coarse-touch); the webkit project's `testMatch` is scoped to the WebGL specs.
// Fail-CLOSED: a role-less labeled wrapper reds the readback, exit non-zero.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { resolveScene } from "./pi-manifest.ts";

// The SplitChars family page (folds typewriter · split-chars · countup under
// <FamilyTabs>; `animated-digit` was deleted whole at BK #18). Resolved by STORY id against the manifest source-of-truth, so a
// later IA prune that re-homes the motion band tracks the id rather than driving a dead
// route.
const TEXT_MOTION = resolveScene("motion", "text-motion");

// The name-from-author HTML hosts — a SplitChars `as` override to one of these keeps
// its native role, so a bound `aria-label` is spec-valid WITHOUT `role="img"`. Any
// OTHER (role-less generic) labeled wrapper MUST carry `role="img"`.
const NAME_BEARING = ["H1", "H2", "H3", "H4", "H5", "H6", "A", "BUTTON", "IMG", "LABEL", "OUTPUT"];

// Device-free ARIA-in-HTML truth: no labeled SplitChars wrapper is a role-less generic
// element (the axe `aria-prohibited-attr` = 0 assertion, expressed on the live tree).
async function assertNoProhibitedAria(page: Page, label: string): Promise<void> {
    const bad = await page.evaluate((nameBearing) => {
        // Every SplitChars wrapper composes `.char-stagger` (or bare `.char` children)
        // and carries the `aria-label` — filter `[aria-label]` down to those hosts.
        const hosts = Array.from(document.querySelectorAll("[aria-label]")).filter(
            (el) =>
                el.classList.contains("char-stagger") ||
                el.querySelector(":scope > .char") != null,
        );
        return {
            hostCount: hosts.length,
            offenders: hosts
                .filter((el) => {
                    const role = el.getAttribute("role");
                    // spec-valid iff a name-bearing role is carried OR the host tag is
                    // itself a name-from-author element.
                    return role !== "img" && !nameBearing.includes(el.tagName);
                })
                .map(
                    (el) =>
                        `${el.tagName.toLowerCase()}[aria-label="${el.getAttribute(
                            "aria-label",
                        )}"] role=${el.getAttribute("role")}`,
                ),
        };
    }, NAME_BEARING);
    // The route must actually render SplitChars wrappers (else the readback is vacuous).
    expect(bad.hostCount, `${label}: no SplitChars wrapper rendered`).toBeGreaterThan(0);
    expect(
        bad.offenders,
        `${label}: role-less labeled SplitChars wrapper(s) — a bound aria-label on a generic element is an ARIA-in-HTML violation (aria-prohibited-attr): ${bad.offenders.join(
            "; ",
        )}`,
    ).toEqual([]);
}

// Every glyph `.char` span stays aria-hidden, so the accessible name is the ONE word
// (the aria-label), never the per-glyph spell-out.
async function assertGlyphsHidden(page: Page, label: string): Promise<void> {
    const glyphs = await page.evaluate(() => {
        const chars = Array.from(document.querySelectorAll(".char"));
        return {
            total: chars.length,
            unhidden: chars.filter((c) => c.getAttribute("aria-hidden") !== "true")
                .length,
        };
    });
    expect(glyphs.total, `${label}: no .char glyphs rendered`).toBeGreaterThan(0);
    expect(
        glyphs.unhidden,
        `${label}: ${glyphs.unhidden} .char glyph(s) are not aria-hidden — the spell-out leaks into the accessible name`,
    ).toBe(0);
}

// Mount the split-chars member panel (the demo's explicit words + its StorySection
// heading). The <FamilyTabs> switcher is a tab strip at/above its breakpoint and a
// `responsive`-collapsed <Select> below it — activate whichever is present, so the same
// (viewport-invariant) a11y readback runs on the desktop AND coarse-touch projects.
async function activateSplitChars(page: Page): Promise<void> {
    const tab = page.getByRole("tab", { name: "Split chars" });
    if ((await tab.count()) > 0) {
        await tab.click();
        return;
    }
    // Below the breakpoint the strip collapsed to a <Select> (a `role="combobox"` inside
    // the family switcher) — open it and pick the member.
    await page.locator(".story-family__switcher [role='combobox']").first().click();
    await page.getByRole("option", { name: "Split chars" }).click();
}

// A default-`span` SplitChars resolves in the a11y tree as an `img` whose accessible
// name is its aria-label — the load-bearing proof that role="img" was applied (a
// role-less span would NOT resolve as an img). Picks a live role="img" host and reads
// its name back through the browser's OWN computation.
async function assertSpanBranchNamed(page: Page, label: string): Promise<void> {
    const name = await page.evaluate(() => {
        const host = Array.from(
            document.querySelectorAll('[aria-label][role="img"]'),
        ).find(
            (el) =>
                el.classList.contains("char-stagger") ||
                el.querySelector(":scope > .char") != null,
        );
        return host?.getAttribute("aria-label") ?? null;
    });
    expect(
        name,
        `${label}: no role="img" SplitChars host in the tree — the default-span fix did not apply`,
    ).not.toBeNull();
    await expect(
        page.getByRole("img", { name: name! }).first(),
        `${label}: role="img" SplitChars "${name}" resolves no accessible name`,
    ).toBeVisible();
}

test.describe("a11y-splitchars (π lane — the SplitChars accessible name is spec-valid, no ARIA-in-HTML)", () => {
    test("no role-less labeled wrapper, both branches named, light + dark", async ({
        page,
    }) => {
        await page.goto(TEXT_MOTION.path, { waitUntil: "networkidle" });

        // Mount the split-chars member (its words render only once its panel is active).
        await activateSplitChars(page);
        // The `as="h1"` hero word confirms the panel mounted AND exercises the
        // name-bearing branch: it KEEPS its heading role (role NOT force-clobbered) yet
        // resolves its aria-label accessible name.
        await expect(
            page.getByRole("heading", { name: "Fourier" }),
            "as=h1 word stays a heading, named by aria-label (role not clobbered)",
        ).toBeVisible();

        // ── the ARIA-in-HTML floor (light) ──
        await assertNoProhibitedAria(page, "split-chars (light)");
        await assertGlyphsHidden(page, "split-chars (light)");
        // A default-span SplitChars resolves as role="img" with its aria-label name —
        // the load-bearing proof of the fix (the StorySection heading is such a host).
        await assertSpanBranchNamed(page, "split-chars (light)");
        // The `as="h2"` word also stays a heading, named by its aria-label.
        await expect(
            page.getByRole("heading", { name: "Compose Refine Ship" }),
            "as=h2 word stays a heading, named by aria-label",
        ).toBeVisible();

        // ── mode-invariance: the accessible name / role do not change with color mode ──
        await page.evaluate(() => document.documentElement.classList.add("dark"));
        await assertNoProhibitedAria(page, "split-chars (dark)");
        await assertSpanBranchNamed(page, "split-chars (dark)");
        await expect(page.getByRole("heading", { name: "Fourier" })).toBeVisible();
    });
});

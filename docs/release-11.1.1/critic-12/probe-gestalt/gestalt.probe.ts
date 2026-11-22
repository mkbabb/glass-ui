// Critic 12, readings only: every surface the exits harness holds (and the leave harness's
// hover card and ContextMenu), filmed per frame through its entrance and through one exit,
// with the film's computed scale, transform and filter on every frame. It asks which
// channels each surface moves on the way in and the way out, so the gestalt reads whole:
// the gate's standing, turn and exit cells attach only their [ms, value] tables.
import { test, type Page } from "@playwright/test";
import { gotoReady, isPhone, markFilm, pressOn, startFilm, stopFilm } from "../release-11-1-1/film";

const HARNESS = "/tests-visual/release-11-1-1/exits-harness.html";
const LEAVE = "/tests-visual/release-11-1-1/leave-harness.html";
const EXPAND = '[data-testid="x-expand"]';
const PANEL = `${EXPAND}[data-state="expanded"] > [data-part="panel"]`;

type Act = (page: Page, project: string) => Promise<void>;
const tap = (sel: string): Act => (page, project) => pressOn(page, project, sel);
const escape: Act = async (page) => page.keyboard.press("Escape");

type Case = { name: string; content: string; film?: string; open: Act; close: Act; path?: string; desktopOnly?: boolean; ready?: string };

const cases: Case[] = [
    { name: "Select", content: '[data-testid="x-select-content"]', open: tap('[data-testid="x-select"]'), close: escape },
    { name: "DropdownMenu", content: '[data-testid="x-menu-content"]', open: tap('[data-testid="x-menu"]'), close: escape },
    { name: "plain Select", content: '[data-testid="x-plain-select-content"]', open: tap('[data-testid="x-plain-select"]'), close: escape },
    { name: "Popover", content: '[data-testid="x-popover-content"]', open: tap('[data-testid="x-popover"]'), close: escape },
    {
        name: "Tooltip",
        content: '[data-testid="x-tooltip-content"]',
        open: async (page, project) => {
            if (isPhone(project)) await page.locator('[data-testid="x-tooltip"]').focus();
            else await page.locator('[data-testid="x-tooltip"]').hover();
        },
        close: escape,
    },
    { name: "Toast", content: '[data-slot="toast"]', film: '[data-slot="toast"] > div', open: tap('[data-testid="x-toast"]'), close: tap('[data-slot="toast"] button[aria-label="Dismiss"]') },
    ...(["dialog", "sheet-right", "sheet-bottom", "sheet-top", "sheet-left"] as const).map((id) => ({
        name: id === "dialog" ? "Dialog" : `Sheet ${id.slice(6)}`,
        content: `[data-testid="x-${id}-content"]`,
        open: tap(`[data-testid="x-${id}"]`),
        close: escape,
    })),
    { name: "detented Sheet", content: '[data-testid="x-detent-content"]', open: tap('[data-testid="x-detent"]'), close: escape },
    { name: "Collapsible", content: '[data-testid="x-collapsible-content"]', open: tap('[data-testid="x-collapsible"]'), close: tap('[data-testid="x-collapsible"]') },
    { name: "Accordion", content: '[data-testid="x-accordion-content"]', open: tap('[data-testid="x-accordion"]'), close: tap('[data-testid="x-accordion"]') },
    { name: "ExpandableContainer", content: PANEL, open: tap(`${EXPAND} [data-mode="expand"]`), close: escape },
    { name: "CommandDialog", content: ".command-dialog__content", path: "/containers/command", open: tap("button:has-text('Open palette')"), close: escape },
    {
        name: "hover card",
        content: '[data-testid="l-hover-content"]',
        path: LEAVE,
        desktopOnly: true,
        open: async (page) => page.locator('[data-testid="l-hover"]').hover(),
        close: async (page) => page.mouse.move(700, 700, { steps: 6 }),
    },
    {
        name: "ContextMenu",
        content: '[data-testid="l-ctx-content"]',
        path: LEAVE,
        desktopOnly: true,
        open: async (page) => page.locator('[data-testid="l-ctx"]').click({ button: "right" }),
        close: escape,
    },
];

for (const c of cases) {
    test(`gestalt · ${c.name}, in and out`, async ({ page }, info) => {
        const project = info.project.name;
        test.skip(Boolean(c.desktopOnly) && isPhone(project), "it does not open on touch");
        await gotoReady(page, c.path ?? HARNESS);
        if (!c.path || c.path === HARNESS) await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
        await page.waitForTimeout(400);
        if (c.path === LEAVE) await page.mouse.move(700, 700);
        await startFilm(page, c.film ?? c.content);
        await markFilm(page);
        await c.open(page, project);
        const enter = await stopFilm(page, 1100);
        await page.waitForTimeout(300);
        await startFilm(page, c.film ?? c.content);
        await markFilm(page);
        await c.close(page, project);
        const exit = await stopFilm(page, 1400);
        await info.attach("gestalt", { body: JSON.stringify({ enter, exit }), contentType: "application/json" });
    });
}

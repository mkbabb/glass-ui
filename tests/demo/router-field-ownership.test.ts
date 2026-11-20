import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { router } from "../../demo/router";
import { CATEGORIES } from "../../demo/stories/manifest";

const SHELL = resolve(__dirname, "../../demo/shell");

const STORIES = resolve(__dirname, "../../demo/stories");
const read = (path: string): string => (existsSync(path) ? readFileSync(path, "utf8") : "");
const strip = (src: string): string =>
    src.replace(/<!--[\s\S]*?-->/g, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

// A live canvas in a file: a substrate component, or a stage told to carry its field.
const LIVE_CANVAS = /<(?:Aurora|Blob|Constellation|FourierField)\b|<StoryStage\b[^>]*\sfield[\s>]/;

describe("demo route field ownership", () => {
    afterEach(async () => {
        await router.push("/");
    });

    // The declaration lives on the row, beside the page it describes; this reads the
    // page's own files so a stage that gains a canvas without saying so fails here.
    it("every row declares exactly the canvas its files mount", () => {
        for (const category of CATEGORIES) {
            for (const story of category.stories) {
                const base = join(STORIES, category.id, story.id);
                const page = strip(read(`${base}.vue`));
                const stage = strip(read(`${base}.stage.vue`));
                const tile = strip(read(`${base}.tile.vue`));
                const card = tile
                    ? tile + (tile.includes(`./${story.id}.stage.vue`) ? stage : "")
                    : stage;
                const expected = LIVE_CANVAS.test(card)
                    ? "card"
                    : LIVE_CANVAS.test(page) || LIVE_CANVAS.test(stage)
                      ? "page"
                      : undefined;
                expect(story.canvas, `${category.id}/${story.id}`).toBe(expected);
            }
        }
    });

    const meta = (path: string) => router.getRoutes().find((r) => r.path === path)?.meta;

    it("a page that runs its own canvas holds the shell's field static; others keep it live", () => {
        for (const category of CATEGORIES) {
            for (const story of category.stories) {
                const path = `/${category.id}/${story.id}`;
                expect(meta(path)?.ownsCanvas, path).toBe(Boolean(story.canvas));
            }
        }
    });

    it("a page of cards that runs a canvas holds the shell's field static", () => {
        for (const category of CATEGORIES) {
            expect(meta(`/${category.id}`)?.ownsCanvas, `/${category.id}`).toBe(
                category.stories.some((s) => s.canvas === "card"),
            );
        }
        expect(meta("/")?.ownsCanvas).toBe(CATEGORIES.some((c) => c.stories[0]?.canvas === "card"));
    });

    it("the shell reads the declaration and nothing else", async () => {
        await router.push("/substrates/aurora");
        expect(router.currentRoute.value.meta.ownsCanvas).toBe(true);
        await router.push("/display/buttons");
        expect(router.currentRoute.value.meta.ownsCanvas).toBe(false);
        for (const category of CATEGORIES) {
            for (const story of category.stories) expect(story).not.toHaveProperty("background");
        }
    }, 30_000);

    // BK #21 W-DAG-REDUCE. The shell field used to be a `shellFieldActive` computed
    // EXPORTED FROM `demo/router.ts` and imported back down into `AppShell.vue` — the
    // one back edge holding the `demo` ↔ `demo/shell` module cycle (M03) together. It
    // was a pure negation of the `meta.suppressesShellField` the cases above assert, so
    // severing it cost the suite nothing and cost the graph a cycle: `AppShell` already
    // holds `useRoute()`, which IS `router.currentRoute`, and now computes the
    // projection where it is consumed.
    //
    // THIS ARM IS A TRIPWIRE, NOT THE LOCK. [2026-08-10 · BK #21 — cure C1.] It reads
    // TEXT, so it can only ever catch the specifier shapes it was taught; the RESOLVING
    // lock is `scripts/import-dag.mjs`, which resolves every specifier on disk and
    // fail-closes on a re-formed `demo` ↔ `demo/shell` cycle whatever the shape (its M03
    // owner rows are struck for exactly this reason). Keep the tripwire because it names
    // the defect at the point of edit and costs nothing; do not mistake it for the proof.
    // The pattern below is widened past its original `../router`-only form to the
    // alternate-climb, `.ts`-suffixed, and dynamic-`import()` shapes.
    it("no file under demo/shell/ imports from demo/router — M03 stays dissolved", () => {
        const offenders: string[] = [];
        const walk = (dir: string): void => {
            for (const entry of readdirSync(dir, { withFileTypes: true })) {
                const path = join(dir, entry.name);
                if (entry.isDirectory()) {
                    walk(path);
                    continue;
                }
                if (!/\.(ts|vue)$/.test(entry.name)) continue;
                // Matches `"../router"`, `"../../router"`, the alternate climb
                // `"../../demo/router"`, an explicit `".ts"` suffix, and the dynamic
                // `import("../router")` form as well as `from`; a same-directory
                // `./router` would be a different file and is deliberately not matched.
                const text = readFileSync(path, "utf8");
                for (const m of text.matchAll(
                    /\b(?:from|import)\s*\(?\s*["']((?:\.\.\/)+(?:demo\/)?router(?:\.ts)?)["']/g,
                )) {
                    offenders.push(`${path.slice(SHELL.length + 1)} → ${m[1]}`);
                }
            }
        };
        walk(SHELL);
        expect(offenders, `demo/shell → demo/router edges: ${offenders.join(", ")}`).toEqual(
            [],
        );
    });
});

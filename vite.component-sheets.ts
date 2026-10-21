import { dirname, relative, resolve, sep } from "node:path";
import type { Plugin } from "vite";

/**
 * vite.component-sheets — per-component stylesheets ship beside the component,
 * not inside the `/styles` entry (atlas U/B7 F5).
 *
 * A component whose rules only matter when it renders (Configurator, MusicStaff,
 * Metric, the Deck substrate, Carousel) imports its own sheet from script:
 *
 *     import "./styles.css";
 *
 * In glass-ui's own dev server and in vitest that is an ordinary CSS import. In
 * the library build this plugin keeps the import EXTERNAL, so the compiled chunk
 * carries `import "./components/<owner>/styles.css"` and the consumer's bundler
 * loads the sheet with the chunk that uses the component. Without it, Vite folds
 * the sheet into `glass-ui.css`, which `foldSfcBundle` imports into
 * `dist/styles/index.css`, and every consumer pays for it on first paint.
 *
 * The sheet itself is published by the style closure (`collectStyleClosure`
 * promotes script-imported CSS to a copied asset), minified with the rest of
 * `dist/components/**`.
 *
 * Only a `.css` file under `src/components/` imported from script is taken.
 * SFC `<style src>` blocks are untouched (they are Vue style modules, not
 * script imports).
 */
const SCHEME = "glass-ui-component-sheet:";

export function componentSheets(): Plugin {
    let root = process.cwd();
    return {
        name: "glass-ui:component-sheets",
        apply: "build",
        enforce: "pre",
        configResolved(config) {
            root = config.root;
        },
        resolveId(source, importer) {
            // A query marks a Vue style block (`<style src>`), which stays in the SFC bundle.
            if (!importer || source.includes("?") || !source.endsWith(".css") || !source.startsWith(".")) {
                return null;
            }
            const file = resolve(dirname(importer.split("?", 1)[0]), source);
            const components = resolve(root, "src", "components") + sep;
            if (!file.startsWith(components)) return null;
            const rel = relative(resolve(root, "src"), file).split(sep).join("/");
            return { id: `${SCHEME}${rel}`, external: true, moduleSideEffects: true };
        },
        // Every library chunk is flat at the output root, so the shipped sheet sits at
        // `./components/<owner>/…` from any chunk.
        renderChunk(code) {
            if (!code.includes(SCHEME)) return null;
            return { code: code.split(SCHEME).join("./"), map: null };
        },
    };
}

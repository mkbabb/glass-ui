import { readFileSync } from "node:fs";
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
 * loads the sheet with the chunk that uses the component, as the sheet beside its
 * source (`dist/components/<owner>/styles.css`).
 *
 * The sheet itself is published by the style closure (`collectStyleClosure`
 * promotes script-imported CSS to a copied asset), minified with the rest of
 * `dist/components/**`.
 *
 * Only a `.css` file under `src/components/` imported from script is taken.
 * SFC `<style src>` blocks are untouched (they are Vue style modules, not
 * script imports).
 *
 * The SFC styles follow the same law (U/B7b X3). With `build.cssCodeSplit` the
 * library build emits one sheet per chunk; `generateBundle` writes
 * `import "./<sheet>.css";` at the head of each chunk that owns one, and opens each
 * sheet with the layer order `src/styles/index.css` declares, so a sheet that loads
 * before the entry cannot rank `components` ahead of `theme` and `base`.
 */
const SCHEME = "glass-ui-component-sheet:";

export function componentSheets(): Plugin {
    let root = process.cwd();
    let layerOrder = "";
    return {
        name: "glass-ui:component-sheets",
        apply: "build",
        enforce: "pre",
        configResolved(config) {
            root = config.root;
            const order = readFileSync(resolve(root, "src/styles/index.css"), "utf8").match(/^@layer [^;{]+;/m);
            if (!order) throw new Error("component-sheets: src/styles/index.css declares no @layer order");
            layerOrder = order[0];
        },
        generateBundle(_options, bundle) {
            for (const output of Object.values(bundle)) {
                if (output.type === "asset" && output.fileName.endsWith(".css")) {
                    output.source = `${layerOrder}${String(output.source)}`;
                    continue;
                }
                if (output.type !== "chunk") continue;
                const sheets = [...(output.viteMetadata?.importedCss ?? [])];
                if (!sheets.length) continue;
                const from = dirname(output.fileName);
                const lines = sheets.map((sheet) => {
                    const path = relative(from, sheet).split(sep).join("/");
                    return `import "${path.startsWith(".") ? path : `./${path}`}";\n`;
                });
                output.code = lines.join("") + output.code;
            }
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

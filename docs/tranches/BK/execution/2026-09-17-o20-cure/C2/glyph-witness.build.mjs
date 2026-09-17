// Lane C2 — the paint witness. Compiles the LIBRARY's own CSS with the repo's own
// tailwindcss 4.3.3 over the class string the LIVE alertVariants() produces, and writes a
// page with one toned Alert. The class string is read from the library, never retyped, so
// the page witnesses the bytes on disk at the moment it is built.
//
// argv[2] = output tag ("before" | "after")

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { compile } from "tailwindcss";
import { createServer } from "vite";
import vue from "@vitejs/plugin-vue";

const REPO = "/Users/mkbabb/Programming/glass-ui";
const OUT = dirname(fileURLToPath(import.meta.url));
const tag = process.argv[2] ?? "before";

// Load the LIBRARY module for real (SFC re-exports and all) so the class string under
// test is the one the library produces, not a transcription of it.
const server = await createServer({
    root: REPO,
    configFile: false,
    plugins: [vue()],
    server: { middlewareMode: true },
    appType: "custom",
    resolve: { alias: { "@glass": resolve(REPO, "src") } },
});
const { alertVariants } = await server.ssrLoadModule("/src/components/alert/index.ts");
await server.close();

const neutral = alertVariants();
const success = alertVariants({ tone: "success" });
console.log(`[${tag}] neutral = ${neutral}`);
console.log(`[${tag}] success = ${success}`);

const body = `
<main class="page">
  <div id="neutral" class="${neutral}">
    <svg id="neutral-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
    <div data-slot="alert-title">Neutral alert</div>
    <div data-slot="alert-description">The plate ink, unchanged by this cure.</div>
  </div>
  <div id="success" class="${success}">
    <svg id="success-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
    <div data-slot="alert-title">Success alert</div>
    <div data-slot="alert-description">The glyph is the only channel the tone has.</div>
  </div>
</main>`;

// The consumer's own cascade, verbatim from src/styles/index.css:7-9.
const source = `
@import "tailwindcss";
@import "tw-animate-css";
@import "${resolve(REPO, "src/styles/index.css")}";
@source inline("${[...new Set([...neutral.split(/\s+/), ...success.split(/\s+/)])].join(" ")}");
@layer base {
  html { color-scheme: light; }
  body { background: var(--background); margin: 0; padding: 3rem; font-family: system-ui, sans-serif; }
  .page { display: grid; gap: 1.5rem; max-width: 34rem; margin: 0 auto; }
}
`;

const compiled = await compile(source, {
    base: resolve(REPO, "src/styles"),
    loadStylesheet: async (id, base) => {
        const { readFileSync } = await import("node:fs");
        const { createRequire } = await import("node:module");
        const require_ = createRequire(resolve(REPO, "package.json"));
        let path;
        if (id.startsWith(".") || id.startsWith("/")) path = resolve(base, id);
        else if (id === "tailwindcss") path = require_.resolve("tailwindcss/index.css");
        else {
            const root = resolve(REPO, "node_modules", id);
            const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
            const dot = pkg.exports?.["."];
            const entry =
                typeof dot === "string"
                    ? dot
                    : (dot?.style ?? dot?.default ?? pkg.style ?? pkg.main);
            path = resolve(root, entry);
        }
        return { path, base: dirname(path), content: readFileSync(path, "utf8") };
    },
    loadModule: async (id, base) => {
        const { createRequire } = await import("node:module");
        const path =
            id.startsWith(".") || id.startsWith("/")
                ? resolve(base, id)
                : createRequire(resolve(REPO, "package.json")).resolve(id);
        return { module: (await import(pathToFileURL(path).href)).default, base: dirname(path) };
    },
});
const candidates = [...new Set([...neutral.split(/\s+/), ...success.split(/\s+/)])];
const css = compiled.build(candidates);

mkdirSync(OUT, { recursive: true });
writeFileSync(resolve(OUT, `witness-${tag}.css`), css);
writeFileSync(
    resolve(OUT, `witness-${tag}.html`),
    `<!doctype html><html lang="en" style="color-scheme: light"><head><meta charset="utf-8"><meta name="color-scheme" content="light"><title>C2 glyph witness — ${tag}</title><link rel="stylesheet" href="./witness-${tag}.css"></head><body>${body}</body></html>`,
);

// the ordering fact, read off the emitted sheet (Tailwind escapes `&` as `\&` etc.)
for (const needle of ["text-current > svg", "text-\\(--tone\\) > svg"]) {
    console.log(`[${tag}] emitted offset of svg rule ${needle}: ${css.indexOf(needle)}`);
}
for (const m of css.matchAll(/[^\n{}]*>\s*svg\s*\{\s*color:[^}]*\}/g)) {
    console.log(`[${tag}] glyph rule @${m.index}: ${m[0].replace(/\s+/g, " ")}`);
}
console.log(`[${tag}] wrote witness-${tag}.html (${css.length} bytes of css)`);

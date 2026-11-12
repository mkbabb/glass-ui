// Server-render the fixture rows with the worktree's own candidate (vite ssrLoadModule +
// vue/server-renderer), so the no-script cell paints exactly the markup a server sends.
//   node ab/ssr.mjs   (cwd = the worktree)
import { createServer } from "vite";
import { mkdirSync, writeFileSync } from "node:fs";
const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: "custom", logLevel: "error", ssr: { external: ["vue", "@vue/server-renderer", "vue/server-renderer"] } });
try {
    const { renderToString } = await import("vue/server-renderer");
    const { createSSRApp, h } = await import("vue");
    const { Rows } = await vite.ssrLoadModule("/ab/rows.ts");
    mkdirSync("ab/static", { recursive: true });
    for (const shape of ["underline", "highlight"]) {
        const html = await renderToString(createSSRApp({ render: () => h(Rows, { shape }) }));
        writeFileSync(`ab/static/ssr-${shape}.html`, html);
        console.log(shape, html.length);
    }
} finally {
    await vite.close();
}

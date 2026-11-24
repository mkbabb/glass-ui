// The overflow study's build config (copied to the tree root by tools/build-tree.sh):
// the demo's own dist config with one more rollup input, ovf.html, the stress page.
import { resolve } from "node:path";
import { mergeConfig } from "vite";
import demo from "./demo/vite.demo-dist.config";

export default mergeConfig(demo, {
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                ovf: resolve(__dirname, "ovf.html"),
            },
        },
    },
});

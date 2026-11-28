import { resolve } from "node:path";
import { mergeConfig } from "vite";
import demo from "./demo/vite.demo-dist.config";

export default mergeConfig(demo, {
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                sci4: resolve(__dirname, "sci4.html"),
            },
        },
    },
});

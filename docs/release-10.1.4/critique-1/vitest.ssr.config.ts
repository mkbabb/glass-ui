import base from "../../../vitest.config";
const b = base as any;
export default { ...b, test: { ...b.test, environment: "node", include: ["docs/release-10.1.4/critique-1/ssr.test.ts"], setupFiles: [] } };

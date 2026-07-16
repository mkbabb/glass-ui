import type { BlobConfig } from "../types";

/** One bounded surface decision shared by both renderer backends. */
export function resolveBlobSurface(config: BlobConfig): {
    morphT: number;
    dressed: boolean;
} {
    const morphT = Math.max(0, Math.min(1, config.morphT));
    return { morphT, dressed: morphT > 0 };
}

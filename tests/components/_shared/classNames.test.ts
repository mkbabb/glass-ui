import { describe, expect, it } from "vitest";

import { cn } from "@glass/components/_shared/class-names";

/**
 * O-20 B-3 (1) — the ghost rung in the font-size bucket.
 *
 * `class-names.ts`'s font-size regex listed `admin-label` long after the
 * library stopped shipping a `text-admin-label` utility (`6b450f22`, in
 * 8.0.0 — 0 `@utility` declarations in the 9.0.0 dist, the only one of the
 * 24 names in that regex with none). `cn()` is a bucketed last-write-wins
 * deduper, so the dead name COLLIDED with the live rungs and EVICTED them:
 * a consumer writing `cn("text-caption", "text-admin-label")` got back
 * `"text-admin-label"` — a class that paints nothing — and lost the one
 * that paints.
 */
describe("cn — the font-size bucket", () => {
    it("does not let the dead `text-admin-label` evict a live typography rung", () => {
        expect(cn("text-caption", "text-admin-label")).toBe(
            "text-caption text-admin-label",
        );
    });

    it("still dedupes a pair that really does collide — last write wins", () => {
        expect(cn("text-caption", "text-body")).toBe("text-body");
    });
});

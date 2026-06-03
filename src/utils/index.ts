export { cn } from "./cn";
export { moveBeforeSafe } from "./moveBefore";
// AS.W3 A1 — the consolidated platform feature-detection surface
// (supportsMoveBefore + timeline predicates + supportsPostTask).
export {
    supportsMoveBefore,
    supportsScrollTimeline,
    supportsViewTimeline,
    supportsPostTask,
} from "./platformSupport";

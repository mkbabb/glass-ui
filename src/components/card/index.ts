export {
    default as Card,
    type CardTier,
    type CardSurface,
    type CardSpecular,
    // BC.W-SELECTION-CARD — the I5 selection-card decoration axis (the ONE new
    // Atlas component): `variant="selection"` + the earned `metal` quad. The
    // types live in Card.vue's `<script>` and re-export here (the existing pattern).
    type CardVariant,
    type CardMetal,
} from "./Card.vue";
export { default as CardHeader } from "./CardHeader.vue";
// BB.W-SCROLL-CARD — the first-class scroll-shrink card family. <ScrollCard>
// owns the `.card-scroll-host` scroll-port + the `--card-scroll` timeline;
// <ScrollCardHeader> is the LARGER-header-items hero-rung header composing the
// SAME compositor-safe `card-*-shrink` lanes (no second keyframe set).
export { default as ScrollCard, type ScrollCardProps } from "./ScrollCard.vue";
export {
    default as ScrollCardHeader,
    type ScrollCardHeaderProps,
} from "./ScrollCardHeader.vue";
export { default as CardTitle } from "./CardTitle.vue";
export { default as CardDescription } from "./CardDescription.vue";
export { default as CardContent } from "./CardContent.vue";
export { default as CardFooter } from "./CardFooter.vue";
export { default as CardAction } from "./CardAction.vue";

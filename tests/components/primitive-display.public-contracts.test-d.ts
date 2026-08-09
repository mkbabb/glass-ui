import type { Component } from "vue";
import type { AvatarFallback, AvatarImage } from "@glass/components/avatar";
import type { ButtonProps } from "@glass/components/button";
import type { CardProps } from "@glass/components/card";
import type { LabelProps } from "@glass/components/label";
import type { SeparatorProps } from "@glass/components/separator";
import type { SurfaceProps } from "@glass/components/surface";

type Assert<Condition extends true> = Condition;
type Has<Key extends PropertyKey, Shape> = Key extends keyof Shape ? true : false;
type Lacks<Key extends PropertyKey, Shape> =
    Has<Key, Shape> extends false ? true : false;

type AvatarImageProps = InstanceType<typeof AvatarImage>["$props"];
type AvatarFallbackProps = InstanceType<typeof AvatarFallback>["$props"];

type AvatarContract = [
    Assert<Has<"src", AvatarImageProps>>,
    Assert<Has<"referrerPolicy", AvatarImageProps>>,
    Assert<Has<"crossOrigin", AvatarImageProps>>,
    // [2026-08-09 · BK #66 CLOSE · RT-40-D] the `loadingStatusChange` emit was RETIRED
    // (`AvatarImage.vue:15-17`: it published a state no stylesheet keyed and no
    // consumer bound). Inverted, so re-adding it is a declared API change.
    Assert<Lacks<"onLoadingStatusChange", AvatarImageProps>>,
    Assert<Lacks<"alt", AvatarImageProps>>,
    Assert<Lacks<"as", AvatarImageProps>>,
    Assert<Lacks<"delayMs", AvatarFallbackProps>>,
    Assert<Lacks<"as", AvatarFallbackProps>>,
];

type ButtonContract = [
    Assert<Has<"as", ButtonProps>>,
    Assert<Has<"asChild", ButtonProps>>,
    Assert<Has<"type", ButtonProps>>,
    Assert<Has<"disabled", ButtonProps>>,
];

type CardContract = [
    Assert<Has<"as", CardProps>>,
    Assert<Lacks<"asChild", CardProps>>,
    // [2026-08-09 · BK #66 CLOSE · RT-40-D] ~~`material` / `variant`~~ — both GONE. DAG-RULINGS §4.3 deleted
    // `material` as a re-minted `tier` (it breached the axes.ts membership fence)
    // and the variant axis went with it. Card inherits `tier`/`surface`/`deep`
    // from `SurfaceProps` and owns `size`/`shadow`/`selected`. Asserted whole:
    // what it HAS and what it must never re-mint.
    Assert<Has<"tier", CardProps>>,
    Assert<Has<"surface", CardProps>>,
    Assert<Has<"size", CardProps>>,
    Assert<Has<"shadow", CardProps>>,
    Assert<Has<"selected", CardProps>>,
    Assert<Lacks<"material", CardProps>>,
    Assert<Lacks<"variant", CardProps>>,
];

type LabelContract = [
    Assert<Has<"for", LabelProps>>,
    Assert<Has<"requirement", LabelProps>>,
    Assert<Has<"disabled", LabelProps>>,
    Assert<Lacks<"as", LabelProps>>,
    Assert<Lacks<"asChild", LabelProps>>,
];

type SeparatorContract = [
    Assert<Has<"orientation", SeparatorProps>>,
    Assert<Has<"decorative", SeparatorProps>>,
    Assert<Has<"label", SeparatorProps>>,
    Assert<Lacks<"as", SeparatorProps>>,
    Assert<Lacks<"asChild", SeparatorProps>>,
];

type SurfaceContract = [
    Assert<SurfaceProps["as"] extends string | Component | undefined ? true : false>,
    Assert<Lacks<"asChild", SurfaceProps>>,
    // [2026-08-09 · BK #66 CLOSE · RT-40-D] ~~`material` / `specular`~~ — both GONE (DAG-RULINGS §4.3: `tier` is
    // the ONE prominence axis, `surface` the ONE decoration axis, `deep` the
    // thickness ON the resolved tier). Same treatment: the live axes asserted,
    // the retired names inverted.
    Assert<Has<"tier", SurfaceProps>>,
    Assert<Has<"surface", SurfaceProps>>,
    Assert<Has<"deep", SurfaceProps>>,
    Assert<Lacks<"material", SurfaceProps>>,
    Assert<Lacks<"specular", SurfaceProps>>,
];

export type PrimitiveDisplayPublicContracts = [
    AvatarContract,
    ButtonContract,
    CardContract,
    LabelContract,
    SeparatorContract,
    SurfaceContract,
];

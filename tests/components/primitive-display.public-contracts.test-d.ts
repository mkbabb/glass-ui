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
    Assert<Has<"onLoadingStatusChange", AvatarImageProps>>,
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
    Assert<Has<"material", CardProps>>,
    Assert<Has<"variant", CardProps>>,
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
    Assert<Has<"material", SurfaceProps>>,
    Assert<Has<"specular", SurfaceProps>>,
];

export type PrimitiveDisplayPublicContracts = [
    AvatarContract,
    ButtonContract,
    CardContract,
    LabelContract,
    SeparatorContract,
    SurfaceContract,
];

/**
 * The story manifest: one `routes.ts` per section directory, assembled here in site
 * order. Each row becomes a route (`router.ts`), a seat in the shell's docks and a
 * card on its section page. A page's component is `<section>/<id>.vue`; its stage,
 * where it has one, is `<section>/<id>.stage.vue`, and a card shows that stage, or
 * `<section>/<id>.tile.vue` where the stage cannot run small.
 */
import type { Component } from "vue";
import type { LucideIcon } from "@lucide/vue";
import { makeLazy } from "./manifest/lazy";
import type { SectionRoutes } from "./manifest/section";
import { section as foundations } from "./foundations/routes";
import { section as substrates } from "./substrates/routes";
import { section as display } from "./display/routes";
import { section as forms } from "./forms/routes";
import { section as containers } from "./containers/routes";
import { section as navigation } from "./navigation/routes";
import { section as dock } from "./dock/routes";
import { section as data } from "./data/routes";
import { section as feedback } from "./feedback/routes";
import { section as motion } from "./motion/routes";
import { section as compositions } from "./compositions/routes";

export interface Story {
    id: string;
    title: string;
    lede: string;
    component: () => Promise<Component>;
    /** The page's stage, mounted large on the page and small on its card. */
    stage?: () => Promise<Component>;
    /** A card preview, only where the stage cannot run small and inert. */
    tile?: () => Promise<Component>;
    /** Where the page runs a live canvas of its own (`RouteRow.canvas`). */
    canvas?: "page" | "card";
    /** The page's first screen sets figures or code in the code face (`RouteRow.codeFace`). */
    codeFace?: true;
}

export interface Category {
    id: string;
    title: string;
    icon: LucideIcon;
    lede: string;
    stories: Story[];
}

const modules = import.meta.glob<{ default: Component }>("./*/*.vue");
const stageModules = import.meta.glob<{ default: Component }>("./*/*.stage.vue");
const tileModules = import.meta.glob<{ default: Component }>("./*/*.tile.vue");

const lazy = makeLazy(modules);

function loader(
    glob: Record<string, () => Promise<{ default: Component }>>,
    key: string,
): (() => Promise<Component>) | undefined {
    const load = glob[key];
    return load ? () => load().then((m) => m.default) : undefined;
}

function category(section: SectionRoutes): Category {
    return {
        id: section.id,
        title: section.title,
        icon: section.icon,
        lede: section.lede,
        stories: section.routes.map((row) => ({
            id: row.id,
            title: row.title,
            lede: row.lede,
            canvas: row.canvas,
            codeFace: row.codeFace,
            component: lazy(section.id, row.id),
            stage: loader(stageModules, `./${section.id}/${row.id}.stage.vue`),
            tile: loader(tileModules, `./${section.id}/${row.id}.tile.vue`),
        })),
    };
}

export const CATEGORIES: Category[] = [
    foundations,
    substrates,
    display,
    forms,
    containers,
    navigation,
    dock,
    data,
    feedback,
    motion,
    compositions,
].map(category);

export function findCategory(id: string): Category | undefined {
    return CATEGORIES.find((c) => c.id === id);
}

export function findStory(
    categoryId: string,
    storyId: string,
): { category: Category; story: Story } | undefined {
    const category = findCategory(categoryId);
    const story = category?.stories.find((s) => s.id === storyId);
    return category && story ? { category, story } : undefined;
}

/** A card on this page runs a live canvas, so the shell's field stays static there. */
export function cardsRunCanvas(stories: readonly Story[]): boolean {
    return stories.some((s) => s.canvas === "card");
}

/** A card on this page sets figures or code in the code face. */
export function cardsSetCode(stories: readonly Story[]): boolean {
    return stories.some((s) => s.codeFace);
}

export function firstStoryPath(): string {
    const first = CATEGORIES.find((c) => c.stories.length > 0);
    return first ? `/${first.id}/${first.stories[0]!.id}` : "/";
}

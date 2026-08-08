<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Avatar, AvatarFallback, AvatarImage } from "@glass/components/avatar";
import { StatusDot } from "@glass/components/status-dot";
import { Surface } from "@glass/components/surface";

const portrait = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
        <defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#314a74"/><stop offset="1" stop-color="#b76d55"/></linearGradient></defs>
        <rect width="160" height="160" fill="url(#g)"/>
        <circle cx="80" cy="62" r="29" fill="#f1d3b5"/>
        <path d="M35 158c5-38 23-56 45-56s40 18 45 56" fill="#efe9dc"/>
        <path d="M52 58c2-26 17-40 33-40 19 0 32 16 31 43-13-7-22-17-27-30-6 14-18 23-37 27Z" fill="#261e27"/>
    </svg>
`)}`;

const members = [
    { id: "ada", name: "Ada Lovelace", initials: "AL" },
    { id: "alan", name: "Alan Turing", initials: "AT" },
    { id: "grace", name: "Grace Hopper", initials: "GH" },
    { id: "claude", name: "Claude Shannon", initials: "CS" },
];
const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Load and fallback"
            blurb="One Reka image path owns loading and failure; the identity name remains stable as pixels resolve or fail."
        >
            <Surface material="content" surface="veil" class="avatar-grid">
                <figure class="avatar-specimen">
                    <Avatar label="Ada Lovelace" size="md">
                        <AvatarImage :src="portrait" />
                        <AvatarFallback>AL</AvatarFallback>
                    </Avatar>
                    <figcaption>
                        <strong>Image loaded</strong>
                        <span>Named once by the Avatar</span>
                    </figcaption>
                </figure>

                <figure class="avatar-specimen">
                    <Avatar label="Alan Turing" size="md">
                        <AvatarFallback>AT</AvatarFallback>
                    </Avatar>
                    <figcaption>
                        <strong>Initials fallback</strong>
                        <span>No image request</span>
                    </figcaption>
                </figure>

                <figure class="avatar-specimen">
                    <Avatar label="Grace Hopper" size="md">
                        <AvatarImage src="/__glass_avatar_intentional_failure__.png" />
                        <AvatarFallback>GH</AvatarFallback>
                    </Avatar>
                    <figcaption>
                        <strong>Broken URL</strong>
                        <span>Failure resolves to initials</span>
                    </figcaption>
                </figure>
            </Surface>
        </StorySection>

        <StorySection
            heading="Identity policy"
            blurb="Use a direct label, bind a visible entity name, or mark the image decorative. Initials and image alt never duplicate that name."
        >
            <Surface material="content" surface="veil" class="avatar-grid">
                <figure class="avatar-specimen">
                    <Avatar label="Claude Shannon portrait" size="md" shape="square">
                        <AvatarFallback>CS</AvatarFallback>
                    </Avatar>
                    <figcaption>
                        <strong>Directly labelled</strong>
                        <span>aria-label identity</span>
                    </figcaption>
                </figure>

                <div class="avatar-entity">
                    <Avatar labelled-by="avatar-entity-name" size="md">
                        <AvatarImage :src="portrait" />
                        <AvatarFallback>AL</AvatarFallback>
                    </Avatar>
                    <p>
                        <strong id="avatar-entity-name">Ada Lovelace</strong>
                        <span>Visible entity name is authoritative</span>
                    </p>
                </div>

                <figure class="avatar-specimen">
                    <Avatar decorative size="md" shape="square">
                        <AvatarFallback>ℱ</AvatarFallback>
                    </Avatar>
                    <figcaption>
                        <strong>Decorative mark</strong>
                        <span>Excluded from the reading order</span>
                    </figcaption>
                </figure>
            </Surface>
        </StorySection>

        <StorySection
            heading="Status composition"
            blurb="Avatar positions the existing semantic StatusDot; it does not translate status names or colors itself."
        >
            <Surface material="content" surface="veil" class="avatar-status-row">
                <Avatar label="Grace Hopper" size="md">
                    <AvatarFallback>GH</AvatarFallback>
                    <template #status>
                        <StatusDot state="online" size="md" label="Grace Hopper is online" />
                    </template>
                </Avatar>
                <div>
                    <strong>Grace Hopper</strong>
                    <p>Compiler systems · online</p>
                </div>
            </Surface>
        </StorySection>

        <StorySection heading="Sizes and group">
            <Surface material="content" surface="veil" class="avatar-sizes">
                <figure v-for="size in sizes" :key="size" class="avatar-specimen">
                    <Avatar :label="`${size} Ada Lovelace avatar`" :size="size">
                        <AvatarImage :src="portrait" />
                        <AvatarFallback>AL</AvatarFallback>
                    </Avatar>
                    <figcaption><strong>{{ size }}</strong></figcaption>
                </figure>
            </Surface>

            <Surface material="content" surface="veil" class="avatar-group-panel">
                <ul class="avatar-group" aria-label="Compiler research team">
                    <li v-for="member in members" :key="member.id">
                        <Avatar :label="member.name">
                            <AvatarFallback>{{ member.initials }}</AvatarFallback>
                        </Avatar>
                    </li>
                </ul>
                <p>
                    <strong>Compiler research team</strong>
                    <span>{{ members.length }} contributors</span>
                </p>
            </Surface>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
/* ARM-INVERTED (base = narrow). The 3-up arm was a `@media (min-width)` in
   disguise — it lived as the BASE with a `max-width` override, which made the
   desktop form unreachable from inside a 21rem cel and the mobile form
   unreachable from a full-span section on a phone. One column is the base; the
   three arrive from the CONTAINER. The 42rem numeral is unchanged: it always
   measured this row of specimens, and now it measures the row rather than the
   window it happened to sit in. */
.avatar-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--sp-4);
    padding: var(--sp-4);
}

.avatar-sizes {
    flex-wrap: wrap;
}

.avatar-group-panel {
    align-items: flex-start;
    flex-direction: column;
}

@container (inline-size > 42rem) {
    .avatar-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .avatar-sizes {
        flex-wrap: nowrap;
    }

    .avatar-group-panel {
        align-items: center;
        flex-direction: row;
    }
}

.avatar-specimen,
.avatar-entity,
.avatar-status-row,
.avatar-group-panel {
    display: flex;
    min-inline-size: 0;
    align-items: center;
    gap: 0.875rem;
}

.avatar-specimen {
    margin: 0;
}

.avatar-specimen figcaption,
.avatar-entity p,
.avatar-status-row div,
.avatar-group-panel > p {
    display: grid;
    min-inline-size: 0;
    gap: 0.2rem;
    margin: 0;
}

.avatar-specimen span,
.avatar-entity span,
.avatar-status-row p,
.avatar-group-panel span {
    margin: 0;
    color: var(--muted-foreground);
    font-size: var(--type-caption);
    line-height: 1.35;
}

.avatar-status-row,
.avatar-group-panel,
.avatar-sizes {
    padding: var(--sp-4);
}

.avatar-sizes {
    display: flex;
    align-items: end;
    gap: var(--sp-5);
}

.avatar-sizes .avatar-specimen {
    flex-direction: column;
}

.avatar-group-panel {
    margin-block-start: var(--sp-4);
}

.avatar-group {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
}

.avatar-group li + li {
    margin-inline-start: -0.625rem;
}

.avatar-group :deep(.glass-avatar__identity) {
    box-shadow:
        0 0 0 2px var(--background),
        var(--shadow-sm);
}
</style>

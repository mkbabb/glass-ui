<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ref, computed, watch } from "vue";
import {
    TagsInput,
    TagsInputInput,
    TagsInputItem,
    TagsInputItemDelete,
    TagsInputItemText,
} from "@glass/components/tags-input";
import { Card } from "@glass/components/card";
import { Label } from "@glass/components/label";
import { cn } from "@glass/components/_shared/class-names";

// Prefilled tags — reka-ui accepts v-model:modelValue on TagsInputRoot.
const skills = ref<string[]>(["Vue", "TypeScript", "Tailwind", "reka-ui"]);

// Validated emails — reject anything that doesn't pass a loose email regex.
const emails = ref<string[]>(["ada@example.com"]);
const emailError = ref<string | null>(null);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// TagsInputRoot commits the tag before `addTag` fires, so we watch
// the model and strip anything that fails validation, surfacing a
// transient error message.
watch(emails, (next, prev) => {
    const bad = next.filter((t) => !EMAIL_RE.test(t));
    if (bad.length > 0) {
        emailError.value = `Rejected: ${bad.join(", ")}`;
        emails.value = (prev ?? []).concat(next.filter((t) => EMAIL_RE.test(t) && !(prev ?? []).includes(t)));
        setTimeout(() => (emailError.value = null), 2400);
    }
});

// Paste-many demo — `delimiter` prop splits a pasted string on , ; or whitespace.
const pasted = ref<string[]>([]);
const pasteDelimiter = /[,;\s]+/;

const skillCount = computed(() => skills.value.length);
</script>

<template>
    <StoryPage>
        <StorySection heading="Prefilled">
          <Card surface="veil" class="flex flex-col gap-2 p-5">
            <Label for="skills-input">Skills</Label>
            <TagsInput
                v-model="skills"
                class="min-h-11 bg-card shadow-cartoon-sm"
            >
                <TagsInputItem
                    v-for="tag in skills"
                    :key="tag"
                    :value="tag"
                    class="gap-1 px-2 py-0.5"
                >
                    <TagsInputItemText class="text-small" />
                    <TagsInputItemDelete class="text-muted-foreground hover:text-foreground">
                        ✕
                    </TagsInputItemDelete>
                </TagsInputItem>
                <TagsInputInput
                    id="skills-input"
                    placeholder="Add skill…"
                />
            </TagsInput>
            <p class="text-mono-caption text-muted-foreground">
                {{ skillCount }} skill{{ skillCount === 1 ? "" : "s" }} · enter to add, backspace to remove last
            </p>
          </Card>
        </StorySection>

        <StorySection heading="Paste many" blurb="Comma, semicolon, or space delimited.">
          <Card surface="veil" class="flex flex-col gap-2 p-5">
            <Label for="paste-input">Bulk tags</Label>
            <TagsInput
                v-model="pasted"
                :delimiter="pasteDelimiter"
                class="min-h-11 bg-card shadow-cartoon-sm"
            >
                <TagsInputItem
                    v-for="tag in pasted"
                    :key="tag"
                    :value="tag"
                    class="gap-1 bg-section-2/15 px-2 py-0.5 text-section-2"
                >
                    <TagsInputItemText class="text-small" />
                    <TagsInputItemDelete class="hover:opacity-70">✕</TagsInputItemDelete>
                </TagsInputItem>
                <TagsInputInput
                    id="paste-input"
                    placeholder="Try pasting: alpha, beta; gamma delta"
                />
            </TagsInput>
          </Card>
        </StorySection>

        <StorySection heading="Validation" blurb="Rejects anything that fails a loose email check.">
          <Card surface="veil" class="flex flex-col gap-2 p-5">
            <Label for="emails-input">Emails</Label>
            <TagsInput
                v-model="emails"
                :class="
                    cn(
                        'min-h-11 bg-card shadow-cartoon-sm transition-colors',
                        emailError && 'border-destructive',
                    )
                "
            >
                <TagsInputItem
                    v-for="tag in emails"
                    :key="tag"
                    :value="tag"
                    class="gap-1 bg-section-3/15 px-2 py-0.5 text-section-3"
                >
                    <TagsInputItemText class="text-small fira-code" />
                    <TagsInputItemDelete class="hover:opacity-70">✕</TagsInputItemDelete>
                </TagsInputItem>
                <TagsInputInput
                    id="emails-input"
                    placeholder="you@example.com"
                />
            </TagsInput>
            <p
                :class="
                    cn(
                        'text-mono-caption',
                        emailError ? 'text-destructive' : 'text-muted-foreground',
                    )
                "
            >
                {{ emailError ?? "Valid RFC-ish emails only." }}
            </p>
          </Card>
        </StorySection>
    </StoryPage>
</template>

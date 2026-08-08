<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { Label } from "@glass/components/label";
import { Textarea, type TextareaResize } from "@glass/components/textarea";

const blank = ref("");
const filled = ref(
    "A quiet field can still feel materially present: a warm floor, a keyed rim, and no ornamental chrome.",
);
const required = ref("");
const invalid = ref("Too short");

const resizeModes: readonly { value: TextareaResize; label: string }[] = [
    { value: "vertical", label: "Vertical" },
    { value: "both", label: "Both axes" },
    { value: "none", label: "Fixed" },
];

// The growth cel's own copy. Content sizing is no longer a `resize` member — it is
// what every textarea does — so the specimen that proves it is a `rows` floor with
// more lines than the floor. The floor itself is the `--field-rows` stamp, not the
// attribute: `field-sizing: content` ignores `rows` outright, so these two frames
// are also the falsifier for that — an empty `rows="3"` that renders one line is
// the stamp gone.
const grown = ref(
    "This field is floored at three rows and sized to its content above that.\nA second line.\nA third line.\nA fourth, past the floor.",
);
</script>

<template>
    <StoryPage>
        <StorySection
            label="multiline states"
            blurb="Textarea keeps native multiline editing, wrapping, validation, and form semantics while sharing Input’s material and size contract."
        >
            <div class="grid gap-4 md:grid-cols-2">
                <ShowcaseFrame class="flex flex-col gap-3">
                    <Label for="textarea-default">Default · placeholder</Label>
                    <Textarea
                        id="textarea-default"
                        v-model="blank"
                        name="summary"
                        rows="4"
                        wrap="soft"
                        placeholder="Write a short summary…"
                    />
                </ShowcaseFrame>

                <ShowcaseFrame class="flex flex-col gap-3">
                    <Label for="textarea-filled">Filled</Label>
                    <Textarea id="textarea-filled" v-model="filled" rows="4" />
                </ShowcaseFrame>

                <ShowcaseFrame class="flex flex-col gap-3">
                    <Label for="textarea-required" requirement="required">
                        Required rationale
                    </Label>
                    <Textarea
                        id="textarea-required"
                        v-model="required"
                        required
                        minlength="20"
                        placeholder="Explain the decision"
                    />
                </ShowcaseFrame>

                <ShowcaseFrame class="flex flex-col gap-3">
                    <Label for="textarea-invalid">Invalid rationale</Label>
                    <Textarea
                        id="textarea-invalid"
                        v-model="invalid"
                        invalid
                        aria-describedby="textarea-invalid-message"
                    />
                    <p id="textarea-invalid-message" class="text-small text-destructive">
                        Add enough detail for another person to act on this note.
                    </p>
                </ShowcaseFrame>

                <ShowcaseFrame class="flex flex-col gap-3">
                    <Label for="textarea-readonly">Read only</Label>
                    <Textarea
                        id="textarea-readonly"
                        model-value="This release note is locked after publication."
                        readonly
                    />
                </ShowcaseFrame>

                <ShowcaseFrame class="flex flex-col gap-3">
                    <Label for="textarea-disabled" disabled>Disabled</Label>
                    <Textarea
                        id="textarea-disabled"
                        model-value="Archived notes cannot be edited."
                        disabled
                    />
                </ShowcaseFrame>
            </div>
        </StorySection>

        <StorySection
            label="resize contract"
            blurb="Resize is the drag handle and only the drag handle. Growth is the register's default — floored at rows line boxes, capped by --textarea-content-max — so the handle no longer doubles as a sizing axis."
        >
            <div class="grid gap-4 md:grid-cols-2">
                <ShowcaseFrame
                    v-for="mode in resizeModes"
                    :key="mode.value"
                    class="flex flex-col gap-3"
                >
                    <Label :for="`textarea-${mode.value}`">{{ mode.label }}</Label>
                    <Textarea
                        :id="`textarea-${mode.value}`"
                        :resize="mode.value"
                        model-value="The native resize handle follows the declared axis."
                    />
                </ShowcaseFrame>
            </div>
        </StorySection>

        <StorySection
            label="rows is the floor"
            blurb="Every textarea sizes to its content. `rows` sets the floor it starts from and finally means what it says — it used to be dead under a blanket 5-line minimum, and `field-sizing: content` ignores the attribute outright, so the value is stamped into --field-rows and the floor is computed from it. The ceiling is one token, --textarea-content-max."
        >
            <div class="grid gap-4 md:grid-cols-2">
                <ShowcaseFrame class="flex flex-col gap-3">
                    <Label for="textarea-rows-empty">rows=&quot;3&quot; · empty</Label>
                    <Textarea id="textarea-rows-empty" rows="3" placeholder="Three rows tall at rest." />
                </ShowcaseFrame>

                <ShowcaseFrame class="flex flex-col gap-3">
                    <Label for="textarea-rows-grown">rows=&quot;3&quot; · grown past the floor</Label>
                    <Textarea id="textarea-rows-grown" v-model="grown" rows="3" />
                </ShowcaseFrame>
            </div>
        </StorySection>

        <StorySection label="narrow measure">
            <ShowcaseFrame class="flex max-w-64 flex-col gap-3">
                <Label for="textarea-narrow">Wrapped at a narrow width</Label>
                <Textarea
                    id="textarea-narrow"
                    resize="none"
                    rows="5"
                    model-value="Long multiline content remains readable and scrollable when a compact composition does not permit resizing."
                />
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>

<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ref } from "vue";
import { Checkbox } from "@glass/components/checkbox";
import { RadioGroup, RadioGroupItem } from "@glass/components/radio-group";
import { Switch } from "@glass/components/switch";
import { Label } from "@glass/components/label";

const tos = ref(true);
const marketing = ref(false);
const indeterminate = ref<boolean | "indeterminate">("indeterminate");
const consent = ref(false);

const plan = ref<string>("team");
const delivery = ref<string>("standard");
const region = ref<string>("");

const notifications = ref(true);
const airplane = ref(false);
const connection = ref(false);

const scopes = ref<Record<string, boolean>>({
    read: true,
    write: false,
    deploy: false,
    billing: false,
});
</script>

<template>
    <StoryPage>
        <!-- THE ROUTE STOPS HIDING THE DEFECTS (D16). Three things this page used to
             do are gone, because each one concealed exactly the arm it was displaying:
             the `gap-8`/`gap-6` overrides (they papered over the 44px seat the bits
             did not have, and the radio's gap-6 actually OVERLAPPED two hit rects by
             2px), and the `opacity-60` wrappers around every disabled cluster (which
             multiplied the component's own disabled opacity to an effective ~0.30, so
             the disabled arm had literally never been visible on its own page). The
             bit↔label pairing rides the seat's own 12px residue at gap 0 — FOR THE
             1:1 BITS ONLY. The switch declares its gaps (below), because its seat has
             no residue to ride: `--control-bit-face-inline` is 2.75rem and
             `--touch-target` is 44px, so `max()` resolves to the FACE and the 12px
             arithmetic is exactly zero. [2026-08-08, cure round] -->
        <StorySection heading="Checkbox" gap="lg">
            <p class="text-small text-muted-foreground">
                Standard, indeterminate, disabled, and invalid. Each control is a 44px
                seat in flow — the hit target is the box, not a span that overhangs it.
            </p>
            <div class="flex flex-wrap items-start">
                <div class="flex items-center">
                    <Checkbox id="chk-tos" v-model="tos" />
                    <Label for="chk-tos">Accept terms</Label>
                </div>
                <div class="flex items-center">
                    <Checkbox id="chk-marketing" v-model="marketing" />
                    <Label for="chk-marketing">Marketing email</Label>
                </div>
                <div class="flex items-center">
                    <Checkbox id="chk-indet" v-model="indeterminate" />
                    <Label for="chk-indet">Indeterminate</Label>
                </div>
                <div class="flex items-center">
                    <Checkbox id="chk-disabled" disabled />
                    <Label for="chk-disabled">Disabled</Label>
                </div>
                <!-- Disabled AND checked. The disabled rung's checked arm was the only
                     arm it painted, and no route displayed it: all four disabled
                     specimens were unchecked, so the arm shipped unproven. Beside the
                     unchecked one above it also shows the two halves of the ink law —
                     softened state fill and softened perimeter, geometry unmoved.
                     [2026-08-08, cure round] -->
                <div class="flex items-center">
                    <Checkbox id="chk-disabled-checked" :model-value="true" disabled />
                    <Label for="chk-disabled-checked">Disabled, checked</Label>
                </div>
                <div class="flex items-center">
                    <Checkbox id="chk-invalid" v-model="consent" invalid />
                    <Label for="chk-invalid">Consent required</Label>
                </div>
            </div>

            <p class="text-small text-muted-foreground">
                A vertical stack at gap 0: adjacent seats tile without overlap, and the
                44px pitch is the seat itself rather than a derived gap.
            </p>
            <div class="flex flex-col items-start">
                <div v-for="(_, scope) in scopes" :key="scope" class="flex items-center">
                    <Checkbox :id="`scope-${scope}`" v-model="scopes[scope]" />
                    <Label :for="`scope-${scope}`" class="capitalize">{{ scope }}</Label>
                </div>
            </div>
        </StorySection>

        <StorySection heading="RadioGroup" gap="lg">
            <p class="text-small text-muted-foreground">
                One-of-N. The disc silhouette is what distinguishes it from the
                checkbox's tick corner at rest.
            </p>
            <RadioGroup v-model="plan" orientation="horizontal" aria-label="Plan">
                <div v-for="p in ['solo', 'team', 'org']" :key="p" class="flex items-center">
                    <RadioGroupItem :id="`plan-${p}`" :value="p" />
                    <Label :for="`plan-${p}`" class="capitalize">{{ p }}</Label>
                </div>
            </RadioGroup>

            <p class="text-small text-muted-foreground">
                Same pattern, with one option disabled.
            </p>
            <RadioGroup v-model="delivery" orientation="horizontal" aria-label="Delivery speed">
                <div class="flex items-center">
                    <RadioGroupItem id="delivery-standard" value="standard" />
                    <Label for="delivery-standard">Standard</Label>
                </div>
                <div class="flex items-center">
                    <RadioGroupItem id="delivery-express" value="express" />
                    <Label for="delivery-express">Express</Label>
                </div>
                <div class="flex items-center">
                    <RadioGroupItem id="delivery-drone" value="drone" disabled />
                    <Label for="delivery-drone">Drone (unavailable)</Label>
                </div>
            </RadioGroup>

            <p class="text-small text-muted-foreground">
                Invalid on the GROUP — one attribute at the root recolours every face,
                with nothing threaded through the items.
            </p>
            <RadioGroup
                v-model="region"
                orientation="horizontal"
                invalid
                required
                aria-label="Region"
            >
                <div v-for="r in ['us', 'eu', 'apac']" :key="r" class="flex items-center">
                    <RadioGroupItem :id="`region-${r}`" :value="r" />
                    <Label :for="`region-${r}`" class="uppercase">{{ r }}</Label>
                </div>
            </RadioGroup>
        </StorySection>

        <StorySection heading="Switch" gap="lg">
            <p class="text-small text-muted-foreground">
                Immediate-effect toggle. Prefer over checkbox when the change is instant.
                One silhouette, no size axis — a role's corner is fixed by its role.
            </p>
            <!-- THE SWITCH DECLARES ITS GAPS, and it is the one member that must.
                 A 1:1 bit rides the seat residue: `max(--touch-target, 20px)` = 44,
                 the 20px face centres, and 12px falls out on each side for free. The
                 switch's face IS 44px wide, so `max(44, 44)` = 44 and the residue is
                 0 — bit and label touch. `gap-3` restores the same 12px pairing the
                 other two get for nothing, and `gap-6` on the wrapper puts the
                 SEPARATION at twice the PAIRING so a cluster reads as a cluster.
                 [2026-08-08, cure round] -->
            <div class="flex flex-wrap items-center gap-6">
                <div class="flex items-center gap-3">
                    <Switch id="sw-notifications" v-model="notifications" />
                    <Label for="sw-notifications">Notifications</Label>
                </div>
                <div class="flex items-center gap-3">
                    <Switch id="sw-airplane" v-model="airplane" />
                    <Label for="sw-airplane">Airplane mode</Label>
                </div>
                <div class="flex items-center gap-3">
                    <Switch id="sw-connection" v-model="connection" invalid />
                    <Label for="sw-connection">Connection needs attention</Label>
                </div>
                <div class="flex items-center gap-3">
                    <Switch id="sw-disabled" disabled />
                    <Label for="sw-disabled">Disabled</Label>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>

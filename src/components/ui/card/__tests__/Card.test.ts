import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Card, CardContent, CardHeader, CardTitle } from "../index";

describe("Card", () => {
    it("renders card layout content", () => {
        const wrapper = mount({
            components: { Card, CardContent, CardHeader, CardTitle },
            template: `
                <Card variant="pane" class="test-card">
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                    </CardHeader>
                    <CardContent>Billing summary</CardContent>
                </Card>
            `,
        });

        expect(wrapper.get(".test-card").classes()).toContain(
            "scrollbar-hidden",
        );
        expect(wrapper.text()).toContain("Account");
        expect(wrapper.text()).toContain("Billing summary");
    });
});

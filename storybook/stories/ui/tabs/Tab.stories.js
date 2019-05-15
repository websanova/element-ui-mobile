import { storiesOf } from "@storybook/vue";
import TabsEditable from "./TabsEditable";

const stories = storiesOf("UI|Tabs", module);

stories.add("Tester", () => {
    return {
        components: {
            TabsEditable,
        },
        props: {},
        template: `<tabs-editable />`,
    };
});

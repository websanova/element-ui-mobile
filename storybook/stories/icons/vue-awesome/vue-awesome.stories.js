import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import { text, boolean, number, select } from "@storybook/addon-knobs";

const stories = storiesOf("Icons|Vue Awesome", module);
stories.add("Overview", () => {
    return {
        components: { MyDemo: require("./IconViewer").default },
        template: `
            <my-demo v-bind="$attrs"/>
        `,
    };
});

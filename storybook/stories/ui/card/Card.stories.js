import Vue from "vue";
import { storiesOf, addDecorator } from "@storybook/vue";
import withBoxPage from "@/storybook/core/decorators/withBoxPage";
import { text, boolean, number, select } from "@storybook/addon-knobs";

const stories = storiesOf("UI|Card", module);
stories.addDecorator(withBoxPage);

stories.add("Overview", () => {
    const substories = [
        {
            title: "Basic",
            mod: require("./basic").default,
            source: require("!!raw-loader!./basic"),
        },
        {
            title: "Shadow",
            mod: require("./shadow").default,
            source: require("!!raw-loader!./shadow"),
        },
        {
            title: "Images",
            mod: require("./images").default,
            source: require("!!raw-loader!./images"),
        },
        {
            title: "Toolbar",
            mod: require("./toolbar").default,
            source: require("!!raw-loader!./toolbar"),
        },
    ];

    return {
        data() {
            return {
                substories,
            };
        },
        template: `
        <div>
            <h1>Card</h1>
            <demo-box
                v-for="(story, index) in substories"
                :key="index"
                :title="story.title"
                :mod="story.mod"
                :source="story.source || ''"
            />
        </div>
        `,
    };
});

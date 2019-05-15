import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import { text, boolean, number, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import withBoxPage from "@/storybook/core/decorators/withBoxPage";

const stories = storiesOf("Core|Border", module);
stories.addDecorator(withBoxPage);

stories.add("Overview", () => {
    const substories = [
        {
            title: "Border",
            mod: require("./border").default,
            source: require("!!raw-loader!./border"),
        },
        {
            title: "Shapes",
            mod: require("./shapes").default,
            source: require("!!raw-loader!./shapes"),
        },
        // {
        //     title: "Shadow",
        //     mod: require("./shadow").default,
        //     source: require("!!raw-loader!./shadow"),
        // },
    ];

    return {
        data() {
            return {
                substories,
            };
        },
        template: `
        <div>
            <h1>Border</h1>
            <p>
                A standarized border is used throughout many components in the framework.
            </p>

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

import Vue from "vue";
import { storiesOf, addDecorator } from "@storybook/vue";
import { text, boolean, number, select } from "@storybook/addon-knobs";
import withBoxPage from "@/storybook/core/decorators/withBoxPage";

import "./story.scss";

const stories = storiesOf("UI|Container", module);
stories.addDecorator(withBoxPage);

stories
    .addDecorator(() => {
        return {
            props: {
                interactive: {
                    default: boolean("Interactive", true),
                },
            },
            template: '<story :interactive="interactive" />',
        };
    })

    .add("Overview", () => {
        const substories = [
            {
                title: "Example 1",
                mod: require("./example01").default,
                source: require("!!raw-loader!./example01"),
            },
            {
                title: "Example 2",
                mod: require("./example02").default,
                source: require("!!raw-loader!./example02"),
            },
            {
                title: "Example 3",
                mod: require("./example03").default,
                source: require("!!raw-loader!./example03"),
            },
            {
                title: "Example 4",
                mod: require("./example04").default,
                source: require("!!raw-loader!./example04"),
            },
            {
                title: "Example 5",
                mod: require("./example05").default,
                source: require("!!raw-loader!./example05"),
            },
            {
                title: "Example 6",
                mod: require("./example06").default,
                source: require("!!raw-loader!./example06"),
            },
            {
                title: "Example 7",
                mod: require("./example07").default,
                source: require("!!raw-loader!./example07"),
            },
        ];

        let examples = require("./examples.md");

        let styleSource = require("!!raw-loader!./story.scss");

        return {
            data() {
                return {
                    substories,
                    styleSource,
                };
            },
            template: `
            <div class="story-container">
                <h1>Container</h1>
                ${examples}

                <strong>Styles used with examples below</strong>
                <code-view mode="sass" :content="styleSource"></code-view>
                <br/>
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
    })

    .add("Layout Example", () => {
        const substories = [
            {
                title: "Layout example",
                mod: require("./layout-example").default,
                source: require("!!raw-loader!./layout-example"),
            },
        ];

        return {
            data() {
                return {
                    substories,
                };
            },
            template: `
            <div class="story-container">
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

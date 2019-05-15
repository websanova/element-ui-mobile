import Vue from "vue";
import { storiesOf, addDecorator } from "@storybook/vue";
import { text, boolean, number, select } from "@storybook/addon-knobs";
import withBoxPage from "@/storybook/core/decorators/withBoxPage";

import "./story.scss";

const stories = storiesOf("UI|Button", module);
stories.addDecorator(withBoxPage);

export const TYPES = {
    text: "text",
    default: "default",
    primary: "primary",
    success: "success",
    info: "info",
    warning: "warning",
    danger: "danger",
};

export const SIZES = {
    default: "default",
    medium: "medium",
    small: "small",
    mini: "mini",
};

stories
    .add("Overview", () => {
        const substories = [
            {
                title: "Basic",
                mod: require("./basic").default,
                source: require("!!raw-loader!./basic"),
            },
            {
                title: "Disabled",
                mod: require("./disabled").default,
                source: require("!!raw-loader!./disabled"),
            },
            {
                title: "Text",
                mod: require("./text").default,
                source: require("!!raw-loader!./text"),
            },
            {
                title: "Shape",
                mod: {
                    components: { MyDemo: require("./shape").default },
                    props: {
                        size: { default: select("Size", SIZES, "default") },
                    },
                    template: `<my-demo :size="size"></my-demo>`,
                },
                source: require("!!raw-loader!./shape"),
            },
            {
                title: "Icon",
                mod: {
                    components: { MyDemo: require("./icon").default },
                    props: {
                        size: { default: select("Size", SIZES, "default") },
                    },
                    template: `<my-demo :size="size"></my-demo>`,
                },
                source: require("!!raw-loader!./icon"),
            },
            {
                title: "Sizes",
                mod: require("./sizes").default,
                source: require("!!raw-loader!./sizes"),
            },
            {
                title: "Group",
                mod: require("./group").default,
                source: require("!!raw-loader!./group"),
            },
            {
                title: "Loading",
                mod: require("./loading").default,
                source: require("!!raw-loader!./loading"),
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
            <h1>Button</h1>
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

    .add("Tester", () => {
        return {
            props: {
                label: { default: text("Label", "Click Me") },
                icon: { default: text("Icon", "") },
                type: { default: select("Type", TYPES, "default") },
                size: { default: select("Size", SIZES, "default") },
                round: {
                    type: Boolean,
                    default: boolean("Round", false),
                },
                circle: {
                    type: Boolean,
                    default: boolean("Circle", false),
                },
                plain: {
                    type: Boolean,
                    default: boolean("Plain", false),
                },
                disabled: {
                    type: Boolean,
                    default: boolean("Disabled", false),
                },
                loading: {
                    type: Boolean,
                    default: boolean("Loading", false),
                },
            },
            template: `
        <el-button
            :icon="icon"
            :type="type"
            :size="size"
            :plain="plain"
            :round="round"
            :circle="circle"
            :disabled="disabled"
            :loading="loading"
        >
            <span v-if="label">{{label}}</span>
        </el-button>
        `,
        };
    });

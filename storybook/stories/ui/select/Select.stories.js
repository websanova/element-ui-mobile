import Vue from "vue";
import { storiesOf, addDecorator } from "@storybook/vue";
import { text, boolean, number, select } from "@storybook/addon-knobs";

import withBoxPage from "@/storybook/core/decorators/withBoxPage";

const stories = storiesOf("UI|Select", module);
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
    medium: "medium",
    small: "small",
    mini: "mini",
};

const testOptions = [
    {
        value: 1,
        label: "Option1",
    },
    {
        value: 2,
        label: "Option2",
    },
    {
        value: 3,
        label: "Option3",
    },
    {
        value: 4,
        label: "Option4",
    },
    {
        value: 5,
        label: "Option5",
    },
];

stories

    .add("Overview", () => {
        const substories = [
            {
                title: "Basic",
                mod: require("./basic").default,
                source: require("!!raw-loader!./basic"),
            },
            {
                title: "Plain",
                mod: require("./plain").default,
                source: require("!!raw-loader!./plain"),
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
            <h1>Select</h1>
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
            components: {},
            props: {},
            data() {
                return {
                    value: [],
                    options: testOptions,
                };
            },
            template: `
        <div>
            <code-view :content="value" />
            <el-select
                v-model="value"
                multiple
                placeholder="Select"
            >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        `,
        };
    })
    .add("Initial selection", () => {
        return {
            components: {},
            props: {},
            data() {
                return {
                    value: [1, 2],
                    options: testOptions,
                };
            },
            template: `
        <div>
            <code-view :content="value" />
            <el-select
                v-model="value"
                multiple
                placeholder="Select"
            >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        `,
        };
    });

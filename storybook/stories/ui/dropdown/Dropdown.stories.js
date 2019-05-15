import Vue from "vue";
import { storiesOf, addDecorator } from "@storybook/vue";
import { text, boolean, number, select } from "@storybook/addon-knobs";

import withBoxPage from "@/storybook/core/decorators/withBoxPage";

const stories = storiesOf("UI|Dropdown", module);
stories.addDecorator(withBoxPage);

const logger = console;

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

stories.add("Tester", () => {
    return {
        // components: { Dropdown },
        props: {
            label: { default: text("Label", "Click Me") },
            icon: { default: text("Icon", "") },
            type: { default: select("Type", TYPES, "default") },
            size: { default: select("Type", SIZES, "default") },
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
            <el-dropdown
                trigger="click"
            >
                <span class="el-dropdown-link">
                    Dropdown List<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>Action 1 <el-iconbutton icon="cog" /></el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                    <el-dropdown-item>Action 3</el-dropdown-item>
                    <el-dropdown-item disabled>Action 4</el-dropdown-item>
                    <el-dropdown-item divided>Action 5</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        `,
    };
});

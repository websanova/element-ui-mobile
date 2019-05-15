import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import { text, boolean, number, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import withBoxPage from "@/storybook/core/decorators/withBoxPage";

const stories = storiesOf("Core|Typography", module);
stories.addDecorator(withBoxPage);

import example from "./example.md";

stories.add("Fonts", () => {
    return {
        template: `
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>
                ${example}
            </el-main>
        </el-container>
        `,
    };
});

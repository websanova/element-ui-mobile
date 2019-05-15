import Vue from "vue";
import { storiesOf, addDecorator } from "@storybook/vue";
import withBoxPage from "@/storybook/core/decorators/withBoxPage";
import { text, boolean, number, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("UI|Alert", module);
stories.addDecorator(withBoxPage);

export const TYPES = {
    info: "info",
    success: "success",
    warning: "warning",
    error: "error",
};

stories
    .add("Overview", () => {
        const substories = [
            {
                title: "Types",
                mod: require("./types").default,
                source: require("!!raw-loader!./types"),
            },
            {
                title: "Customizable close",
                mod: require("./custom-close").default,
                source: require("!!raw-loader!./custom-close"),
            },
            {
                title: "Icon",
                mod: require("./icon").default,
                source: require("!!raw-loader!./icon"),
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
            <h1>Alert</h1>
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
        Vue.use(ElAlert);

        return {
            props: {
                title: { default: text("Title", "This is an alert") },
                description: { default: text("Description", undefined) },
                type: { default: select("Type", TYPES, "info") },
                closable: { default: boolean("Closable", true) },
                center: { default: boolean("Center", false) },
                closeText: { default: text("Close Text", undefined) },
                showIcon: { default: boolean("Show Icon", false) },
            },
            methods: {
                onClose() {
                    action("close")();
                },
            },
            template: `
        <el-alert
            :title="title"
            :description="description"
            :type="type"
            :closable="closable"
            :center="center"
            :closeText="closeText"
            :showIcon="showIcon"
            @close="onClose"
        />
        `,
        };
    });

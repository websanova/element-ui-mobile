import Vue from "vue";
import { storiesOf, addDecorator } from "@storybook/vue";
import { text, boolean, number, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import IconButton from "@websanova/element-ui-mobile/packages/iconbutton";
import "@websanova/element-ui-mobile/packages/theme-chalk/src/iconbutton.scss";
Vue.use(IconButton);

storiesOf("UI|List*", module)
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

    .add(
        "Basic",
        () => {
            return {
                components: { MyDemo: require("./basic").default },
                template: `
            <div class="box-page"><my-demo v-bind="$attrs"/></div>
        `,
            };
        },
        { notes: require("./basic.md") },
    )
    .add("Multiple Lines", () => {
        return {
            components: { MyDemo: require("./multiple-lines").default },
            template: `
            <div class="box-page"><my-demo v-bind="$attrs"/></div>
        `,
        };
    })
    .add("Item Buttons", () => {
        return {
            components: { MyDemo: require("./item-buttons").default },
            template: `
            <div class="box-page"><my-demo v-bind="$attrs"/></div>
        `,
        };
    });

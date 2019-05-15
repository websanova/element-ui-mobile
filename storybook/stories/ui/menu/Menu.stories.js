import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import { text, boolean, number, select } from "@storybook/addon-knobs";
import withBoxPage from "@/storybook/core/decorators/withBoxPage";
import { action, configureActions } from "@storybook/addon-actions";

import { Button } from "element-ui";
Vue.use(Button);
import Radio from "element-ui/packages/radio";
Vue.use(Radio);
import RadioGroup from "element-ui/packages/radio-group";
Vue.use(RadioGroup);
import RadioButton from "element-ui/packages/radio-button";
Vue.use(RadioButton);

import { Menu } from "element-ui";
import "element-ui/lib/theme-chalk/menu.css";
Vue.component(Menu.name, Menu);

import { Submenu } from "element-ui";
import "element-ui/lib/theme-chalk/submenu.css";
Vue.component(Submenu.name, Submenu);

import { MenuItem } from "element-ui";
import "element-ui/lib/theme-chalk/menu-item.css";
Vue.component(MenuItem.name, MenuItem);

import { MenuItemGroup } from "element-ui";
import "element-ui/lib/theme-chalk/menu-item-group.css";
Vue.component(MenuItemGroup.name, MenuItemGroup);

const stories = storiesOf("UI|NavMenu", module);
stories.addDecorator(withBoxPage);

stories.add("Overview", () => {
    const substories = [
        {
            title: "Basic",
            mod: require("./basic").default,
            source: require("!!raw-loader!./basic"),
        },
        {
            title: "Top bar",
            mod: require("./topbar").default,
            source: require("!!raw-loader!./topbar"),
        },
        {
            title: "Side bar",
            mod: require("./sidebar").default,
            source: require("!!raw-loader!./sidebar"),
        },
        {
            title: "Collapse",
            mod: require("./collapse").default,
            source: require("!!raw-loader!./collapse"),
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
            <h1>NavMenu</h1>
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

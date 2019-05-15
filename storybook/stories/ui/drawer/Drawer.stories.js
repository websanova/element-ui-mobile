import Vue from "vue";
import { storiesOf } from "@storybook/vue";

import withBoxPage from "@/storybook/core/decorators/withBoxPage";
import ElDrawer from "@websanova/element-ui-mobile/packages/drawer";
// import '@websanova/element-ui-mobile/packages/theme-chalk/src/drawer.scss';
// Vue.component(Drawer.name, Drawer);

const stories = storiesOf("UI|Drawer", module);
stories.addDecorator(withBoxPage);

stories.add("Tester", () => {
    return {
        components: { ElDrawer },
        data() {
            return {
                leftVisible: false,
                rightVisible: false,
            };
        },
        methods: {
            toggleLeftDrawer() {
                this.leftVisible = !this.leftVisible;
            },
            toggleRightDrawer() {
                this.rightVisible = !this.rightVisible;
            },
        },
        template: `
          <div>
            <el-button
              @click="toggleLeftDrawer"
            >Open Left Drawer</el-button>

            <el-button
              @click="toggleRightDrawer"
            >Open Right Drawer</el-button>

            <el-drawer
              :visible="leftVisible"
              placement="left"
              class="mobile-full"
              width="240px"
              @close="toggleLeftDrawer"
            >
              asdasd
            </el-drawer>
            <el-drawer
              :visible="rightVisible"
              placement="right"
              class="mobile-full"
              width="240px"
              @close="toggleRightDrawer"
            >
              asdasd
            </el-drawer>
          </div>
        `,
    };
});

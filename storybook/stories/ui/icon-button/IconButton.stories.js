import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import { text, boolean, number, select } from "@storybook/addon-knobs";
import withBoxPage from "@/storybook/core/decorators/withBoxPage";
import ElIconbutton from "@websanova/element-ui-mobile/packages/iconbutton";

const stories = storiesOf("UI|IconButton*", module);
stories.addDecorator(withBoxPage);

stories
    .add("Basic", () => {
        return {
            components: { ElIconbutton },
            props: {},
            template: `
        <div>
            <el-iconbutton icon="cog"></el-iconbutton>
            <el-iconbutton icon="plus"></el-iconbutton>
            <el-iconbutton icon="times"></el-iconbutton>
        </div>
      `,
        };
    })
    .add("Sizes", () => {
        return {
            components: { ElIconbutton },
            props: {},
            template: `
        <div>
            <el-iconbutton icon="cog"></el-iconbutton>
            <el-iconbutton size="medium" icon="cog"></el-iconbutton>
            <el-iconbutton size="small" icon="cog"></el-iconbutton>
            <el-iconbutton size="mini" icon="cog"></el-iconbutton>
        </div>
      `,
        };
    });

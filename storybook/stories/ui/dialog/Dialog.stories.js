import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import { text, boolean, number, select } from '@storybook/addon-knobs';

import withBoxPage from '@/storybook/core/decorators/withBoxPage';

const stories = storiesOf('UI|Dialog', module);
stories.addDecorator(withBoxPage);

stories.add('Tester', () => {

    return {
        props: {},
        data() {
            return {
                visible: false,
            };
        },
        methods: {
            openDialog() {
                this.visible = true;
            },
            closeDialog() {
                this.visible = false;
            },
        },
        template: `
        <div>
            <el-button @click="openDialog">Open Dialog</el-button>
            <el-dialog
                :visible="visible"
                class="mobile-full"
                title="Dashboard Modules"
                @close="closeDialog"
                :show-close="false"
            >
                <el-iconbutton class="el-dialog__close" icon="times" @click="closeDialog" />
                test
            </el-dialog>
        </div>
      `,
    };
});

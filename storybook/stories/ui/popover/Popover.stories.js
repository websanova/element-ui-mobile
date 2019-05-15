import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import { text, boolean, number, select } from '@storybook/addon-knobs';

import withBoxPage from '@/storybook/core/decorators/withBoxPage';

const stories = storiesOf('UI|Popover', module);
stories.addDecorator(withBoxPage);

stories.add('Tester', () => {

    return {
        data() {
            return {
                visible: false,
            };
        },
        template: `
        <div>
          <el-popover
            placement="bottom-start"
            trigger="click"
            popper-class="mobile-full"
            v-model="visible"
          >
            <span slot="reference">
              <el-button>Open Popover</el-button>
            </span>
            Popover Example
            <ui-iconbutton class="popover__close" icon="times" @click="visible = false" />
          </el-popover>
        </div>
      `,
    };
});

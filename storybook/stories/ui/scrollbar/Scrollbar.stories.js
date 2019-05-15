import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import {
    text,
    boolean,
    number,
    select,
} from '@storybook/addon-knobs'

// import withBoxPage from '@/storybook/core/decorators/withBoxPage';

const stories = storiesOf('UI|Scrollbar', module)
// stories.addDecorator(withBoxPage)

stories.add('Tester', () => {

    return {
        props: {},
        data() {
            return {
                visible: false,
            }
        },
        methods: {
            openDialog() {
                this.visible = true
            },
            closeDialog() {
                this.visible = false
            },
        },
        template: `
          <el-scrollbar
            class="el-scrollbar--fix"
          >
            <div class="box-page">
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              test <br/>
              </div>
          </el-scrollbar>
      `,
    }
})

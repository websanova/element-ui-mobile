import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import { text, boolean, number, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import withBoxPage from "@/storybook/core/decorators/withBoxPage";

import { Input } from "element-ui";
import "element-ui/lib/theme-chalk/input.css";
Vue.use(Input);

import Form from "element-ui/packages/form";
import FormItem from "element-ui/packages/form-item";
import "element-ui/lib/theme-chalk/form.css";
Vue.use(Form);
Vue.use(FormItem);

const stories = storiesOf("Form|Form", module);
stories.addDecorator(withBoxPage);

stories.add("Tester", () => {
    return {
        components: {},
        data() {
            return {
                form: {
                    name: "Bob Marley",
                    age: 55,
                },
            };
        },
        methods: {
            submitForm(formName) {
                const form = this.$refs[formName];
                form.validate((valid, invalidFields) => {
                    if (valid) {
                        action("submit")(form.model);
                    } else {
                        action("validation error")(invalidFields);
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
        template: `
            <el-form
                :model="form"
                ref="form"
                label-width="100px"
            >

                <el-form-item
                    label="Name"
                    prop="name"
                    :rules="[
                        { required: true, message: 'name is required'},
                    ]"
                >
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item
                    label="Age"
                    prop="age"
                    :rules="[
                        { required: true, message: 'age is required'},
                        { type: 'number', message: 'age must be a number'}
                    ]"
                >
                    <el-input v-model.number="form.age" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">Submit</el-button>
                    <el-button @click="resetForm('form')">Reset</el-button>
                </el-form-item>

            </el-form>
        `,
    };
});

import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import { text, boolean, number, select } from "@storybook/addon-knobs";
import withBoxPage from "@/storybook/core/decorators/withBoxPage";

import FormGenerator from "@websanova/element-ui-mobile/packages/form-generator";
Vue.use(FormGenerator);

const stories = storiesOf("Forms|FormGenerator", module);
stories.addDecorator(withBoxPage);

const fields = [
    {
        title: "Text",
        prop: "text",
        type: "text",
        placeholder: "This is a placeholder",
    },
    {
        title: "Textarea",
        prop: "textarea",
        type: "textarea",
        placeholder: "This is a placeholder",
    },
    {
        title: "Email",
        prop: "email",
        type: "email",
        placeholder: "you@domain.com",
    },
    {
        title: "Integer",
        prop: "integer",
        type: "integer",
    },
    {
        title: "Float",
        prop: "float",
        type: "float",
    },
    {
        title: "Password",
        prop: "password",
        type: "password",
    },
    {
        title: "Percent",
        prop: "percent",
        type: "percent",
    },
    {
        title: "Url",
        prop: "url",
        type: "url",
    },
    {
        title: "Checkbox",
        prop: "checkbox",
        type: "checkbox",
    },
    {
        title: "Switch",
        prop: "switch",
        type: "toggle",
    },
    {
        title: "Range",
        prop: "range",
        type: "range",
    },
    {
        title: "Radio",
        prop: "radio",
        type: "radio",
        default: "option2",
        options: [
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
            { label: "Option 3", value: "option3" },
        ],
    },
    {
        title: "Select",
        prop: "select",
        type: "option",
        default: "option2",
        options: [
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
            { label: "Option 3", value: "option3" },
        ],
    },
];

stories.add("Basic", () => {
    return {
        data() {
            return {
                fields,
                form: {
                    errors: {},
                    body: {
                        text: "test",
                        select: "option3",
                    },
                },
            };
        },
        created() {
            // populate default values
            for (const field of this.fields) {
                if (
                    !this.form.body[field.prop] &&
                    field.default !== undefined
                ) {
                    this.form.body[field.prop] = field.default;
                }
            }
        },
        methods: {
            onChange(form, field, value) {
                console.log("onChadddnge", form, field, value);
                // this.form = form;
            },
            onReset() {
                console.log("this.form", this.form);
                this.form.reset();
            },
        },
        template: `
        <div>
            <el-form-generator
                :form="form"
                @change="onChange"
                :fields="fields"
                label-width="140px"
            ></el-form-generator>
            <el-button @click="onReset">Reset</el-button>
            <code-view :content="form.body" />
        </div>
        `,
    };
});

import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import { text, boolean, number, select } from "@storybook/addon-knobs";
import withBoxPage from "@/storybook/core/decorators/withBoxPage";

import { Input } from "element-ui";
import "element-ui/lib/theme-chalk/input.css";
Vue.use(Input);

import Form from "@websanova/element-ui-mobile/packages/form";
import FormItem from "@websanova/element-ui-mobile/packages/form-item";
import FormWrapper from "@websanova/element-ui-mobile/packages/form-wrapper";
import "element-ui/lib/theme-chalk/form.css";
Vue.use(Form);
Vue.use(FormItem);
Vue.use(FormWrapper);

import FormTest from "./forms/Test";

const stories = storiesOf("Forms|FormWrapper", module);
stories.addDecorator(withBoxPage);

stories
    .add("Basic", () => {
        return {
            components: {},
            methods: {
                submit(data) {
                    setTimeout(() => {
                        if (this.mode === "error") {
                            let response = {
                                data: {
                                    errors: [
                                        {
                                            field: "name",
                                            msg: "your name is weird",
                                        },
                                        {
                                            field: "age",
                                            msg: "too old !",
                                        },
                                    ],
                                },
                            };
                            data.error(response);
                        } else if (this.mode === "generalError") {
                            let response = {
                                data: {
                                    msg: "something went wrong at the backend",
                                },
                            };
                            data.error(response);
                        } else {
                            data.success();
                        }

                        // this is only used for testing in storybook
                        this.mode = "normal";
                    }, 1000);
                },
            },
            data() {
                return {
                    mode: null,
                    form: {
                        // method: 'post',
                        // url: 'albums/create',
                        errors: {},
                        body: {
                            age: 55,
                            name: "Bob Marley",
                        },
                    },
                };
            },
            template: `
                <el-form-wrapper
                    :form="form"
                    label-width="100px"
                    @submit="submit"
                >
                    <el-form-item
                        label="Name"
                        :error="form.errors.name"
                        prop="name"
                        :rules="[
                            { required: true, message: 'name is required'},
                        ]"
                    >
                        <el-input
                            v-model="form.body.name"
                            placeholder="Name"
                        ></el-input>
                    </el-form-item>

                    <el-form-item
                        label="Age"
                        :error="form.errors.age"
                        prop="age"
                        :rules="[
                            { required: true, message: 'age is required'},
                            { type: 'number', message: 'age must be a number'}
                        ]"
                    >
                        <el-input
                            v-model.number="form.body.age"
                            placeholder="Age"
                        ></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="() => form.submit()"
                            :disabled="form.pristine"
                            :loading="form.loading"
                        >
                        Submit
                        </el-button>
                        <el-button
                            type="primary"
                            @click="() => {
                                // this is only used for testing in storybook
                                this.mode = 'error';
                                form.submit()
                            }"
                            :disabled="form.pristine"
                            :loading="form.loading"
                            >
                        Field errors
                        </el-button>
                        <el-button
                            type="primary"
                            @click="() => {
                                // this is only used for testing in storybook
                                this.mode = 'generalError';
                                form.submit()
                            }"
                            :disabled="form.pristine"
                            :loading="form.loading"
                        >
                        General error
                        </el-button>
                        <el-button
                            :disabled="form.pristine"
                            @click="() => form.reset()"
                        >
                            Reset
                        </el-button>

                        <p v-if="form.status === 'success'" class="text-success">Your form has been submitted</p>
                        <p v-if="form.status === 'error'" class="text-danger">
                        {{ form.errors.general }}
                        </p>
                    </el-form-item>

                    <code-view v-if="form" :content="form" />

                </el-form-wrapper>
            `,
        };
    })
    .add("Sub component", () => {
        return {
            components: { FormTest },
            methods: {
                submit(data) {
                    setTimeout(() => {
                        if (this.mode === "error") {
                            let response = {
                                data: {
                                    errors: [
                                        {
                                            field: "name",
                                            msg: "your name is weird",
                                        },
                                        {
                                            field: "age",
                                            msg: "too old !",
                                        },
                                    ],
                                },
                            };
                            data.error(response);
                        } else if (this.mode === "generalError") {
                            let response = {
                                data: {
                                    msg: "something went wrong at the backend",
                                },
                            };
                            data.error(response);
                        } else {
                            data.success();
                        }

                        // this is only used for testing in storybook
                        // this.$set(this, 'mode', 'normal')
                        this.mode = "normal";
                    }, 1000);
                },
                submitFieldError() {
                    this.mode = "error";
                    this.form.submit();
                },
                submitGeneralError() {
                    this.mode = "generalError";
                    this.form.submit();
                },
            },
            data() {
                return {
                    mode: "normal",
                    form: {
                        // method: 'post',
                        // url: 'albums/create',
                        errors: {},
                        body: {
                            age: 55,
                            name: "Bob Marley",
                        },
                    },
                };
            },
            template: `
                <el-form-wrapper
                    :form="form"
                    label-width="100px"
                    @submit="submit"
                >
                    <form-test
                        :form="form"
                    ></form-test>

                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="() => form.submit()"
                            :disabled="form.pristine"
                            :loading="form.loading"
                        >
                            Submit
                        </el-button>
                        <el-button
                            type="primary"
                            @click="submitFieldError"
                            :disabled="form.pristine"
                            :loading="form.loading"
                        >
                            Field errors
                        </el-button>
                        <el-button
                            type="primary"
                            @click="submitGeneralError"
                            :disabled="form.pristine"
                            :loading="form.loading"
                        >
                            General error
                        </el-button>
                        <el-button
                            @click="() => form.reset()"
                            :disabled="form.pristine"
                        >Reset</el-button>

                        <p v-if="form.status === 'success'" class="text-success">Your form has been submitted</p>
                        <p v-if="form.status === 'error'" class="text-danger">
                            {{ form.errors.general }}
                        </p>
                    </el-form-item>

                    <code-view v-if="form" :content="form" />

                </el-form-wrapper>
            `,
        };
    });

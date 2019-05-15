<template>
    <el-form-wrapper
        :form="form"
        @change="onFormChange"
        v-bind="$attrs"
    >
        <el-form-item
            v-for="(field, index) in fields"
            :key="index"
            :label="field.title"
            :error="form.errors[field.prop]"
            :prop="field.prop"
        >

            <el-select
                v-model="form.body[field.prop]"
                v-if="field.type === 'option'"
            >
                <el-option
                    v-for="item in field.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>

            <div
                v-else-if="field.type === 'radio'"
            >
                <el-radio
                    v-for="item in field.options"
                    :key="item.value"
                    :label="item.value"
                    :value="form.body[field.prop]"
                >{{item.label}}</el-radio>
            </div>


            <el-input
                v-else-if="
                    field.type === 'percent' ||
                    field.type === 'email' ||
                    field.type === 'url'
                "
                v-model="form.body[field.prop]"
            >
                <template slot="append" v-if="field.type === 'percent'">%</template>
                <template slot="append" v-if="field.type === 'email'"><el-icon name="regular/envelope" /></template>
                <template slot="append" v-if="field.type === 'url'"><el-icon name="globe" /></template>
            </el-input>

            <component
                v-else-if="componentAttrs(field)"
                v-model="form.body[field.prop]"
                :is="(componentFromType(field.type) || {}).module"
                v-bind="componentAttrs(field)"
            ></component>
        </el-form-item>
    </el-form-wrapper>
</template>

<script>
    // @change="value => onChange(field, item.value)"
    import ElInput from "element-ui/packages/input";

    import ElFormWrapper from "@websanova/element-ui-mobile/packages/form-wrapper";

    const componentsByType = {
        text: {
            module: "el-input",
            attrs: {
                type: "text"
            }
        },
        textarea: {
            module: "el-input",
            attrs: {
                type: "textarea"
            }
        },
        email: {
            module: "el-input",
            attrs: {
                type: "email"
            }
        },
        integer: {
            module: "el-input",
            attrs: {
                type: "number"
            }
        },
        float: {
            module: "el-input",
            attrs: {
                type: "float"
            }
        },
        password: {
            module: "el-input",
            attrs: {
                type: "password"
            }
        },
        percent: {
            module: "el-input",
            attrs: {
                type: "percent"
            }
        },
        url: {
            module: "el-input",
            attrs: {
                type: "url"
            }
        },
        checkbox: {
            module: "el-checkbox",
            attrs: {
                label: "test"
            }
        },
        toggle: {
            module: "el-switch",
            attrs: {
                label: "test"
            }
        },
        range: {
            module: "el-slider",
            attrs: {
                label: "test"
            }
        },
        radio: {
            module: "el-radio",
            attrs: {
                label: "test"
            }
        },
        option: {
            module: "el-select",
            attrs: {
                label: "test"
            }
        }
    };

    export default {
        name: "ElFormGenerator",
        components: { ElFormWrapper },
        props: {
            fields: Array,
            form: {
                type: Object,
                default() {
                    return {
                        errors: {},
                        body: {}
                    };
                }
            }
        },
        data() {
            return {
                componentsByType
            };
        },
        watch: {
            body() {
                // console.log("CHANGE", arguments);
                // this.onChange();
            }
        },
        computed: {
            body() {
                return this.form.body;
            }
        },
        methods: {
            onFormChange(form, prop, value) {
                const field = this.fields.find(f => f.prop === prop);
                if (!field) {
                    throw new Error(`field ${prop} not found !`);
                }
                this.onChange({ prop, type: field.type }, value);
            },
            onChange(field, value) {
                const body = Object.assign({}, this.form.body);

                /*if (field.type === "integer") {
                                value = parseInt(value, 10);
                            }*/

                body[field.prop] = value;
                this.form.body = body;
                this.$emit("change", this.form, field, value);
            },
            componentFromType(type) {
                return componentsByType[type];
            },
            componentAttrs(field) {
                if (!field.type) {
                    console.error(`missing field type`, field);
                }
                if (!componentsByType[field.type]) {
                    throw new Error(`field of type "${field.type}"`);
                }

                const attrs = Object.assign(
                    {},
                    componentsByType[field.type].attrs || {}
                );

                if (field.placeholder) attrs.placeholder = field.placeholder;
                if (field.disabled) attrs.disabled = field.disabled;
                if (field.clearable) attrs.clearable = field.clearable;
                if (field.size) attrs.size = field.size;
                if (field.max) attrs.max = field.max;
                if (field.min) attrs.min = field.min;
                if (field.step) attrs.step = field.step;

                if (field.showWordLimit) attrs.showWordLimit = field.showWordLimit;

                return attrs;
            }
        }
    };
</script>

<template>
    <el-form-wrapper
        :form="form"
        @change="onFormChange"
        @created="onFormCreated"
        @submit="onFormSubmit"
        @success="onFormSuccess"
        @error="onFormError"
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

            <el-select-remote
                v-model="form.body[field.prop]"
                v-else-if="field.type === 'select-remote'"
                :url="field.url"
                :placeholder="field.placeholder"
                :autofill="true"
                @clear="onClearSelect(field, index)"
                v-bind="componentAttrs(field)"
            >

            </el-select-remote>

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
                <template slot="append" v-if="field.type === 'email'"><el-icon name="light/envelope" /></template>
                <template slot="append" v-if="field.type === 'url'"><el-icon name="light/globe" /></template>
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
    import ElInput from 'element-ui/packages/input'

    import ElFormWrapper from '@websanova/element-ui-mobile/packages/form-wrapper'

    const componentsByType = {
        text: {
            module: 'el-input',
            attrs: {
                type: 'text',
            },
        },
        textarea: {
            module: 'el-input',
            attrs: {
                type: 'textarea',
            },
        },
        email: {
            module: 'el-input',
            attrs: {
                type: 'email',
            },
        },
        integer: {
            module: 'el-input',
            attrs: {
                type: 'number',
            },
        },
        float: {
            module: 'el-input',
            attrs: {
                type: 'float',
            },
        },
        password: {
            module: 'el-input',
            attrs: {
                type: 'password',
            },
        },
        percent: {
            module: 'el-input',
            attrs: {
                type: 'percent',
            },
        },
        url: {
            module: 'el-input',
            attrs: {
                type: 'url',
            },
        },
        checkbox: {
            module: 'el-checkbox',
            attrs: {
                label: 'test',
            },
        },
        toggle: {
            module: 'el-switch',
            attrs: {},
        },
        range: {
            module: 'el-slider',
            attrs: {},
        },
        radio: {
            module: 'el-radio',
            attrs: {},
        },
        option: {
            module: 'el-select',
            attrs: {},
        },
        'select-remote': {
            module: 'el-select-remote',
            attrs: {
                autofill: true,
                clearable: true,
            },
        },
    }

    export default {
        name: 'ElFormGenerator',
        components: { ElFormWrapper },
        props: {
            fields: Array,
            components: Object,
            form: {
                type: Object,
                default() {
                    return {
                        errors: {},
                        body: {},
                    }
                },
            },
        },
        data() {
            return {
                componentsByType: componentsByType,
            }
        },

        computed: {
            body() {
                return this.form.body
            },
        },

        methods: {
            onFormCreated() {
                this.$emit('created', this.form)
            },
            onFormSubmit(form) {
                //this.$emit("submit", form);
            },
            onFormSuccess(err, form) {
                this.$emit('success', err, form)
            },
            onFormError(err, form) {
                this.$emit('error', err, form)
            },
            onFormChange(form, prop, value) {
                const field = this.fields.find(f => f.prop === prop)
                if (!field) {
                    throw new Error(`field ${prop} not found !`)
                }
                this.onChange({ prop, type: field.type }, value)
            },
            onChange(field, value) {
                const body = Object.assign({}, this.form.body)

                // if (field.type === "integer") {
                //     value = parseInt(value, 10);
                // }

                body[field.prop] = value
                this.form.body = body
                this.$emit('change', this.form, field, value)
            },
            componentFromType(type) {
                return this.componentsByType[type]
            },
            componentAttrs(field) {
                if (!field.type) {
                    console.error(`missing field type`, field)
                }
                if (!this.componentsByType[field.type]) {
                    throw new Error(`field of type "${field.type}" not found`)
                }

                console.log(
                    'this.componentsByType[field.type]',
                    field.type,
                    this.componentsByType[field.type]
                )

                const attrs = Object.assign(
                    {},
                    (this.componentsByType[field.type] || {}).attrs || {},
                    field.attrs || {}
                )

                if (field.placeholder) attrs.placeholder = field.placeholder
                if (field.disabled) attrs.disabled = field.disabled
                if (field.clearable) attrs.clearable = field.clearable
                if (field.size) attrs.size = field.size
                if (field.max) attrs.max = field.max
                if (field.min) attrs.min = field.min
                if (field.step) attrs.step = field.step

                if (field.showWordLimit) attrs.showWordLimit = field.showWordLimit
                console.log('attrs', attrs)
                return attrs
            },
            onClearSelect(field, index) {
                this.form.body[field.prop] = undefined
            },
        },
    }
</script>

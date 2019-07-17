<script>
    import ElInput from 'element-ui/packages/input'
    import ElFormWrapper from '@websanova/element-ui-mobile/packages/form-wrapper'

    const componentsByType = {
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
            reset: Boolean,
            resetText: String,
            save: Boolean,
            saveText: String,
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
                this.onChange(field, value)
            },
            onChange(field, value) {
                // const body = Object.assign({}, this.form.body)

                // if (field.type === "integer") {
                //     value = parseInt(value, 10);
                // }

                this.form.body[field.prop] = value
                // this.form.body = body
                // debugger
                this.$emit('change', this.form, field, value)
            },
            componentFromType(type) {
                return this.componentsByType[type]
            },
            componentAttrs(field) {
                const attrs = Object.assign({}, field.attrs || {})

                if (field.placeholder !== undefined) attrs.placeholder = field.placeholder
                if (field.disabled !== undefined) attrs.disabled = field.disabled
                if (field.clearable !== undefined) attrs.clearable = field.clearable
                if (field.size !== undefined) attrs.size = field.size
                if (field.max !== undefined) attrs.max = field.max
                if (field.min !== undefined) attrs.min = field.min
                if (field.step !== undefined) attrs.step = field.step
                if (field.showWordLimit !== undefined) attrs.showWordLimit = field.showWordLimit
                if (field.autofetch !== undefined) attrs.autofetch = field.autofetch
                if (field.autofill !== undefined) attrs.autofill = field.autofill

                return attrs
            },
            onClearSelect(field, index) {
                this.form.body[field.prop] = undefined
            },
            handleClickSubmit() {
                if (this.form) {
                    this.form.submit()
                }
                this.$emit('submit')
            },
            handleReset() {
                if (this.form) {
                    this.form.reset()
                }
                this.$emit('reset')
            },
        },

        render() {
            const attributes = {
                attrs: this.$attrs,
            }

            return (
                <el-form-wrapper
                    form={this.form}
                    on-change={this.onFormChange}
                    on-created={this.onFormCreated}
                    on-submit={this.onFormSubmit}
                    on-success={this.onFormSuccess}
                    on-error={this.onFormError}
                    {...attributes}
                >
                    {this.fields.map((field, index) => {
                        // console.log('field', field)
                        // console.log('TEST', this.componentAttrs(field))
                        const compAttrs = {
                            // on: {
                            //     input: v => {
                            //         console.log('input', v)
                            //         this.form.body[field.prop] = v
                            //     },
                            // },
                            // props: {
                            //     value: this.form.body[field.prop],
                            // },

                            attrs: this.componentAttrs(field),
                            // model: {
                            //     value: this.form.body[field.prop],
                            //     callback: value => {
                            //         this.form.body[field.prop] = value
                            //     },
                            // },
                        }

                        let compDef = this.componentFromType(field.type) || {}

                        let Component

                        switch (field.type) {
                            case 'text':
                            case 'phone':
                            case 'password':
                            case 'percent':
                            case 'url':
                            case 'email':
                            case 'textarea':
                                Component = (
                                    <el-input
                                        type={field.type}
                                        v-model={this.form.body[field.prop]}
                                        {...compAttrs}
                                    />
                                )
                                break
                            // case 'email':
                            //     Component = (
                            //         <el-input type={field.type} v-model={this.form.body[field.prop]}>
                            //             <template slot="append" v-if="field.type === 'email'">
                            //                 <el-icon name="regular/envelope" />
                            //             </template>
                            //         </el-input>
                            //     )
                            //     break
                            case 'float':
                            case 'integer':
                                Component = (
                                    <el-input
                                        type="number"
                                        v-model={this.form.body[field.prop]}
                                        {...compAttrs}
                                    />
                                )
                                break

                            case 'range':
                                Component = (
                                    <el-slider v-model={this.form.body[field.prop]} {...compAttrs} />
                                )
                                break

                            case 'checkbox':
                                Component = (
                                    <el-checkbox v-model={this.form.body[field.prop]} {...compAttrs} />
                                )
                                break

                            case 'switch':
                            case 'toggle':
                                Component = (
                                    <el-switch v-model={this.form.body[field.prop]} {...compAttrs} />
                                )
                                break

                            case 'radio':
                                Component = (
                                    <div>
                                        {field.options.map(item => {
                                            return (
                                                <el-radio
                                                    key={item.value}
                                                    label={item.value}
                                                    v-model={this.form.body[field.prop]}
                                                    {...compAttrs}
                                                >
                                                    {item.label}
                                                </el-radio>
                                            )
                                        })}
                                    </div>
                                )
                                break
                            case 'select-remote':
                                Component = (
                                    <el-select-remote
                                        v-model={this.form.body[field.prop]}
                                        url={field.url}
                                        placeholder={field.placeholder}
                                        autofetch={field.autofetch}
                                        autofill={field.autofill !== undefined ? field.autofill : true}
                                        on-clear={() => this.onClearSelect(field, index)}
                                    />
                                )
                                break
                            case 'option':
                            case 'select':
                                Component = (
                                    <el-select v-model={this.form.body[field.prop]} {...compAttrs}>
                                        {field.options.map(item => {
                                            return (
                                                <el-option
                                                    key={item.value}
                                                    label={item.label}
                                                    value={item.value}
                                                ></el-option>
                                            )
                                        })}
                                    </el-select>
                                )
                                // Component = <code-view content={compAttrs} />
                                break
                            default:
                                Component = <div>---</div>
                        }

                        return (
                            <el-form-item
                                key={index}
                                label={field.title}
                                error={this.form.errors[field.prop]}
                                prop={field.prop}
                            >
                                {Component}
                            </el-form-item>
                        )
                    })}

                    <el-form-item>
                        <div>
                            {this.reset && (
                                <el-button on-click={this.handleReset}>
                                    {this.resetText || 'Reset'}
                                </el-button>
                            )}
                            {this.save && (
                                <el-button
                                    type="primary"
                                    loading={this.form && this.form.loading}
                                    on-click={this.handleClickSubmit}
                                >
                                    {this.saveText || 'Submit'}
                                </el-button>
                            )}
                        </div>
                    </el-form-item>
                </el-form-wrapper>
            )
        },
    }
</script>

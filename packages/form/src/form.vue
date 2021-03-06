<template>
  <form class="el-form" :class="[
    labelPosition ? 'el-form--label-' + labelPosition : '',
    { 'el-form--inline': inline }
  ]">
    <slot></slot>
  </form>
</template>
<script>
    import objectAssign from 'element-ui/src/utils/merge'
    import { setTimeout } from 'timers'

    export default {
        name: 'ElForm',

        componentName: 'ElForm',

        provide() {
            return {
                elForm: this,
            }
        },

        props: {
            model: Object,
            rules: Object,
            labelPosition: String,
            labelWidth: String,
            labelSuffix: {
                type: String,
                default: '',
            },
            inline: Boolean,
            inlineMessage: Boolean,
            statusIcon: Boolean,
            showMessage: {
                type: Boolean,
                default: true,
            },
            size: String,
            disabled: Boolean,
            validateOnRuleChange: {
                type: Boolean,
                default: true,
            },
            hideRequiredAsterisk: {
                type: Boolean,
                default: false,
            },
        },
        watch: {
            rules() {
                if (this.validateOnRuleChange) {
                    this.validate(() => {})
                }
            },
        },
        data() {
            return {
                fields: [],
                resetting: false,
            }
        },
        created() {
            this.$on('el.form.addField', field => {
                if (field) {
                    this.fields.push(field)
                }
            })
            /* istanbul ignore next */
            this.$on('el.form.removeField', field => {
                if (field.prop) {
                    this.fields.splice(this.fields.indexOf(field), 1)
                }
            })
            this.$on('el.form.change', (changedField, prop) => {
                // don't emit any changes if the change happened because of a reset
                if (this.resetting) return

                this.$emit('change', this.form, prop, changedField.fieldValue)
            })
        },
        computed: {
            dirty() {
                let dirty = false
                this.fields.forEach(field => {
                    if (field.dirty) dirty = field.dirty
                })
                return dirty
            },
            hasValidationError() {
                let hasValidationError = false
                this.fields.forEach(field => {
                    if (field.validateState === 'error') hasValidationError = true
                })
                return hasValidationError
            },
        },
        methods: {
            resetFields() {
                if (!this.model) {
                    console.warn('[Element Warn][Form]model is required for resetFields to work.')
                    return
                }
                this.resetting = true
                this.fields.forEach(field => {
                    field.resetField()
                })
                setTimeout(() => {
                    this.resetting = false
                }, 10)
            },
            updateFields() {
                if (!this.model) {
                    console.warn('[Element Warn][Form]model is required for updateFields to work.')
                    return
                }
                this.fields.forEach(field => {
                    field.updateField()
                })
            },
            syncFields() {
                if (!this.model) {
                    console.warn('[Element Warn][Form]model is required for syncFields to work.')
                    return
                }
            },
            clearValidate(props = []) {
                const fields = props.length
                    ? typeof props === 'string'
                        ? this.fields.filter(field => props === field.prop)
                        : this.fields.filter(field => props.indexOf(field.prop) > -1)
                    : this.fields
                fields.forEach(field => {
                    field.clearValidate()
                })
            },
            validate(callback) {
                if (!this.model) {
                    console.warn('[Element Warn][Form]model is required for validate to work!')
                    return
                }

                let promise
                // if no callback, return promise
                if (typeof callback !== 'function' && window.Promise) {
                    promise = new window.Promise((resolve, reject) => {
                        callback = function(valid) {
                            valid ? resolve(valid) : reject(valid)
                        }
                    })
                }

                let valid = true
                let count = 0
                // 如果需要验证的fields为空，调用验证时立刻返回callback
                if (this.fields.length === 0 && callback) {
                    callback(true)
                }
                let invalidFields = {}
                this.fields.forEach(field => {
                    field.validate('', (message, field) => {
                        if (message) {
                            valid = false
                        }
                        invalidFields = objectAssign({}, invalidFields, field)
                        if (typeof callback === 'function' && ++count === this.fields.length) {
                            callback(valid, invalidFields)
                        }
                    })
                })

                if (promise) {
                    return promise
                }
            },
            validateField(props, cb) {
                props = [].concat(props)
                const fields = this.fields.filter(field => props.indexOf(field.prop) !== -1)
                if (!fields.length) {
                    console.warn('[Element Warn]please pass correct props!')
                    return
                }

                fields.forEach(field => {
                    field.validate('', cb)
                })
            },
        },
    }
</script>

<template>
    <el-form
        ref="form"
        :model="form.body"
        :label-width="labelWidth"
        :hide-required-asterisk="hideRequiredAsterisk"
        @submit.prevent.native="nil()"
        @change="change"
        @validate="validate"
    >
        <slot></slot>
        <p
            class="el-form__error text-center"
            v-if="form.errors.general"
        >
            {{form.errors.general}}
        </p>
    </el-form>
</template>

<script>
    export default {
        name: 'ElFormWrapper',

        props: {
            form: {
                type: Object,
                default() {
                    return {
                        errors: {},
                    }
                },
            },

            labelWidth: {
                type: String,
                default: '0px',
            },
            hideRequiredAsterisk: {
                type: Boolean,
                default: true,
            },
            skipHttp: Boolean,
        },

        created() {
            if (!this.form.status) {
                this.$set(this.form, 'status', null)
            }
            if (!this.form.loading) {
                this.$set(this.form, 'loading', false)
            }
            if (!this.form.dirty) {
                this.$set(this.form, 'dirty', false)
            }
            if (!this.form.hasValidationError) {
                this.$set(this.form, 'hasValidationError', false)
            }
            if (!this.form.pristine) {
                this.$set(this.form, 'pristine', true)
            }
            if (!this.form.body) {
                this.$set(this.form, 'body', {})
            }
            if (!this.form.errors) {
                this.$set(this.form, 'errors', {})
            }

            this.form.reset = this.reset
            this.form.submit = this.submit

            this.form.success = res => {
                this.form.status = 'success'
                this.form.loading = false

                if (this.form.clear === true) {
                    // this.$refs.form.resetFields();
                    this.reset()
                    this.form.body = {}
                }

                if (this.form.msg && res.data.msg) {
                    this.UI.message({
                        type: 'info',
                        message: res.data.msg,
                    })
                }

                this.form.errors = {}
                // update initial form values
                if (this.$refs.form) this.$refs.form.updateFields()
                this.syncState()
                this.$emit('success', res, this.form)
            }

            this.form.error = res => {
                const body = res.data || res.body
                if (!body) {
                    console.error(res)
                    return
                }
                this.form.status = 'error'
                this.form.loading = false

                this.setErrors(body.errors || [{ field: 'general', msg: body.msg || body.message }])

                if (this.form.msg && body.msg) {
                    this.UI.message({
                        type: 'error',
                        message: body.msg,
                    })
                }
                this.$emit('error', res, this.form)
            }
            this.form.clear = res => {
                this.form.status = null
                this.setErrors([])
            }

            this.$emit('created', this.form)
        },

        computed: {
            dirty() {
                if (!this.$refs.form) return null
                return this.$refs.form.dirty
            },
            hasValidationError() {
                if (!this.$refs.form) return null
                return this.$refs.form.hasValidationError
            },
        },

        methods: {
            nil() {
                // do nothing
            },

            change(form, field, value) {
                this.syncState()
                this.$emit('change', this.form, field, value)
            },

            validate() {
                this.form.hasValidationError = this.hasValidationError
            },

            autoSubmit() {
                if (this.form.auto === false) {
                    return
                }

                this.submit()
            },

            submit() {
                this.form.status = 'loading'
                this.form.loading = true
                this.$emit('submit', this.form)

                if (this.form.url && !this.skipHttp) {
                    this.$http(this.form).then(
                        res => {
                            this.form.success(res, this.form)
                        },
                        res => {
                            this.form.error(res, this.form)
                        }
                    )
                } else {
                    this.form.success(null, this.form)
                }
            },

            reset(data) {
                data = data || {}

                // reset form field and body
                if (this.$refs.form) {
                    this.$refs.form.resetFields()
                    // this.$refs.form.clearValidate();
                }

                if (data.body) this.form.body = data.body
                if (data.method) this.form.method = data.method
                if (data.url) this.form.url = data.url

                // reset values used for server side validation
                this.form.status = data.status || null
                this.form.errors = data.errors || {}
                this.form.loading = false

                setTimeout(() => {
                    if (this.$refs.form) {
                        this.$refs.form.clearValidate()
                    }
                }, 1)

                this.syncState()
            },

            syncState() {
                this.form.dirty = this.dirty
                this.form.pristine = !this.dirty
                this.form.hasValidationError = this.hasValidationError
            },

            setErrors(validationErrors) {
                var i,
                    ii,
                    errors = {}

                validationErrors = validationErrors || []

                for (i = 0, ii = validationErrors.length; i < ii; i++) {
                    const err = validationErrors[i]
                    if (!errors[err.field]) {
                        errors[err.field] = err.msg || err.message
                    }
                }

                this.form.errors = errors
            },
        },
    }
</script>

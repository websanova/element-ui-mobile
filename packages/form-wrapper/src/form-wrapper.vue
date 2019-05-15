<template>
    <el-form
        ref="form"
        :model="form.body"
        :label-width="labelWidth"
        @submit.prevent.native="nil()"
        @change="change"
        @validate="validate"
    >
        <slot></slot>
    </el-form>
</template>

<script>
    export default {
        name: "ElFormWrapper",

        props: {
            form: {
                type: Object,
                default() {
                    return {};
                }
            },

            labelWidth: {
                type: String,
                default: "0px"
            }
        },

        created() {
            if (!this.form.status) {
                this.$set(this.form, "status", null);
            }
            if (!this.form.loading) {
                this.$set(this.form, "loading", false);
            }
            if (!this.form.dirty) {
                this.$set(this.form, "dirty", false);
            }
            if (!this.form.hasValidationError) {
                this.$set(this.form, "hasValidationError", false);
            }
            if (!this.form.pristine) {
                this.$set(this.form, "pristine", true);
            }
            if (!this.form.body) {
                this.$set(this.form, "body", {});
            }
            if (!this.form.errors) {
                this.$set(this.form, "errors", {});
            }

            this.form.reset = this.reset;
            this.form.submit = this.submit;

            this.form.success = res => {
                this.form.status = "success";
                this.form.loading = false;

                if (this.form.clear === true) {
                    this.form.body = {};
                }

                if (this.form.msg && res.data.msg) {
                    this.$store.dispatch("messages/info", res.data.msg);
                }

                this.form.errors = {};

                // update initial form values
                this.$refs.form.updateFields();
            };

            this.form.error = res => {
                this.form.status = "error";
                this.form.loading = false;

                this.setErrors(
                    res.data.errors || [
                        { field: "general", msg: res.data.msg || res.data.message },
                        {
                            field: res.data.code,
                            msg: res.data.msg || res.data.message
                        }
                    ]
                );

                if (this.form.msg && res.data.msg) {
                    this.$store.dispatch("messages/error", res.data.msg);
                }
            };
        },

        mounted() {},

        computed: {
            dirty() {
                if (!this.$refs.form) return null;
                return this.$refs.form.dirty;
            },
            hasValidationError() {
                if (!this.$refs.form) return null;
                return this.$refs.form.hasValidationError;
            }
        },

        methods: {
            nil() {
                // do nothing
            },

            change(form, field, value) {
                this.form.dirty = this.dirty;
                this.form.pristine = !this.dirty;
                this.$emit("change", form, field, value);
            },

            validate() {
                this.form.hasValidationError = this.hasValidationError;
            },

            autoSubmit() {
                if (this.form.auto === false) {
                    return;
                }

                this.submit();
            },

            submit() {
                this.form.status = "loading";
                this.form.loading = true;

                this.$emit("submit", this.form);
            },

            reset(data) {
                data = data || {};

                // reset form field and body
                this.$refs.form.resetFields();

                // reset values used for server side validation
                this.form.status = data.status || null;
                this.form.errors = data.errors || {};
                this.form.loading = false;
                this.form.dirty = false;
                this.form.pristine = true;
                this.form.hasValidationError = false;
            },

            setErrors(validationErrors) {
                var i,
                    ii,
                    errors = {};

                validationErrors = validationErrors || [];

                for (i = 0, ii = validationErrors.length; i < ii; i++) {
                    if (!errors[validationErrors[i].field]) {
                        errors[validationErrors[i].field] =
                            validationErrors[i].msg || validationErrors[i].message;
                    }
                }

                this.form.errors = errors;
            }
        }
    };
</script>

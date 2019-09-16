<template>
    <el-form-wrapper
        :form="form"

        label-width="100px"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <my-form :form="form" />

    </el-form-wrapper>
</template>

<script>

// import ElFormWrapper from '@websanova/element-ui-mobile/packages/form-wrapper'
import MyForm from './Test';

export default {
    components: {
        MyForm,
        ElFormWrapper,
    },
    props: {
        formData: {
            type: Object,
            default() {
                return {
                    name: 'My Team',
                }
            }
        }
    },
    data() {
        return {
            form: {
                method: 'POST',
                body: {},
                errors: {}
            }
        }
    },
    created() {
        if (this.formData) this.form.body = this.formData;
    },
}
</script>

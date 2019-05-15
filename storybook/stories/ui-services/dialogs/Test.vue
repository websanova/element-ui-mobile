<template>
    <div>
        <div v-if="!form">This form needs form data</div>
        <div v-if="form">
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
        </div>
    </div>
</template>

<script>
    export default {
        props: ['form'],
    };
</script>

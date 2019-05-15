<template>
    <div class="page--article">
        <h2>Notifications</h2>
        <el-button @click="onNotify">Default</el-button>
        <el-button @click="onNotifySuccess">Success</el-button>
        <el-button @click="onNotifyInfo">Info</el-button>
        <el-button @click="onNotifyWarning">Warning</el-button>
        <el-button @click="onNotifyError">Error</el-button>
    </div>
</template>

<script>
    export default {
        methods: {
            onNotify() {
                this.$notify({
                    title: "Test",
                    message: "This is a notification"
                });
            },
            onNotifySuccess() {
                this.$notify({
                    title: "Test",
                    message: "This is a notification",
                    type: "success"
                });
            },
            onNotifyInfo() {
                this.$notify({
                    title: "Test",
                    message: "This is a notification",
                    type: "info"
                });
            },
            onNotifyWarning() {
                this.$notify({
                    title: "Test",
                    message: "This is a notification",
                    type: "warning"
                });
            },
            onNotifyError() {
                this.$notify({
                    title: "Test",
                    message: "This is a notification",
                    type: "error"
                });
            }
        }
    };
</script>

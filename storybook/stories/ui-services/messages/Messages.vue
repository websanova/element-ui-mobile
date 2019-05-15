<template>
    <div class="page--article">
        <h2>Messages</h2>
        <el-button @click="onMessage">Default</el-button>
        <el-button @click="onMessageSuccess">Success</el-button>
        <el-button @click="onMessageError">Error</el-button>
        <el-button @click="onMessageInfo">Info</el-button>
        <el-button @click="onMessageWarning">Warning</el-button>
    </div>
</template>

<script>
    export default {
        methods: {
            onMessage() {
                this.$message({
                    message: "This is a message"
                });
            },
            onMessageSuccess() {
                this.$message({
                    message: "This is a success message",
                    type: "success"
                });
            },
            onMessageInfo() {
                this.$message({
                    message: "This is an info message",
                    type: "info"
                });
            },
            onMessageError() {
                this.$message({
                    message: "This is an error message",
                    type: "error"
                });
            },
            onMessageWarning() {
                this.$message({
                    message: "This is a warning message",
                    type: "warning"
                });
            }
        }
    };
</script>

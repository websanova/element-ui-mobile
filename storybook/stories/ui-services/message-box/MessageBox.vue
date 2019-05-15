<template>
    <div class="page--article">
        <h2>MessageBox</h2>
        <el-button @click="onAlert">Alert</el-button>
        <el-button @click="onConfirm">Confirm</el-button>
        <el-button @click="onPrompt">Warn</el-button>
        <el-button @click="onCustom">Custom</el-button>
        <el-button @click="onWithHtml">With html</el-button>
        <el-button @click="onCentered">Centered content</el-button>
    </div>
</template>

<script>
    export default {
        methods: {
            onAlert() {
                this.$alert("This is an alert", "Alert", {
                    confirmButtonText: "OK"
                });
            },
            async onConfirm() {
                this.$confirm(
                    "You have unsaved changes, save and proceed?",
                    "Confirm",
                    {
                        distinguishCancelAndClose: true,
                        confirmButtonText: "Save",
                        cancelButtonText: "Discard Changes"
                    }
                )
                    .then(() => {
                        this.$message({
                            type: "success",
                            message: "You accepted"
                        });
                    })
                    .catch(action => {
                        this.$message({
                            type: "info",
                            message:
                                action === "cancel" ? "You cancelled" : "You closed"
                        });
                    });
            },
            onPrompt() {
                this.$prompt("Please input your e-mail", "Tip", {
                    confirmButtonText: "OK",
                    cancelButtonText: "Cancel",
                    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    inputErrorMessage: "Invalid Email"
                })
                    .then(({ value }) => {
                        this.$message({
                            type: "success",
                            message: "Your email is:" + value
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "Input canceled"
                        });
                    });
            },
            onCustom() {
                const h = this.$createElement;
                this.$msgbox({
                    title: "Message",
                    message: h("p", null, [
                        h("span", null, "Message can be "),
                        h("i", { style: "color: teal" }, "VNode")
                    ]),
                    showCancelButton: true,
                    confirmButtonText: "OK",
                    cancelButtonText: "Cancel",
                    beforeClose: (action, instance, done) => {
                        if (action === "confirm") {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = "Loading...";
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                }, 300);
                            }, 3000);
                        } else {
                            done();
                        }
                    }
                }).then(action => {
                    this.$message({
                        type: "info",
                        message: "action: " + action
                    });
                });
            },
            onWithHtml() {
                this.$alert(
                    "<strong>This is <i>HTML</i> string</strong>",
                    "HTML String",
                    {
                        confirmButtonText: "OK",
                        dangerouslyUseHTMLString: true
                    }
                );
            },
            onCentered() {
                this.$confirm(
                    "This will permanently delete the file. Continue?",
                    "Warning",
                    {
                        confirmButtonText: "OK",
                        cancelButtonText: "Cancel",
                        type: "warning",
                        center: true
                    }
                )
                    .then(() => {
                        this.$message({
                            type: "success",
                            message: "Delete completed"
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "Delete canceled"
                        });
                    });
            }
        }
    };
</script>

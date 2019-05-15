<template>
    <div class="page--article">

        <h2>Dialogs</h2>
        <el-button @click="onAlert">Alert</el-button>
        <el-button @click="onDoubleAlert">Double Alert</el-button>
        <el-button @click="onConfirm">Confirm</el-button>
        <el-button @click="onWarn">Warn</el-button>
        <el-button @click="onError">Error</el-button>
        <br/><br/>

        <el-button @click="onDialog">Dialog</el-button>
        <el-button @click="onDialogComponent">DialogComponent</el-button>
        <el-button @click="onDialogForm">DialogForm</el-button>
        <el-button @click="onDialogFormValues">DialogForm Initial Values</el-button>

    </div>
</template>

<script>
    import TestLorem from "@/storybook/core/elements/LoremIpsum";

    export default {
        components: { TestLorem },
        mounted() {},
        methods: {
            onAlert() {
                this.$UI.alert("This is an alert");
            },
            onDoubleAlert() {
                this.$UI.alert("First alert");
                this.$UI.alert("Second alert");
            },
            async onConfirm() {
                const res = await this.$UI.confirm("Are you sure ?");
                if (res) {
                    this.$message({
                        message: "you confirmed",
                        type: "success"
                    });
                } else {
                    this.$message({
                        message: "you canceled",
                        type: "info"
                    });
                }
            },
            onWarn() {
                this.$UI.warn("This is a warning");
            },
            onError() {
                this.$UI.error("This is an error");
            },
            onDialog() {
                this.$UI.dialog(<test-lorem />);
            },
            async onDialogComponent() {
                const TestLorem = await import("@/storybook/core/elements/LoremIpsum");
                this.$UI.dialog(TestLorem.default);
            },
            async onDialogForm() {
                const FrmTeamCreate = await import("./TestForm");
                this.$UI.dialogForm(FrmTeamCreate.default, {
                    title: "Create Team",
                    onSuccess: (res, form) => {
                        console.info("SUCCESS", res, form);
                        this.$message("success");
                    }
                });
            },
            async onDialogFormValues() {
                const FrmTeamCreate = await import("./TestForm");
                this.$UI.dialogForm(FrmTeamCreate.default, {
                    title: "Create Team",
                    onSuccess: (res, form) => {
                        console.info("SUCCESS", res, form);
                        this.$message("success");
                    },
                    form: {
                        name: "DialogMan"
                    }
                });
            }
        }
    };
</script>

<script>
    // import Vue from 'vue';
    import ElDialogs from "../dialog-manager/DialogManager";
    import ElMessages from "../message-manager/MessageManager";

    // import ElNotification from 'element-ui/packages/notification';
    // import ElMessage from 'element-ui/packages/message';
    // import ElMessageBox from 'element-ui/packages/message-box';

    // Vue.prototype.$notify = ElNotification;
    // Vue.prototype.$message = ElMessage;
    // // Vue.prototype.$loading = Loading.service;

    // // MessageBox
    // Vue.prototype.$msgbox = ElMessageBox;
    // Vue.prototype.$alert = ElMessageBox.alert;
    // Vue.prototype.$confirm = ElMessageBox.confirm;
    // Vue.prototype.$prompt = ElMessageBox.prompt;

    export default {
        name: "UiManager",
        components: { ElDialogs, ElMessages },
        computed: {
            dialogs() {
                return this.$refs.dialogs || {};
            },
            overlayDialogs() {
                return this.$refs.overlayDialogs || {};
            },
            messages() {
                return this.$refs.messages || {};
            }
        },
        methods: {
            alert(message, title, options) {
                if (!options) options = {};

                if (!options.confirmButtonText) options.confirmButtonText = "OK";

                if (title === "undefined") title = "Alert";

                this.$alert(message, title, options);
            },
            notify(options) {
                this.$notify(options);
            },
            message(options) {
                this.$message(options);
            }
        },
        render() {
            return (
                <div>
                    <el-dialogs
                        disabled={() => {
                            // return document.getElementsByClassName('dialog-manager-overlays__backdrop').length;
                            return this.overlayDialogs.hasDialog;
                        }}
                        ref="dialogs"
                    />
                    <el-dialogs
                        portal="overlay"
                        backdropClass="dialog-manager-overlays__backdrop"
                        ref="overlayDialogs"
                    />
                    <el-messages ref="messages" />
                </div>
            );
        }
    };
</script>

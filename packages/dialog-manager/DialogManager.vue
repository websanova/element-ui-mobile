<script>
    export default {
        name: "DialogManager",
        props: {
            backdropClass: {
                type: String,
                default: "dialog-manager__backdrop"
            },
            portal: {
                type: String,
                default: "dialog"
            },
            disabled: {
                type: Function,
                default: () => false
            }
        },
        data() {
            return {
                dialogs: [],
                visible: false,
                formLoading: false,
                formSuccess: false,
                formError: false,
                formCreated: false,
                closePromise: null,
                closeTimeout: null,
                hasDialog: false,
                current: null,
                currentIndex: 0
            };
        },
        computed: {
            currentDialog() {
                return this.dialogs && this.dialogs[this.currentIndex];
            }
        },
        methods: {
            bind() {
                this.unbind();

                // listen to both top window and current window in case this is running inside an iframe
                window.addEventListener("keyup", this.handleKeyUp);
                window.top.addEventListener("keyup", this.handleKeyUp);
            },
            unbind() {
                window.removeEventListener("keyup", this.handleKeyUp);
                window.top.removeEventListener("keyup", this.handleKeyUp);
            },
            handleKeyUp(e) {
                if (this.disabled && this.disabled()) return;

                if (e.which === 13) {
                    if (this.currentDialog.enterToClose) this.close(true);
                }
                if (e.which === 27) {
                    if (this.currentDialog.closeOnPressEscape) this.close(false);
                }
            },
            addDialog(dialog, options) {
                const dialogs = this.dialogs.concat([]);

                if (options.queue) {
                    dialogs.push(dialog);
                } else {
                    dialogs.unshift(dialog);
                }

                document.body.classList.add("has-overlay");

                this.dialogs = dialogs;
            },
            closeDialog() {
                const items = this.dialogs.concat([]);
                items.splice(0, 1);
                this.dialogs = items;
            },

            async dialog(message, opts, skipClose) {
                if (!opts) opts = {};
                let newOptions = {};
                let options = {};

                if (!skipClose) {
                    // if a last dialog is still being closed just remove it
                    if (!this.visible && !this.hasDialog) {
                        this.closeDialog();
                    }

                    if (opts.type === "standard-mobile-full") {
                        opts = Object.assign(
                            {
                                customClass: "el-dialog--sm el-dialog--full-phone"
                            },
                            opts
                        );
                    }

                    options = {
                        type: "custom",
                        modal: false,
                        showClose: true,
                        closeOnPressEscape: true,
                        message
                    };

                    if (opts.preventClose) {
                        options.showClose = false;
                        options.closeOnClickModal = false;
                        options.closeOnPressEscape = false;
                    }

                    clearTimeout(this.closeTimeout);

                    // assemble final config
                    newOptions = Object.assign({}, options, opts);

                    newOptions.__closePromise = new Promise((resolve, reject) => {
                        newOptions.__closeResolve = resolve;
                        newOptions.__closeReject = reject;
                    });

                    if (!newOptions.portal) newOptions.portal = this.portal;

                    // add dialog to queue
                    this.addDialog(newOptions, {
                        queue: newOptions.queue
                    });
                }

                // delay opening if a dialog is already being displayed
                if (this.currentDialog && this.visible && !skipClose) {
                    // hide current dialog
                    this.visible = false;

                    if (!options.queue) {
                        this.currentIndex = 1;
                        setTimeout(() => {
                            this.currentIndex = 0;
                        }, 200);
                    }

                    setTimeout(() => {
                        this.dialog(message, opts, true);
                    }, 400);
                    return;
                }

                this.hasDialog = true;
                this.bind();

                // keep track of what was in focus
                this.activeElement = document.activeElement;
                document.activeElement.blur();

                // add small delay before making visible to trigger the enter
                // animatin rather than the dialog being visible immediatly
                setTimeout(() => {
                    this.current = newOptions;
                    this.visible = true;
                }, 1);

                return newOptions.__closePromise;
            },
            dialogForm(message, opts) {
                opts = opts || {};

                return this.dialog(
                    message,
                    Object.assign(
                        {
                            type: "form",
                            footer: () => (
                                <div>
                                    {this.form && this.form.errors.general && (
                                        <div class="el-form__error text-center">
                                            {this.form.errors.general}
                                        </div>
                                    )}
                                    {opts.cancel && (
                                        <el-button on-click={this.handleClose}>
                                            {opts.cancelText || "Cancel"}
                                        </el-button>
                                    )}
                                    <el-button
                                        type="primary"
                                        loading={this.form && this.form.loading}
                                        disabled={
                                            this.form &&
                                            this.form.hasValidationError
                                        }
                                        on-click={this.handleClickSubmit}
                                    >
                                        {opts.saveText || "Submit"}
                                    </el-button>
                                </div>
                            )
                        },
                        opts
                    )
                );
            },
            alert(message, title, opts) {
                return this.dialog(message, {
                    type: "alert",
                    title: title || "Alert",
                    class: "el-dialog__wrapper el-dialog__wrapper--flex",
                    customClass: `
                                                            el-dialog--system
                                                            el-dialog--alert
                                                        `,
                    queue: true,
                    enterToClose: true,
                    showClose: false,
                    closeOnClickModal: false,
                    closeOnPressEscape: true,
                    footer: (
                        <el-button type="primary" on-click={this.handleClose}>
                            OK
                        </el-button>
                    )
                });
            },
            confirm(message, title, opts) {
                return this.dialog(message, {
                    type: "confirm",
                    title: title || "Confirm",
                    class: "el-dialog__wrapper el-dialog__wrapper--flex",
                    customClass: "el-dialog--system el-dialog--confirm",
                    queue: true,
                    enterToClose: true,
                    showClose: false,
                    closeOnClickModal: false,
                    closeOnPressEscape: true,
                    footer: (
                        <div>
                            <el-button on-click={this.handleCancel}>
                                Cancel
                            </el-button>
                            <el-button type="primary" on-click={this.handleAccept}>
                                OK
                            </el-button>
                        </div>
                    )
                });
            },
            warn(message, title, opts) {
                return this.dialog(message, {
                    type: "warn",
                    title: title || "Warn",
                    class: "el-dialog__wrapper el-dialog__wrapper--flex",
                    customClass: "el-dialog--system el-dialog--warn",
                    queue: true,
                    enterToClose: true,
                    showClose: false,
                    closeOnClickModal: false,
                    closeOnPressEscape: true,
                    footer: (
                        <el-button type="primary" on-click={this.handleClose}>
                            OK
                        </el-button>
                    )
                });
            },
            error(message, title, opts) {
                return this.dialog(message, {
                    type: "error",
                    title: title || "Error",
                    class: "el-dialog__wrapper el-dialog__wrapper--flex",
                    customClass: "el-dialog--system el-dialog--error",
                    queue: true,
                    enterToClose: true,
                    showClose: false,
                    closeOnClickModal: false,
                    closeOnPressEscape: true,
                    footer: (
                        <el-button type="primary" on-click={this.handleClose}>
                            OK
                        </el-button>
                    )
                });
            },

            handleClickSubmit() {
                if (this.form) {
                    this.form.submit();
                } else {
                    console.warn("form not found in dialog");
                }
            },
            handleFormCreated(form) {
                console.log("handleFormCreated", form);
                this.form = form;
                this.formCreated = true;
            },
            handleFormSubmit(form) {
                console.log("handleFormSubmit", form);
                this.formError = false;
                this.formSuccess = false;

                if (this.currentDialog.onSubmit) this.currentDialog.onSubmit(form);
                this.formLoading = true;
            },
            handleFormSuccess(res, form, data) {
                this.formSuccess = true;
                if (this.currentDialog.onSuccess)
                    this.currentDialog.onSuccess(res, form);
                this.close(true);
            },
            handleFormError(res, form, data) {
                this.formError = true;
                if (this.currentDialog.onError)
                    this.currentDialog.onError(res, form);
            },
            handleAccept() {
                this.close(true);
            },
            handleClose() {
                this.close(false);
            },
            handleCancel() {
                this.close(false);
            },

            close(response) {
                if (!this.visible) return;

                this.visible = false;

                const c = this.currentDialog;

                if (c.onClose) c.onClose();

                if (this.closeTimeout) clearTimeout(this.closeTimeout);
                this.closeTimeout = setTimeout(() => {
                    this.visible = false;

                    this.form = null;
                    this.formLoading = null;
                    this.formSuccess = null;
                    this.formError = null;
                    this.formCreated = null;

                    c.__closeResolve(response);
                    if (c.onClosed) c.onClosed(c);

                    // remove dialog
                    this.closeDialog();

                    // if there are more dialog to be shown fade in the next one
                    if (this.dialogs.length) {
                        if (!c.opensNewDialog) this.visible = true;
                    } else {
                        this.hasDialog = false;
                        document.body.classList.remove("has-overlay");
                        this.unbind();
                        this.current = null;
                        // restore focus
                        // this seems to cause issues when restoring focus on a button
                        // document.activeElement.blur();
                        // this.activeElement.focus();
                    }
                }, 300);
            },

            getMessage(dialog) {
                let message = null;
                if (dialog && this.current) {
                    // let current = this.current
                    message = dialog.message;
                    // message = this.current.message;

                    // assign a reference to form dialogs
                    if (Array.isArray(message)) {
                        // render message as a vue component (for forms)
                        const model = Object.assign({}, message[1]);
                        model.ref = "form";
                        message = this.$createElement(message[0], model);
                    } else {
                        if (typeof message === "object") {
                            if (message.componentOptions && message.context) {
                                if (dialog.type === "form") {
                                    console.warn(
                                        "VNode is not supported by DialogManager for forms"
                                    );
                                }
                            } else if (dialog.type === "form") {
                                const attrs = {
                                    on: {
                                        created: this.handleFormCreated,
                                        submit: this.handleFormSubmit,
                                        success: this.handleFormSuccess,
                                        error: this.handleFormError
                                    },
                                    props: dialog.props || {}
                                };

                                if (dialog.form) attrs.props.form = dialog.form;

                                message = this.$createElement(message, attrs);
                            } else {
                                message = this.$createElement(message);
                            }
                        }
                    }

                    return message;
                }
            },

            renderDialog(dialogs) {
                if (!dialogs[this.currentIndex]) return null;
                const {
                    __closePromise,
                    __closeReject,
                    __closeResolve,
                    ...dialog
                } = dialogs[this.currentIndex];
                if (!dialog) return null;

                const attributes = {
                    attrs: dialog
                };

                let message = this.getMessage(dialog);

                let footer = dialog.footer;
                if (typeof footer === "function") footer = footer(this.form);
                let title = dialog.title;
                if (typeof title === "function") title = title(this.form);

                return (
                    <el-dialog
                        ref="dialog"
                        visible={this.visible}
                        append-to-body={false}
                        on-close={this.close}
                        {...attributes}
                    >
                        {message}
                        {footer && <template slot="footer">{footer}</template>}
                        {title && <template slot="title">{title}</template>}
                    </el-dialog>
                );
            },

            onBackdropClick(ev) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        },
        render() {
            // these are just here to trigger a rerender when the form changes
            const formLoading = this.formLoading;
            const formSuccess = this.formSuccess;
            const formError = this.formError;
            const formCreated = this.formCreated;

            return (
                <div>
                    <transition>
                        {this.hasDialog && (
                            <div
                                on-click={this.onBackdropClick}
                                class={[
                                    this.backdropClass,
                                    {
                                        [`${this.backdropClass}--open`]:
                                            this.dialogs.length > 1 ||
                                            (this.visible && this.hasDialog)
                                    }
                                ]}
                            />
                        )}
                    </transition>
                    {this.renderDialog(this.dialogs)}
                </div>
            );
        }
    };
</script>

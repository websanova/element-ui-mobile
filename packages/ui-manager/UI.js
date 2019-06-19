/**
 * Exposes an API for working with common UI functionalities.
 */
export default {
    /**
     * Instance of a UIManager component
     * Make sure this is set before calling the UI functions below.
     */
    manager: undefined,

    /**
     * Show alert dialog
     *
     * @param {string} message
     * message or text to display in the dialog body
     * @param {DialogOptions} options options for the dialog
     * @returns {Promise<void>} resolves when the alert modal is closed
     */
    alert(message, title, options) {
        return this.manager.overlayDialogs.alert(message, title, options)
        // return this.manager.alert(message, title, options);
    },

    /**
     * Show confirmation dialog
     *
     * @param {string} message
     * message or text to display in the dialog body
     * @param {DialogOptions} options dialog options
     * @returns {Promise<boolean>} resolves to true if confirmation is accepted,
     *                             resolves to false if confirmation is cancelled
     */
    confirm(message, title, options) {
        return this.manager.overlayDialogs.confirm(message, title, options)
    },

    /**
     * Show warning dialog
     *
     * @param {string} message
     * message or text to display in the dialog body
     * @param {DialogOptions} options dialog options
     * @returns {Promise<void>} resolves when the alert modal is closed
     */
    warn(message, title, options) {
        return this.manager.overlayDialogs.warn(message, title, options)
    },

    /**
     * Show error dialog
     *
     * @param {string} message
     * message or text to display in the dialog body
     * @param {DialogOptions} options dialog options
     * @returns {Promise<void>} resolves when the alert modal is closed
     */
    error(message, title, options) {
        return this.manager.overlayDialogs.error(message, title, options)
    },

    close() {
        return this.manager.dialogs.close()
    },

    overlayClose() {
        return this.manager.overlayDialogs.close()
    },

    /**
     * Show custom dialog
     * This is a blank dialog that needs to be customized with options
     *
     * @param {String} message Content to display in the dialog body
     * @param {DialogOptions} options dialog options
     * @returns {Promise<void>} resolves when the modal is closed
     */
    dialog(message, options) {
        return this.manager.dialogs.dialog(message, options)
    },

    dialogForm(message, options) {
        return this.manager.dialogs.dialogForm(message, options)
    },

    messageSuccess(message, options) {
        options = options || {}
        options.type = 'success'
        options.message = message
        // return this.manager.messages.success(message);
        return this.manager.message(options)
    },

    messageWarning(message, options) {
        options = options || {}
        options.type = 'warning'
        options.message = message
        // return this.manager.messages.warning(message);
        return this.manager.message(options)
    },

    messageError(message, options) {
        options = options || {}
        // return this.manager.messages.error(message);
        options.type = 'error'
        options.message = message
        return this.manager.message(options)
    },

    message(message, options) {
        options = options || {}
        // return this.manager.messages.message(message);
        options.message = message
        return this.manager.message(options)
    },

    messageApiError(res, options) {
        const body = res.data || res.body

        if (!body) {
            console.error(res)
            return
        }
        const errors = body.errors || [
            { field: 'general', msg: body.msg || body.message },
            {
                field: body.code,
                msg: body.msg || body.message,
            },
        ]

        let general = errors.find(err => err.field === 'general')
        let msg = general ? general.msg : errors[0].msg

        console.error(msg)
        return this.manager.message({
            type: 'error',
            message: msg,
        })
    },

    notify(options) {
        return this.manager.notify(options)
    },
}

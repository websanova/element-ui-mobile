<script>
    // el-messages
    import ElMessages from './Messages'
    // import '@/common/styles/defaults/messages.scss';
    // import 'element-ui/lib/theme-chalk/alert.css';

    export default {
        name: 'MessageManager',
        components: { ElMessages },
        data() {
            return {
                messages: [],
            }
        },
        methods: {
            message(message, opts) {
                if (!opts) opts = {}

                const options = {
                    text: message,
                    ...opts,
                }
                const items = this.messages.concat([])
                items.unshift(options)
                this.messages = items

                this.startMessageTimeout()
            },
            success(message, opts) {
                this.message(
                    message,
                    Object.assign(
                        {
                            type: 'success',
                        },
                        opts
                    )
                )
            },
            info(message, opts) {
                this.message(
                    message,
                    Object.assign(
                        {
                            type: 'info',
                        },
                        opts
                    )
                )
            },
            warning(message, opts) {
                this.message(
                    message,
                    Object.assign(
                        {
                            type: 'warning',
                        },
                        opts
                    )
                )
            },
            error(message, opts) {
                this.message(
                    message,
                    Object.assign(
                        {
                            type: 'error',
                        },
                        opts
                    )
                )
            },

            startMessageTimeout() {
                if (this.messageCloseTimeout) clearTimeout(this.messageCloseTimeout)
                if (this.messages.length) this.messageCloseTimeout = setTimeout(this.popMessage, 1000)
            },
            popMessage() {
                const items = this.messages.concat([])
                items.pop()
                this.messages = items

                this.startMessageTimeout()
            },
        },
        render() {
            return <el-messages messages={this.messages} />
        },
    }
</script>

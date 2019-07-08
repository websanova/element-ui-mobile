<script>
    const styleId = 'el-spacer'
    export default {
        name: 'ElSpacer',
        props: {
            vertical: Boolean,
            flex: Boolean,
            inlineFlex: Boolean,
            inline: Boolean,
            wrap: Boolean,
            nowrap: Boolean,
            debug: Boolean,
            grid: Boolean,
            center: Boolean,
            vcenter: Boolean,
            size: String,
        },
        render(createElement) {
            var list = []
            if (this.$slots.default) {
                this.$slots.default.forEach((element, index) => {
                    if (element.tag) {
                        list.push(
                            createElement(
                                'span',
                                {
                                    class: {
                                        [`${styleId}__item`]: true,
                                    },
                                },
                                [element]
                            )
                        )
                    }
                })
            }

            return createElement(
                'div',
                {
                    class: {
                        [`${styleId}`]: true,
                        [`${styleId}--vertical`]: this.vertical,
                        [`${styleId}--flex`]: this.flex,
                        [`${styleId}--inline-flex`]: this.inlineFlex,
                        [`${styleId}--inline`]: this.inline,
                        [`${styleId}--center`]: this.center,
                        [`${styleId}--valign-center`]: this.vcenter,
                        [`${styleId}--wrap`]: this.wrap,
                        [`${styleId}--nowrap`]: this.nowrap,
                        [`${styleId}--debug`]: this.debug,
                        [`${styleId}--grid`]: this.grid,
                        [`${styleId}--size-${this.size}`]: this.size,
                    },
                },
                list
            )
        },
    }
</script>

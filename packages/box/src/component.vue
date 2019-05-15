<template>
    <div
        class="el-box"
        :class="{
            ['el-box--' + (this.size || 'full')]: true,
            'is-start': vAlign === 'start',
            'is-center': vAlign === 'center',
            'is-end': vAlign === 'end',
            'is-spacing': spacing,
            'is-flexbox': flexbox,
            'is-reverse': reverse,
            'is-wrap': wrap,
            'is-flex1': flex1,
            'is-scroll': scroll,
            'is-scrollx': scrollX,
            'is-scrolly': scrollY,
            'is-noshrink': shrink === false,
            'is-nogrow': grow === false,
        }"
        v-bind:style="{
            maxWidth: this.width
        }"
    >
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "ElBox",

        props: {
            size: {
                type: String,
                default: null
            },

            width: {
                type: String,
                default: null
            },

            vAlign: {
                type: String,
                default: ""
            },

            spacing: Boolean,
            flexbox: Boolean,
            reverse: Boolean,
            flex1: Boolean,
            wrap: Boolean,
            scroll: Boolean,
            scrollX: Boolean,
            scrollY: Boolean,
            shrink: {
                type: Boolean,
                default: true
            },
            grow: {
                type: Boolean,
                default: true
            }
        }
    };
</script>

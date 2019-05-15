<template>
    <section
        class="el-container"
        :class="{
            'is-vertical': isVertical,
            'is-start': align === 'start',
            'is-center': align === 'center',
            'is-end': align === 'end',
            'is-reverse': reverse,
            'is-wrap': wrap,
            'is-flex1': flex1,
            'is-scroll': scroll,
            'is-scrollx': scrollX,
            'is-scrolly': scrollY,
            'is-noshrink': shrink === false,
            'is-nogrow': grow === false,
        }"
    >
        <slot></slot>
    </section>
</template>

<script>
    export default {
        name: "ElContainer",

        props: {
            direction: String,
            align: String,
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
        },

        computed: {
            isVertical() {
                if (this.direction === "vertical") {
                    return true;
                } else if (this.direction === "horizontal") {
                    return false;
                }
                return this.$slots && this.$slots.default
                    ? this.$slots.default.some(vnode => {
                          const tag =
                              vnode.componentOptions && vnode.componentOptions.tag;
                          return tag === "el-header" || tag === "el-footer";
                      })
                    : false;
            }
        }
    };
</script>

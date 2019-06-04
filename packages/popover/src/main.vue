<template>
    <el-popover-original
        :popper-class="popperClass"
        v-bind="$childAttrs"
        v-on="$listeners"
    >

        <slot name="buttonClose">
            <el-iconbutton
                class="el-popover__close"
                :icon="iconClose"
                @click="close"
            />
        </slot>

        <template slot="reference"><slot name="reference"></slot></template>

        <slot></slot>

    </el-popover-original>
</template>

<script>
    import ElPopoverOriginal from "element-ui/packages/popover";
    import overlayMixin from "@websanova/element-ui-mobile/mixins/overlay";

    export default {
        name: "ElPopover",
        components: { ElPopoverOriginal },
        mixins: [overlayMixin],
        props: {
            // value: null,
            overlayClass: {
                type: String,
                default: "hasOverlay"
            },
            popperClass: String,
            iconClose: {
                type: String,
                default: "times"
            },
            popperOptions: {
                type: Object,
                default: () => {
                    return {
                        parent: "p",
                        boundariesElement: "scrollParent",
                        positionFixed: false,

                        preventOverflowOrder: ["right", "left", "bottom", "top"]
                    };
                }
            }
        },
        // data() {
        //     return {
        //         visible: false,
        //     }
        // },
        // created() {

        // },
        // destroyed() {
        //     document.removeEventListener('click', this.onClickOutside)
        // },
        computed: {
            $childAttrs() {
                const { popperOptions, ...attrs } = this.$attrs;
                return { ...attrs, popperOptions };
            }
        }
        // watch: {
        //     visible(value) {
        //         console.log('visible', value)
        //         // this._value = value;

        //         if (value) {
        //             // this.open();
        //             setTimeout(() => {
        //                 document.addEventListener('click', this.onClickOutside);
        //             }, 1)
        //         } else {
        //             // this.close();
        //             document.removeEventListener('click', this.onClickOutside);
        //         }
        //     }
        // },
        // methods: {
        //     onShow(value) {
        //         console.log('onShow', value)
        //         // this._value = true;
        //     },
        //     onHide(value) {
        //         console.log('onHide', value)
        //         // this._value = false;
        //     },
        //     onClickOutside() {
        //         console.log('onClickOutside')
        //         this.close();
        //     },
        //     close() {
        //         // this.$emit("input", false);
        //     }
        // }
    };
</script>

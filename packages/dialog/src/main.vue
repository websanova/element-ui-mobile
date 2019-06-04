<template>
    <portal :to="portal">
        <el-dialog-original
            ref="dialog"
            top=""
            :show-close="false"
            v-bind="$childAttrs"
            v-on="$listeners"
        >
            <el-iconbutton
                v-if="showClose"
                class="el-dialog__close"
                :icon="iconClose"
                @click="handleClose"
            />

            <slot name="title" slot="title">

            </slot>

            <slot></slot>

            <slot class="el-dialog__footer" name="footer" slot="footer"></slot>
        </el-dialog-original>
    </portal>
</template>

<script>
    import ElDialogOriginal from "element-ui/packages/dialog";
    import ElIconbutton from "@websanova/element-ui-mobile/packages/iconbutton";

    export default {
        name: "ElDialog",
        components: { ElDialogOriginal, ElIconbutton },
        props: {
            portal: {
                type: String,
                default: "dialog"
            },
            showClose: {
                type: Boolean,
                default: false
            },
            overlayClass: {
                type: String,
                default: "hasOverlay"
            },
            iconClose: {
                type: String,
                default: "times"
            },
            title: null
        },
        computed: {
            _title: function(title) {
                return title;
            },
            $childAttrs() {
                const { title, ...attrs } = this.$attrs;
                return attrs;
            }
        },
        methods: {
            handleClose() {
                if (this.$refs.dialog) this.$refs.dialog.handleClose();
                this.$emit("close");
            }
        }
    };
</script>

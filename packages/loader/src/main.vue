<template>
    <a
        class="el-loader"
        :class="{
            ['el-loader--' + _size]: _size,
        }"
        v-bind="$attrs"
        v-on="$listeners"
    >
        ds
        <slot></slot>
    </a>
</template>

<script>
    export default {
        name: "ElLoader",
        props: {
            icon: String,
            size: String
        },
        computed: {
            _icon() {
                return this.icon || this.$ui.loader.defaults.icon || "loading";
            }
        },
        computed: {
            _elFormItemSize() {
                return (this.elFormItem || {}).elFormItemSize;
            },
            _size() {
                return (
                    this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
                );
            }
        }
    };
</script>

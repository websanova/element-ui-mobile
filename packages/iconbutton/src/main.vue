<template>
    <a
        class="el-iconbutton"
        :class="{
            'is-start': vAlign === 'start',
            'is-end': vAlign === 'end',
            'is-center': vAlign === 'center',
            ['el-iconbutton--' + _size]: _size,
        }"
        :hover-title="title"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <slot name="prefix"></slot>
        <el-icon :scale="scale" :name="icon" />
        <slot></slot>
    </a>
</template>

<script>
    export default {
        name: 'ElIconbutton',
        props: {
            scale: Number,
            icon: String,
            title: String,
            size: String,
            vAlign: {
                type: String,
                default: 'start',
            },
        },
        computed: {
            _elFormItemSize() {
                return (this.elFormItem || {}).elFormItemSize
            },
            _size() {
                return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
            },
        },
    }
</script>

<template>
    <div class="el-card--ext"
        :class="{
            'is-custom-scroll': scrollbar,
            'is-scrollable': scrollable,
            ['is-' + shadow + '-shadow']: shadow,
            'is-always-shadow': !shadow
        }"
        v-bind="$attrs"
        v-on="$listeners"
        >
        <div class="el-card--ext__header" v-if="$slots.title || title">
            <span class="el-card--ext__title">
                <slot name="title">{{ title }}</slot>
            </span>
            <div class="el-card--ext__toolbar"><slot name="toolbar"></slot></div>
        </div>
        <div class="el-card--ext__body" :style="bodyStyle">
            <el-scrollbar v-if="scrollbar"><slot></slot></el-scrollbar>
            <slot v-if="!scrollbar"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ElCard',
        props: {
            title: String,
            scrollable: Boolean,
            scrollbar: {
                type: Boolean,
                default: true,
            },
            bodyStyle: {},
            shadow: {
                type: String,
            },
        }
    }
</script>

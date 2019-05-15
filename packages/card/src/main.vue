<template>
    <div class="el-card--ext"
        :class="{
            'is-noscroll': scrollbar === false,
            ['is-' + shadow + '-shadow']: shadow,
            'is-always-shadow': !shadow
        }"
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
        name: "ElCard",
        props: {
            title: String,
            scrollbar: Boolean,
            bodyStyle: {},
            shadow: {
                type: String
            }
        }
    };
</script>

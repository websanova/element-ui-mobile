<template>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        >
        <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span>Item 1</span>
        </el-menu-item>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span>Item 2</span>
        </el-menu-item>
        <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span>Item 3</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span>Item 4</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    import { action, configureActions } from "@storybook/addon-actions";

    export default {
        methods: {
            handleSelect(key, keyPath) {
                action("handleSelect")(key, keyPath);
            }
        }
    };
</script>

<template>
    <div class="story story-button">


        <p>Use <code>round</code> to use rounded corners.</p>
        <el-row>
            <el-button round>Round</el-button>
            <el-button type="primary" round>Primary</el-button>
            <el-button type="success" round>Success</el-button>
            <el-button type="info" round>Info</el-button>
            <el-button type="warning" round>Warning</el-button>
            <el-button type="danger" round>Danger</el-button>
        </el-row>

        <vue-markdown>Use the `circle"` prop to make the button circular.</vue-markdown>

        <span class="story__subtitle">element-ui icons</span>
        <el-row>
            <el-button icon="el-icon-search" v-bind="$attrs" circle></el-button>
            <el-button type="primary" icon="el-icon-edit" v-bind="$attrs" circle></el-button>
            <el-button type="success" icon="el-icon-check" v-bind="$attrs" circle></el-button>
            <el-button type="info" icon="el-icon-message" v-bind="$attrs" circle></el-button>
            <el-button type="warning" icon="el-icon-star-off" v-bind="$attrs" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" v-bind="$attrs" circle></el-button>
        </el-row>

        <span class="story__subtitle">vue-awesome Icons</span>
        <el-row>
            <el-button v-bind="$attrs" circle><el-icon name="search"></el-icon></el-button>
            <el-button type="primary" v-bind="$attrs" circle><el-icon name="edit"></el-icon></el-button>
            <el-button type="success" v-bind="$attrs" circle><el-icon name="bell"></el-icon></el-button>
            <el-button type="danger" v-bind="$attrs" circle><el-icon name="trash"></el-icon></el-button>
        </el-row>
    </div>
</template>

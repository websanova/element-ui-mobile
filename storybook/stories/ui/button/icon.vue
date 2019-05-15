<template>
    <div class="story">
        <span class="story__subtitle">element-ui icons</span>
        <el-button type="primary" icon="el-icon-edit" v-bind="$attrs"></el-button>
        <el-button type="primary" icon="el-icon-share" v-bind="$attrs"></el-button>
        <el-button type="primary" icon="el-icon-delete" v-bind="$attrs"></el-button>
        <el-button type="primary" icon="el-icon-search" v-bind="$attrs">Search</el-button>
        <el-button type="primary" v-bind="$attrs">Upload <i class="el-icon-upload"></i></el-button>

        <br/><br/>

        <span class="story__subtitle">vue-awesome icons</span>
        <el-button type="primary" v-bind="$attrs"><el-icon name="search"></el-icon></el-button>
        <el-button type="primary" v-bind="$attrs"><el-icon name="home"></el-icon></el-button>
        <el-button type="primary" v-bind="$attrs"><el-icon name="times"></el-icon></el-button>
        <el-button type="primary" v-bind="$attrs"><el-icon name="search"></el-icon><span>Search</span></el-button>
        <el-button type="primary" v-bind="$attrs"><span>Upload</span><el-icon name="upload"></el-icon></el-button>

        <br/><br/>

        <span class="story__subtitle">Sizes</span>
        <el-button type="primary" v-bind="$attrs"><el-icon name="search"></el-icon></el-button>
        <el-button type="primary" size="medium" v-bind="$attrs"><el-icon name="search"></el-icon></el-button>
        <el-button type="primary" size="small" v-bind="$attrs"><el-icon name="search"></el-icon></el-button>
        <el-button type="primary" size="mini" v-bind="$attrs"><el-icon name="search"></el-icon></el-button>
    </div>
</template>

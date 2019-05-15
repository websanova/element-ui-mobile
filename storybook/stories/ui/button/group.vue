<template>
    <div class="story">
        <p>Displayed as a button group, can be used to group a series of similar operations.</p>

        <span class="story__subtitle">element-ui icons</span>
        <el-button-group>
            <el-button type="primary" icon="el-icon-arrow-left">Previous Page</el-button>
            <el-button type="primary">Next Page<i class="el-icon-arrow-right el-icon-right"></i></el-button>
        </el-button-group>
        <el-button-group style="margin-left: 10px;">
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="primary" icon="el-icon-share"></el-button>
            <el-button type="primary" icon="el-icon-delete"></el-button>
        </el-button-group>

        <span class="story__subtitle">vue-awesome icons</span>
        <el-button-group>
            <el-button type="primary"><el-icon name="arrow-left"></el-icon><span>Previous Page</span></el-button>
            <el-button type="primary"><span>Next Page</span><el-icon name="arrow-right"></el-icon></el-button>
        </el-button-group>
        <el-button-group style="margin-left: 10px;">
            <el-button type="primary"><el-icon name="edit"></el-icon></el-button>
            <el-button type="primary"><el-icon name="home"></el-icon></el-button>
            <el-button type="primary"><el-icon name="trash"></el-icon></el-button>
        </el-button-group>
    </div>
</template>

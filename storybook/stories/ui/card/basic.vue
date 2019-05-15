<template>
    <div class="story story-button">
        <p>Card includes title, content and operations.</p>

        <el-card class="box-card">
            <span slot="title">Card name</span>
            <template slot="toolbar">
                <el-button type="text">Operation button</el-button>
            </template>
            <div v-for="o in 4" :key="o" class="text item">
                {{'List item ' + o }}
            </div>
        </el-card>

        <p>The header part can be omitted.</p>

        <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="text item">
                {{'List item ' + o }}
            </div>
        </el-card>

    </div>
</template>

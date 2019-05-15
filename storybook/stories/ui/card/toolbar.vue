<template>
    <div class="story">
        <p>
            A card can have a toolbar which is a horizontal list of items with some spacing between the elements.
        </p>
        <el-card class="box-card">
            <span slot="title">Card name</span>
            <template slot="toolbar">
                <el-button>A</el-button>
                <el-button>B</el-button>
                <el-iconbutton size="small" icon="cog" />
                <el-iconbutton size="small" icon="trash" />
            </template>
            <div v-for="o in 4" :key="o" class="text item">
                {{'List item ' + o }}
            </div>
        </el-card>
    </div>
</template>

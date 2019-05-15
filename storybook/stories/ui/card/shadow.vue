<template>
    <div class="story">
        <p>
            You can define when to show the card shadows. <br/>
            The <code>shadow</code> attribute determines when the card shadows are displayed. It can be <code>always</code>, <code>hover</code> or <code>never</code>.
        </p>
        <el-row :gutter="12">
            <el-col :span="8">
                <el-card shadow="always">
                Always
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                Hover
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="never">
                Never
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

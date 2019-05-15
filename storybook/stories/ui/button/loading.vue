<template>
    <div class="story">
        <p>
            Use the <code>loading</code> prop to <code>true</code> to display the button in it's loading state.
        </p>
        <el-button :loading="true">Loading</el-button>
        <el-button type="primary" :loading="true">Loading</el-button>
        <el-button type="success" :loading="true">Loading</el-button>
        <el-button type="info" :loading="true">Loading</el-button>
        <el-button type="warning" :loading="true">Loading</el-button>
        <el-button type="danger" :loading="true">Loading</el-button>
    </div>
</template>

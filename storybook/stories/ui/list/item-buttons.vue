<template>
    <ul
        class="el-menu-simple"
        :class="{'is-interactive': $attrs.interactive}"
        style="width: 200px;"
    >
        <li>
            <span>Test1</span>
            <el-iconbutton icon="cog" @click.stop="onClickIcon" />
        </li>
        <li>
            <span>Test2 <br/> Line 2</span>
            <el-iconbutton icon="cog" @click.stop="onClickIcon" />
        </li>
        <li>
            <span>Test2 <br/> Line 2<br/> Line 3</span>
            <el-iconbutton icon="cog" @click.stop="onClickIcon" />
        </li>
        <li>
            <span>Test2 asdasd asd asd as das da sd as das d </span>
            <el-iconbutton icon="cog" @click.stop="onClickIcon" />
        </li>
        <li>
            <span>Test3</span>
            <nav class="el-menu-simple__item-toolbar">
                <el-iconbutton icon="cog" @click.stop="onClickIcon" />
                <el-iconbutton icon="trash" @click.stop="onClickIcon" />
            </nav>
        </li>
    </ul>
</template>

<script>
    export default {
        methods: {
            onClick(value) {
                console.log('click', value)
            },
            onClickIcon(value) {
                console.log('click icon', value)
            },
        },
    }
</script>

<template>
    <ul
        class="el-menu-simple"
        :class="{'is-interactive': $attrs.interactive}"
        style="width: 200px;"
    >
        <li><span>Test1</span></li>
        <li><span>Test2</span></li>
        <li><span>Test3</span></li>
        <li><span>Test4</span></li>
    </ul>
</template>

<script>
    export default {
        methods: {
            onClick(value) {
                console.log('click', value)
            },
        },
    }
</script>

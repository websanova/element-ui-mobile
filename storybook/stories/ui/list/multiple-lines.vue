<template>
    <ul
        class="el-menu-simple"
        :class="{'is-interactive': $attrs.interactive}"
        style="width: 200px;"
    >
        <li><span>Test1</span></li>
        <li><span>Test2</span></li>
        <li><span>Test2 <br/> line 2</span></li>
        <li><span>Test2 <br/> line 2 <br> line 3</span></li>
        <li><span>Test2  asdasd asd adasd asd as das das asd asdasda sd asd as das da sd asd asd</span></li>
        <li><span>Test3</span></li>
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

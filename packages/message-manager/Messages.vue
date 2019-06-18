<template>
    <div
        class="el-messages"
    >
        <template
            v-for="(message, index) in messages"
        >
            <el-collapse-transition
                :key="index"
            >
                <el-alert
                    :title="message.text"
                    :type="message.type"
                    :closable="false"
                ></el-alert>
            </el-collapse-transition>
        </template>
    </div>
</template>

<script>
    import ElCollapseTransition from 'element-ui/src/transitions/collapse-transition'
    import ElAlert from 'element-ui/packages/alert'

    export default {
        components: { ElCollapseTransition, ElAlert },
        props: {
            messages: Array,
        },
    }
</script>

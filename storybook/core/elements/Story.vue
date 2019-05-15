<template>
    <div>
        theme: {{_theme}}
        <slot></slot>
    </div>
</template>

<script>
    import storyMixin from '@/storybook/core/mixins/story'

    export default {
        mixins: [storyMixin],
    }
</script>

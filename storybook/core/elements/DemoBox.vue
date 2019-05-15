<template>
    <div
        class="storybook-substory"
    >
        <header>
            <span class="storybook-substory__title">
                <slot name="title">{{title}}</slot>
            </span>
        </header>
        <main>
            <component v-bind:is="mod"></component>
        </main>
        <div>
            <div class="storybook-substory__toolbar">
                <a v-if="source" @click="toggle" :class="{ open: open }">
                    <span>View Source</span> <i class="arrow-down" />
                </a>
            </div>
            <code-view
                readonly
                autoheight
                v-if="source && open"
                :content="source.trim()"
            ></code-view>
        </div>
    </div>
</template>

<script>

export default {
    name: 'DemoBox',
    props: {
        title: String,
        source: String,
        data: Object,
        mod: Object,
    },
    data() {
        return {
            open: false
        }
    },
    methods: {
        toggle() {
            this.open = !this.open;
        }
    }
}
</script>

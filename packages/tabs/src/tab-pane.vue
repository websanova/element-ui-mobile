<template>
    <div
        class="el-tab-pane"
        v-if="(!lazy || loaded) || active"
        v-show="active"
        role="tabpanel"
        :aria-hidden="!active"
        :id="`pane-${paneName}`"
        :aria-labelledby="`tab-${paneName}`"
    >
        <el-scrollbar v-if="scrollbar" class="el-scrollbar--fix">
            <div
                class="el-tab-pane__body"
                :class="{
                    'is-pad': this.body.pad
                }"
            >
                <slot></slot>
            </div>
        </el-scrollbar>

        <div
            v-else
            class="el-tab-pane__body"
            :class="{
                'is-pad': this.body.pad
            }"
        >
            <slot></slot>
        </div>


        <div class="el-tab-pane__footer"><slot name="footer"></slot></div>
    </div>
</template>
<script>
    /* eslint-disable */
    export default {
        name: 'ElTabPane',

        props: {
            label: String,
            labelContent: Function,
            itemClass: String,
            name: String,
            closable: Boolean,
            disabled: Boolean,
            lazy: Boolean,
            scrollbar: Boolean,
            body: {
                type: Object,
                default: () => {
                    return {}
                },
            },
        },

        data() {
            return {
                index: null,
                loaded: false,
            }
        },

        computed: {
            isClosable() {
                return this.closable || this.$parent.closable
            },
            active() {
                const active = this.$parent.currentName === (this.name || this.index)
                if (active) {
                    this.loaded = true
                }
                return active
            },
            paneName() {
                return this.name || this.index
            },
        },

        watch: {
            label() {
                this.$parent.$forceUpdate()
            },
        },
    }
</script>

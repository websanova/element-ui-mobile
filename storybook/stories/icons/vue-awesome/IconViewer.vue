<template>
    <div class="icon-viewer">
        <header>
            <el-input
                v-model="search"
                placeholder="Search Icon..."
            />
        </header>
        <el-box class="box-page">
            <div class="flex-grid">
                <div
                    v-for="icon in filtered"
                    :key="icon"
                >
                    <div class="icon-preview-panel" >
                        <div
                            class="icon-preview-panel__corner-icon"
                            @click="copyToClipboard(icon)"
                            title="Copy to clipboard"
                        >C</div>
                        <main><el-icon :name="icon"></el-icon></main>
                        <footer><span :title="icon">{{icon}}</span></footer>
                    </div>
                </div>
            </div>
        </el-box>
    </div>
</template>

<script>
    import Vue from "vue";
    import { fuzzysearch } from "@/storybook/core/search";
    import { copyToClipboard } from "@/storybook/core/clipboard";
    import ElInput from "element-ui/packages/input";
    import ElMessage from "element-ui/packages/message";

    Vue.prototype.$message = ElMessage;

    const icons = [
        "bars",
        "home",
        "user",
        "plus",
        "users",
        "times",
        "spinner",
        "user-plus",
        "tachometer-alt",
        "regular/copy",
        "regular/envelope",
        "arrow-left",
        "arrow-right",
        "sign-in-alt",
        "sign-out-alt",
        "bell",
        "bell-slash",
        "caret-up",
        "caret-down",
        "user-secret",
        "search",
        "lock",
        "chevron-right",
        "chevron-left",
        "cog",
        "chart-bar",
        "expand-arrows-alt",
        "download",
        "filter",
        "calendar",
        "copy",
        "columns",
        "address-book",
        "broadcast-tower",
        "thumbtack",
        "trash",
        "upload",
        "edit",
        "question-circle"
    ];

    export default {
        components: { ElInput },
        data() {
            return {
                caseSensitive: false,
                filtered: null,
                search: ""
            };
        },
        created() {
            this.applySearch("");
        },
        watch: {
            search(val) {
                val = val.trim();
                clearTimeout(this.changeTimeout);
                this.changeTimeout = setTimeout(() => {
                    this.applySearch(val);
                }, 300);
            }
        },
        methods: {
            applySearch(search) {
                let filtered = icons.concat([]);

                if (search) {
                    // filter out modules not matching the current search query
                    if (!this.caseSensitive) search = search.toLowerCase();
                    filtered = filtered.filter(item => {
                        let val = item;
                        if (!this.caseSensitive) val = val.toLowerCase();
                        let result = fuzzysearch(search, val);
                        return result;
                    });
                }

                this.filtered = filtered;
            },
            copyToClipboard(val) {
                copyToClipboard(val);
                this.$message({
                    message: "Copied to clipboard !",
                    type: "success"
                });
            }
        }
    };
</script>

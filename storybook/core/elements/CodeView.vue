<template>
    <!-- <pre class="el-code-view">{{JSON.stringify(content || this.$slots.default, null, 2)}}</pre> -->
    <div
        class="CodeMirror__wrapper"
        :class="{ 'CodeMirror__wrapper--autoheight': autoheight }"
    ><codemirror
            v-model="_content"
            :options="_options"
        ></codemirror></div>
</template>

<script>
    // language js
    import "codemirror/mode/javascript/javascript.js";
    import "codemirror/mode/htmlmixed/htmlmixed.js";
    import "codemirror/mode/sass/sass.js";
    // theme css
    import "codemirror/theme/monokai.css";

    export default {
        name: "CodeView",
        props: {
            content: null,
            autoheight: Boolean,
            mode: {
                type: String,
                default: "text/html"
            },
            theme: {
                type: String,
                default: "monokai"
            },
            options: {
                type: Object,
                default: () => {
                    return {
                        readOnly: true,
                        tabSize: 4,
                        // mode: "text/html",
                        // theme: "monokai",
                        viewportMargin: Infinity,
                        // lineNumbers: true,
                        line: true
                    };
                }
            }
        },
        computed: {
            _options() {
                return Object.assign({}, this.options, {
                    mode: this.mode,
                    theme: this.theme
                });
            },
            _content: {
                get() {
                    if (!this.content) return "";
                    if (typeof this.content === "string") return this.content;
                    return JSON.stringify(this.content, null, 4).trim();
                },
                set() {}
            }
        }
    };
</script>

<script>
    import TabNav from "./tab-nav";

    export default {
        name: "ElTabs",

        components: {
            TabNav
        },

        props: {
            type: String,
            activeName: String,
            closable: Boolean,
            addable: Boolean,
            value: {},
            editable: Boolean,
            tabPosition: {
                type: String,
                default: "top"
            },
            beforeLeave: Function,
            stretch: Boolean
        },

        provide() {
            return {
                rootTabs: this
            };
        },

        data() {
            return {
                currentName: this.value || this.activeName,
                panes: []
            };
        },

        watch: {
            activeName(value) {
                this.setCurrentName(value);
            },
            value(value) {
                this.setCurrentName(value);
            },
            currentName(value) {
                if (this.$refs.nav) {
                    this.$nextTick(() => {
                        this.$refs.nav.$nextTick(_ => {
                            this.$refs.nav.scrollToActiveTab();
                        });
                    });
                }
            }
        },

        methods: {
            calcPaneInstances() {
                if (this.$slots.default) {
                    const paneSlots = this.$slots.default.filter(
                        vnode =>
                            vnode.tag &&
                            vnode.componentOptions &&
                            vnode.componentOptions.Ctor.options.name === "ElTabPane"
                    );
                    // update indeed
                    const panes = paneSlots.map(
                        ({ componentInstance }) => componentInstance
                    );
                    if (
                        !(
                            panes.length === this.panes.length &&
                            panes.every((pane, index) => pane === this.panes[index])
                        )
                    ) {
                        this.panes = panes;
                    }
                } else if (this.panes.length !== 0) {
                    this.panes = [];
                }
            },
            handleTabClick(tab, tabName, event) {
                if (tab.disabled) return;
                this.setCurrentName(tabName);
                this.$emit("tab-click", tab, event);
            },
            handleTabRemove(pane, ev) {
                if (pane.disabled) return;
                ev.stopPropagation();
                this.$emit("edit", pane.name, "remove");
                this.$emit("tab-remove", pane.name);
            },
            handleTabAdd() {
                this.$emit("edit", null, "add");
                this.$emit("tab-add");
            },
            setCurrentName(value) {
                const changeCurrentName = () => {
                    this.currentName = value;
                    this.$emit("input", value);
                };
                if (this.currentName !== value && this.beforeLeave) {
                    const before = this.beforeLeave(value, this.currentName);
                    if (before && before.then) {
                        before.then(() => {
                            changeCurrentName();

                            this.$refs.nav && this.$refs.nav.removeFocus();
                        });
                    } else if (before !== false) {
                        changeCurrentName();
                    }
                } else {
                    changeCurrentName();
                }
            }
        },

        render(h) {
            let {
                type,
                handleTabClick,
                handleTabRemove,
                handleTabAdd,
                currentName,
                panes,
                editable,
                addable,
                tabPosition,
                stretch
            } = this;

            const newButton =
                editable || addable ? (
                    <span
                        class="el-tabs__new-tab"
                        on-click={handleTabAdd}
                        tabindex="0"
                        on-keydown={ev => {
                            if (ev.keyCode === 13) {
                                handleTabAdd();
                            }
                        }}
                    >
                        {this.$slots["new-tab"] || <i class="el-icon-plus" />}
                    </span>
                ) : null;

            const navData = {
                props: {
                    currentName,
                    onTabClick: handleTabClick,
                    onTabRemove: handleTabRemove,
                    editable,
                    type,
                    panes,
                    stretch,
                    $slots: {
                        test: this.$slots.test
                    }
                },

                ref: "nav"
            };
            const header = (
                <div class={["el-tabs__header", `is-${tabPosition}`]}>
                    <tab-nav {...navData}>
                        <template slot="nav-prefix">
                            {this.$slots.navPrefix}
                        </template>
                        <template slot="nav-suffix">
                            {this.$slots.navSuffix}
                        </template>
                    </tab-nav>
                    {(this.$slots.toolbar || newButton) && (
                        <div class="el-tabs__toolbar">
                            {newButton}
                            <slot name="toolbar">{this.$slots.toolbar}</slot>
                        </div>
                    )}
                </div>
            );
            const panels = (
                <div class="el-tabs__content">
                    {this.$slots.default}
                    {this.$slots.nodata && !this.$slots.default && (
                        <div class="el-tabs__content__empty">
                            {this.$slots.nodata || "nodata"}
                        </div>
                    )}
                    {this.$slots.empty && (
                        <div class="el-tabs__content__empty">
                            {this.$slots.empty || "empty"}
                        </div>
                    )}
                </div>
            );

            return (
                <div
                    class={{
                        "el-tabs": true,
                        "el-tabs--card": type === "card",
                        [`el-tabs--${tabPosition}`]: true,
                        "el-tabs--border-card": type === "border-card"
                    }}
                >
                    {tabPosition !== "bottom" ? [header, panels] : [panels, header]}
                </div>
            );
        },

        created() {
            if (!this.currentName) {
                this.setCurrentName("0");
            }
        },

        mounted() {
            this.calcPaneInstances();
        },

        updated() {
            this.calcPaneInstances();
        }
    };
</script>
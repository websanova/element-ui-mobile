<script>
    import TabNav from './tab-nav'

    export default {
        name: 'ElTabs',

        components: {
            TabNav,
        },

        props: {
            type: String,
            activeName: String,
            closable: Boolean,
            addable: Boolean,
            shareable: Boolean,
            drag: Boolean,
            mobileDropdown: Boolean,
            value: {},
            editable: Boolean,
            tabPosition: {
                type: String,
                default: 'top',
            },
            beforeLeave: Function,
            stretch: Boolean,
        },

        provide() {
            return {
                rootTabs: this,
            }
        },

        data() {
            return {
                currentName: (this.value || this.activeName) + '',
                panes: [],
            }
        },

        watch: {
            activeName(value) {
                this.setCurrentName(value)
            },
            value(value) {
                this.setCurrentName(value)
            },
            currentName(value) {
                if (this.$refs.nav) {
                    this.$nextTick(() => {
                        this.$refs.nav.$nextTick(_ => {
                            this.$refs.nav.scrollToActiveTab()
                        })
                    })
                }
            },
        },

        methods: {
            calcPaneInstances() {
                if (this.$slots.default) {
                    const paneSlots = this.$slots.default.filter(
                        vnode =>
                            vnode.tag &&
                            vnode.componentOptions &&
                            vnode.componentOptions.Ctor.options.name === 'ElTabPane'
                    )
                    // update indeed
                    const panes = paneSlots.map(({ componentInstance }) => componentInstance)
                    if (
                        !(
                            panes.length === this.panes.length &&
                            panes.every((pane, index) => pane === this.panes[index])
                        )
                    ) {
                        this.panes = panes
                    }
                } else if (this.panes.length !== 0) {
                    this.panes = []
                }
            },
            handleTabSelect(value) {
                this.setCurrentName(value + '')
                this.$emit('tab-select', value + '', event)
            },
            handleTabClick(tab, tabName, event) {
                if (tab.disabled) return
                this.setCurrentName(tabName)
                this.$emit('tab-click', tab, event)
            },
            handleTabRemove(pane, ev) {
                if (pane.disabled) return
                ev.stopPropagation()
                this.$emit('edit', pane.name, 'remove')
                this.$emit('tab-remove', pane.name)
            },
            handleTabAdd() {
                this.$emit('edit', null, 'add')
                this.$emit('tab-add')
            },
            handleTabShare() {
                this.$emit('tab-share')
            },
            setCurrentName(value) {
                const changeCurrentName = () => {
                    this.currentName = value + ''
                    this.$emit('input', value + '')
                }
                if (this.currentName !== value && this.beforeLeave) {
                    const before = this.beforeLeave(value, this.currentName)
                    if (before && before.then) {
                        before.then(() => {
                            changeCurrentName()

                            this.$refs.nav && this.$refs.nav.removeFocus()
                        })
                    } else if (before !== false) {
                        changeCurrentName()
                    }
                } else {
                    changeCurrentName()
                }
            },
            onOrderChange(args) {
                this.$emit('order', args)
            }
        },

        render(h) {
            let {
                type,
                handleTabClick,
                handleTabRemove,
                handleTabAdd,
                handleTabShare,
                currentName,
                panes,
                editable,
                addable,
                shareable,
                tabPosition,
                stretch,
                drag,
            } = this

            const newButton =
                editable || addable ? (
                    <span
                        class="el-tabs__new-tab"
                        on-click={handleTabAdd}
                        tabindex="0"
                        on-keydown={ev => {
                            if (ev.keyCode === 13) {
                                handleTabAdd()
                            }
                        }}
                    >
                        {this.$slots['new-tab'] || <i class="el-icon-plus" />}
                    </span>
                ) : null

            const shareButton =
                shareable ? (
                    <span
                        class="el-tabs__new-tab"
                        on-click={handleTabShare}
                        tabindex="0"
                        on-keydown={ev => {
                            if (ev.keyCode === 13) {
                                handleTabShare()
                            }
                        }}
                    >
                        {this.$slots['share-tab'] || <i class="el-icon-share" />}
                    </span>
                ) : null

            const navData = {
                props: {
                    currentName,
                    onTabClick: handleTabClick,
                    onTabRemove: handleTabRemove,
                    editable,
                    type,
                    panes,
                    drag,
                    stretch,
                    $slots: {
                        test: this.$slots.test,
                    },
                },

                ref: 'nav',
            }

            const tabs = this._l(panes, (pane, index) => {
                let tabName = pane.name || pane.index || index
                const tabLabelContent = pane.$slots.label || pane.label
                // const _pane = pane.$slots.default[index].componentInstance;
                return {
                    label: tabLabelContent,
                    label_str: pane.label,
                    pane,
                    value: tabName + '',
                }
            })

            const header = (
                <div class={['el-tabs__header', `is-${tabPosition}`]}>
                    <div class="el-tabs__header--inner">
                        {(this.$slots.closePrefix) && (

                                this.$slots.closePrefix

                        )}

                        <tab-nav
                            on-order={this.onOrderChange}
                            {...navData}
                        >
                            <template slot="prefix">{this.$slots['nav-prefix']}</template>
                            <template slot="suffix">{this.$slots['nav-suffix']}{shareButton}{newButton}</template>
                        </tab-nav>
                        {(this.$slots.close) && (
                            <div class="el-tabs__toolbar">
                                {this.$slots.close}
                            </div>
                        )}

                    </div>

                    {this.mobileDropdown && (
                        <div class={['el-tabs__header--mobile', `is-${tabPosition}`]}>
                            <el-select
                                value={this.currentName}
                                clearable={false}
                                on-change={this.handleTabSelect}
                                popper-class="el-select--tabs-mobile"
                            >
                                {tabs.map(item => {
                                    if (item.value === this.currentName) {
                                        return (
                                            <span slot="prefix">{item.pane.$slots.prefixMobile}</span>
                                        )
                                    }
                                })}
                                {tabs.map(item => {
                                    return (
                                        <el-option
                                            key={item.value}
                                            value={item.value}
                                            label={item.label_str}
                                        >
                                            {item.label}
                                        </el-option>
                                    )
                                })}
                            </el-select>
                            {this.$slots.toolbarMobile && (
                                <div class="el-tabs__header--mobile__toolbar">
                                    {this.$slots.toolbarMobile}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )
            const panels = (
                <div class="el-tabs__content">
                    {this.$slots.default}
                    {this.$slots.nodata && !this.$slots.default && (
                        <div class="el-tabs__content__empty">{this.$slots.nodata || 'nodata'}</div>
                    )}
                    {this.$slots.empty && (
                        <div class="el-tabs__content__empty">{this.$slots.empty || 'empty'}</div>
                    )}
                    {(this.$slots.toolbar) && (
                        <div class="el-tabs__footbar">
                            {this.$slots.toolbar}
                        </div>
                    )}
                </div>
            )

            return (
                <div
                    class={{
                        'el-tabs': true,
                        'el-tabs--card': type === 'card',
                        [`el-tabs--mobile-dropdown`]: this.mobileDropdown,
                        [`el-tabs--${tabPosition}`]: true,
                        'el-tabs--border-card': type === 'border-card',
                    }}
                >
                    {tabPosition !== 'bottom' ? [header, panels] : [panels, header]}
                </div>
            )
        },

        created() {
            if (!this.currentName) {
                this.setCurrentName('0')
            }
        },

        mounted() {
            this.calcPaneInstances()
        },

        updated() {
            this.calcPaneInstances()
        },
    }
</script>

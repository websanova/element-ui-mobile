<template>
    <el-tabs
        v-model="editableTabsValue"
        type="card"
        addable
        @edit="handleTabsEdit"
        class="el-tabs--ext"
    >
        <template slot="new-tab">
            <el-tooltip
                slot="reference"
                content="Add Dashboard"
                placement="bottom"
                :open-delay="1000"
            >
                <el-iconbutton icon="plus" />
            </el-tooltip>
        </template>

        <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
            class="el-tab-ext-pane--dashboard"
        >
            {{ item.content }}
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import ElTabs from '@websanova/element-ui-mobile/packages/tabs';
    import ElTabPane from '@websanova/element-ui-mobile/packages/tab-pane';
    // import ElTooltip from 'element-ui/packages/tooltip';
    import {Tooltip as ElTooltip} from 'element-ui';

    export default {
        components: { ElTabs, ElTabPane, ElTooltip },
        data() {
            return {
                editableTabsValue: '2',
                editableTabs: [
                    {
                        title: 'Tab 1',
                        name: '1',
                        content: 'Tab 1 content',
                    },
                    {
                        title: 'Tab 2',
                        name: '2',
                        content: 'Tab 2 content',
                    },
                ],
                tabIndex: 2,
            }
        },
        methods: {
            handleTabsEdit(targetName, action) {
                if (action === 'add') {
                    let newTabName = ++this.tabIndex + ''
                    this.editableTabs.push({
                        title: 'New Tab',
                        name: newTabName,
                        content: 'New Tab content',
                    })
                    this.editableTabsValue = newTabName
                }
                if (action === 'remove') {
                    let tabs = this.editableTabs
                    let activeName = this.editableTabsValue
                    if (activeName === targetName) {
                        tabs.forEach((tab, index) => {
                            if (tab.name === targetName) {
                                let nextTab = tabs[index + 1] || tabs[index - 1]
                                if (nextTab) {
                                    activeName = nextTab.name
                                }
                            }
                        })
                    }

                    this.editableTabsValue = activeName
                    this.editableTabs = tabs.filter(tab => tab.name !== targetName)
                }
            },
        },
    }
</script>

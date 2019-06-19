<template>
    <el-popover
        :width="width"
        popper-class="el-popover--multi-select el-popover--mobile-full"
        placement="bottom-start"
        :popper-options="popperOptions"
    >
        <div
            class="el-multi-select"
            slot="reference"
        >
            <span>{{_label}}</span>
            <el-icon name="light/caret-down" />
        </div>
        <div class="el-multi-select__header">
            <el-input
                v-if="searchEnabled"
                placeholder="Search..."
                v-model="searchValue"
            />
            <div class="el-multi-select__toolbar" v-if="multiselect">
                <el-button
                    type="text"
                    @click="this.selectAll"
                >Select all</el-button>
                <div class="el-multi-select__toolbar-spacer"></div>
                <el-button
                    type="text"
                    @click="this.deselectAll"
                >Clear all</el-button>
            </div>
            <div class="el-multi-select__toolbar" v-if="!multiselect">
                <div class="el-multi-select__toolbar-spacer"></div>
                <el-button
                    type="text"
                    @click="this.deselectAll"
                >Clear</el-button>
            </div>
        </div>

        <div
            class="el-multi-select__notfound"
            v-if="!filteredOptions.length"
        >No results found.</div>

        <el-scrollbar
            v-if="filteredOptions.length"
            class="el-scrollbar--fix"
        >

        <el-radio-group
            v-model="currentValue"
            size="small"
            @change="handleRadioChange"
        >
            <ul
                :style="{width: (width - 9) + 'px'}"
                class="el-multi-select__options"
            >
                <li
                    v-for="option in filteredOptions"
                    :key="option[valueKey]"
                    :value="option[valueKey]"
                >
                    <el-checkbox
                        v-if="multiselect"
                        v-model="selection[option[valueKey]]"
                        @change="handleChange"
                    >{{ option[labelKey] }}</el-checkbox>
                    <el-radio
                        v-else
                        :label="option[valueKey]"
                    >{{ option[labelKey] }}</el-radio>
                </li>
            </ul>
            </el-radio-group>
        </el-scrollbar>

    </el-popover>
</template>

<script>
    function fuzzysearch(pattern, str) {
        const newPattern = pattern.split('').reduce((a, b) => `${a}.*${b}`)
        const result = new RegExp(pattern).test(str)
        return result
    }

    export default {
        name: 'ElMultiSelect',
        data() {
            return {
                currentValue: null,
                label: '',
                search: '',
                searchValue: '',
                selection: {
                    country: null,
                    language: null,
                    status: 'on',
                },
                filteredOptions: null,
                initialLoaded: false,
            }
        },
        props: {
            value: null,
            multiselect: false,
            searchEnabled: true,
            options: {
                type: Array,
                default() {
                    return []
                },
            },
            initialSearch: String,
            initialValue: String,
            initialLabel: {
                type: String,
                default: 'none',
            },
            multipleLabel: {
                type: String,
                default: 'multiple',
            },
            allLabel: {
                type: String,
                default: 'all',
            },
            inputDelay: {
                type: Number,
                default: 300,
            },
            width: {
                type: Number,
                default: 250,
            },
            height: {
                type: String,
                default: '250px',
            },
            labelKey: {
                type: String,
                default: 'label',
            },
            valueKey: {
                type: String,
                default: 'value',
            },
            popperOptions: {
                type: Object,
                default: () => {
                    return {
                        // placement: "bottom-start",
                        // boundaries: "",
                        positionFixed: false,
                        preventOverflowOrder: ['left', 'right', 'bottom', 'top'],
                        // modifiers: ["preventOverflow"]
                    }
                },
            },
        },
        created() {
            this.search = this.initialSearch
            this.label = this.initialLabel

            if (this.value) {
                if (this.multiselect) {
                    this.selection = this.getSelectionFromValue(this.value)
                    this.updateLabel(this.value)
                }
            }

            this.applySearch(this.initialSearch)
            if (this.options && this.options.length) {
                if (this.multiselect && !this.initialLoaded) {
                    this.selectAll()
                    this.initialLoaded = true
                }
            }
        },
        watch: {
            options(value) {
                this.applySearch(this.searchValue)
                if (this.multiselect && !this.initialLoaded) {
                    this.selectAll()
                    this.initialLoaded = true
                }
            },
            value(value) {
                if (!value) return
                if (this.multiselect) this.selection = this.getSelectionFromValue(value)
            },
            searchValue(val) {
                val = val.trim()
                clearTimeout(this.changeTimeout)
                this.changeTimeout = setTimeout(() => {
                    if (val !== this.search) this.handleSearch(val)
                }, this.inputDelay)
            },
        },
        computed: {
            _label() {
                if (this.multiselect) return this.label

                const item = this.options.find(item => item[this.valueKey] === this.value)

                if (!item) return this.initialLabel

                return item[this.labelKey]
            },
        },
        methods: {
            handleRadioChange(value) {
                this.$emit('change', value)
            },
            handleChange() {
                const values = this.getValuesFromSelection()
                this.updateLabel(values)
                this.$emit('change', values)
            },
            handleSearch(val) {
                // this.searchValue = val
                this.applySearch(val)
            },
            handleClose() {},
            getSelectionFromValue(value) {
                const sel = {}
                value.forEach(t => {
                    sel[t] = true
                })
                return sel
            },
            getValuesFromSelection() {
                const sel = {}
                Object.entries(this.selection).forEach(item => {
                    if (item[1]) sel[item[0]] = true
                })

                return Object.keys(sel)
            },
            updateLabel(values) {
                if (this.multiselect) {
                    if (values.length === 1) {
                        const match = this.options.find(item => item[this.valueKey] === values[0])
                        this.label = match ? match[this.labelKey] : this.initialLabel
                    } else if (values.length === this.options.length) {
                        this.label = this.allLabel
                    } else if (values.length > 1) {
                        this.label = this.multipleLabel
                    } else {
                        this.label = this.initialLabel
                    }
                }
            },
            applySearch(search) {
                let filteredOptions
                if (!search) {
                    filteredOptions = this.options.concat([])
                } else {
                    if (!this.caseSensitive) search = search.toLowerCase()
                    filteredOptions = this.options.filter(item => {
                        let val = item[this.labelKey]
                        if (!this.caseSensitive) val = val.toLowerCase()
                        let result = fuzzysearch(search, val)
                        return result
                    })
                }

                this.$set(this, 'filteredOptions', filteredOptions)
            },
            selectAll() {
                const selection = {}
                this.filteredOptions.forEach(item => {
                    selection[item.value] = true
                })
                this.selection = selection
                // this.$set(this, 'selection', selection)
                if (this.multiselect) {
                    this.handleChange()
                }
            },
            deselectAll() {
                this.value = null
                const selection = {}
                this.filteredOptions.forEach(item => {
                    selection[item[this.valueKey]] = false
                })
                this.selection = selection
                // this.$set(this, 'selection', selection)
                if (this.multiselect) {
                    this.handleChange()
                } else {
                    this.handleRadioChange()
                }
            },
        },

        beforeDestroy() {
            clearTimeout(this.changeTimeout)
        },
    }
</script>

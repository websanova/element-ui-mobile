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
                v-model="_value"
                size="small"
                @change="handleRadioChange"
                v-if="!multiselect"
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
                        <el-radio
                            :label="option[valueKey]"
                        >{{ option[labelKey] }}</el-radio>
                    </li>
                </ul>
            </el-radio-group>

            <ul
                v-if="multiselect"
                :style="{width: (width - 9) + 'px'}"
                class="el-multi-select__options"
            >
                <li
                    v-for="option in filteredOptions"
                    :key="option[valueKey]"
                    :value="option[valueKey]"
                >
                    <el-checkbox
                        :value="itemSelected(option)"
                        @change="(v) => handleCheckboxChange(option, v)"
                    >{{ option[labelKey] }}</el-checkbox>
                </li>
            </ul>



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
                selection: {},
                filteredOptions: null,
                initialLoaded: false,
                totalSelected: 0,
            }
        },
        props: {
            value: null,
            multiselect: false,
            searchEnabled: true,
            noneAsAllSelected: false,
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

            if (this.multiselect && this.value) {
                this.update()
            }

            this.applySearch(this.initialSearch)
        },
        watch: {
            options(value) {
                this.applySearch(this.searchValue)
            },
            value(value) {
                if (!value) return

                if (this.multiselect) {
                    this.update()
                }
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
            _value() {
                if (!this.multiselect) return this.currentValue
                return this.value
            },
            _label() {
                if (this.multiselect) return this.label

                const item = this.options.find(item => item[this.valueKey] === this.value)

                if (!item) return this.initialLabel

                return item[this.labelKey]
            },
        },
        methods: {
            itemSelected(option) {
                if (this.noneAsAllSelected && this.totalSelected >= this.options.length) {
                    return true
                }
                return this.selection[option[this.valueKey]]
            },
            update() {
                const selection = this.getSelectionFromValue(this.value)
                // this.$set(this, 'selection', selection)
                this.selection = selection
                this.updateLabel(this.value)
            },
            handleRadioChange(value) {
                this.$emit('change', value)
            },
            handleCheckboxChange(option, value) {
                if (this.noneAsAllSelected && this.totalSelected === 0) value = true
                this.selection[option.value] = value

                let values = this.getValuesFromSelection()
                this.totalSelected = values.length

                if (this.noneAsAllSelected && this.totalSelected >= this.options.length) {
                    values = []
                }

                this.updateLabel(values)
                this.$emit('change', values)
            },
            handleChange() {
                let values = this.getValuesFromSelection()
                this.totalSelected = values.length

                if (this.noneAsAllSelected && this.totalSelected >= this.options.length) {
                    values = []
                }

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
                if (!this.multiselect) return

                const selection = {}
                this.filteredOptions.forEach(item => {
                    selection[item.value] = true
                })

                // this.$set(this, 'selection', selection)
                this.selection = selection

                this.handleChange()
            },
            deselectAll() {
                if (this.multiselect) {
                    const selection = {}
                    this.filteredOptions.forEach(item => {
                        selection[item.value] = false
                    })
                    this.selection = selection
                    // this.$set(this, 'selection', selection)
                    this.handleChange()
                    return
                }

                this.currentValue = null
                this.handleRadioChange()
            },
        },

        beforeDestroy() {
            clearTimeout(this.changeTimeout)
        },
    }
</script>

<template>
    <el-popover
        :width="width"
        :popper-class="'el-popover--multi-select el-popover--mobile-full ' + popperClass"
        :placement="placement"
        :popper-options="popperOptions"
    >
        <div
            class="el-multi-select"
            slot="reference"
        >
            <span>{{_label}}</span>
            <el-icon name="light/chevron-down" scale=".7" />
        </div>
        <div class="el-multi-select__header">

            <div class="el-multi-select__toolbar" v-if="multiselect">
                <el-button
                    type="text"
                    @click="this.selectAll"
                >Select all</el-button>
                <div class="el-multi-select__toolbar-spacer"></div>
                <el-button
                    type="text"
                    v-if="clearable"
                    @click="this.deselectAll"
                >Clear all</el-button>
            </div>
            <div class="el-multi-select__toolbar" v-if="!multiselect && (clearable || title)">
                <span class="el-multi-select__toolbar_title" v-if="title">{{title}}</span>
                <div class="el-multi-select__toolbar-spacer"></div>
                <el-button
                    v-if="clearable"
                    type="text"
                    @click="this.deselectAll"
                >Clear</el-button>
            </div>
        </div>

        <el-input
            v-if="searchEnabled"
            placeholder="Search..."
            v-model="searchValue"
            class="el-multi-select__search-input"
        />

        <div
            class="el-multi-select__notfound"
            v-if="!filteredOptions.length"
        >No results found.</div>

        <el-scrollbar
            v-if="filteredOptions.length"
            class="el-scrollbar--fix"
        >

            <!-- <el-radio-group
                :value="currentValue"
                size="small"
                @change="handleRadioChange"
                v-if="!multiselect"
            > -->
                <ul
                    :style="{width: (width - 9) + 'px'}"
                    class="el-multi-select__options"
                >
                    <li
                        v-for="option in filteredOptions"
                        :key="option[valueKey]"
                    >
                        <el-radio
                            v-model="currentValue"
                            :label="option[valueKey]"
                            @change="handleRadioChange"
                        >{{ option[labelKey] }}</el-radio>
                    </li>
                </ul>
            <!-- </el-radio-group> -->

            <!-- <ul
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
                        :value="selection[option[valueKey]] === true || allSelected"
                        @change="(v) => handleCheckboxChange(option, v)"
                    >{{ option[labelKey] }}</el-checkbox>
                </li>
            </ul> -->
            <multi-list
                v-if="multiselect"
                :width="width"
                :filteredOptions="filteredOptions"
                :selection="selection"
                :valueKey="valueKey"
                :labelKey="labelKey"
                :allSelected="allSelected"
                @change="handleCheckboxChange"
            />

        </el-scrollbar>
    </el-popover>
</template>

<script>
    import multiList from './list'

    // @change="(v) => handleCheckboxChange(option, v)"
    function fuzzysearch(pattern, str) {
        const newPattern = pattern.split('').reduce((a, b) => `${a}.*${b}`)
        const result = new RegExp(pattern).test(str)
        return result
    }

    export default {
        name: 'ElMultiSelect',
        components: { multiList },
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
                allSelected: false,

            }
        },
        props: {
            popperClass: String,
            value: null,
            multiselect: {
                type: Boolean,
                default: false
            },
            clearable: {
                type: Boolean,
                default: true
            },
            title: String,
            searchEnabled:  {
                type: Boolean,
                default: true
            },
            noneAsAllSelected:  {
                type: Boolean,
                default: false
            },
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
            placement: {
                type: String,
                default: 'bottom-start',
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

            this.currentValue = this.value

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
                this.applySearch(this.searchValue)
                this.update()
            },
            searchValue(val) {
                val = val.trim()
                clearTimeout(this.changeTimeout)
                this.changeTimeout = setTimeout(() => {
                    if (val !== this.search) this.handleSearch(val)
                }, this.inputDelay)
            },
            currentValue(value) {
                this.$emit('change', value)
            }
        },
        computed: {
            _label() {
                // if (this.multiselect) return this.label

                const item = this.options.find(item => {
                    // console.log(item[this.valueKey] == this.value)
                    return item[this.valueKey] == this.value
                })
                // console.log('item', item, this.value)

                if (!item) return this.label

                return item[this.labelKey]
            }
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
                this.currentValue = value
                this.$emit('change', value)
            },
            handleCheckboxChange(option, value) {
                // if (this.noneAsAllSelected && this.totalSelected === 0) value = true

                this.selection[option[this.valueKey]] = value

                let values = this.getValuesFromSelection()

                this.totalSelected = values.length

                if (this.totalSelected >= this.options.length) {
                    this.allSelected = true
                } else {
                    this.allSelected = false
                }

                if (this.noneAsAllSelected && this.allSelected) {
                    values = []
                }

                this.updateLabel(values)
                this.$emit('change', values)
            },
            handleChange() {
                let values = this.getValuesFromSelection()
                this.totalSelected = values.length

                if (this.totalSelected >= this.options.length) {
                    this.allSelected = true
                } else {
                    this.allSelected = false
                }

                if (this.noneAsAllSelected && this.allSelected) {
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

                if (!Array.isArray(value)) {
                    value = [value]
                }

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
                    selection[item[this.valueKey]] = true
                })

                this.$set(this, 'selection', selection)
                // this.selection = selection

                this.handleChange()
            },
            deselectAll() {
                if (this.multiselect) {
                    const selection = {}
                    this.filteredOptions.forEach(item => {
                        selection[item[this.valueKey]] = false
                    })
                    // this.selection = selection
                    this.$set(this, 'selection', selection)
                    this.handleChange()
                    return
                }

                this.currentValue = null
            },
        },

        beforeDestroy() {
            clearTimeout(this.changeTimeout)
        },
    }
</script>

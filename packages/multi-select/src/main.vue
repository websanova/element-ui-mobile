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
            <span>{{label}}</span>
            <el-icon name="light/caret-down" />
        </div>
        <div class="el-multi-select__header">
            <el-input
                placeholder="Search..."
                v-model="searchValue"
            />
            <div class="el-multi-select__toolbar">
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
        </div>

        <div
            class="el-multi-select__notfound"
            v-if="!filteredOptions.length"
        >No results found.</div>

        <el-scrollbar
            v-if="filteredOptions.length"
            class="el-scrollbar--fix"
        >
            <ul
                :style="{width: (width - 9) + 'px'}"
                class="el-multi-select__options"
            >
                <li
                    v-for="option in filteredOptions"
                    :key="option.value"
                    :value="option.value"
                >
                    <el-checkbox
                        v-model="selection[option.value]"
                        @change="handleChange"
                    >{{ option.label }}</el-checkbox>
                </li>
            </ul>
        </el-scrollbar>

    </el-popover>
</template>

<script>
    function fuzzysearch(pattern, str) {
        const newPattern = pattern.split("").reduce((a, b) => `${a}.*${b}`);
        const result = new RegExp(pattern).test(str);
        return result;
    }

    export default {
        name: "ElMultiSelect",
        data() {
            return {
                label: "",
                search: "",
                searchValue: "",
                selection: {},
                filteredOptions: null
            };
        },
        props: {
            value: null,
            options: {
                type: Array,
                default() {
                    return [];
                }
            },
            initialSearch: String,
            initialValue: String,
            initialLabel: {
                type: String,
                default: "none"
            },
            multipleLabel: {
                type: String,
                default: "multiple"
            },
            allLabel: {
                type: String,
                default: "all"
            },
            inputDelay: {
                type: Number,
                default: 300
            },
            width: {
                type: Number,
                default: 250
            },
            height: {
                type: String,
                default: "250px"
            },
            popperOptions: {
                type: Object,
                default: () => {
                    return {
                        // placement: "bottom-start",
                        // boundaries: "",
                        positionFixed: false,
                        preventOverflowOrder: ["left", "right", "bottom", "top"]
                        // modifiers: ["preventOverflow"]
                    };
                }
            }
        },
        watch: {
            // selection: function() {
            //     this.handleChange()
            // },
            value: function(value) {
                if (!value) return;
                this.selection = this.getSelectionFromValue(value);
            },
            searchValue: function(val) {
                val = val.trim();
                clearTimeout(this.changeTimeout);
                this.changeTimeout = setTimeout(() => {
                    if (val !== this.search) this.handleSearch(val);
                }, this.inputDelay);
            }
        },
        methods: {
            handleChange() {
                const values = this.getValuesFromSelection();
                this.updateLabel(values);
                this.$emit("change", values);
            },
            handleSearch(val) {
                // this.searchValue = val
                this.applySearch(val);
            },
            handleClose() {},
            getSelectionFromValue(value) {
                const sel = {};
                value.forEach(t => {
                    sel[t] = true;
                });
                return sel;
            },
            getValuesFromSelection() {
                const sel = {};
                Object.entries(this.selection).forEach(item => {
                    if (item[1]) sel[item[0]] = true;
                });

                return Object.keys(sel);
            },
            updateLabel(values) {
                if (values.length === 1) {
                    const match = this.options.find(
                        item => item.value === values[0]
                    );
                    this.label = match ? match.label : this.initialLabel;
                } else if (values.length === this.options.length) {
                    this.label = this.allLabel;
                } else if (values.length > 1) {
                    this.label = this.multipleLabel;
                } else {
                    this.label = this.initialLabel;
                }
            },
            applySearch(search) {
                let filteredOptions;
                if (!search) {
                    filteredOptions = this.options.concat([]);
                } else {
                    if (!this.caseSensitive) search = search.toLowerCase();
                    filteredOptions = this.options.filter(item => {
                        let val = item.label;
                        if (!this.caseSensitive) val = val.toLowerCase();
                        let result = fuzzysearch(search, val);
                        return result;
                    });
                }

                this.$set(this, "filteredOptions", filteredOptions);
            },
            selectAll() {
                const selection = {};
                this.filteredOptions.forEach(item => {
                    selection[item.value] = true;
                });
                this.selection = selection;
                // this.$set(this, 'selection', selection)
                this.handleChange();
            },
            deselectAll() {
                const selection = {};
                this.filteredOptions.forEach(item => {
                    selection[item.value] = false;
                });
                this.selection = selection;
                // this.$set(this, 'selection', selection)
                this.handleChange();
            }
        },
        created() {
            this.search = this.initialSearch;
            this.label = this.initialLabel;

            if (this.value) {
                this.selection = this.getSelectionFromValue(this.value);
                this.updateLabel(this.value);
            }

            if (!this.options)
                throw new Error("must supply options to el-multi-select");
            this.applySearch(this.initialSearch);
        },
        beforeDestroy() {
            clearTimeout(this.changeTimeout);
        }
    };
</script>

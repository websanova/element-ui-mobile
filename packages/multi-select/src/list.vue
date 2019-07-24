<script>
    export default {
        props: ['width', 'filteredOptions', 'valueKey', 'labelKey', 'selection', 'allSelected'],

        methods: {
            handleCheckboxChange(option, value) {
                this.$emit('change', option, value)
            },
        },
        render(createElement) {
            const { width, filteredOptions, valueKey, labelKey, selection, allSelected } = this

            // if (!multiselect) {

            // }

            return (
                <ul style={{ width: width - 9 + 'px' }} class="el-multi-select__options">
                    {filteredOptions.map(option => {
                        return (
                            <li key={option[valueKey]} value={option[valueKey]}>
                                <el-checkbox
                                    value={selection[option[valueKey]] === true || allSelected}
                                    on-change={v => this.handleCheckboxChange(option, v)}
                                >
                                    {option[labelKey]}
                                </el-checkbox>
                            </li>
                        )
                    })}
                </ul>
            )
        },
    }
</script>

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



            return (
                <ul style={{ width: width - 9 + 'px' }} class="el-multi-select__options">
                    {filteredOptions.map((option, i) => {
                        let props = {}
                        if (option.color) {
                            props.style = { '--color': option.color || 'unset' }
                        }
                        if (option.style) props.style = option.style
                        if (option.class) props.class = option.class

                        return (
                            <li key={option[valueKey]} value={option[valueKey]} {...props}>
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

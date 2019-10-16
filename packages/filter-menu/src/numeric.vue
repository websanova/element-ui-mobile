<template>
    <div class="el-filter-menu">
        <el-menu
            :default-active="type"
            @select="handleSelect"
        >
            <el-menu-item
                v-for="option in options"
                :key="option.value"
                :index="option.value"
            >{{option.label}}</el-menu-item>
        </el-menu>
        <el-input
            type="number"
            placeholder="Filter Value..."
            v-model="inputValue"
            clearable
        />
    </div>
</template>

<script>
    import ElMultiSelect from '../../multi-select'

    const filterOptions = [
        { label: 'EQUALS', value: '=' },
        { label: 'DOES NOT EQUAL', value: '!=' },
        { label: 'LESS THAN', value: '<' },
        { label: 'GREATER THAN', value: '>' },
        { label: 'LESS THAN OR EQUAL', value: '<=' },
        { label: 'GREATER THAN OR EQUAL', value: '>=' },
    ]

    export default {
        name: 'ElNumericFilter',
        components: { ElMultiSelect },
        props: {
            options: {
                type: Array,
                default: () => filterOptions,
            },
            inputDelay: {
                type: Number,
                default: 300,
            },
            value: {
                type: String,
                default: '',
            },
            type: {
                type: String,
                default: '=',
            },
        },
        data() {
            return {
                inputValue: '', // input model
                _value: '', // final search value
            }
        },
        watch: {
            inputValue: function(value) {
                if (value) value = value.trim()
                clearTimeout(this.changeTimeout)
                this.changeTimeout = setTimeout(() => {
                    if (value !== this.value) this.handleChange(value)
                }, this.inputDelay)
            },
            value(value) {
                this._value = value
                this.inputValue = value
            }
        },
        mounted() {
            this.inputValue = this.value
            this._value = this.value
        },
        methods: {
            handleSelect(key) {
                this.$emit('change', this._value, key)
            },
            handleChange(value) {
                clearTimeout(this.changeTimeout)
                this._value = value
                this.$emit('change', this._value, this.type)
            },
        },
        beforeDestroy() {
            clearTimeout(this.changeTimeout)
        },
    }
</script>

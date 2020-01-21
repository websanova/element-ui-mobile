<template>
    <el-dropdown
        trigger="click"
        class="el-dropdown-select"
        @command="change"
        :placement="placement"
    >
        <span
            class="el-dropdown-select__handle"
        >
            <slot
                name="label"
            >
                <span>
                    {{ label || _label }}
                </span>

                <el-icon
                    name="light/chevron-down"
                    :scale=".7"
                ></el-icon>
            </slot>
        </span>

        <el-dropdown-menu
            :class="menuClass"
            :popper-options="popperOptions"
            slot="dropdown"
            class="el-dropdown-menu--select"
        >
            <el-dropdown-item
                v-for="(option, index) in options"
                :key="option[valueKey] + '-' + index"
                :command="option[valueKey]"
                :class="{['el-dropdown-menu--select__' + option.type]: option.type}"
            >
                {{
                    (option[labelI18nKey]) ?
                    $t(option[labelI18nKey]) : option[labelKey]
                }}
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    // import {findObjectByKey} from 'PLUGINS/lib/utils.js';

    export default {
        name: 'ElDropdownSelect',

        props: {
            value: {},

            options: Array,
            label: String,

            menuClass: String,

            placement: {
                type: String,
                default: 'bottom-start',
            },

            labelKey: {
                type: String,
                default: 'label',
            },
            labelI18nKey: {
                type: String,
                default: 't_label',
            },

            valueKey: {
                type: String,
                default: 'value',
            },

            popperOptions: {
                type: Object,
                default: () => {
                    return {
                        boundariesElement: 'body',
                        positionFixed: false,
                        preventOverflowOrder: ['left', 'right', 'bottom', 'top'],
                    }
                },
            },
        },

        data() {
            return {
                option: null,
            }
        },

        watch: {
            value(val) {
                this.setOption(val)
            },
        },

        computed: {
            _label() {
                const transLabel = (this.option || {})[this.labelI18nKey]
                if (transLabel) {
                    return this.$t(transLabel)
                }
                return (this.option || {})[this.labelKey]
            },
        },

        methods: {
            change(value) {
                this.$emit('input', value)
                this.$emit('change', value)

                this.setOption(value)
            },

            setOption(value) {
                this.option = this.options.find(o => o[this.valueKey] === value)
                // this.option = findObjectByKey(this.options, value, this.valueKey);
            },
        },

        created() {
            if (!this.options) {
                throw new Error('Must supply options to el-dropdown-select.')
            }

            if (this.value) {
                this.setOption(this.value)
            } else {
                this.option = this.options[0] || null
            }
        },
    }
</script>

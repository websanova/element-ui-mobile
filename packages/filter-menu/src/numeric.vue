<template>
    <div class="el-filter-menu">
        <el-menu
            :default-active="initialType"
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
            v-model.lazy="inputValue"
        />
    </div>
</template>

<script>
    import ElMultiSelect from '../../multi-select'

    const filterOptions = [
        { label: "EQUALS", value: "=" },
        { label: "DOES NOT EQUAL", value: "!=" },
        { label: "LESS THAN", value: "<" },
        { label: "GREATER THAN", value: ">" },
        { label: "LESS THAN OR EQUAL", value: "<=" },
        { label: "GREATER THAN OR EQUAL", value: ">=" }
    ];

    export default {
        name: "ElNumericFilter",
        components: { ElMultiSelect },
        props: {
            options: {
                type: Array,
                default: () => filterOptions
            },
            inputDelay: {
                type: Number,
                default: 300
            },
            initialValue: {
                type: String,
                default: ""
            },
            initialType: {
                type: String,
                default: "="
            }
        },
        data() {
            return {
                inputValue: "", // input model
                value: "", // final search value
                type: "" // search type (from menu selection)
            };
        },
        watch: {
            inputValue: function(value) {
                value = value.trim();
                clearTimeout(this.changeTimeout);
                this.changeTimeout = setTimeout(() => {
                    if (value !== this.value) this.handleChange(value);
                }, this.inputDelay);
            }
        },
        mounted() {
            this.inputValue = this.initialValue;
            this.value = this.initialValue;
            this.type = this.initialType;
        },
        methods: {
            handleSelect(key) {
                this.type = key;
                this.$emit("change", this.value, this.type);
            },
            handleChange(value) {
                clearTimeout(this.changeTimeout);
                this.value = value;
                this.$emit("change", this.value, this.type);
            }
        },
        beforeDestroy() {
            clearTimeout(this.changeTimeout);
        }
    };
</script>

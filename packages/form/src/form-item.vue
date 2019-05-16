<template>
  <div class="el-form-item" :class="[{
      'el-form-item--feedback': elForm && elForm.statusIcon,
      'is-error': validateState === 'error',
      'is-validating': validateState === 'validating',
      'is-success': validateState === 'success',
      'is-required': isRequired || required,
      'is-no-asterisk': elForm && elForm.hideRequiredAsterisk
    },
    sizeClass ? 'el-form-item--' + sizeClass : ''
  ]">
    <label :for="labelFor" class="el-form-item__label" :style="labelStyle" v-if="label || $slots.label">
      <slot name="label">{{label + form.labelSuffix}}</slot>
    </label>
    <div class="el-form-item__content" :style="contentStyle">
      <slot></slot>
      <transition name="el-zoom-in-top">
        <slot
          v-if="validateState === 'error' && showMessage && form.showMessage"
          name="error"
          :error="validateMessage">
          <div
            class="el-form-item__error"
            :class="{
              'el-form-item__error--inline': typeof inlineMessage === 'boolean'
                ? inlineMessage
                : (elForm && elForm.inlineMessage || false)
            }"
          >
            {{validateMessage}}
          </div>
        </slot>
      </transition>
    </div>
  </div>
</template>
<script>
    import AsyncValidator from "async-validator";
    import emitter from "element-ui/src/mixins/emitter";
    import objectAssign from "element-ui/src/utils/merge";
    import { noop, getPropByPath } from "element-ui/src/utils/util";

    export default {
        name: "ElFormItem",

        componentName: "ElFormItem",

        mixins: [emitter],

        provide() {
            return {
                elFormItem: this
            };
        },

        inject: ["elForm"],

        props: {
            label: String,
            labelWidth: String,
            prop: String,
            required: {
                type: Boolean,
                default: undefined
            },
            rules: [Object, Array],
            error: String,
            validateStatus: String,
            for: String,
            inlineMessage: {
                type: [String, Boolean],
                default: ""
            },
            showMessage: {
                type: Boolean,
                default: true
            },
            size: String
        },
        watch: {
            error: {
                immediate: true,
                handler(value) {
                    this.validateMessage = value;
                    this.validateState = value ? "error" : "";
                }
            },
            fieldValue() {
                this.onFieldChange();
            },
            validateStatus(value) {
                this.validateState = value;
            }
        },
        computed: {
            labelFor() {
                return this.for || this.prop;
            },
            labelStyle() {
                const ret = {};
                if (this.form.labelPosition === "top") return ret;
                const labelWidth = this.labelWidth || this.form.labelWidth;
                if (labelWidth) {
                    ret.width = labelWidth;
                }
                return ret;
            },
            contentStyle() {
                const ret = {};
                const label = this.label;
                if (this.form.labelPosition === "top" || this.form.inline)
                    return ret;
                if (!label && !this.labelWidth && this.isNested) return ret;
                const labelWidth = this.labelWidth || this.form.labelWidth;
                if (labelWidth) {
                    ret.marginLeft = labelWidth;
                }
                return ret;
            },
            form() {
                let parent = this.$parent;
                let parentName = parent.$options.componentName;
                while (parentName !== "ElForm") {
                    if (parentName === "ElFormItem") {
                        this.isNested = true;
                    }
                    parent = parent.$parent;
                    parentName = parent.$options.componentName;
                }
                return parent;
            },
            fieldValue() {
                const model = this.form.model;
                if (!model || !this.prop) {
                    return;
                }

                let path = this.prop;
                if (path.indexOf(":") !== -1) {
                    path = path.replace(/:/, ".");
                }

                return getPropByPath(model, path, true).v;
            },
            isRequired() {
                let rules = this.getRules();
                let isRequired = false;

                if (rules && rules.length) {
                    rules.every(rule => {
                        if (rule.required) {
                            isRequired = true;
                            return false;
                        }
                        return true;
                    });
                }
                return isRequired;
            },
            _formSize() {
                return this.elForm.size;
            },
            elFormItemSize() {
                return this.size || this._formSize;
            },
            sizeClass() {
                return this.elFormItemSize || (this.$ELEMENT || {}).size;
            },
            dirty() {
                return this.initialValue !== this.fieldValue;
            }
        },
        data() {
            return {
                validateState: "",
                validateMessage: "",
                validateDisabled: false,
                validator: {},
                isNested: false,
                initialValue: null
            };
        },
        methods: {
            validate(trigger, callback = noop) {
                this.validateDisabled = false;
                const rules = this.getFilteredRule(trigger);
                if ((!rules || rules.length === 0) && this.required === undefined) {
                    callback();
                    return true;
                }

                this.validateState = "validating";

                const descriptor = {};
                if (rules && rules.length > 0) {
                    rules.forEach(rule => {
                        delete rule.trigger;
                    });
                }
                descriptor[this.prop] = rules;

                const validator = new AsyncValidator(descriptor);
                const model = {};

                model[this.prop] = this.fieldValue;

                validator.validate(
                    model,
                    { firstFields: true },
                    (errors, invalidFields) => {
                        this.validateState = !errors ? "success" : "error";
                        this.validateMessage = errors ? errors[0].message : "";

                        callback(this.validateMessage, invalidFields);
                        this.elForm &&
                            this.elForm.$emit(
                                "validate",
                                this.prop,
                                !errors,
                                this.validateMessage || null
                            );
                    }
                );
            },
            clearValidate() {
                this.validateState = "";
                this.validateMessage = "";
                this.validateDisabled = false;
            },
            resetField() {
                this.validateState = "";
                this.validateMessage = "";

                let model = this.form.model;
                let value = this.fieldValue;
                let path = this.prop;
                if (path.indexOf(":") !== -1) {
                    path = path.replace(/:/, ".");
                }

                let prop = getPropByPath(model, path, true);

                this.validateDisabled = false;
                if (Array.isArray(value)) {
                    prop.o[prop.k] = [].concat(this.initialValue);
                } else if (typeof value === "object") {
                    prop.o[prop.k] = Object.assign({}, this.initialValue);
                } else {
                    prop.o[prop.k] = this.initialValue;
                }

                this.broadcast("ElTimeSelect", "fieldReset", this.initialValue);
            },
            updateField() {
                // set new initial value
                let prop = getPropByPath(this.form.model, this.prop, true);
                let value = this.fieldValue;

                if (Array.isArray(value)) {
                    this.initialValue = this.fieldValue.concat([]);
                } else {
                    this.initialValue = this.fieldValue;
                }

                this.resetField();
            },
            getRules() {
                let formRules = this.form.rules;
                const selfRules = this.rules;
                const requiredRule =
                    this.required !== undefined
                        ? { required: !!this.required }
                        : [];

                const prop = getPropByPath(formRules, this.prop || "");
                formRules = formRules ? prop.o[this.prop || ""] || prop.v : [];

                return [].concat(selfRules || formRules || []).concat(requiredRule);
            },
            getFilteredRule(trigger) {
                const rules = this.getRules();

                return rules
                    .filter(rule => {
                        if (!rule.trigger || trigger === "") return true;
                        if (Array.isArray(rule.trigger)) {
                            return rule.trigger.indexOf(trigger) > -1;
                        } else {
                            return rule.trigger === trigger;
                        }
                    })
                    .map(rule => objectAssign({}, rule));
            },
            onFieldBlur() {
                this.validate("blur");
            },
            onFieldChange() {
                if (this.validateDisabled) {
                    this.validateDisabled = false;
                    return;
                }

                this.validate("change");
                let prop = getPropByPath(this.form.model, this.prop, true);
                this.dispatch("ElForm", "el.form.change", [this, prop.k, prop.v]);
            }
        },
        mounted() {
            if (this.prop) {
                this.dispatch("ElForm", "el.form.addField", [this]);

                let initialValue = this.fieldValue;
                if (Array.isArray(initialValue)) {
                    initialValue = [].concat(initialValue);
                }

                if (this.initialValue === null || this.initialValue === undefined) {
                    // set initialValue that is not reset by the component data on HMR
                    this.initialValue = initialValue;
                }

                let rules = this.getRules();

                if (rules.length || this.required !== undefined) {
                    this.$on("el.form.blur", this.onFieldBlur);
                    // this.$on("el.form.change", this.onFieldChange);
                }
            }
        },
        beforeDestroy() {
            this.dispatch("ElForm", "el.form.removeField", [this]);
        }
    };
</script>
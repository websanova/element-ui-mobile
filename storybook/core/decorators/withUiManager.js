import UiManager from "@websanova/element-ui-mobile/packages/ui-manager/UiManager";

export default () => {
    return {
        components: { UiManager },
        mounted() {
            this.$UI.manager = this.$refs.manager;
        },
        template: `<div>
            <ui-manager ref="manager" />
            <portal-target name="dialog" />
            <portal-target name="overlay" class="vue-portal-target--overlay" />

            <story  />
        </div>`,
    };
};

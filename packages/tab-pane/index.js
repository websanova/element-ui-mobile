import Component from "../tabs/src/tab-pane.vue";

/* istanbul ignore next */
Component.install = function(Vue) {
    Vue.component(Component.name, Component);
};

export default Component;

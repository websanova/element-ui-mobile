import Component from "./src/text";

/* istanbul ignore next */
Component.install = function(Vue) {
    Vue.component(Component.name, Component);
};

export default Component;

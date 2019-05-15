import Component from "./src/numeric";

/* istanbul ignore next */
Component.install = function(Vue) {
    Vue.component(Component.name, Component);
};

export default Component;

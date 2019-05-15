import Component from "./src/tabs";

/* istanbul ignore next */
Component.install = function(Vue) {
    Vue.component(Component.name, Component);
};

export default Component;

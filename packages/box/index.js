import ElBox from './src/component';

ElBox.install = function(Vue) {
  Vue.component(ElBox.name, ElBox);
};

export default ElBox;
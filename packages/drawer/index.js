// https://github.com/ElemeFE/element/pull/12746#issuecomment-420890881
// https://github.com/sunhaoxiang/element/tree/dev/packages/drawer

import ElDrawer from './src/component'

ElDrawer.install = function(Vue) {
    Vue.component(ElDrawer.name, ElDrawer)
}

export default ElDrawer

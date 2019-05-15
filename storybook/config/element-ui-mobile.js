import Vue from "vue";

import PortalVue from "portal-vue";
Vue.use(PortalVue);

import Drawer from "@websanova/element-ui-mobile/packages/drawer";
Vue.use(Drawer);

import Iconbutton from "@websanova/element-ui-mobile/packages/iconbutton";
// import "@websanova/element-ui-mobile/packages/theme-chalk/src/iconbutton.scss";
Vue.use(Iconbutton);

import Loader from "@websanova/element-ui-mobile/packages/loader";
Vue.use(Loader);

import Dialog from "@websanova/element-ui-mobile/packages/dialog";
Vue.use(Dialog);

import Popover from "@websanova/element-ui-mobile/packages/popover";
Vue.use(Popover);

import Scrollbar from "@websanova/element-ui-mobile/packages/scrollbar";
Vue.use(Scrollbar);

import Box from "@websanova/element-ui-mobile/packages/box";
Vue.use(Box);

import Select from "@websanova/element-ui-mobile/packages/select";
Vue.use(Select);

export {
    default as UI,
} from "@websanova/element-ui-mobile/packages/ui-manager/UI";
import UI from "@websanova/element-ui-mobile/packages/ui-manager/UI";
Vue.prototype.$UI = UI;

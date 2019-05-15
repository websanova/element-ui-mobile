import Vue from "vue";

// make sure element-ui uses english
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";

// configure element-ui language
locale.use(lang);

// ----- element-ui

import Button from "element-ui/packages/button";
import ButtonGroup from "element-ui/packages/button-group";
Vue.use(Button);
Vue.use(ButtonGroup);

import Alert from "element-ui/packages/alert";
Vue.use(Alert);

import Card from "element-ui/packages/card";
Vue.use(Card);

// import Dialog from "element-ui/packages/dialog";
// Vue.use(Dialog);

// import Popover from "element-ui/packages/popover";
// Vue.use(Popover);

// import Scrollbar from "vue-loader!element-ui/packages/scrollbar";
// Vue.use(Scrollbar);

// import { Select } from "element-ui";
import { Option } from "element-ui";
import "element-ui/lib/theme-chalk/select.css";
// Vue.use(Select);
Vue.use(Option);

// ----- element-ui Form

import Form from "element-ui/packages/form";
import FormItem from "element-ui/packages/form-item";
import "element-ui/lib/theme-chalk/form.css";
Vue.use(Form);
Vue.use(FormItem);

import Input from "element-ui/packages/input";
// import "element-ui/lib/theme-chalk/input.css";
Vue.use(Input);

import Checkbox from "element-ui/packages/checkbox";
// import "element-ui/lib/theme-chalk/checkbox.css";
Vue.use(Checkbox);

import Switch from "element-ui/packages/switch";
// import "element-ui/lib/theme-chalk/switch.css";
Vue.use(Switch);

import { Slider } from "element-ui";
// import "element-ui/lib/theme-chalk/slider.css";
Vue.use(Slider);

import Radio from "element-ui/packages/radio";
import RadioGroup from "element-ui/packages/radio-group";
import RadioButton from "element-ui/packages/radio-button";
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);

// ----- element-ui Layout

import Row from "element-ui/packages/row";
import Col from "element-ui/packages/col";
Vue.use(Row);
Vue.use(Col);

// ----- element-ui Container

import Container from "@websanova/element-ui-mobile/packages/container";
import Header from "element-ui/packages/header";
import Main from "element-ui/packages/main";
import Footer from "element-ui/packages/footer";
import Aside from "element-ui/packages/aside";

Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Aside);

// ----- element-ui Menu

import { Menu } from "element-ui";
import { Submenu } from "element-ui";
import { MenuItem } from "element-ui";
import { MenuItemGroup } from "element-ui";

import "element-ui/lib/theme-chalk/menu.css";
import "element-ui/lib/theme-chalk/submenu.css";
import "element-ui/lib/theme-chalk/menu-item.css";
import "element-ui/lib/theme-chalk/menu-item-group.css";

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);

// ----- element-ui Table

import { Table, TableColumn } from "element-ui";
Vue.use(Table);
Vue.use(TableColumn);

// ----- element-ui Dropdown

import { Dropdown, DropdownItem, DropdownMenu } from "element-ui";
// import 'element-ui/lib/theme-chalk/dropdown.css';
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);

// ----- element-ui Messagebox

import MessageBox from "element-ui/packages/message-box";

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

// ----- element-ui Message

import Message from "element-ui/packages/message";
Vue.prototype.$message = Message;

// ----- element-ui Notification

import Notification from "element-ui/packages/notification";
Vue.prototype.$notify = Notification;

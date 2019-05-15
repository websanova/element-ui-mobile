import Vue from "vue";

import "./element-ui";
import "./element-ui-mobile";

import CodeView from "@/storybook/core/elements/CodeView";
Vue.component(CodeView.name, CodeView);

import DemoBox from "@/storybook/core/elements/DemoBox";
Vue.component(DemoBox.name, DemoBox);

import VueMarkdown from "vue-markdown";
Vue.component("vue-markdown", VueMarkdown);

// Vue.use(Loading.directive);

import VueCodemirror from "vue-codemirror";
import "codemirror/lib/codemirror.css";

Vue.use(
    VueCodemirror /* {
    options: { theme: 'base16-dark', ... },
    events: ['scroll', ...]
} */,
);

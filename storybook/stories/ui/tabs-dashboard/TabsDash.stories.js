import { storiesOf } from "@storybook/vue";

const stories = storiesOf("UI|TabsDashboard*", module);

stories.add("Basic", () => {
    return {
        components: { MyDemo: require("./TabsEditable").default },
        props: {},
        template: `<my-demo />`,
    };
});

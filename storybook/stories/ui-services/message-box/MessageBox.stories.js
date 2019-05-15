import { storiesOf } from "@storybook/vue";
import withBoxPage from "@/storybook/core/decorators/withBoxPage";

const stories = storiesOf("Services|MessageBox", module);
stories
    .addDecorator(withBoxPage)
    .add("Basic", () => require("./MessageBox").default);

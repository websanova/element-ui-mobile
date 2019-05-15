import { storiesOf } from "@storybook/vue";
import withBoxPage from "@/storybook/core/decorators/withBoxPage";

const stories = storiesOf("Services|Messages", module);
stories
    .addDecorator(withBoxPage)
    .add("Basic", () => require("./Messages").default);

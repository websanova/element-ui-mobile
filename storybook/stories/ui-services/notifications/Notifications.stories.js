import { storiesOf } from "@storybook/vue";
import withBoxPage from "@/storybook/core/decorators/withBoxPage";

const stories = storiesOf("Services|Notifications", module);
stories
    .addDecorator(withBoxPage)
    .add("Basic", () => require("./Notifications").default);

import { withBackgrounds } from "@storybook/addon-backgrounds";

export const backgrounds = [
    { name: "white", value: "#fff", default: true },
    { name: "gray", value: "#999" },
    { name: "black", value: "#000" },
    { name: "light grey", value: "#f2f2f2" }
];

export default withBackgrounds(backgrounds);

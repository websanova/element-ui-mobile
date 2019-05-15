import { addParameters } from '@storybook/vue'

export const backgrounds = [
    { name: "white", value: "#fff", default: true },
    { name: "gray", value: "#999" },
    { name: "black", value: "#000" },
    { name: "light grey", value: "#f2f2f2" }
];

addParameters({ backgrounds });

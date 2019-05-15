const path = require("path");

module.exports = {
    css: {
        sourceMap: true,
    },
    chainWebpack: config => {
        // if (process.env.NODE_ENV !== "development") {
        //     // remove extract-css-loader so we can manually inject style tags
        //     config.module
        //         .rule("scss")
        //         .oneOf("normal")
        //         .uses.delete("extract-css-loader");
        // } else {
        //     // remove vue-style-loader so we can manually inject style tags in dev mode
        //     config.module
        //         .rule("scss")
        //         .oneOf("normal")
        //         .uses.delete("vue-style-loader");
        // }

        // load markdown files
        config.module
            .rule("md")
            .test(/\.md$/)
            .use("html")
            .loader("html-loader")
            .end()
            .use("md")
            .loader("markdown-loader")
            .options({})
            .end();

        // add resolve aliases
        config.resolve.alias.set("@", __dirname + "/");
        config.resolve.alias.set(
            "@websanova/element-ui-mobile",
            __dirname + "/",
        );
    },
};

/* eslint-disable import/no-extraneous-dependencies */
import { addParameters, addDecorator, configure } from "@storybook/vue";
import { withA11y } from "@storybook/addon-a11y";
// import { withConsole } from '@storybook/addon-console';
import { withKnobs } from "@storybook/addon-knobs";
import { withCssResources } from "@storybook/addon-cssresources";
// import withTheme from "@/storybook/core/decorators/withTheme";
import withUiManager from "@/storybook/core/decorators/withUiManager";
import { themes } from "@storybook/theming";
import "../core/decorators/withBackgrounds";
import "./main";

// Load stories
const req = require.context("../", true, /.stories.js$/);
function loadStories() {
    req.keys().forEach(filename => req(filename));
}

const uiThemes = [
    {
        label: "Chalk",
        value: "chalk",
    },
    {
        label: "Dark",
        value: "dark",
    },
];

addParameters({
    themes: {
        items: uiThemes,
        // optional: set the initial active theme
        active: localStorage.getItem("theme") || uiThemes[0].value,
        // optional: set the icon used in the toolbar
        icon: "document",
    },
});

// Knobs
addDecorator(withKnobs);
// addDecorator(withTheme(uiThemes));
addDecorator(withUiManager);

// Accessibility
addDecorator(withA11y);
addParameters({
    a11y: {
        // ... axe options
        //   element: '#root', // optional selector which element to inspect
        //   config: {} // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
        //   options: {} // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
    },
});

// Set storybook options
addParameters({
    options: {
        /**
         * name to display in the top left corner
         * @type {String}
         */
        name: "Element UI Mobile",
        /**
         * show story component as full screen
         * @type {Boolean}
         */
        isFullscreen: false,
        /**
         * display panel that shows a list of stories
         * @type {Boolean}
         */
        showNav: true,
        /**
         * display panel that shows addon configurations
         * @type {Boolean}
         */
        showPanel: true,
        /**
         * show addon panel as a vertical panel on the right
         * @type {Boolean}
         */
        panelPosition: "bottom",
        /**
         * sorts stories
         * @type {Boolean}
         */
        sortStoriesByKind: false,
        /**
         * regex for finding the hierarchy separator
         * @example:
         *   null - turn off hierarchy
         *   /\// - split by `/`
         *   /\./ - split by `.`
         *   /\/|\./ - split by `/` or `.`
         * @type {Regex}
         */
        hierarchySeparator: /\//,
        /**
         * regex for finding the hierarchy root separator
         * @example:
         *   null - turn off mulitple hierarchy roots
         *   /\|/ - split by `|`
         * @type {Regex}
         */
        hierarchyRootSeparator: /\|/,
        /**
         * sidebar tree animations
         * @type {Boolean}
         */
        sidebarAnimations: true,
        /**
         * id to select an addon panel
         * @type {String}
         */
        selectedPanel: undefined, // The order of addons in the "Addon panel" is the same as you import them in 'addons.js'. The first panel will be opened by default as you run Storybook
        /**
         * enable/disable shortcuts
         * @type {Boolean}
         */
        enableShortcuts: true, // true by default
        /**
         * show/hide tool bar
         * @type {Boolean}
         */
        isToolshown: true, // true by default
        /**
         * Theme:
         * @see https://storybook.js.org/docs/configurations/theming
         */
        theme: themes.dark,
    },
});

configure(loadStories, module);

import store from '@/storybook/store'

import {
    select,
} from '@storybook/addon-knobs'

import {
    mapState
} from "vuex";

export const THEMES = {
    chalk: 'chalk',
    dark: 'dark',
}

export default {
    store,
    props: {
        theme: {
            default: select('Theme', THEMES, 'chalk')
        },
    },
    watch: {
        theme(value) {
            console.log('theme')
            this.$store.dispatch('app/theme', value);
            this.setTheme(value);
        }
    },
    computed: {
        _theme() {
            return this.$store.state.app.theme;
        },
        async setTheme(value) {
            console.log('setTheme', value);
            const scss = await import('file-loader!@/storybook/styles/index.scss');
            console.log('scss', scss)
        }
    },
}

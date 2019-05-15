import {
    select
} from '@storybook/addon-knobs'

export const THEMES = {
    chalk: 'chalk',
    dark: 'dark',
}

/**
 * Note: to correctly sync a knobs value with localstorage we need
 * to update the local storage only when the story is unmounted
 * to avoid conflicts with the value of the knobs.
 *
 * to complete to solution we also need to update local storage when the document is unloaded.
 */
export default () => {
    let initialTheme = localStorage.getItem('theme') || 'chalk';
    if (initialTheme === 'undefined') initialTheme = 'chalk';

    return {
        props: {
            theme: {
                default: select('Theme', THEMES, initialTheme)
            }
        },
        // data() {
        //     return {
        //         theme: select('Theme', THEMES, initialTheme)
        //     }
        // },
        // updated() {
        //     localStorage.setItem('theme', this.theme)
        // },
        watch: {
            theme(value) {
                this.setTheme(value);
            }
        },
        computed: {
            _theme() {
                let theme = localStorage.getItem('theme');
                if (theme === 'undefined') theme = 'chalk';
                return theme || this.theme;
            }
        },
        created() {

            // window.onbeforeunload = function() {

            //     // localStorage.setItem('theme', this.theme);
            //     return "test"
            // };

            /*window.addEventListener('beforeunload', function (e) {
                localStorage.setItem('theme', this.theme);
                // Cancel the event
                e.preventDefault();
                // Chrome requires returnValue to be set
                e.returnValue = '';
            });*/

            this.setTheme(this._theme);
        },
        destroyed() {
            localStorage.setItem('theme', this._theme)
        },
        methods: {
            async setTheme(value) {
                if (!value) return;

                // setTimeout(() => {
                //     localStorage.setItem('theme', value)
                // }, 1000)

                let scssMod = (await import(`@/storybook/styles/${value}.scss`)).default;

                let cStyle = document.getElementById('css-theme');
                if (cStyle) cStyle.parentElement.removeChild(cStyle);

                // const link = document.createElement('link');
                // link.rel = "stylesheet";
                // link.href = '/' + scssMod;
                // link.id = 'css-theme';
                // document.head.appendChild(link);

                const style = document.createElement('style');
                style.id = 'css-theme';
                style.innerText = scssMod.toString();
                document.head.appendChild(style);
            }
        },
        template: '<story  />',
    };
};

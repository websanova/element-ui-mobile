import addons from "@storybook/addons";

/**
 * Note: to correctly sync a knobs value with localstorage we need
 * to update the local storage only when the story is unmounted
 * to avoid conflicts with the value of the knobs.
 *
 * to complete to solution we also need to update local storage when the document is unloaded.
 */
export default (themes) => {
    return () => {
        return {
            created() {
                const channel = addons.getChannel();
                channel.on("selectTheme", this.setTheme);
            },
            methods: {
                async setTheme(value) {
                    if (!value) return;

                    localStorage.setItem('theme', value);

                    let scssMod = (await import(`@/storybook/styles/${value}.scss`)).default;

                    console.log('scssMod', scssMod)

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
    }

};


// webpack Hot Module Replacement API
if (module.hot) {
    console.log("SETUP HMR")

    // themes.forEach(theme => {
        // console.log("HMRdddd", theme)

        // keep in mind - here you are configuring HMR to accept CHILDREN MODULE
        // while `hot` would configure HMR for the CURRENT module
        module.hot.accept(`@/storybook/styles/chalk.scss`, (...args) => {
            console.log("HMR", args)
            // in all other cases - re-require App manually
            //   render(require('./containers/App'))
        })
    // })

}

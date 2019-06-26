module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        jest: true,
        es6: true,
    },
    extends: ['plugin:vue/base'],
    rules: {
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
}

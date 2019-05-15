const path = require('path')
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local' ) })
const express = require('express')
const app = express()
const port = process.env.PROD_PORT || 8003
const proxy = require('http-proxy-middleware')
const fallback = require('express-history-api-fallback')

if (process.env.VUE_APP_API_ROOT) {
    app.use('/v1', proxy({
        target: process.env.VUE_APP_API_ROOT,
        changeOrigin: true,
        prependPath: true
    }));
}

const root = `${__dirname}/dist`

app.use(express.static('storybook-static'))
app.use(fallback('index.html', { root }))

app.listen(port, () => console.info(`Server listening on port ${port}!`))

const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname))

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const WebpackDevMiddleware = require('webpack-dev-middleware')
  const WebpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('./webpack.config.dev.js')
  const compiler = webpack(config)
  app.use(WebpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: { colors: true }
  }))
  app.use(WebpackHotMiddleware(compiler))
  app.use((req, res, next) => {
    res.locals.isDev = true
    next()
  })
}

app.engine('hbs', exphbs({
  extname: '.hbs',
  helpers: require('./config/handlebars-helpers')
}))
app.set('view engine', 'hbs')

require('./routes')(app)

app.use((req, res, next) => res.status(404).render('error'))

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})

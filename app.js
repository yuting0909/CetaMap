const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const db = require('./models')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(flash())

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

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  next()
})

require('./routes')(app)

app.use((req, res, next) => res.status(404).render('error'))

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})

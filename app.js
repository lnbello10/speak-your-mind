var fs = require('fs')
var cors = require('cors')
var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
// var hbs = require('express-handlebars')

var mongoClient = require('mongodb').MongoClient

mongoClient.connect('mongodb://node:node@ds036967.mlab.com:36967/speak-your-mind', (err, db) => {
  if (err) {
    console.log('Error trying to connect to DB')
    throw err
  }
  console.log('Connected to DB')

  db.createCollection('users',
    {
      validator: {
        $or: [
          {
            email: {
              $exists: true }
          }
        ]
      }
    }, (err, res) => {
      if (err) {
        console.log('Error creating the collection')
        throw err
      }
      console.log('Collection created succesfully')
      db.close()
    })
})

var app = express()
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views0'))
app.set('view engine', 'jade')

// app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: path.join(__dirname, '/views/layouts/')}))
// app.set('views', path.join(__dirname, 'views/layouts'))
// app.set('view engine', 'hbs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, './front/build')))

// loads al the files in directory '.routes' and creates its route
fs.readdirSync('./routes')
  .forEach(file => {
    let route = file.replace('.js', '')
    app.use(`/${route}`, require(`./routes/${route}`))
    console.log('Loaded route ' + route)
  })

// catches 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // sets locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // renders the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

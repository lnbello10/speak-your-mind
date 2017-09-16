var fs = require('fs')
var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var mongoClient = require('mongodb').MongoClient
mongoClient.connect('mongodb://node:node@ds036967.mlab.com:36967/speak-your-mind', (err, db) => {
  if (err) console.log('Error trying to connect to DB')
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
      if (err) console.log('Error creating the collection')
      console.log('Collection created succesfully')
      db.close()
    })
})

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, './front/public')))

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

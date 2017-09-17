var express = require('express')
var router = express.Router()
var mongoClient = require('mongodb').MongoClient

router.get('/', (req, res) => {
  mongoClient.connect('mongodb://node:node@ds036967.mlab.com:36967/speak-your-mind', (err, db) => {
    if (err) throw err
    db.collection('users').find().toArray((err, result) => {
      if (err) throw err
      res.send(result)
      db.close()
    })
  })
})

router.post('/', (req, res) => {
  mongoClient.connect('mongodb://node:node@ds036967.mlab.com:36967/speak-your-mind', (err, db) => {
    if (err) throw err
    let existenceQuery = { email: req.body.email }
    db.collection('users').find(existenceQuery).toArray((err, result) => {
      if (err) throw err
      if (result.length >= 1) res.sendStatus(460)
      else {
        db.collection('users').insertOne(req.body, (err, result) => {
          if (err) throw err
          db.close()
          res.sendStatus(200)
        })
      }
    })
  })
})

module.exports = router

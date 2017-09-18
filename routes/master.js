const express = require('express')
const router = express.Router()
const mongoClient = require('mongodb').MongoClient

router.post('/chats/:name', (req, res) => {
  mongoClient.connect('mongodb://node:node@ds036967.mlab.com:36967/speak-your-mind', (err, db) => {
    if (err) throw err
    db.collection('chats').insertOne({ name: req.params.name, messages: [] }, (err, result) => {
      if (err) throw err
      else res.sendStatus(200)
    }
    )
  })
})

module.exports = router

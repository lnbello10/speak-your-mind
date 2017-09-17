const express = require('express')
const router = express.Router()
const mongoClient = require('mongodb').MongoClient
const jwtAuth = require('express-jwt')
const MongoDBRef = require('mongodb').DBRef

// authorization middleware takes the 'Authorization' header, it has to be 'Bearer <token>'.
// it saves the user in req.payload

const auth = jwtAuth({
  secret: 'MY_SECRET',
  userProperty: 'payload'
})

router.get('/:name', auth, (req, res) => {
  mongoClient.connect('mongodb://node:node@ds036967.mlab.com:36967/speak-your-mind', (err, db) => {
    if (err) throw err
    db.collection('chats').find({name: req.params.name}).toArray((err, result) => {
      if (err) throw err
      res.send(result)
      db.close()
    })
  })
})

router.post('/:name/message', auth, (req, res) => {
  mongoClient.connect('mongodb://node:node@ds036967.mlab.com:36967/speak-your-mind', (err, db) => {
    if (err) throw err
    let message = req.body
    message.date = new Date()
    message.user = new MongoDBRef('users', req.payload._id)
    db.collection('chats').update(
      { name: req.params.name },
      { $push: {messages: message} },
      (err, result) => {
        if (err) throw err
        res.sendStatus(200)
      }
    )
  })
})

module.exports = router

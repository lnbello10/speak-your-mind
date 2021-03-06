const express = require('express')
const router = express.Router()
const mongoClient = require('mongodb').MongoClient
const jwtAuth = require('express-jwt')

// authorization middleware takes the 'Authorization' header, it has to be 'Bearer <token>'.
// it saves the user in req.payload

const auth = jwtAuth({
  secret: 'MY_SECRET',
  userProperty: 'payload'
})

router.get('/:name', (req, res) => {
  mongoClient.connect('mongodb://node:node@ds036967.mlab.com:36967/speak-your-mind', (err, db) => {
    if (err) throw err
    db.collection('chats').findOne({name: req.params.name}, (err, chat) => {
      if (err) throw err
      db.collection('messages').find({
        chat_id: String(chat._id)
      }).toArray((err, chatMessages) => {
        if (err) throw err
        db.close()
        chat.messages = chatMessages
        res.send(chat)
      })
    })
  })
})

router.post('/:name/message', auth, (req, res) => {
  mongoClient.connect('mongodb://node:node@ds036967.mlab.com:36967/speak-your-mind', (err, db) => {
    if (err) throw err
    db.collection('chats').findOne({name: req.params.name}, (err, chat) => {
      if (err) throw err
      let message = req.body
      message.date = new Date()
      message.chat_id = String(chat._id)
      message.user_id = String(req.payload._id)
      db.collection('messages').insertOne(message, (err, result) => {
        if (err) throw err
        db.close()
        res.sendStatus(200)
      })
    })
  })
})

module.exports = router

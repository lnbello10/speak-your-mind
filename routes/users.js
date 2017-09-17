const express = require('express')
const router = express.Router()
const mongoClient = require('mongodb').MongoClient
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const jwtAuth = require('express-jwt')

// authorization middleware takes the 'Authorization' header, it has to be 'Bearer <token>'.
// it saves the user in req.payload

const auth = jwtAuth({
  secret: 'MY_SECRET',
  userProperty: 'payload'
})

router.get('/prueba', auth, (req, res) => {
  res.sendStatus(200)
})

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

router.post('/login', (req, res) => {
  mongoClient.connect('mongodb://node:node@ds036967.mlab.com:36967/speak-your-mind', (err, db) => {
    if (err) throw err
    let existenceQuery = { email: req.body.email }
    db.collection('users').find(existenceQuery).toArray((err, result) => {
      if (err) throw err
      if (result.length === 0) res.sendStatus(460)
      else {
        let user = result[0]
        let salt = user.salt
        let savedHash = user.hash
        let hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha1').toString('hex')
        if (hash !== savedHash) res.sendStatus(401)
        else {
          var expiry = new Date()
          expiry.setDate(expiry.getDate() + 7)
          res.status(200)
          res.send(jwt.sign({
            _id: user._id,
            email: user.email,
            exp: parseInt(expiry.getTime() / 1000)
          }, 'MY_SECRET'))
        }
      }
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
        let salt = crypto.randomBytes(16).toString('hex')
        let hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha1').toString('hex')
        let user = {
          email: req.body.email,
          hash: hash,
          salt: salt
        }
        db.collection('users').insertOne(user, (err, result) => {
          if (err) throw err
          db.close()
          res.sendStatus(200)
        })
      }
    })
  })
})

module.exports = router

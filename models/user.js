var mongoClient = require('mongodb').MongoClient

mongoClient.connect('mongodb://node:node@ds036967.mlab.com:36967/speak-your-mind', (err, db) => {
  if (err) throw err

  db.createCollection('users',
    {
      validator: {
        $or: [
          {
            email: { $type: 'string', $exists: true },
            hash: { $type: 'string', $exists: true },
            salt: { $type: 'string', $exists: true }
          }
        ]
      }
    }, (err, res) => {
      if (err) {
        console.log('Error creating the collection USERS')
        throw err
      }
      console.log('Collection USERS created succesfully')
      db.close()
    })
})

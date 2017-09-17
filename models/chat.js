var mongoClient = require('mongodb').MongoClient

mongoClient.connect('mongodb://node:node@ds036967.mlab.com:36967/speak-your-mind', (err, db) => {
  if (err) throw err

  db.createCollection('chats',
    {
      validator: {
        $and: [
          {
            name: { $type: 'string', $exists: true }
          }
        ]
      }
    }, (err, res) => {
      if (err) {
        console.log('Error creating the collection CHATS')
        throw err
      }
      console.log('Collection CHATS created succesfully')
      db.close()
    })
})

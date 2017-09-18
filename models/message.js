var mongoClient = require('mongodb').MongoClient

mongoClient.connect('mongodb://node:node@ds036967.mlab.com:36967/speak-your-mind', (err, db) => {
  if (err) throw err
  db.createCollection('messages',
    {
      validator: {
        $and: [
          {
            chat_id: { $type: 'string', $exists: true },
            user_id: { $type: 'string', $exists: true },
            text: { $type: 'string', $exists: true }
          }
        ]
      }
    }, (err, res) => {
      if (err) {
        console.log('Error creating the collection MESSAGES')
        throw err
      }
      console.log('Collection MESSAGES created succesfully')
      db.close()
    })
})

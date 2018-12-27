var MongoClient = require('mongodb').MongoClient;

module.exports = {
  createConnection: function() {

//add new db url
    MongoClient.connect("mongodb://sirius:password@ds257627.mlab.com:57627/step-projector-app").then(client=> {
            console.log('Connection established');
            //Add new db name
            // module.exports.database=client.db('step-projector-app');
            module.exports.database=client.db('step-projector-app');
    }).catch(err=>{
      console.error('Unable to connect to the mongoDB server. Error:', err);

    })
  },
}

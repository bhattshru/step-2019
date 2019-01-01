var MongoClient = require('mongodb').MongoClient;

module.exports = {
  createConnection: function() {

//add new db url
    MongoClient.connect("mongodb://admin:admin123@ds145694.mlab.com:45694/step-2019").then(client=> {
            console.log('Connection established');
            //Add new db name
            // module.exports.database=client.db('step-projector-app');
            module.exports.database=client.db('step-2019');
    }).catch(err=>{
      console.error('Unable to connect to the mongoDB server. Error:', err);

    })
  },
}

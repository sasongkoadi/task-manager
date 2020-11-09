const {MongoClient, ObjectID} = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID
console.log(id);

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName)
   
    // Users Collection
    db.collection('users').find({age: 28}).toArray((error, result) => {
        console.log(result);
    })

    db.collection('users').find({name: 'Sasongko'}).count((error, result) => {
        console.log(result);
    })

    db.collection('users').updateOne(
        {_id: new ObjectID('5f9fd6f4c305250ac45a57f3')},
        {
            $set: {
                name: 'Heru Sulistyawan'
            },
            $inc: {
                age: 1
            }
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        })
    
    //Task Collection    
    //FindOne function
    db.collection('task').findOne({_id: new ObjectID('5fa04b4e5231120969ab9fd8')}, (error, result) => {
        console.log(result);
    })
    //Find to array function
    db.collection('task').find({complete: false}).toArray().then((result) =>{
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
    //updateOne function using promise
    db.collection('task').updateOne(
        {_id: new ObjectID('5fa04b4e5231120969ab9fd6')},
        {
            $set: {
                complete: true
            }
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        })
    
    db.collection('task').updateMany(
        {complete: false},
        {
            $set: {
                complete: true
            }
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        })
})

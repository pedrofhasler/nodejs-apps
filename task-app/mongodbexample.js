import { Db, MongoClient, ObjectId } from "mongodb";


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {

    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // CREATE

    // db.collection('users').insertOne({
    //     name: 'Pedro',
    //     age: 27
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)

    // })

    // db.collection('users').insertMany([{
    //         name: 'Jen',
    //         age: 28
    //     },
    //     {
    //         name: 'Diego',
    //         age: 28
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert users.')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([{
    //         description: 'Clean',
    //         completed: true
    //     },
    //     {
    //         description: 'Cook',
    //         completed: false
    //     },
    //     {
    //         description: 'Shower',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to create tasks!')
    //     }

    //     console.log(result.ops)
    // })

    // READ

    // Returns the first one it finds. findOne
    //-----------------------------------
    // db.collection('users').findOne({ name: 'Jen' }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch.')
    //     }

    //     console.log(user)
    // })

    //To look for id we need to call ObjectId otherwise findOne will not find the string
    //because id is saved as a binary and ObjectId make the hex conversion to us
    //-----------------------------------------
    // db.collection('users').findOne({ _id: ObjectId("624079b40c4da1135c90fb8c") }, (error, user) => {
    //     if (error) {
    //         console.log('Unable to find user')
    //     }

    //     console.log(user)
    // })

    //find returns a cursor to us. That we can use another operations to format the data
    //for example. Using toArray
    //-------------------------------- 
    // db.collection('users').find({ age: 28 }).toArray((error, users) => {
    //     console.log(users)
    // })

    //Same read as above but in this case return the count number of documents
    //-------------------------
    // db.collection('users').find({ age: 28 }).count((error, users) => {
    //     console.log(users)
    // })

    //UPDATE

    //Update many or one have similar sintax.
    // db.collection('users').updateOne({
    //     _id: new ObjectId("624079b40c4da1135c90fb8c")
    // }, {
    //     $set: {
    //         name: 'Mike'
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    //DELETE

    // db.collection('users').deleteMany({
    //     age: 28
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
})
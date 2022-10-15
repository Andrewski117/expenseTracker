const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 8000;
const connectionString = "mongodb+srv://andrewski117:MongoDB117@cluster0.hsnqk7p.mongodb.net/?retryWrites=true&w=majority";

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

MongoClient.connect(connectionString, { useUnifiedTopology: true})
    .then(client => {
    console.log('Connected to the DB');
    const db = client.db('expense-db');
    const expenseCollection = db.collection('expenses');
    
    app.get('/', (req,res) => {
        db.collection('expenses').find().toArray()
            .then(results => {
                res.render('index.ejs', {expenses: results});
            })
            .catch(error => console.error(error));
        
    })

    app.post('/expenses', (req, res) => {
        expenseCollection.insertOne(req.body)
            .then(result => {
                console.log(result);
                res.redirect('/');
            })
            .catch(error => console.error(error));
        
    })
        
    //put request coming from a fetch from the index.js file
    app.put('/expenses', (req,res) =>{
        expenseCollection.findOneAndUpdate(
            {expenseItem: 'dog food'},
            {
                $set:{
                    expenseItem: req.body.expenseItem,
                    amount: req.body.amount
                }
            },
            {
                upsert: true
            }
        )
            .then(result => {
                res.json('Success');
            })
            .catch(error => console.error(error))
    })
    app.delete('/expenses', (req, res) => {
        expenseCollection.deleteOne(
            {name : req.body.expenseItem}
        )
            .then(result => {
                if(result.deletedCount === 0){
                    return res.json('No testing item to delete')
                }
                res.json('Deleted testing item');
            })
            .catch(err => console.error(err))
    })

    app.listen(PORT, () => {
        console.log(`running on port billy: ${PORT}`)
    })    
        
    })
    .catch(error => console.error(err))



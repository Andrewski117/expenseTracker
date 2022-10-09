const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs');
//app.use(express.static('public'));

app.get('/', (req,res) => {
    //res.sendFile(__dirname + '/public/index.html')
    res.render('index.ejs');
})

app.post('/expenses', (req, res) => {
    console.log('submitted')
})

app.listen(PORT, () => {
    console.log(`running on port billy: ${PORT}`)
})
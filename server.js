const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(PORT, () => {
    console.log(`running on port: ${PORT}`)
})
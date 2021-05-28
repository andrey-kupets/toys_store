const express = require('express');
const mongoose = require('mongoose');
console.log(mongoose)
const { MONGO_URL, PORT } = require('./config');

const app = express();

_connectDB();

app.listen(PORT, () => {
    console.log(`Port ${PORT} is being listened`);
});

function _connectDB() {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}


// app.get('/users', ((req, res) => {
//     res.json([
//         {"name": "Vasya"},
//         {"name": "Petr"},
//         {"name": "Manya"}
//     ])
// }))



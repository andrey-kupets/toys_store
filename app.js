const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

dotenv.config();

const { MONGO_URL, PORT } = require('./config');
const apiRouter = require('./router/api.router'); // крашится апка, если apiRouter деструктуризировать с ./router

const app = express();

_connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', apiRouter);

app.listen(PORT, () => {
    console.log(`Port ${PORT} is being listened`);
});

function _connectDB() {
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}



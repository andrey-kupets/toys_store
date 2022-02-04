const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

const { MONGO_URL, PORT } = require('./config');
const apiRouter = require('./router/api.router'); // App crushes, if apiRouter is destructured from ./router

const app = express();

_connectDB();

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), 'static')));

app.use('/', apiRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({
      customCode: err.customCode || 0,
      message: err.message || '',
    });
});

app.listen(PORT, () => {
  console.log(`Port ${PORT} is being listened`);
});

function _connectDB() {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

  const { connection } = mongoose;

  connection.on('error', (error) => {
    console.log(error);
  });
}

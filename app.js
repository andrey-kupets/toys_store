const express = require('express');

const { PORT } = require('./config');
const app = express();

app.listen(PORT, () => {
    console.log(`Port ${PORT} is being listened`);
});





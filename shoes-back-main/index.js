const express = require('express');
const app = express();
app.use(require('cors')());
const dbConnect = require('./DB/dbconnect');
dbConnect();
app.use(express.json());
app.use(express.urlencoded());
app.use('/', require('./routes/route'));

const server = app.listen(1234, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Server is running on port 1234");
});
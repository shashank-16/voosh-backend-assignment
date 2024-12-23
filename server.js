
require('dotenv').config({ path: './config/dev.env' })

const { Client } = require('pg');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = new express();
const port = process.env.PORT;

const authRoute = require('./view_server/routes/authRoute');
const userRoute = require('./view_server/routes/users/usersRoute');


const corsOption = {
    origin: '*',
    optionSuccessStatus: 200,
}

app.set('view engine', 'ejs');
app.use(express.static('uploads'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ urlencoded: false }));
app.use(express.json());
app.use(cors(corsOption));


app.use('/', authRoute);
app.use('/users', userRoute);


// app.get('/', (req, res) => {
//     res.status(200).send("This Api endpoint's call are used for voosh assignment");
// });


app.listen(port, console.log("server is started"));

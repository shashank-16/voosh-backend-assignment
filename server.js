
require('dotenv').config({ path: './config/dev.env' })

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = new express();
const port = process.env.PORT;

const authRoute = require('./view_server/routes/authRoute');
const userRoute = require('./view_server/routes/users/usersRoute');
const artistRoute = require('./view_server/routes/artists/artistRoute');
const albumRoute = require('./view_server/routes/albums/albumRoute');
const trackRoute = require('./view_server/routes/tracks/trackRoute');
const favoritesRoute = require('./view_server/routes/favorites/favoritesRoute');

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


app.use('/api/v1', authRoute);
app.use('api/v1/users', userRoute);
app.use('/api/v1/artists', artistRoute);
app.use('/api/v1/albums', albumRoute);
app.use('/api/v1/tracks', trackRoute);
app.use('/api/v1/favorites', favoritesRoute);



app.get('/api/v1/', (req, res) => {
    res.status(200).send("This Api endpoint's call are used for voosh assignment");
});


app.listen(port, console.log("server is started"));

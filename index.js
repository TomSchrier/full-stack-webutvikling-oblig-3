const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const port = 5000;
const UserModel = require('./model/model')

app.use(express.json());

//Database in MongoDB (Compass)
mongoose.connect('mongodb://localhost:27017/oblig3-users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const database = mongoose.connection;








database.on('error', (err) => console.log('---ERROR: There was an error connecting to the database.', err));
database.on('open', () => console.log('---Connected to the database.'));
app.listen(port, () => console.log(`---Express server running on port ${port}`));
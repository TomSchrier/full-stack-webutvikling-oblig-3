//npm run devStart
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 5000;
require('./auth/auth');
const authTools = require("./auth/auth.js");
const routes = require('./routes/routes');
const privateRoute = require('./routes/private-routes');

app.use(express.json());

//public routes
app.use('/', routes);

//For anyone authorized - see all users
app.use('/dashboard', authTools.authenticationCheck, privateRoute);

//Only for teachers - add, delete and update
app.use('/user', authTools.authenticationCheck, authTools.teacherAuthorizationCheck, privateRoute);

//Database in MongoDB (Compass)
mongoose.connect('mongodb://localhost:27017/oblig3-users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const database = mongoose.connection;

//From Gerardo
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err });
});

database.on('error', (err) => console.log('---ERROR: There was an error connecting to the database.', err));
database.on('open', () => console.log('---Connected to the database.'));
app.listen(port, () => console.log(`---Express server running on port ${port}`));
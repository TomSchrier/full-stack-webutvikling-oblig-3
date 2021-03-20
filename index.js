//npm run devStart

const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
const passport = require('passport');

const routes = require('./routes/routes');
const privateRoute = require('./routes/private-routes');

app.use(express.json());

app.use('/', routes);

//Kanskje to både for studenter og lærere?
//app.use('/user', passport.authenticate('jwt', { session: false }), privateRoute);
app.use('/user', passport.authenticate('jwt', { session: false }) ,privateRoute);

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
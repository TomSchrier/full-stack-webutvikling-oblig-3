//npm run devStart
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const port = 5000;
require('./auth/auth');
const privateRoute = require('./routes/private-routes');
const routes = require('./routes/routes');

app.use(express.json());

//public routes
app.use('/', routes);

app.use('/user', passport.authenticate("jwt", { session: false }), privateRoute);

//Database in MongoDB (Compass)
mongoose.connect('mongodb://localhost:27017/oblig3-users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
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
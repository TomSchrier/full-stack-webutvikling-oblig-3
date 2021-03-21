const UserModel = require('../model/model');

/*Return all uses in the database, but not all fields.
retrieving a list of all users can only be done by authenticated users.*/
//https://stackoverflow.com/q/24348437/14447555
const getAllUsers = async (req, res) => {
    await UserModel.find({}).select('name surname status place role -_id')
        .then(users => { res.status(200).json(users) })
        .catch((error) => { res.status(500).json(error) });
};

/*Delete a user from the database by their email. 
Deleting can only be done by users with the role of a teacher.*/
const deleteUser = async (req, res) => {
    await UserModel.findOneAndDelete({ email: req.body.email })
        .then(() => res.status(200).json(`The user with the email ${req.body.email} has been deleted.`))
        .catch((error) => res.status(500).json(error))
};


/* Code from Gerardo 10 march (with modifications).
Update a user by their email. Known issue: When updating multiple fields, 
the server tries to return multiple statuses causing some messages in the terminal. 
(The database is still updated) Suggested solution: in the front end, make it possible 
to only update one field at a time (one form per input field). */
const updateUser = async (req, res) => {
    const filter = { email: req.body.email };
    let alreadyInDatabase = await UserModel.findOne({ email: req.body.email });

    if (!filter) {
        return res.status(400).json('You must provide an email to update the fields');
        //if the email is not in the database, return error.
    } else if (!alreadyInDatabase) {
        return res.status(400).json('The provided email does not exist in the database, therefore, it is not possible to update any fields associated with it');
    } else {

        //check if user has filled in role input.
        if (req.body.role) {
            //check if the entered role is valid, if so update, else error
            if (req.body.role === 'student' || req.body.role === 'teacher') {
                await UserModel.findOneAndUpdate(filter, { $set: { role: req.body.role } })
                    .then(() => res.status(200).json(`The role for the user with the email ${req.body.email} has been updated to: ${req.body.role}`))
                    .catch((error) => res.status(500).json(error));
            } else {
                res.status(406).json(`The role '${req.body.role}' is invalid. The valid roles are 'student' and 'teacher'`)
            }
        };

        //check if user has filled in place input.
        if (req.body.place) {
            //check if the entered role is valid, if so update, else error
            if (req.body.place === 'on-campus' || req.body.place === 'home-office') {
                await UserModel.findOneAndUpdate(filter, { $set: { place: req.body.place } })
                    .then(() => res.status(200).json(`The place for the user with the email ${req.body.email} has been updated to: ${req.body.place}`))
                    .catch((error) => res.status(500).json(error));
            } else {
                res.status(406).json(`The place '${req.body.place}' is invalid. The valid roles are 'on-campus' and 'home-office'`)
            }
        };

        //check if user has filled in status input.
        if (req.body.status) {
            //check if the entered status is valid, if so update, else error
            if (req.body.status === 'available' || req.body.status === 'busy') {
                await UserModel.findOneAndUpdate(filter, { $set: { place: req.body.place } })
                    .then(() => res.status(200).json(`The status for the user with the email ${req.body.email} has been updated to: ${req.body.status}`))
                    .catch((error) => res.status(500).json(error));
            } else {
                res.status(406).json(`The status '${req.body.status}' is invalid. The valid roles are 'available' and 'busy'`)
            }
        };

        //check if user has filled in name input.
        if (req.body.name) {
            await UserModel.findOneAndUpdate(filter, { $set: { place: req.body.name } })
                .then(() => res.status(200).json(`The name for the user with the email ${req.body.email} has been updated to: ${req.body.name}`))
                .catch((error) => res.status(500).json(error));
        };

        //check if user has filled in surname input.
        if (req.body.surname) {
            await UserModel.findOneAndUpdate(filter, { $set: { place: req.body.surname } })
                .then(() => res.status(200).json(`The surname for the user with the email ${req.body.email} has been updated to: ${req.body.surname}`))
                .catch((error) => res.status(500).json(error));
        };

        /*check if user has filled in place input.
        NOTE: To update the email, we need to provide a 'newEmail' param, otherwise, the email will be updated each time.*/
        if (req.body.newEmail) {
            await UserModel.findOneAndUpdate(filter, { $set: { email: req.body.newEmail } })
                .then(() => res.status(200).json(`The email for the user with the email ${req.body.email} has been updated to: ${req.body.newEmail}`))
                .catch((error) => res.status(500).json(error));
        };
    }
};

module.exports = {
    getAllUsers,
    deleteUser,
    updateUser
};
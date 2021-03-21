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

const updateUser = async (req, res) => {
    /* res.status(200).json('Hello logged in user. Here you can UPDATE a user'); */
    const filter = { email: req.body.email };
    const update = { name: req.body.name };
    console.log(Object.keys(req.body));
    console.log(Object.values(req.body)[1]);

    if (!filter) {
        res.status(400).json('You must provide an email to update the fields');
    } else {
        await UserModel.findOneAndUpdate(filter, {$set: {name: req.body.name}})
            .then(() => res.status(200).json("updated"))
            .catch((error) => res.status(500).json(error));
    }


};

module.exports = {
    getAllUsers,
    deleteUser,
    updateUser
};
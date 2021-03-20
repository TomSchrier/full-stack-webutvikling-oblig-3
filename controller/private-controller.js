const UserModel = require('../model/model');

const getAllUsers = async (req, res) => {
    await UserModel.find({}, 'name surname status place role')
        .then(users => { res.status(200).json(users) })
        .catch((error) => { res.status(500).json(error) });
    //res.status(200).json('Hello logged in user. Here are all the users.');
};

const addNewUser = async (req, res) => {
    res.status(200).json('Hello logged in user. You can ADD a new user here');
};

const deleteUser = async (req, res) => {
    await UserModel.findOneAndDelete({ email: req.body.email })
        .then(() => res.status(200).json(`The user with the email ${req.body.email} has been deleted.`))
        .catch((error) => res.status(500).json(error))
};

const updateUser = async (req, res) => {
    res.status(200).json('Hello logged in user. Here you can UPDATE a user');
};

module.exports = {
    getAllUsers,
    addNewUser,
    deleteUser,
    updateUser
};
const express = require('express');
const router = express.Router();
const privateController = require('../controller/private-controller');

//used for adding a new user only, then we dont have to write the code for adding a user twice
const Controller = require('../controller/controller');

//PREFIX : /dashboard/ ––– Only for Student and teacher (or just if logged in)
router.get('/', privateController.getAllUsers);

router.get('/logout', privateController.logOutUser);


//PREFIX : /user/ ––– Only for teachers
router.post('/add', Controller.createNewUser);

router.delete('/delete', privateController.deleteUser);

router.patch('/update', privateController.updateUser);

module.exports = router;
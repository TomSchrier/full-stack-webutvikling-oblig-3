const express = require('express');
const router = express.Router();
const privateController = require('../controller/private-controller');

//used for adding a new user only, then we dont have to write the code for adding a user twice
const Controller = require('../controller/controller');

//PREFIX: /user/

//Only for Student and teacher (or just if logged in)
router.get('/all', privateController.getAllUsers);

//Only teacher
router.post('/add', Controller.createNewUser);

router.delete('/delete', privateController.deleteUser);

router.patch('/update', privateController.updateUser);


module.exports = router;
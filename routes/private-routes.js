const express = require('express');
const router = express.Router();
const privateController = require('../controller/private-controller');

//used for adding a new user only, then we dont have to write the code for adding a user twice
const Controller = require('../controller/controller');

//PREFIX : /dashboard/ ––– Only for Student and teacher (or just if logged in)
router.get('/', privateController.getAllUsers);

router.get('/logout', privateController.logOutUser);


//PREFIX : /user/ ––– Only for teachers
/*These URLs used to contain 'add', 'delete', and 'update', 
but I removed it after reading "REST Resource Naming Guide" 
(https://restfulapi.net/resource-naming/). Note that the email 
used to identify a user is still located in the body 
– these could be moved to the param/URL */
router.post('/', Controller.createNewUser);

router.delete('/', privateController.deleteUser);

router.patch('/', privateController.updateUser);

module.exports = router;
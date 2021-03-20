const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

//Public routes
router.get('/', controller.getPublicHomePage);

router.post('/signup', controller.createNewUser);

router.post('/login', controller.loginUser);

router.post('/forgotpassword', controller.forgotPassword);


module.exports = router;
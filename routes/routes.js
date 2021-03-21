const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

//Public routes - home page
router.get('/', controller.getPublicHomePage);

//Create new user
router.post('/signup', controller.createNewUser);

//Get JWT token to access other routes
router.post('/login', controller.loginUser);

router.post('/forgotpassword', controller.forgotPassword);

module.exports = router;
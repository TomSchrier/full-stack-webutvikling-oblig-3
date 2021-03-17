const express = require('express');

const router = express.Router();
const controller = require('../controller/controller')

router.post('/signup', controller.createNewUser);




module.exports = router;
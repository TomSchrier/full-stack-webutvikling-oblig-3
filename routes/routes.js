const express = require('express');

const router = express.Router();

router.get(
    '/signup',

    //stjel din egen cloud kode
    function (req, res) {
        res.json({ message: 'hello world' })
    })




module.exports = router;
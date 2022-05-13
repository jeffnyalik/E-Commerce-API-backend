const express = require("express");

const router = express.Router();
router.get('/user_test', (req, res) =>{
    res.send('working');
    console.log('working well')
})

module.exports = router;
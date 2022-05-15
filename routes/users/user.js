const bcryptjs = require("bcryptjs");
const User = require("../../models/users/User");
const router = require('express').Router();

const verifyAuth = require('../../middleware/verifyToken/verifyToken');

//UPDATE
router.get('/user_test', [verifyAuth.verifyToken], async (req, res) =>{
    const users = await User.find().sort({_id: -1})
    res.status(200).json(users);
    console.log(users);
});

//GET STATS
router.get('/stats', [verifyAuth.verifyToken], (req, res) =>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]).then(results =>{
        res.status(200).json(results)
    }).catch(error =>{
        res.status(500).json(error)
        console.log(error)
    });

})

module.exports = router;
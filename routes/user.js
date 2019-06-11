const express = require('express');
const router = express.Router();
const User = require("../model/User"); 
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const auth = require("../middleware/auth");



router.post("/register", (req, res) => {
    console.log("username" + req.body.username)
    console.log("password" + req.body.password)
    let user = new User();
    user.username = req.body.username
    user.setPassword(req.body.password); 
    
    user.save((err, user) => { 
        if (err) { 
            return res.status(400).send({ 
                message : "Failed to add user."
            }); 
        } 
        else { 
            return res.status(201).send({ 
                message : `${user['username']} has successfully been added`
            }); 
        } 
    }); 
    
});

router.post("/login", (req, res) => {

   User.findOne({username: req.body.username})
    .then(user => {
        console.log(user)
        if(!user){
            res.status(400).json({
                message: "User not found"
            });
        } else if(user.validPassword(req.body.password)){
            const token = jwt.sign({user: user}, config.secret, {expiresIn: 86400}  )
            res.status(200).json({
                token: token,
                message: "user logged in",
                id: user.id,
                user: user
            });

        } else {
            res.status(400).json({
                message: "Wrong password/username"
            });
        }

    })
})


router.post("/postBet", (req, res) => {
    User.updateOne(
        { _id: req.body.user[0]._id}, 
        { $push: { picks: req.body.bet } }
    ).then(data => {
        res.status(200).json({
            msg: "Successful bet",
            data: data
        })
    })
})


module.exports = router;

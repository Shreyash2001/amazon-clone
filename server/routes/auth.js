const express = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();

authRouter.post('/api/signup', async(req, res) => {
    try{
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email: email});
        if(existingUser) {
            return res.status(400).json({message: "User with this email address already exists"})
        }
    
        const hashedPassword = await bcryptjs.hash(password, 8);
    
        let user = new User({
            email: email,
            name: name,
            password: hashedPassword
        });
    
        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

authRouter.post("/api/signin", async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(user) {
            const isMatch = await bcryptjs.compare(password, user.password);
            if(isMatch) {
                const token = jwt.sign({id: user._id}, "key-password");
                res.json({token, ...user._doc});
            } else {
                res.status(400).json({message: "Incorrect Password!!!"});
            }
        } else {
            res.status(400).json({message: "User is not signed up!!!"});
        }
    } catch (e) {
        res.status(500).json({error: e.message});
    }
})

module.exports = authRouter
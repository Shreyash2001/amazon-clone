const express = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/userModel');

const authRouter = express.Router();

authRouter.post('/api/signup', async(req, res) => {
    try{
        console.log(req.body)
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
})

module.exports = authRouter
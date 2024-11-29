const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../models/admins')
const User = require('../models/users')
const router = express.Router()



router.post('/register' , async (req,res)=>{
    try {
        const { username , email , password , role } = req.body
        if(role == 'admin') {
            const hashedPassword = await bcrypt.hash(password , 10)
            const newAdmin = new Admin( { username , email , password : hashedPassword , role })
            await newAdmin.save()
            res.status(201).json({message : `Admin : ${username} has been created successfully`})
        }
        if(role == 'user'){
            const hashedPassword = await bcrypt.hash(password , 10)
            const newUser = new User( { username , email , password : hashedPassword , role })
            await newUser.save()
            res.status(201).json({message : `User : ${username} has been created successfully`})
        }
    } catch (error) {
        console.log({error : error.message})
    }
})

router.post('/login' , async (req,res)=>{
    try {
        const { username , email , password , role } = req.body
        if(role == 'admin'){
            const admin = await Admin.findOne({username})
            if(!admin) {
                return res.status(404).json({message : 'Admin not found'})
            } 
            else {
                const isMatch = await bcrypt.compare(password , admin.password)
                if(!isMatch) {
                    return res.status(400).json({message : 'Invalid credentials'})
                }
                const token = jwt.sign({id : admin._id , role : admin.role} , process.env.JWT_SECRET )
                req.session.user = {
                    id: admin._id,
                    role: admin.role,
                    token: token
                }
                return res.status(200).json({
                    message: "Login successful!",
                    token: token,
                    user: { id: admin._id, name: admin.name, role: admin.role }
                })
            }
        }
        else {
            const user = await User.findOne({username})
            if(!user) { 
                return res.status(404).json({message : 'User not found'})
            }
            else {
                const isMatch = await bcrypt.compare(password , user.password)
                if(!isMatch) {
                    return res.status(400).json({message : 'Invalid credentials'})
                }
                const token = jwt.sign({id : user._id , role : user.role} , process.env.JWT_SECRET )
                req.session.user = {
                    id: user._id,
                    role: user.role,
                    token: token
                }
                return res.status(200).json({
                    message: "Login successful!",
                    token: token,
                    user: { id: user._id, name: user.name, role: user.role }
                })
            }
        }
    } catch (error) {
        console.log({error : error.message})
    }
})

module.exports = router
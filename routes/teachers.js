const express = require('express')
const Teacher = require('../models/teachers')
const authorize = require('../authorize')
const router = express.Router()

router.get('/', authorize('admin'), async (req,res)=>{
    try {
        const teachers = await Teacher.find()
        res.status(200).json({teachers : teachers})
    } catch (error) {
        console.log({error : error.message})
    }

})

router.post('/', authorize('admin'), async (req,res)=>{
    try {
        const {image , name , specialize , description} = req.body
        const teacher = new Teacher({image , name , specialize , description})
        await teacher.save()
        res.status(201).json({message : "teacher has been created", teacher : teacher})
    } catch (error) {
        console.log({error : error.message})
    }
})

router.put('/:name', authorize('admin'), async (req,res)=>{
    try {
        const teacher = await Teacher.findOneAndUpdate({ name : req.params.name } , req.body , { new: true })
        res.status(200).json({message : "teacher has been updated", teacher : teacher})
    } catch (error) {
        console.log({error : error.message})
    }
})

router.delete('/:name', authorize('admin'), async (req,res)=>{
    try {
        await Teacher.findOneAndDelete({ name : req.params.name })
        res.status(200).json({message : "teacher has been deleted"})
    } catch (error) {
        console.log({error : error.message})
    }
})

module.exports = router
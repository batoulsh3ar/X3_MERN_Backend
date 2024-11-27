const express = require('express')
const Teacher = require('../models/teachers')
const router = express.Router()

router.get('/', async (req,res)=>{
    const teachers = await Teacher.find()
    res.status(200).json({teachers : teachers})
})

router.post('/', async (req,res)=>{
    const {image , name , specialize , description} = req.body
    const teacher = new Teacher({image , name , specialize , description})
    await teacher.save()
    res.status(201).json({message : "teacher has been created", teacher : teacher})
})

router.put('/:name', async (req,res)=>{
    const teacher = await Teacher.findOneAndUpdate({ name : req.params.name } , req.body , { new: true })
    res.status(200).json({message : "teacher has been updated", teacher : teacher})
})

router.delete('/:name', async (req,res)=>{
    await Teacher.findOneAndDelete({ name : req.params.name })
    res.status(200).json({message : "teacher has been deleted"})
})

module.exports = router
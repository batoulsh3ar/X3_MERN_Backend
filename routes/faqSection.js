const express = require('express');
const FAQ = require('../models/faqSection');
const authorize = require('../../X3_MERN_Backend/authorize')
const router = express.Router();

// جلب جميع الأسئلة
router.get('/', async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.status(200).json({ faqs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// إضافة سؤال جديد
router.post('/', async (req, res) => {
    const { question, answer } = req.body;
    try {
        const faq = new FAQ({ question, answer });
        await faq.save();
        res.status(201).json({ message: "FAQ has been created", faq });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// تعديل سؤال
router.put('/:id', async (req, res) => {
    try {
        const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "FAQ has been updated", faq });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// حذف سؤال
router.delete('/:id', async (req, res) => {
    try {
        await FAQ.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "FAQ has been deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

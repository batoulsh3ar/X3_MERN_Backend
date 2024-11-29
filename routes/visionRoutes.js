const express = require('express');
const Vision = require('../models/Vision');
const router = express.Router();

// إنشاء رؤية جديدة
router.post('/', async (req, res) => {
  try {
    const vision = new Vision(req.body);
    await vision.save();
    res.status(201).json({ message: 'Vision created successfully', vision });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// عرض جميع الرؤى
router.get('/', async (req, res) => {
  try {
    const visions = await Vision.find();
    res.status(200).json(visions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// عرض رؤية واحدة
router.get('/:id', async (req, res) => {
  try {
    const vision = await Vision.findById(req.params.id);
    if (!vision) {
      return res.status(404).json({ message: 'Vision not found' });
    }
    res.status(200).json(vision);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// تعديل رؤية
router.put('/:id', async (req, res) => {
  try {
    const vision = await Vision.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vision) {
      return res.status(404).json({ message: 'Vision not found' });
    }
    res.status(200).json({ message: 'Vision updated successfully', vision });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// حذف رؤية
router.delete('/:id', async (req, res) => {
  try {
    const vision = await Vision.findByIdAndDelete(req.params.id);
    if (!vision) {
      return res.status(404).json({ message: 'Vision not found' });
    }
    res.status(200).json({ message: 'Vision deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

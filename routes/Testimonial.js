const express = require('express');
const mongoose = require('mongoose');
const Testimonial = require('../models/Testimonial');
const authorize = require('../authorize'); 
const router = express.Router();

// Add a new testimonial
router.post('/add', authorize('user'), async (req, res) => {
    try {
        const { rating, description, image } = req.body;

        // Validate testimonial data
        const validationError = validateTestimonialData(req.body);
        if (validationError) {
            return res.status(400).json({ success: false, message: validationError });
        }

        // Add user reference to testimonial
        const testimonialData = {
            rating,
            description,
            image,
            user: req.session.user.id, // Associate testimonial with logged-in user
        };

        // Save the testimonial
        const createdTestimonial = await Testimonial.create(testimonialData);
        res.status(201).json({ 
            success: true, 
            message: 'Testimonial added successfully', 
            data: createdTestimonial 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all testimonials
router.get('/all', async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.status(200).json({ success: true, data: testimonials });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


// Update a testimonial
router.put('/:id', authorize('user', 'admin'), async (req, res) => {
    try {
        const id = req.params.id;

        // Validate ID
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID' });
        }

        // Find the testimonial
        const testimonial = await Testimonial.findById(id);
        if (!testimonial) {
            return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }

        // Check if the user has permission to edit
        if (req.session.user.role !== 'admin' || testimonial.user.toString() !== req.session.user.id) {
            return res.status(403).json({ success: false, message: 'You do not have permission to edit this testimonial' });
        }

        // Validate testimonial data
        const validationError = validateTestimonialData(req.body);
        if (validationError) {
            return res.status(400).json({ success: false, message: validationError });
        }

        // Update testimonial
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ 
            success: true, 
            message: 'Testimonial updated successfully', 
            data: updatedTestimonial 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete a testimonial
router.delete('/:id', authorize('admin', 'user'), async (req, res) => {
    try {
        const id = req.params.id;

        // Validate ID
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID' });
        }

        // Find the testimonial
        const testimonial = await Testimonial.findById(id);
        if (!testimonial) {
            return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }

        // Check if the user has permission to delete
        if (req.session.user.role !== 'admin' || testimonial.user.toString() !== req.session.user.id) {
            return res.status(403).json({ success: false, message: 'You do not have permission to delete this testimonial' });
        }

        // Delete testimonial
        await testimonial.remove();
        res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Validation function for testimonial data
function validateTestimonialData({ rating, description, image }) {
    if (!rating && !description && !image) {
        return 'All fields (rating, description, and image) must be provided.';
    }
    if (typeof rating !== 'number' && rating < 1 && rating > 5) {
        return 'Rating must be a number between 1 and 5.';
    }
    if (typeof description !== 'string') {
        return 'Description must be a string.';
    }
    if (typeof image !== 'string') {
        return 'Image must be a string.';
    }
    return null; // No errors
}

module.exports = router;

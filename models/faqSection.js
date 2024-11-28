const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});








const faqsection =mongoose.model('FAQ', faqSchema);
module.exports = faqsection

const mongoose = require('mongoose')

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    budget: {
        type: Number,
        trim: true,
        required: true,
    },
    color: {
        type: String,
        trim: true,
        required: true,
        minimum: 6
    }
}, { collection: 'myBudget'})

module.exports = mongoose.model('myBudget', budgetSchema)
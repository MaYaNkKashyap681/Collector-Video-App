const mongoose = require('mongoose')

const sampleSchema = new mongoose.Schema({
    fieldA: {
        type: String,
        require: true
    },
    fieldB: {
        type: Boolean,
    }
})

const sampleModel = mongoose.model('sampleModel', sampleSchema);

module.exports = sampleModel;
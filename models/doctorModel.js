const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({

    userId: {
        type: String,
    },
    firstName: {
        type: String,
        require: [true, 'first name is required']
    },
    lastName: {
        type: String,
        require: [true, 'last name is required']
    },
    phone: {
        type: String,
        require: [true, 'phone is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    website: {
        type: String
    },
    address: {
        type: String,
        required: [true, 'address is required']
    },
    specialization: {
        type: String,
        required: [true, 'specialization is required']
    },
    experience: {
        type: String,
        required: [true, 'experience is required']
    },
    feesPerConsultation: {
        type: String,
        required: [true, 'feesPerConsultation is required']
    },
    status: {
        type: String,
        default: 'pending'
    },
    timings: {
        type: Date,
        // required: [true, 'timings is required']
    }
}, { timestamps: true })

const doctorModel = mongoose.model('doctors', doctorSchema)
module.exports = doctorModel;
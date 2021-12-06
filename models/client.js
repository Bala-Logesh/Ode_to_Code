import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    phone_no: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        default: 5
    }
})

clientSchema.statics.findOneByEmail = function (email) {
    return this.find({ email: new RegExp(email, 'i') })
}

const Client = mongoose.model('Client', clientSchema)
export default Client

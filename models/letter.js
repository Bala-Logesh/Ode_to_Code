import mongoose from 'mongoose'

const letterSchema = new mongoose.Schema({
    l_id: {
        type: Number,
        required: true,
    },
    letter_name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Fatca',
            'POA',
            'Demo Maintainence',
            'Citi Biz Ac Closure',
            'MPP',
        ],
    },
})

letterSchema.statics.findOneByLetterId = function (l_id) {
    return this.find({ l_id })
}

letterSchema.statics.findOneByLetterName = function (letter_name) {
    return this.find({ letter_name })
}

const Letter = mongoose.model('Letter', letterSchema)
export default Letter

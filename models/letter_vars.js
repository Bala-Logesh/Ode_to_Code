import mongoose from 'mongoose'

const letterVarSchema = new mongoose.Schema({
    l_id: {
        type: Number,
        required: true,
    },
    variable: {
        type: String,
        required: true,
    },
})

letterVarSchema.statics.findOneByLetterId = function (l_id) {
    return this.find({ l_id })
}

const LetterVar = mongoose.model('Letter_Variable', letterVarSchema)
export default LetterVar

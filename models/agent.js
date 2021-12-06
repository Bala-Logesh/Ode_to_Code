import mongoose from 'mongoose'

const agentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    soeid: {
        type: String,
        required: true,
    },
    phone_no: {
        type: String,
        required: true,
    },
})

agentSchema.statics.findOneBySoeid = function (soeid) {
    return this.find({ soeid: new RegExp(soeid, 'i') })
}

const Agent = mongoose.model('Agent', agentSchema)
export default Agent

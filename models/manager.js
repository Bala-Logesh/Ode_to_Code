import mongoose from 'mongoose'

const managerSchema = new mongoose.Schema({
    mgr_name: {
        type: String,
        required: true,
    },
    soeid: {
        type: String,
        required: true,
    },
})

managerSchema.statics.findOneBySoeid = function (soeid) {
    return this.find({ soeid: new RegExp(soeid, 'i') })
}

const Manager = mongoose.model('Manager', managerSchema)
export default Manager

import mongoose from 'mongoose'

const approveSchema = new mongoose.Schema({
    m_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Manager',
        required: true,
    },
    t_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Query',
        required: true,
    },
    m_status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Approved', 'Rejected'],
    },
    approval_time: {
        type: Date,
        default: new Date(new Date().getTime() + 86400000),
    },
})

approveSchema.statics.findByTId = function (t_id) {
    return this.find({ t_id })
}

approveSchema.statics.findByMId = function (m_id) {
    return this.find({ m_id })
}

const Approval = mongoose.model('Approval', approveSchema)
export default Approval

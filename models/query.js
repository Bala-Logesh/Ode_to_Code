import mongoose from 'mongoose'

const querySchema = new mongoose.Schema({
    c_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Client',
        required: true,
    },
    query: {
        type: String,
        enum: [
            'Fatca',
            'POA',
            'Demo Maintainence',
            'Citi Biz Ac Closure',
            'MPP',
        ],
        required: true,
    },
    a_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Agent',
    },
    l_id: {
        type: Number,
    },
    desc: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Not Yet Assigned',
        enum: ['Not Yet Assigned', 'Assigned', 'Approval', 'Done'],
    },
    isLetterGenerated: {
        type: Boolean,
        default: false,
    },
    timestamp: {
        type: Date,
        default: new Date(),
    },
})

querySchema.statics.findByClientId = function (c_id) {
    return this.find({ c_id: c_id })
}

const Query = mongoose.model('Ticket', querySchema)
export default Query

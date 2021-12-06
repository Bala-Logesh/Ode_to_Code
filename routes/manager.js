import express from 'express'
import Approval from '../models/approval.js'
import Manager from '../models/manager.js'
import Query from '../models/query.js'

const router = express.Router()

// @route POST /manager/
// @desc Create a new Manager
// @access Public
router.post('/', async (req, res) => {
    const manager = new Manager({
        mgr_name: req.body.mgr_name,
        soeid: req.body.soeid,
    })
    const data = await manager.save()
    res.send(data)
})

// @route POST /manager/login?soeid=soeid
// @desc Login a manager and return id
// @access Public
router.post('/login', async (req, res) => {
    const soeid = req.query.soeid
    const manager = await Manager.findOneBySoeid(soeid)
    if (manager.length > 0) res.send({ m_id: manager[0]._id })
})

// @route POST /manager/assignManager
// @desc Assign a new manager to the ticket
// @access Public
router.post('/assignManager', async (req, res) => {
    let managers = await Manager.find()
    let count = managers.length
    let index = Math.floor(Math.random() * count)
    let assignedManager = managers[index]

    const t_id = req.body.t_id
    const a_id = req.body.a_id
    const c_id = req.body.c_id
    const l_id = req.body.l_id
    let newApproval

    let query = await Query.find({ _id: t_id, a_id, c_id })

    if (query) {
        newApproval = await Approval.create({
            m_id: assignedManager._id,
            t_id,
        })

        await Query.findByIdAndUpdate(t_id, { status: 'Approval', l_id })
    }

    res.send({
        manager_name: assignedManager.mgr_name,
        soeid: assignedManager.soeid,
        approvalTime: newApproval.approval_time,
        t_id,
    })
})

TODO:
router.post('/accept', (req, res) => {
    console.log(req.body)
    res.send('Ticket Approved')
})

TODO:
router.post('/reject', (req, res) => {
    console.log(req.body)
    res.send('Ticket Rejected')
})

TODO:
router.post('/checkStatus', (req, res) => {
    console.log(req.body)
    res.send('Rejected')
})

TODO:
router.get('/getAllApprovals', (req, res) => {
    console.log(req.body)
    res.send([
        {
            approval_id: 2,
            t_id: 7,
            cust_firstname: 'Bala',
            cust_lastname: 'Logesh',
            agent_firstname: 'Yavvana Shri',
            agent_lastname: 'K',
            agent_soeid: 'YK48322',
            query: 'Customer has removed US address. Primary address is in Singapore',
            letter_name: '30th Day',
            reason: 'Fatca',
            status: 'Pending',
        },
    ])
})

export default router

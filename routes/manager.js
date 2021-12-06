import express from 'express'
import Approval from '../models/approval.js'
import Client from '../models/client.js'
import Agent from '../models/agent.js'
import Manager from '../models/manager.js'
import Letter from '../models/letter.js'
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

// @route POST /manager/accept?t_id=t_id
// @desc Accept the ticket
// @access Public
router.post('/accept', async (req, res) => {
    const t_id = req.query.t_id
    let approval = await Approval.findByTId(t_id)
    let query = await Query.findById(t_id)

    await Approval.findByIdAndUpdate(approval[0]._id, { m_status: 'Approved' })
    await Query.findByIdAndUpdate(query._id, { status: 'Done' })
    res.send('Ticket Approved')
})

// @route POST /manager/reject?t_id=t_id
// @desc Reject the ticket
// @access Public
router.post('/reject', async (req, res) => {
    const t_id = req.query.t_id
    let approval = await Approval.findByTId(t_id)
    let query = await Query.findById(t_id)

    await Approval.findByIdAndUpdate(approval[0]._id, { m_status: 'Rejected' })
    await Query.findByIdAndUpdate(query._id, { status: 'Approval' })
    res.send('Ticket Rejected')
})

// @route GET /manager/getAllApprovals?m_id=m_id
// @desc Check the status of the ticket
// @access Public
router.get('/getAllApprovals', async (req, res) => {
    const m_id = req.query.m_id
    let approvals = await Approval.findByMId(m_id)
    let output = []
    for await (let approval of approvals) {
        const ticket = await Query.findById(approval.t_id)
        const customer = await Client.findById(ticket.c_id)
        const agent = await Agent.findById(ticket.a_id)
        const letter = await Letter.findOneByLetterId(ticket.l_id)
        let obj = {
            approval_id: approval._id,
            t_id: ticket._id,
            cust_firstname: customer.firstname,
            cust_lastname: customer.lastname,
            agent_firstname: agent.firstname,
            agent_lastname: agent.lastname,
            agent_soeid: agent.soeid,
            query: ticket.query,
            letter_name: letter[0].letter_name,
            reason: ticket.desc,
            status: ticket.status,
        }
        output.push(obj)
    }
    res.send(output)
})

// @route GET /manager/checkStatus?t_id=t_id
// @desc Check the status of the ticket
// @access Public
router.get('/checkStatus', async (req, res) => {
    const t_id = req.query.t_id
    let approval = await Approval.findByTId(t_id)
    if (approval.length > 0) res.send(approval[0].m_status)
})

export default router

import express from 'express'
import Query from '../models/query.js'
import Agent from '../models/agent.js'
import Client from '../models/client.js'

const router = express.Router()

// @route POST /checker/step0
// @desc Agent Match Validation
// @access Public
router.post('/step0', async (req, res) => {
    console.log(req.body);
    const t_id = req.body.t_id
    const a_id = req.body.a_id

    let query = await Query.findById(t_id)
    let agent = await Agent.findById(a_id)
    if (agent._id.toString() === query.a_id.toString())
        res.send('Agent Match Validated')
})

// @route POST /checker/step1
// @desc Query Info Validation
// @access Public
router.post('/step1', async (req, res) => {
    const t_id = req.body.t_id
    const a_id = req.body.a_id
    const c_id = req.body.c_id

    let query = await Query.findById(t_id)
    if (query.a_id.toString() === a_id && query.c_id.toString() === c_id)
        res.send('Query Info Validated')
})

// @route POST /checker/step2
// @desc Client Past Profile Validation
// @access Public
router.post('/step2', async (req, res) => {
    const c_id = req.body.c_id

    let client = await Client.findById(c_id)
    if (client.ratings > 3) res.send('Client Past Profile Validated')
})

// @route POST /checker/step2
// @desc Customer PII Validation
// @access Public
router.post('/step3', async (req, res) => {
    const { firstname, lastname, address, nationality, phone_no } = req.body
    let clients = await Client.find({
        firstname,
        lastname,
        address,
        nationality,
        phone_no,
    })

    if (clients.length > 0) {
        let client = clients[0]
        res.send({
            firstname: client.firstname,
            lastname: client.lastname,
            address: client.address,
            nationality: client.nationality,
        })
    }
})

export default router

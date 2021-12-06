import express from 'express'
import Client from '../models/client.js'
import Agent from '../models/agent.js'
import Query from '../models/query.js'
import bcrypt from 'bcryptjs'

const router = express.Router()

// @route POST /client/login
// @desc Login an existing client
// @access Public
router.post('/login', async (req, res) => {
    let client = await Client.findOneByEmail(req.body.email).limit(1)
    if (client.length > 0) {
        const isMatch = await bcrypt.compare(req.body.pwd, client[0].password)
        if (isMatch) res.send({ client_id: client[0]._id })
    }
})

// @route POST /client/signup
// @desc Create a new client
// @access Public
router.post('/signup', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)
    req.body.password = hash

    const client = await Client.create(req.body)
    console.log(client)
    res.send({ client_id: client._id })
})

// @route POST /client/raiseQuery
// @desc Create a new ticket
// @access Public
router.post('/raiseQuery', async (req, res) => {
    const query = await Query.create(req.body)
    const agents = await Agent.find()
    const count = agents.length
    if (count > 0) {
        let index = Math.floor(Math.random() * count)
        let agent = agents[index]
        query.a_id = agent._id
        query.status = 'Assigned'
        await query.save()
    }
    res.send('Query Posted')
})

// @route POST /client/getAllQueries?c_id=c_id
// @desc Get all the queries of a client
// @access Public
router.get('/getAllQueries', async (req, res) => {
    const queries = await Query.findByClientId(req.query.c_id)
    const output = []
    for await(let query of queries){
        const a_id = query.a_id
        let agent = await Agent.findById(a_id)
        let newQuery = {
            query: query.query,
            desc: query.desc,
            date: query.timestamp,
            status: query.status,
            isLetterGenerated: query.isLetterGenerated,
            agent_firstname: agent.firstname,
            agent_phone_no: agent.phone_no,
        }
        output.push(newQuery)
    }
    res.send(output)
})

export default router
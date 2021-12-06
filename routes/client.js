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
    let clients = await Client.findOneByEmail(req.body.email).limit(1)
    if (clients.length > 0) {
        const isMatch = await bcrypt.compare(req.body.pwd, clients[0].password)
        const id = clients[0]._id
        const client = await Client.findById(id).select('-password')
        if (isMatch) res.send({ client_id: id, client })
    }
})

// @route POST /client/signup
// @desc Create a new client
// @access Public
router.post('/signup', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)
    req.body.password = hash

    const data = await Client.create(req.body)
    const client = await Client.findById(data._id).select('-password')
    res.send({ client_id: client._id, client })
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

// @route GET /client/getAllQueries?c_id=c_id
// @desc Get all the queries of a client
// @access Public
router.get('/getAllQueries', async (req, res) => {
    const queries = await Query.findByClientId(req.query.c_id)
    const output = []
    for await(let query of queries){
        const a_id = query.a_id
        let agent = await Agent.findById(a_id)
        let newQuery = {
            _id: query._id,
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
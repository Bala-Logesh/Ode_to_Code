import express from 'express'
import Agent from '../models/agent.js'
import Client from '../models/client.js'
import LetterVar from '../models/letter_vars.js'
import Letter from '../models/letter.js'

const router = express.Router()

const checkHeaders = (req, res, next) => {
    if (req.headers.authorization) next()
}

// @route POST /admin/
// @desc Create a new agent
// @access Public
router.post('/', async (req, res) => {
    const agent = new Agent(req.body)
    const data = await agent.save(req.body)
    res.send(data)
})

// @route POST /admin/login?soeid=soeid
// @desc Login a agent and return id
// @access Public
router.post('/login', async (req, res) => {
    const soeid = req.query.soeid
    const agent = await Agent.findOneBySoeid(soeid)
    if(agent.length > 0) res.send({ a_id: agent[0]._id })
})

// @route GET /admin/getCustomerDetails?customer_id=customer_id
// @desc Returns the customer details
// @access Protected
router.get('/getCustomerDetails', checkHeaders, async (req, res) => {
    const client = await Client.findById(req.query.customer_id).select('-password')
    res.send([client])
})

// @route GET /admin/getLetterVariables?letter_name=letter_name
// @desc Returns the customer details
// @access Protected
router.post('/getLetterVariables', checkHeaders, async (req, res) => {
    const letter = await Letter.findOneByLetterName(req.query.letter_name).select('l_id')
    if (letter.length > 0) {
        let l_id = letter[0].l_id
        const variables = await LetterVar.findOneByLetterId(l_id).select('variable')
        let output = []
        variables.map(v => {
            let obj = {
                'variables': v.variable
            }
            output.push(obj)
        })
        res.send(output)
    }
})

export default router
import express from 'express'
const router = express.Router()

router.post('/login', (req, res) => {
    console.log(req.body);
    res.send({client_id: 9182347981234})
})

router.post('/signup', (req, res) => {
    console.log(req.body);
    res.send({ client_id: 9182347981234 })
})

router.post('/raiseQuery', (req, res) => {
    console.log(req.body)
    res.send('Query Posted')
})

router.get('/getAllQueries', (req, res) => {
    console.log(req.body)
    res.send({
        query: 'POA',
        desc: 'POA Query',
        date: new Date(),
        status: 'Processing',
        isLetterGenerated: false,
        agent_firstname: 'Bala',
        agent_phone_no: 9090909090
    })
})

export default router
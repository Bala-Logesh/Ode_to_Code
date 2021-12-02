import express from 'express'
const router = express.Router()

router.post('/login', (req, res) => {
    console.log(req.body)
    res.send({ m_id: 2354782347823 })
})

router.post('/assignManager', (req, res) => {
    console.log(req.body)
    res.send({ manager_name: "Jayasri", soeid: "JP65672", approvalTime: 1, t_id: 1 })
})

router.post('/accept', (req, res) => {
    console.log(req.body)
    res.send('Ticket Approved')
})

router.post('/reject', (req, res) => {
    console.log(req.body)
    res.send('Ticket Rejected')
})

router.post('/checkStatus', (req, res) => {
    console.log(req.body)
    res.send('Approved | Pending')
})

router.post('/getAllApprovals', (req, res) => {
    console.log(req.body)
    res.send([
        {
            approval_id: 2,
            cust_firstname: 'Bala',
            cust_lastname: 'Logesh',
            agent_firstname: 'Yavvana Shri',
            agent_lastname: 'K',
            agent_soeid: "YK48322",
            query: "Customer has removed US address. Primary address is in Singapore",
            letter_name: "30th Day",
            reason: "Fatca",
            status: "Pending"
        },
    ])
})

export default router

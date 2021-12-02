import express from 'express'
const router = express.Router()

router.post('/step0', (req, res) => {
    console.log(req.body)
    res.send('Agent Match Validated')
})

router.post('/step1', (req, res) => {
    console.log(req.body)
    res.send('Query Info Validated')
})

router.post('/step2', (req, res) => {
    console.log(req.body)
    res.send('Client Past Profile Validated')
})

router.post('/step3', (req, res) => {
    console.log(req.body)
    res.send({
        firstname: 'Kavin',
        lastname: 'Pragadeesh',
        address: 'Erode, Tamil Nadu',
        nationality: 'Korea',
    })
})

export default router

import express from 'express'
const router = express.Router()

router.post('/generateLetter', (req, res) => {
    console.log(req.body)
    res.send('Letter Generated')
})

router.post('/download', (req, res) => {
    console.log(req.body)
    res.send('Letter Downloaded')
})

export default router
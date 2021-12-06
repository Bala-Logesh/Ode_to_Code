import express from 'express'
import Letter from '../models/letter.js'
import LetterVar from '../models/letter_vars.js'

const router = express.Router()

// @route POST /letter/
// @desc Create a new letter
// @access Public
router.post('/', async (req, res) => {
    const letter = new Letter(req.body)
    const data = await letter.save()
    res.send(data)
})

// @route POST /letter/variables
// @desc Create letter variables
// @access Public
router.post('/variables', async (req, res) => {
    const letter_vars = new LetterVar(req.body)
    const data = await letter_vars.save()
    res.send(data)
})

// @route POST /letter/generateLetter
// @desc Generate the letter
// @access Public
router.post('/generateLetter', (req, res) => {
    res.send('Letter Generated')
})

// @route GET /letter/download?fileName=t_id.pdf
// @desc Download the pdf
// @access Public
router.get('/download', (req, res) => {
    res.send(`Letter Downloaded to ${req.query.fileName}`)
})

export default router
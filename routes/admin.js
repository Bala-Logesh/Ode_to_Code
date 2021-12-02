import express from 'express'
const router = express.Router()

router.post('/login', (req, res) => {
    console.log(req.body)
    res.send({ a_id: 5464353245 })
})

router.post('/getCustomerDetails', (req, res) => {
    console.log(req.body, req.headers)
    res.send({
        firstname: 'Bala',
        lastname: 'Logesh',
        email: 'bala@gmail.com',
        address:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, aperiam.',
        nationality: 'US',
        phone_no: 9999999999,
    })
})

router.post('/getLetterVariables', (req, res) => {
    console.log(req.body, req.headers)
    res.send([
        {
            variables:
                'Address, Telephone Number, Country of Birth, Nationality / Permanent Resident status',
        },
        {
            variables:
                'Form W-8BEN/Form W-9, Reasonable written taplanation (applicable if completing w-BBEN), Copy of Passport (please sign on copy & applicable to Non-Singaporean), Abandonment of Lawful Permanent Resident status, Certificate of Loss of Nationality',
        },
        {
            variables: 'Embed Date',
        },
    ])
})

export default router

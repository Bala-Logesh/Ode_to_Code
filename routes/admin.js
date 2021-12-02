import express from 'express'
const router = express.Router()

router.get('/getCustomerDetails/:customer_id', (req, res) => {
    console.log('customer_id - ' + req.params.customer_id)
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

router.get('/getLetterVariables/:letter_name', (req, res) => {
    res.send([
        {
            variables:
                'Address, Telephone Number, Country of Birth, Nationality / Permanent Resident status',
        },
        {
            variables:
                'Form W-8BEN/Form W-9 Reasonable written taplanation (applicable if completing w-BBEN, Copy of Passport (please sign on copy & applicable to Non-Singaporean). Abandonment of Lawful Permanent Resident status, Certificate of Loss of Nationality',
        },
        {
            variables: 'Embed Date',
        },
    ])
})

export default router

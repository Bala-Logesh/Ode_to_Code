import { URL } from "/js/data.js"

export const loginAdmin = async payload => {
    const data = await fetch(`${URL}/admin/login?soeid=${payload.soeid}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    let res = await data.json()
    localStorage.setItem('a_id', res.a_id)
}

export const getCustomerData = async payload => {
    const data = await fetch(
        `${URL}/admin/getCustomerDetails?customer_id=${payload.customer_id}`,
        {
            method: 'GET',
            // method: 'POST',
            // body: JSON.stringify({
            //     customer_id: payload.customer_id,
            // }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${payload.a_id}`,
            },
        }
    )
    let res = await data.json()
    localStorage.setItem('customer_a', JSON.stringify(res))
}

export const getLetterVariables = async payload => {
    const data = await fetch(
        `${URL}/admin/getLetterVariables?letter_name=${payload.letter_name}`,
        {
            method: 'GET',
            // method: 'POST',
            // body: JSON.stringify({
            //     letter_name: payload.letter_name,
            // }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${payload.a_id}`,
            },
        }
    )
    let res = await data.json()
    localStorage.setItem('letter_vars', JSON.stringify(res))
    console.log(res);
}

export const generateLetter = async payload => {
    const data = await fetch(`${URL}/letter/generateLetter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${payload.a_id}`,
        },
        body: JSON.stringify(payload),
    })
    let res = await data.text()
    console.log(res)
}
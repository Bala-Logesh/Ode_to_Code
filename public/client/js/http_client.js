import { URL } from "/js/data.js"

export const loginCustomer = async payload => {
    const data = await fetch(`${URL}/client/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    let res = await data.json()
    localStorage.setItem('client_id', res.client_id)
}

export const signUpCustomer = async payload => {
    const data = await fetch(`${URL}/client/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    let res = await data.json()
    localStorage.setItem('client_id', res.client_id)
}

export const raiseQuery = async payload => {
    const data = await fetch(`${URL}/client/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    let res = await data.json()
    console.log(res);
}

export const getAllQueries = async payload => {
    const data = await fetch(
        `${URL}/client/getAllQueries?c_id=${payload.c_id}`,
        {
            method: 'GET',
            // method: 'POST',
            // body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    let res = await data.json()
    localStorage.setItem('queries', res)
}



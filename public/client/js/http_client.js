import { URL } from "/js/data.js"

export const loginCustomer = async payload => {
    const data = await fetch(`${URL}/client/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    let { client_id, client } = await data.json()

    localStorage.setItem('customer', JSON.stringify(client))
    localStorage.setItem('client_id', client_id)
}

export const signUpCustomer = async payload => {
    const data = await fetch(`${URL}/client/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    let { client_id, client } = await data.json()

    localStorage.setItem('customer', JSON.stringify(client))
    localStorage.setItem('client_id', client_id)
}

export const raiseQuery = async payload => {
    const data = await fetch(`${URL}/client/raiseQuery`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    let res = await data.text()
    alert(res)
}

export const getAllQueries = async payload => {
    const data = await fetch(
        `${URL}/client/getAllQueries?c_id=${payload.c_id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    let res = await data.json()
    localStorage.setItem('queries', JSON.stringify(res))
}

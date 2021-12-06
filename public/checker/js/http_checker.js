import { URL } from '/js/data.js'

export const httpStep1 = async payload => {
    const data = await fetch(`${URL}/checker/step0`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    let res = await data
    console.log(res)
}

export const httpStep2 = async payload => {
    const data = await fetch(`${URL}/checker/step1`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    let res = await data
    console.log(res)
}

export const httpStep3 = async payload => {
    const data = await fetch(`${URL}/checker/step2`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    let res = await data
    console.log(res)
}

export const httpStep4 = async payload => {
    const data = await fetch(`${URL}/checker/step3`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    let res = await data
    console.log(res)
}

export const httpStep5 = async payload => {
    const data = await fetch(`${URL}/manager/assignManager`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    let res = await data.json()
    console.log(res)
}

export const getStatus = async payload => {
    const data = await fetch(
        `${URL}/manager/checkStatus?t_id=${payload.t_id}`,
        {
            method: 'GET',
            // method: 'POST',
            // body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    let res = await data.text()
    localStorage.setItem('refreshed', res)
    console.log(res)
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
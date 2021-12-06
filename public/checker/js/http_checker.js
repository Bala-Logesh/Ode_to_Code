import { URL } from '/js/data.js'

const updatingChecking = (res, val) => {
    if (res === val) {
        localStorage.setItem('Checking', true)
    } else localStorage.setItem('Checking', false)
}

export const httpStep1 = async payload => {
    const data = await fetch(`${URL}/checker/step0`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    let res = await data.text()
    updatingChecking(res, 'Agent Match Validated')
}

export const httpStep2 = async payload => {
    const data = await fetch(`${URL}/checker/step1`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    let res = await data.text()
    updatingChecking(res, 'Query Info Validated')
}

export const httpStep3 = async payload => {
    const data = await fetch(`${URL}/checker/step2`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    let res = await data.text()
    updatingChecking(res, 'Client Past Profile Validated')
}

export const httpStep4 = async payload => {
    const data = await fetch(`${URL}/checker/step3`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    let res = await data.json()
    if (
        res.firstname !== undefined &&
        res.lastname !== undefined &&
        res.address !== undefined &&
        res.nationality !== undefined
    ) {
        localStorage.setItem('Checking', true)
    } else localStorage.setItem('Checking', false)
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
    localStorage.setItem('Approval', JSON.stringify(res))
}

export const getStatus = async payload => {
    const data = await fetch(
        `${URL}/manager/checkStatus?t_id=${payload.t_id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    let res = await data.text()
    localStorage.setItem('refreshed', res)
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
    alert(res)
}

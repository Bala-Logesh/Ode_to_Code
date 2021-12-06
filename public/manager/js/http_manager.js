import { URL } from '/js/data.js'

export const loginManager = async payload => {
    console.log(payload)
    // const data = await fetch(`${URL}/manager/login?soeid=${payload.soeid}`, {
    const data = await fetch(`${URL}/manager/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    let res = await data.json()
    localStorage.setItem('m_id', res.m_id)
}

export const getAllApprovals = async payload => {
    const data = await fetch(
        // `${URL}/manager/getAllApprovals?m_id=${payload.m_id}`,
        `${URL}/manager/getAllApprovals`,
        {
            method: 'GET',
            // method: 'POST',
            // body: JSON.stringify({
            //     customer_id: payload.m_id,
            // }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${payload.m_id}`,
            },
        }
    )
    let res = await data.json()
    console.log(res);
    localStorage.setItem('tickets_m', JSON.stringify(res))
}

export const approveTkt = async payload => {
    const data = await fetch(`${URL}/manager/accept?t_id=${payload.t_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${payload.m_id}`,
        },
        body: JSON.stringify({
            t_id: payload.t_id,
        }),
    })
    let res = await data.text()
    localStorage.setItem(payload.t_id, 'Approved')
}

export const rejectTkt = async payload => {
    const data = await fetch(`${URL}/manager/reject?t_id=${payload.t_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${payload.m_id}`,
        },
        body: JSON.stringify({
            t_id: payload.t_id,
        }),
    })
    let res = await data.text()
    localStorage.setItem(payload.t_id, 'Rejected')
}
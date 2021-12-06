import { getAllApprovals } from './http_manager.js'

const tickets = document.querySelector('#tickets')

const createRow = (tkt, index) => {
    const row = document.createElement('tr')
    let col = 'red'

    if (tkt.status === 'Done') {
        col = 'green'
    }

    row.innerHTML = `
        <tr>
            <td>${index + 1}</td>
            <td>${tkt.approval_id}</td>
            <td>${tkt.letter_name}</td>
            <td style="color: ${col}; width: auto;">
                ${tkt.status}
            </td>
            <td class='link'><a href="tkt.html?t_id=${
                tkt.t_id
            }">View Details</a></td>
        </tr>
    `
    tickets.appendChild(row)
}

const runAtLoad = async () => {
    await getAllApprovals({
        m_id: localStorage.getItem('m_id'),
    })
    const ticket = JSON.parse(localStorage.getItem('tickets_m')) || []
    if (ticket) {
        ticket.forEach((tkt, index) => createRow(tkt, index))
    }
}

runAtLoad()

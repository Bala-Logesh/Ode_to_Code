import { approveTkt, rejectTkt } from './http_manager.js'

const tid = document.querySelector('#tid')
const cusid = document.querySelector('#cusid')
const ticket_details = document.querySelector('#ticket_details')
const approve = document.querySelector('#approve')
const reject = document.querySelector('#reject')

const urlParams = new URLSearchParams(window.location.search)
const t_id = urlParams.get('t_id')

const ticket = JSON.parse(localStorage.getItem('tickets_m')).filter(tkt => tkt.t_id === parseInt(t_id)
)[0]

const showDetails = () => {
    createRow('Approval Id', ticket.approval_id)
    createRow('Customer First Name', ticket.cust_firstname)
    createRow('Customer Last Name', ticket.cust_lastname)
    createRow('Agent First Name', ticket.agent_firstname)
    createRow('Agent Last Name', ticket.agent_lastname)
    createRow('Agent Soeid', ticket.agent_soeid)
    createRow('Letter Name', ticket.letter_name)
    createRow('Reason', ticket.reason)
    createRow('Status', ticket.status)
}

const createRow = (key, val) => {
    const row = document.createElement('tr')
    row.innerHTML = `
    <td><h4>${key} :</h4></td>
    <td><p>${val}</p></td>
`
    ticket_details.appendChild(row)
}

showDetails()

approve.addEventListener('click', async () => {
    await approveTkt({
        m_id: JSON.parse(localStorage.getItem('m_id')),
        t_id: ticket.t_id,
    })
    window.location.href = 'approvals.html'
})

reject.addEventListener('click', async () => {
    await rejectTkt({
        m_id: JSON.parse(localStorage.getItem('m_id')),
        t_id: ticket.t_id,
    })
    window.location.href = 'approvals.html'
})

// updateStatus = () => {
    
//     if (localStorage.getItem(ticket.approval_id)) {
//         JSON.parse(localStorage.getItem('tickets_m')).map(tkt => {
//             if (tkt.approval_id === ticket.approval_id) {
//                 if (localStorage.getItem(ticket.approval_id) === 'Approved') {
                    
//                 }
//             }
//         })

//     }
// }
import { getAllQueries } from './http_client.js'

const table = document.querySelector('#table')

const createRow = (query, index) => {
    const row = document.createElement('tr')
    let letter = query.isLetterGenerated

    const tdt = `<td class="link"><a href="http://localhost:3000/letter/download?fileName=${query._id}.pdf" target="_blank">Download PDF</a></td>`
    const tdf = `<td>NA</td>`

    row.innerHTML = `
        <tr>
            <td>${index + 1}</td>
            <td>${query.query}</td>
            <td>${query.desc}</td>
            <td style="color: ${query.status === 'Done' ? 'green' : 'black'};">
                ${query.status}
            </td>
            <td>${query.agent_phone_no}</td>
            ${letter ? tdt : tdf}
        </tr>
    `

    table.appendChild(row)
}

const runAtLoad = async () => {
    await getAllQueries({
        c_id: localStorage.getItem('client_id'),
    })
    let queries = JSON.parse(localStorage.getItem('queries')) || []
    if (queries) {
        queries.forEach((query, index) => createRow(query, index))
    }
}

runAtLoad()

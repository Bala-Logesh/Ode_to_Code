import { getAllQueries, downloadPDF } from './http_client.js'

getAllQueries({
    c_id: localStorage.getItem('client_id'),
})

let queries = JSON.parse(localStorage.getItem('queries')) || []

const table = document.querySelector('#table')

const createRow = (query, index) => {
    const row = document.createElement('tr')
    let status = 'Pending Approval'
    let col
    let letter = query.isLetterGenerated

    if (query.status === 'Approved') {
        status = query.status
        col = 'green'
    } else {
        status = query.status
        col = 'black'
    }
    const tdt = `<td class="link"><a href="${col}/www/google.co.in" blank="href">Download PDF</a></td>`
    const tdf = `<td>NA</td>`

    row.innerHTML = `
        <tr>
            <td>${index + 1}</td>
            <td>${query.query}</td>
            <td>${query.desc}</td>
            <td style="color: ${col};">
                ${status}
            </td>
            <td>${query.agent_phone_no}</td>
            ${letter ? tdt : tdf}
        </tr>
    `
    // const td = new HTMLElement('td')
    // if (letter) {
    //     td.innerHTML = "Download PDF"
    //     td.classList.add('link')
    //     td.addEventListener('click', async () => {
    //         await downloadPDF({
    //             fileName: `${localStorage.getItem('t_id')}.pdf`,
    //         })
    //     })
    // } else {
    //     td.innerHTML = 'NA'
    // }
    // row.appendChild(td)
    // if (letter) {
    //     const scl = `#pdfBtn${localStorage.getItem('t_id')}`
    //     console.log(document.querySelector(scl) + " hello")
    //     if (document.querySelector(scl)) {
        
    //         document
    //             .querySelector(scl)
    //             .addEventListener('click', async () => {
    //                 await downloadPDF({
    //                     fileName: `${localStorage.getItem('t_id')}.pdf`,
    //                 })
    //             })
    //     }
    // }

    table.appendChild(row)

    
    // <td id="pdfBtn">${letter ? 'Download PDF' : 'NA'}
    // let pdfBtn = document.querySelector('#pdfBtn')
    // if (letter) {
    //     pdfBtn.classList.add('link')

    //     pdfBtn.addEventListener('click', async () => {
    //         await downloadPDF({
    //             fileName: `${localStorage.getItem('t_id')}.pdf`,
    //         })
    //     })
    // }
}

queries.forEach((query, index) => createRow(query, index))

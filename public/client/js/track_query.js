let queries = JSON.parse(localStorage.getItem('queries')) || []

const table = document.querySelector('#table')

const createRow = (query, index) => {
    const row = document.createElement('tr')
    let status = 'Pending Approval'
    let col

    if (query.status === 'Approved') {
        status = query.status
        col = 'green'
    } else if (query.status === 'Rejected') {
        status = query.status
        col = 'red'
    } else {
        status = 'Under Process'
        color= 'black'
    }

    row.innerHTML = `
        <tr>
            <td>${index + 1}</td>
            <td>${query.query}</td>
            <td>${query.desc}</td>
            <td style="color: ${col};">
                ${status}
            </td>
            <td>${query.agent_phone_no}</td>
        </tr>
    `
    table.appendChild(row)
}

console.log(queries);
queries.forEach(((query, index) => createRow(query, index)))

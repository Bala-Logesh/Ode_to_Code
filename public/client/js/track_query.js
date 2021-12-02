let queries = JSON.parse(localStorage.getItem('queries')) || []

const table = document.querySelector('#table')

const createRow = (query, index) => {
    const row = document.createElement('tr')
    let status = 'Pending Approval'
    let col = 'red'

    if (localStorage.getItem(query.query_id) === 'approved') {
        status = '<a href="#" class="green">Completed. Click to see the response<a>'
        col = 'green'
    } else {
        status = 'Under Process'
        col = 'red'
    }

    row.innerHTML = `
        <tr>
            <td>${index + 1}</td>
            <td class='link'>${query.query}</td>
            <td>${query.desc}</td>
            <td style="color: ${col};">
                ${status}
            </td>
            <td class='link'><a href="query.html?q_id=${query.query}">View Details</a></td>
        </tr>
    `
    table.appendChild(row)
}

console.log(queries);
queries.forEach(((query, index) => createRow(query, index)))

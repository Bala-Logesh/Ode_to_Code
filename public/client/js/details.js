const c_details = document.querySelector('#c_details')

let customer = {
    fname: 'NA',
    lname: 'NA',
    email: 'NA',
    address: 'NA',
    nationality: 'NA',
    phone: 'NA',
}

if (localStorage.getItem('customer')) {
    customer = JSON.parse(localStorage.getItem('customer'))
}

const labels = [
    'First Name',
    'Last Name',
    'Email',
    'Address',
    'Nationality',
    'Phone Number',
]

const createRow = (key, val) => {
    const row = document.createElement('tr')
    row.innerHTML = `
    <td><h4>${key}</h4></td>
    <td><input disabled="true" value="${val}"></input></td>
`
    c_details.appendChild(row)
}

createRow(labels[0], customer.firstname)
createRow(labels[1], customer.lastname)
createRow(labels[2], customer.email)
createRow(labels[3], customer.address)
createRow(labels[4], customer.nationality)
createRow(labels[5], customer.phone_no)

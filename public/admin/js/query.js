import { getCustomerData } from "./http_admin.js"

const cid = document.querySelector('#cid')
const cusid = document.querySelector('#cusid')
const customer_details = document.querySelector('#customer_details')
const cDetailsBtn = document.querySelector('#cDetailsBtn')
const heading = document.querySelector('#heading')
const createLetter = document.querySelector('#createLetter')

cDetailsBtn.addEventListener('click', async () => {
    const data = {
        a_id: localStorage.getItem('a_id'),
        customer_id: cusid.value
    }
    cid.innerHTML = '- ' + cusid.value
    await getCustomerData(data)
    heading.classList.remove('hidden')
    showDetails()
    createLetter.classList.remove('hidden')
})

const showDetails = () => {
    if (localStorage.getItem('customer_a')) {
        const customer_a = JSON.parse(localStorage.getItem('customer_a'))

        createRow('Customer Id', cusid.value)
        createRow('First Name', customer_a.firstname)
        createRow('Last Name', customer_a.lastname)
        createRow('Email', customer_a.email)
        createRow('Address', customer_a.address)
        createRow('Nationality', customer_a.nationality)
        createRow('Phone Number', customer_a.phone_no)
    }
}

const createRow = (key, val) => {
    const row = document.createElement('tr')
    row.innerHTML = `
    <td><h4>${key} :</h4></td>
    <td><p>${val}</p></td>
`
    customer_details.appendChild(row)
}
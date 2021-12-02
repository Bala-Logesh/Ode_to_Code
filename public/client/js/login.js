import { loginCustomer } from "./http_client.js"

const email = document.querySelector('#email')
const pwd = document.querySelector('#password')
const cLoginBtn = document.querySelector('#cLoginBtn')

cLoginBtn.addEventListener('click', async () => {
    if (email.value) {
        let customer = {
            email: email.value,
            pwd: pwd.value
        }
        await loginCustomer(customer)
        window.location.href = 'details.html'
    }
})
import { signUpCustomer } from './http_client.js'

const fname = document.querySelector('#fname')
const lname = document.querySelector('#lname')
const email = document.querySelector('#email')
const address = document.querySelector('#address')
const nationality = document.querySelector('#country')
const phone = document.querySelector('#phone')
const password = document.querySelector('#password')
const password2 = document.querySelector('#password2')
const signupBtn = document.querySelector('#signupBtn')

signupBtn.addEventListener('click', async () => {
    const customer = {
        firstname: fname.value,
        lastname: lname.value,
        email: email.value,
        address: address.value,
        nationality: nationality.value,
        phone_no: phone.value,
        password: password.value,
    }

    await signUpCustomer(customer)
    window.location.href = 'details.html'
})

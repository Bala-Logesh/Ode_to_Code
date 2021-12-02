import { loginAdmin } from './http_admin.js'

const soeid = document.querySelector('#soeid')
const pwd = document.querySelector('#password')
const aLoginBtn = document.querySelector('#aLoginBtn')

aLoginBtn.addEventListener('click', async () => {
    if (soeid.value) {
        let admin = {
            soeid: soeid.value,
            pwd: pwd.value,
        }
        await loginAdmin(admin)
        window.location.href = 'customer_details.html'
    }
})
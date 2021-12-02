import { getAllApprovals, loginManager } from './http_manager.js'

const soeid = document.querySelector('#soeid')
const pwd = document.querySelector('#password')
const mLoginBtn = document.querySelector('#mLoginBtn')

mLoginBtn.addEventListener('click', async () => {
    if (soeid.value) {
        let manager = {
            soeid: soeid.value
        }
        await loginManager(manager)
        await getAllApprovals({ m_id: localStorage.getItem('m_id') })
        window.location.href = 'approvals.html'
    }
})
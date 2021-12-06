import { getAllQueries, raiseQuery } from './http_client.js'

const letter_type = document.querySelector('#letter_type')
const desc = document.querySelector('#desc')
const subQueryBtn = document.querySelector('#subQueryBtn')

const letters = [
    { key: 'Fatca', value: 'FATCA' },
    { key: 'POA', value: 'Power of Attorney' },
    { key: 'Demo Maintainence', value: 'Demo Maintenance' },
    { key: 'Citi Biz Ac Closure', value: 'Citi Biz Ac/Closure' },
    { key: 'MPP', value: 'MPP - Citibiz' },
]

letters.map(letter => {
    let op = document.createElement('option')
    op.value = letter.key
    op.innerHTML = letter.value
    letter_type.appendChild(op)
})

subQueryBtn.addEventListener('click', async () => {
    if (letter_type.value !== 'default' && localStorage.getItem('client_id')) {
        let query = {
            c_id: localStorage.getItem('client_id'),
            query: letter_type.value,
            desc: desc.value,
        }
        await raiseQuery(query)
        await getAllQueries({
            c_id: localStorage.getItem('client_id'),
        })
        window.location.href = 'track_query.html'
    }
})
